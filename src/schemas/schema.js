import { schema } from "normalizr";

const item = new schema.Entity("items");

const card = new schema.Entity("cards", {
    items: [item]
});

const desk = new schema.Entity("desks", {
    cards: [card]
});

export { desk, card };
