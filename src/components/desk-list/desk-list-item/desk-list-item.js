import "./desk-list-item.css";
import React from "react";
import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";

const DeskListItem = ({ desk, index }) => {
    const { id, name } = desk;
    return (
        <Draggable draggableId={desk.id} index={index}>
            {provided => (
                <Link
                    className="desk-link"
                    to={`/desks/${id}`}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <div
                        className="desk"
                        key={id}
                        {...provided.dragHandleProps}
                    >
                        <span className="desk__title">{name}</span>
                    </div>
                </Link>
            )}
        </Draggable>
    );
};

export default DeskListItem;
