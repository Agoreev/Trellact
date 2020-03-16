import React from "react";
import "./item-list-item.css";
import { Draggable } from "react-beautiful-dnd";
import DeskContext from "../desk-context";
import { useContext } from "react";

const ItemListItem = ({ item, index }) => {
    const deskContext = useContext(DeskContext);
    const { onItemDone } = deskContext;
    return (
        <Draggable draggableId={item.id.toString()} index={index}>
            {provided => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={item.state ? "item " + item.state : "item"}
                    onClick={() => onItemDone(item)}
                >
                    <span className="item__text">{item.name}</span>
                    <span className="item__done-mark"></span>
                </div>
            )}
        </Draggable>
    );
};

export default ItemListItem;
