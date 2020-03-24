export default class TrelloService {
    maxDeskId = 100;
    maxCardId = 100;
    maxItemId = 100;

    data = {
        desks: {
            "desk-1": {
                id: "desk-1",
                name: "Tasks",
                cardIds: ["card-1", "card-2"]
            }
        },
        cards: {
            "card-1": {
                id: "card-1",
                name: "Monday",
                itemIds: ["item-1", "item-2"]
            },
            "card-2": {
                id: "card-2",
                name: "Thuesday",
                itemIds: ["item-3", "item-4"]
            }
        },
        items: {
            "item-1": {
                id: "item-1",
                name: "Clean house"
            },
            "item-2": {
                id: "item-2",
                name: "Make dinner"
            },
            "item-3": {
                id: "item-3",
                name: "Make homework"
            },
            "item-4": {
                id: "item-4",
                name: "Go to gym"
            }
        },
        desksOrder: ["desk-1"]
    };

    getDesks = () => {
        return new Promise(resolve => {
            resolve(this.data);
        });
    };

    createDesk = name => {
        return new Promise(resolve => {
            const newDeskId = "desk-" + this.maxDeskId++;
            const desk = {
                [newDeskId]: {
                    id: newDeskId,
                    name: name,
                    cardIds: []
                }
            };
            this.data.desks = { ...this.data.desks, desk };
            // this.data.desksOrder = [...this.data.desksOrder, newDeskId];
            resolve(desk);
        });
    };

    createCard = (name, deskId) => {
        return new Promise(resolve => {
            const newCardId = "card-" + this.maxCardId++;
            const card = {
                [newCardId]: {
                    id: newCardId,
                    name: name,
                    itemIds: []
                }
            };
            this.data.cards = { ...this.data.cards, card };
            // this.data.desks[deskId].cardIds.push(newCardId);
            resolve(card);
        });
    };

    createItem = (name, cardId) => {
        return new Promise(resolve => {
            const newItemId = "item-" + this.maxItemId++;

            const item = {
                [newItemId]: {
                    id: newItemId,
                    name: name
                }
            };

            this.data.items = { ...this.data.items, item };
            // this.data.cards[cardId].itemIds = [
            //     ...this.data.cards[cardId].itemIds,
            //     newItemId
            // ];
            resolve(item);
        });
    };

    setItemState = itm => {
        return new Promise(resolve => {
            const item = this.data.items[itm.id];
            item.state = item.state === "done" ? "active" : "done";
            resolve(item);
        });
    };
}
