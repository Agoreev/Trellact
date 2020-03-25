import React from "react";

const DesksContext = React.createContext({
    desks: {},
    cards: {},
    items: {},
    desksOrder: [],
    onDeskAdded: () => {},
    onCardAdded: () => {},
    onDragEnd: () => {},
    onItemDone: () => {},
    onItemAdded: () => {}
});
export default DesksContext;
