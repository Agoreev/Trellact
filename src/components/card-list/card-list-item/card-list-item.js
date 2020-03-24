import React from "react";
import "./card-list-item.css";
import ItemList from "../../item-list";
import { Draggable } from "react-beautiful-dnd";

const CardListItem = ({ card, index }) => {
    return (
        <Draggable draggableId={card.id} index={index}>
            {provided => (
                <div
                    className="card"
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <span className="card__title" {...provided.dragHandleProps}>
                        {card.name}
                    </span>

                    <ItemList cardId={card.id}></ItemList>
                </div>
            )}
        </Draggable>
    );
};

export default CardListItem;
