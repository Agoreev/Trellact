import React from "react";
import "./item-list.css";
import ItemListItem from "./item-list-item/item-list-item";
import NewItem from "./new-item";
import { Droppable } from "react-beautiful-dnd";
import DeskContext from "../desk-context";
import { useContext } from "react";

const ItemList = ({ cardId }) => {
    const deskContext = useContext(DeskContext);
    const { cards, items, onItemAdded } = deskContext;
    const card = cards[cardId];
    const itemsList = card.itemIds.map((itemId, index) => {
        const item = items[itemId];
        return <ItemListItem item={item} key={item.id} index={index} />;
    });
    return (
        <div className="items-list">
            <NewItem onItemAdded={onItemAdded} cardId={cardId} />
            <Droppable droppableId={cardId.toString()} type="item">
                {(provided, snapshot) => (
                    <div
                        className={`items-list__container ${
                            snapshot.isDraggingOver ? "dragging-over" : ""
                        }`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {itemsList}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default ItemList;
