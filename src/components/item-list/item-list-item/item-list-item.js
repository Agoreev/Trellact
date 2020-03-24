import React from "react";
import "./item-list-item.css";
import { Draggable } from "react-beautiful-dnd";
import DeskContext from "../../desk-context";
import { useContext } from "react";

const ItemListItem = ({ item, index }) => {
    const deskContext = useContext(DeskContext);
    const { onItemDone } = deskContext;
    const itemStateClass = item.state ? "item " + item.state : "item";
    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided, snapshot) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={`${itemStateClass} ${
                        snapshot.isDragging ? "dragging" : ""
                    }`}
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
