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
                this.setState(state => {
                    return {
                        cards: {
                            ...state.cards,
                            ...card
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
                this.setState(state => {
                    return {
                        items: {
                            ...state.items,
                            ...item
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
        this.props.trelloService.setItemState(item).then(
            newItem => {
                this.setState({
                    items: {
                        ...this.state.items,
                        newItem
                    }
                });
            },
            error => {
                this.setState({
                    error: error
                });
            }
        );
    };

    onItemDragEnd = result => {
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
    componentDidMount() {
        this.updateDesks();
    }
    render() {
        const { desks, cards, items, desksOrder, loading, error } = this.state;
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
                        onDeskAdded: this.onDeskAdded,
                        onCardAdded: this.onCardAdded,
                        onItemDragEnd: this.onItemDragEnd,
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
