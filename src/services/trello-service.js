export default class TrelloService {
    maxId = 100;
    data = {
        desks: [
            {
                id: 1,
                name: "tasks"
            },
            {
                id: 2,
                name: "Home work"
            }
        ],
        cards: [
            {
                id: 1,
                name: "Monday",
                deskId: 1
            },
            {
                id: 2,
                name: "Thuesday",
                deskId: 1
            },
            {
                id: 3,
                name: "Friday",
                deskId: 2
            },
            {
                id: 4,
                name: "Saturday",
                deskId: 2
            }
        ],
        items: [
            {
                id: 1,
                name: "get to work",
                state: "done",
                cardId: 1
            },
            {
                id: 2,
                name: "clean house",
                cardId: 1
            },
            {
                id: 3,
                name: "go shopping",
                cardId: 2
            },
            {
                id: 4,
                name: "go to gym",
                cardId: 2
            },
            {
                id: 5,
                name: "get to work",
                cardId: 3
            },
            {
                id: 6,
                name: "clean house",
                cardId: 3
            },
            {
                id: 7,
                name: "go shopping",
                cardId: 4
            },
            {
                id: 8,
                name: "go to gym",
                cardId: 4
            }
        ]
    };

    getDesks = () => {
        return new Promise(resolve => {
            resolve(this.data.desks);
        });
    };

    getDesk = id => {
        return new Promise(resolve => {
            const desk = this.data.desks.find(desk => desk.id === parseInt(id));
            const cards = this.data.cards.filter(
                card => card.deskId === parseInt(id)
            );
            const items = this.data.items.filter(item => {
                return cards.some(card => {
                    return item.cardId === card.id;
                });
            });

            const res = {
                desk: desk.name,
                cards: cards,
                items: items
            };
            resolve(res);
        });
    };

    createDesk = name => {
        return new Promise(resolve => {
            const desk = {
                id: this.maxId++,
                name: name
            };
            this.data = [...this.data.desks, desk];
            resolve(this.data);
        });
    };

    setItemState = item => {
        return new Promise(resolve => {
            const itemIdx = this.data.items.findIndex(itm => {
                return itm.id === item.id;
            });
            const newItem = {
                ...item,
                state: item.state === "done" ? "active" : "done"
            };
            this.data.items = [
                ...this.data.items.slice(0, itemIdx),
                newItem,
                ...this.data.items.slice(itemIdx + 1)
            ];
            resolve(newItem);
        });
    };
}