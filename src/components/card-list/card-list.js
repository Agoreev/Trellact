import React from "react";
import "./card-list.css";
import CardListItem from "../card-list-item";
import NewCardItem from "../new-card-item";
import { withTrelloService } from "../hoc";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

const CardList = ({ desk, cards, items, onItemDone, children }) => {
    const cardsList = cards.map(card => {
        return (
            <CardListItem
                key={card.id}
                cardId={card.id}
                name={card.name}
                items={items}
                onItemDone={onItemDone}
            ></CardListItem>
        );
    });
    return (
        <React.Fragment>
            <div className="cards-list__desk-title">{desk.name}</div>
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
        console.log(deskId);
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
            <CardList
                desk={desk}
                cards={cards}
                items={items}
                onItemDone={this.onItemDone}
            >
                <NewCardItem onCardAdded={this.onCardAdded} deskId={desk.id} />
            </CardList>
        );
    }
}

export default withTrelloService(CardListContainer);
