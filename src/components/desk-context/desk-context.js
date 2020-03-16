import React from "react";

const DeskContext = React.createContext({
    desk: {},
    cards: [],
    items: [],
    onItemDone: () => {},
    onItemAdded: () => {}
});
export default DeskContext;
