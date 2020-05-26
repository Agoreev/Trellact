import React from "react";

const DesksContext = React.createContext({
    desks: {},
    cards: {},
    items: {},
    desksOrder: [],
    currentFilter: "all",
    updateCards: () => {},
    onDeskAdded: () => {},
    onCardAdded: () => {},
    onDragEnd: () => {},
    onChangeFilter: () => {},
    onItemDone: () => {},
    onItemAdded: () => {},
});
export default DesksContext;
