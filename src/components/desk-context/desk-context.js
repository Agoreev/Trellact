import React from "react";

const DesksContext = React.createContext({
    desks: {},
    cards: {},
    items: {},
    desksOrder: [],
    onDeskAdded: () => {},
    onCardAdded: () => {},
    onItemDragEnd: () => {},
    onItemDone: () => {},
    onItemAdded: () => {}
});
export default DesksContext;
