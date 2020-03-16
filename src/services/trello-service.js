export default class TrelloService {
    maxId = 100;
    maxCardId = 100;
    maxItemId = 100;
    unnormalizedData = [
        {
            id: 1,
            name: "tasks",
            cards: [
                {
                    id: 1,
                    name: "Monday",
                    items: [
                        {
                            id: 1,
                            name: "get to work"
                        },
                        {
                            id: 2,
                            name: "clean the house"
                        }
                    ]
                },
                {
                    id: 2,
                    name: "Thuesday",
                    items: [
                        {
                            id: 3,
                            name: "go to gym"
                        },
                        {
                            id: 4,
                            name: "go to school"
                        }
                    ]
                }
            ]
        }
    ];
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
                cardId: 1,
                order: 1
            },
            {
                id: 2,
                name: "clean house",
                cardId: 1,
                order: 2
            },
            {
                id: 3,
                name: "go shopping",
                cardId: 2,
                order: 1
            },
            {
                id: 4,
                name: "go to gym",
                cardId: 2,
                order: 2
            },
            {
                id: 5,
                name: "get to work",
                cardId: 3,
                order: 1
            },
            {
                id: 6,
                name: "clean house",
                cardId: 3,
                order: 2
            },
            {
                id: 7,
                name: "go shopping",
                cardId: 4,
                order: 1
            },
            {
                id: 8,
                name: "go to gym",
                cardId: 4,
                order: 2
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
                desk: desk,
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
            this.data.desks = [...this.data.desks, desk];
            resolve(this.data.desks);
        });
    };

    createCard = (name, deskId) => {
        return new Promise(resolve => {
            const card = {
                id: this.maxCardId++,
                name: name,
                deskId: deskId
            };
            this.data.cards = [...this.data.cards, card];
            resolve(card);
        });
    };

    createItem = (name, cardId) => {
        return new Promise(resolve => {
            const items = this.data.items.filter(item => {
                return item.cardId === cardId;
            });

            const item = {
                id: this.maxItemId++,
                name: name,
                cardId: cardId,
                order: items.length + 1
            };
            this.data.items = [...this.data.items, item];
            resolve(item);
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
