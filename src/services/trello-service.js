export default class TrelloService {
    _apiBase = "https://trellact.firebaseio.com";

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        return await res.json();
    }

    async postResource(url, data) {
        const res = await fetch(`${this._apiBase}${url}`, {
            method: "POST",
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        return await res.json();
    }

    async patchResource(url, data) {
        const res = await fetch(`${this._apiBase}${url}`, {
            method: "PATCH",
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        return await res.json();
    }

    maxDeskId = 100;
    maxCardId = 100;
    maxItemId = 100;

    getDesks = async () => {
        const desks = await this.getResource(`/allDesks/desks.json`);
        const desksOrder = await this.getResource(`/allDesks/desksOrder.json`);
        return { desks: desks, desksOrder: desksOrder };
    };

    getCards = async (deskId) => {
        const desk = await this.getResource(`/allDesks/desks/${deskId}.json`);

        // Load cards for specific desk here
        return;
    };

    createDesk = async (name) => {
        const res = await this.postResource(`/allDesks/desks.json`, {
            name: name,
            cardIds: [],
        });
        return res;
    };

    updateDesksOrder = async (desksOrder) => {
        const res = await this.patchResource(`/allDesks.json`, {
            desksOrder,
        });
        return res;
    };

    // createDesk = (name) => {
    //     return new Promise((resolve) => {
    //         const newDeskId = "desk-" + this.maxDeskId++;
    //         const desk = {
    //             [newDeskId]: {
    //                 id: newDeskId,
    //                 name: name,
    //                 cardIds: [],
    //             },
    //         };
    //         resolve(desk);
    //     });
    // };

    // createCard = (name, deskId) => {
    //     return new Promise((resolve) => {
    //         const newCardId = "card-" + this.maxCardId++;
    //         const card = {
    //             [newCardId]: {
    //                 id: newCardId,
    //                 name: name,
    //                 itemIds: [],
    //             },
    //         };
    //         resolve(card);
    //     });
    // };
    createCard = async (name) => {
        const res = await this.postResource(`/allDesks/cards.json`, {
            name: name,
            itemIds: [],
        });
        return res;
    };
    updateCardsOrder = async (deskId, cardsOrder) => {
        const res = await this.patchResource(`/allDesks/desks/${deskId}.json`, {
            cardsOrder,
        });
        return res;
    };

    createItem = (name, cardId) => {
        return new Promise((resolve) => {
            const newItemId = "item-" + this.maxItemId++;

            const item = {
                [newItemId]: {
                    id: newItemId,
                    name: name,
                },
            };
            resolve(item);
        });
    };

    setItemState = (itm) => {
        return new Promise((resolve) => {
            const item = this.data.items[itm.id];
            item["done"] = item["done"] ? false : true;
            resolve(item);
        });
    };
}
