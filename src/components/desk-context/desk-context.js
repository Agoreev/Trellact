import React from "react";

const DesksContext = React.createContext({
    desks: {},
    cards: {},
    items: {},
    desksOrder: [],
    currentFilter: "all",
    onDeskAdded: () => {},
    onCardAdded: () => {},
    onDragEnd: () => {},
    onChangeFilter: () => {},
    onItemDone: () => {},
    onItemAdded: () => {}
});
export default DesksContext;
