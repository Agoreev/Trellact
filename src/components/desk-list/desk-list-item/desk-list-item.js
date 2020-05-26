import "./desk-list-item.css";
import React from "react";
import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";

const DeskListItem = ({ desk, deskId, index }) => {
    const { name } = desk;
    return (
        <Draggable draggableId={deskId} index={index}>
            {(provided) => (
                <Link
                    className="desk-link"
                    to={`/desks/${deskId}`}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <div
                        className="desk"
                        key={deskId}
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
