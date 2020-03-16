import React from "react";
import "./item-list.css";
import ItemListItem from "../item-list-item";
import NewItem from "../new-item";
import { Droppable } from "react-beautiful-dnd";
import DeskContext from "../desk-context";
import { useContext } from "react";

const ItemList = ({ cardId }) => {
    const deskContext = useContext(DeskContext);
    const { items, onItemAdded } = deskContext;
    const itemsList = items
        .filter(item => {
            return item.cardId === cardId;
        })
        .map((item, index) => {
            return (
                <ItemListItem item={item} key={item.id} index={item.order} />
            );
        });
    return (
        <div className="items-list">
            <NewItem onItemAdded={onItemAdded} cardId={cardId} />
            <Droppable droppableId={cardId.toString()}>
                {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {itemsList}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default ItemList;
