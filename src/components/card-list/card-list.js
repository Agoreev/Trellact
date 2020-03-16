import React from "react";
import "./card-list.css";
import CardListItem from "../card-list-item";
import NewCardItem from "../new-card-item";
import { withTrelloService } from "../hoc";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import { DragDropContext } from "react-beautiful-dnd";
import DeskContext from "../desk-context";
import { useContext } from "react";

const CardList = ({ children }) => {
    const deskContext = useContext(DeskContext);
    const cardsList = deskContext.cards.map(card => {
        return (
            <CardListItem
                key={card.id}
                cardId={card.id}
                name={card.name}
            ></CardListItem>
        );
    });
    return (
        <React.Fragment>
            <div className="cards-list">
                {cardsList}
                {children}
            </div>
        </React.Fragment>
    );
};

class CardListContainer extends React.Component {
    state = {
        desk: {},
        cards: [],
        items: [],
        loading: true,
        error: false
    };

    updateDesk = deskId => {
        this.props.trelloService.getDesk(deskId).then(
            data => {
                const { desk, cards, items } = data;
                this.setState({
                    desk: desk,
                    cards: cards,
                    items: items,
                    loading: false,
                    error: false
                });
            },
            error => {
                console.warn(error);
                this.setState({
                    loading: false,
                    error: true
                });
            }
        );
    };

    onItemDone = item => {
        this.props.trelloService.setItemState(item).then(
            newItem => {
                const { items } = this.state;
                const itemIdx = items.findIndex(itm => {
                    return itm.id === item.id;
                });
                this.setState({
                    items: [
                        ...items.slice(0, itemIdx),
                        newItem,
                        ...items.slice(itemIdx + 1)
                    ]
                });
            },
            error => {
                this.setState({
                    error: error
                });
            }
        );
    };

    onCardAdded = (cardName, deskId) => {
        this.props.trelloService.createCard(cardName, deskId).then(
            data => {
                this.setState({
                    cards: [...this.state.cards, data]
                });
            },
            error => {
                this.setState({
                    error: true
                });
            }
        );
    };

    onItemAdded = (itemName, cardId) => {
        this.props.trelloService.createItem(itemName, cardId).then(
            data => {
                this.setState({
                    items: [...this.state.items, data]
                });
            },
            error => {
                this.setState({
                    error: true
                });
            }
        );
    };

    onDragEnd = result => {
        const { destination, source, draggableId } = result;
        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        const itemIdx = this.state.items.findIndex(item => {
            return item.id === parseInt(draggableId);
        });
        const item = this.state.items[itemIdx];
        const newItem = {
            ...item,
            cardId: parseInt(destination.droppableId),
            order: destination.index
        };

        const itemsWithoutSortedCard = this.state.items.filter(itm => {
            return itm.cardId !== newItem.cardId && itm.id !== item.id;
        });

        const itemsToModifyOrder = this.state.items.filter(itm => {
            return itm.cardId === newItem.cardId;
        });

        for (let i = 0; i < itemsToModifyOrder.length; i++) {
            if (itemsToModifyOrder[i].order >= newItem.order) {
                itemsToModifyOrder[i].order++;
            }
        }
        const newItems = [
            ...itemsWithoutSortedCard,
            ...itemsToModifyOrder,
            newItem
        ];

        this.setState({
            items: newItems
        });
    };

    componentDidMount() {
        const deskId = this.props.deskId;
        this.updateDesk(deskId);
    }

    render() {
        const { desk, cards, items, loading, error } = this.state;
        if (loading) {
            return <Spinner />;
        }
        if (error) {
            return <ErrorIndicator />;
        }
        return (
            <React.Fragment>
                <div className="cards-list__desk-title">{desk.name}</div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <DeskContext.Provider
                        value={{
                            desk: desk,
                            cards: cards,
                            items: items,
                            onItemDone: this.onItemDone,
                            onItemAdded: this.onItemAdded
                        }}
                    >
                        <CardList>
                            <NewCardItem
                                onCardAdded={this.onCardAdded}
                                deskId={desk.id}
                            />
                        </CardList>
                    </DeskContext.Provider>
                </DragDropContext>
            </React.Fragment>
        );
    }
}

export default withTrelloService(CardListContainer);
