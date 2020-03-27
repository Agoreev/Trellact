import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { DesksPage, CardsPage } from "../pages";
import { withTrelloService } from "../hoc";
import DesksContext from "../desk-context";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import "./app.css";
import logo from "./logo.png";

class App extends Component {
    state = {
        desks: {},
        cards: {},
        items: {},
        desksOrder: [],
        currentFilter: "all",
        loading: true,
        error: false
    };

    updateDesks = () => {
        this.props.trelloService.getDesks().then(
            data => {
                this.setState({
                    desks: data.desks,
                    cards: data.cards,
                    items: data.items,
                    desksOrder: data.desksOrder,
                    loading: false,
                    error: false
                });
            },
            error => {
                this.setState({
                    desks: {},
                    cards: {},
                    items: {},
                    desksOrder: [],
                    loading: false,
                    error: true
                });
            }
        );
    };
    onDeskAdded = deskName => {
        this.props.trelloService.createDesk(deskName).then(
            desk => {
                this.setState(state => {
                    return {
                        desks: {
                            ...state.desks,
                            ...desk
                        },
                        desksOrder: [...state.desksOrder, Object.keys(desk)[0]]
                    };
                });
            },
            error => {
                this.setState({
                    error: true
                });
            }
        );
    };

    onCardAdded = (cardName, deskId) => {
        this.props.trelloService.createCard(cardName, deskId).then(
            card => {
                const newCardIds = [
                    ...this.state.desks[deskId].cardIds,
                    Object.keys(card)[0]
                ];
                this.setState(state => {
                    return {
                        cards: {
                            ...state.cards,
                            ...card
                        },
                        desks: {
                            ...state.desks,
                            [deskId]: {
                                ...this.state.desks[deskId],
                                cardIds: newCardIds
                            }
                        }
                    };
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
            item => {
                const newItemIds = [
                    ...this.state.cards[cardId].itemIds,
                    Object.keys(item)[0]
                ];
                this.setState(state => {
                    return {
                        items: {
                            ...state.items,
                            ...item
                        },
                        cards: {
                            ...state.cards,
                            [cardId]: {
                                ...this.state.cards[cardId],
                                itemIds: newItemIds
                            }
                        }
                    };
                });
            },
            error => {
                this.setState({
                    error: true
                });
            }
        );
    };

    onItemDone = item => {
        this.setState(state => {
            return {
                items: {
                    ...state.items,
                    [item.id]: {
                        ...item,
                        done: item.done ? false : true
                    }
                }
            };
        });
    };

    onDragEnd = result => {
        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (type === "desk") {
            const newDesksOrder = [...this.state.desksOrder];
            newDesksOrder.splice(source.index, 1);
            newDesksOrder.splice(destination.index, 0, draggableId);

            this.setState({ desksOrder: newDesksOrder });
            return;
        }

        if (type === "card") {
            const desk = this.state.desks[source.droppableId];
            const newCardOrder = [...desk.cardIds];
            newCardOrder.splice(source.index, 1);
            newCardOrder.splice(destination.index, 0, draggableId);

            this.setState(state => {
                return {
                    desks: {
                        ...state.desks,
                        [desk.id]: {
                            ...desk,
                            cardIds: newCardOrder
                        }
                    }
                };
            });
            return;
        }

        const start = this.state.cards[source.droppableId];
        const finish = this.state.cards[destination.droppableId];

        if (start === finish) {
            //reordering

            const card = this.state.cards[source.droppableId];
            const newItemIds = [...card.itemIds];

            newItemIds.splice(source.index, 1);
            newItemIds.splice(destination.index, 0, draggableId);

            const newCard = {
                ...card,
                itemIds: newItemIds
            };

            this.setState(state => {
                return {
                    cards: {
                        ...state.cards,
                        [newCard.id]: newCard
                    }
                };
            });
        } else {
            //Moving from one card to another
            const startItemIds = [...start.itemIds];
            startItemIds.splice(source.index, 1);
            const newStart = {
                ...start,
                itemIds: startItemIds
            };

            const finishItemIds = [...finish.itemIds];
            finishItemIds.splice(destination.index, 0, draggableId);
            const newFinish = {
                ...finish,
                itemIds: finishItemIds
            };

            this.setState(state => {
                return {
                    cards: {
                        ...state.cards,
                        [newStart.id]: newStart,
                        [newFinish.id]: newFinish
                    }
                };
            });
        }
    };

    onChangeFilter = filter => {
        this.setState({ currentFilter: filter });
    };
    componentDidMount() {
        this.updateDesks();
    }
    render() {
        const {
            desks,
            cards,
            items,
            desksOrder,
            currentFilter,
            loading,
            error
        } = this.state;
        if (loading) {
            return <Spinner />;
        }
        if (error) {
            return <ErrorIndicator />;
        }
        return (
            <div className="app container">
                <Link to="/" className="logo">
                    <img src={logo} alt="logo" />
                </Link>
                <DesksContext.Provider
                    value={{
                        desks: desks,
                        cards: cards,
                        items: items,
                        desksOrder: desksOrder,
                        currentFilter: currentFilter,
                        onDeskAdded: this.onDeskAdded,
                        onCardAdded: this.onCardAdded,
                        onChangeFilter: this.onChangeFilter,
                        onDragEnd: this.onDragEnd,
                        onItemDone: this.onItemDone,
                        onItemAdded: this.onItemAdded
                    }}
                >
                    <Switch>
                        <Route path="/" exact component={DesksPage} />
                        <Route path="/desks/:id?" exact component={CardsPage} />
                        <Route render={() => <h2>Page not found</h2>} />
                    </Switch>
                </DesksContext.Provider>
            </div>
        );
    }
}

export default withTrelloService(App);
