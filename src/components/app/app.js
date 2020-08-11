import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { DesksPage, CardsPage } from "../pages";
import { withTrelloService } from "../hoc";
import DesksContext from "../desk-context";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import Header from "../header";
import "./app.css";

class App extends Component {
    state = {
        desks: {},
        cards: {},
        items: {},
        desksOrder: [],
        currentFilter: "all",
        loading: true,
        error: false,
    };

    updateDesks = () => {
        //this.setState({ loading: true });
        this.props.trelloService.getDesks().then(
            (data) => {
                this.setState({
                    desks: data.desks,
                    // cards: data.cards,
                    // items: data.items,
                    desksOrder: data.desksOrder,
                    loading: false,
                    error: false,
                });
            },
            (error) => {
                this.setState({
                    desks: {},
                    cards: {},
                    items: {},
                    desksOrder: [],
                    loading: false,
                    error: true,
                });
            }
        );
    };

    //Updates desks order on server
    updateDesksOrder = (newDesksOrder) => {
        const { trelloService } = this.props;
        trelloService.updateDesksOrder(newDesksOrder).then(
            (desksOrder) => {
                this.updateDesks();
            },
            (error) => {
                this.setState({
                    error: true,
                });
            }
        );
    };
    updateCards = (deskId) => {
        this.props.trelloService.getCards(deskId).then(
            (data) => {
                this.setState({
                    cards: data.cards,
                    items: data.items,
                });
            },
            (error) => {
                this.setState({
                    cards: {},
                    items: {},
                    error: true,
                    loading: false,
                });
            }
        );
    };
    onDeskAdded = (deskName) => {
        const { trelloService } = this.props;
        trelloService.createDesk(deskName).then(
            (desk) => {
                console.log(desk);
                const newDesksOrder = [...this.state.desksOrder, desk.name];
                this.updateDesksOrder(newDesksOrder);
            },
            (error) => {
                this.setState({
                    error: true,
                });
            }
        );
    };

    onCardAdded = (cardName, deskId) => {
        const { trelloService } = this.props;
        trelloService.createCard(cardName).then(
            (card) => {
                const newCardsOrder = [
                    ...this.state.desks[deskId].cardIds,
                    card.name,
                ];
                trelloService.updateCardsOrder(deskId, newCardsOrder).then(
                    (cardsOrder) => {
                        this.updateCards(deskId);
                    },
                    (error) => {
                        this.setState({
                            error: true,
                        });
                    }
                );
                // this.setState((state) => {
                //     return {
                //         cards: {
                //             ...state.cards,
                //             ...card,
                //         },
                //         desks: {
                //             ...state.desks,
                //             [deskId]: {
                //                 ...this.state.desks[deskId],
                //                 cardIds: newCardIds,
                //             },
                //         },
                //     };
                // });
            },
            (error) => {
                this.setState({
                    error: true,
                });
            }
        );
    };

    onItemAdded = (itemName, cardId) => {
        this.props.trelloService.createItem(itemName, cardId).then(
            (item) => {
                const newItemIds = [
                    ...this.state.cards[cardId].itemIds,
                    Object.keys(item)[0],
                ];
                this.setState((state) => {
                    return {
                        items: {
                            ...state.items,
                            ...item,
                        },
                        cards: {
                            ...state.cards,
                            [cardId]: {
                                ...this.state.cards[cardId],
                                itemIds: newItemIds,
                            },
                        },
                    };
                });
            },
            (error) => {
                this.setState({
                    error: true,
                });
            }
        );
    };

    onItemDone = (item) => {
        this.setState((state) => {
            return {
                items: {
                    ...state.items,
                    [item.id]: {
                        ...item,
                        done: item.done ? false : true,
                    },
                },
            };
        });
    };

    onDragEnd = (result) => {
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
            this.updateDesksOrder(newDesksOrder);
            return;
        }

        if (type === "card") {
            const desk = this.state.desks[source.droppableId];
            const newCardOrder = [...desk.cardIds];
            newCardOrder.splice(source.index, 1);
            newCardOrder.splice(destination.index, 0, draggableId);

            this.setState((state) => {
                return {
                    desks: {
                        ...state.desks,
                        [desk.id]: {
                            ...desk,
                            cardIds: newCardOrder,
                        },
                    },
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
                itemIds: newItemIds,
            };

            this.setState((state) => {
                return {
                    cards: {
                        ...state.cards,
                        [newCard.id]: newCard,
                    },
                };
            });
        } else {
            //Moving from one card to another
            const startItemIds = [...start.itemIds];
            startItemIds.splice(source.index, 1);
            const newStart = {
                ...start,
                itemIds: startItemIds,
            };

            const finishItemIds = [...finish.itemIds];
            finishItemIds.splice(destination.index, 0, draggableId);
            const newFinish = {
                ...finish,
                itemIds: finishItemIds,
            };

            this.setState((state) => {
                return {
                    cards: {
                        ...state.cards,
                        [newStart.id]: newStart,
                        [newFinish.id]: newFinish,
                    },
                };
            });
        }
    };

    onChangeFilter = (filter) => {
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
            error,
        } = this.state;
        let spinner = null;
        if (loading) {
            spinner = <Spinner />;
        }
        if (error) {
            return <ErrorIndicator />;
        }
        return (
            <div className="app container">
                <Header />
                {spinner}

                <DesksContext.Provider
                    value={{
                        desks: desks,
                        cards: cards,
                        items: items,
                        desksOrder: desksOrder,
                        currentFilter: currentFilter,
                        updateCards: this.updateCards,
                        onDeskAdded: this.onDeskAdded,
                        onCardAdded: this.onCardAdded,
                        onChangeFilter: this.onChangeFilter,
                        onDragEnd: this.onDragEnd,
                        onItemDone: this.onItemDone,
                        onItemAdded: this.onItemAdded,
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
