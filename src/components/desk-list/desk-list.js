import "./desk-list.css";
import React from "react";
import DeskListItem from "./desk-list-item";
import NewDeskItem from "./new-desk-item";
import DesksContext from "../desk-context";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useContext } from "react";

const DeskList = () => {
    const desksContext = useContext(DesksContext);
    const { desks, desksOrder, onDeskAdded, onDragEnd } = desksContext;
    const desksList = desksOrder.map((deskId, index) => {
        const desk = desks[deskId];
        return (
            <DeskListItem key={deskId} desk={desk} index={index}></DeskListItem>
        );
    });
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
                droppableId="all-docs"
                direction="horizontal"
                type="desk"
            >
                {provided => (
                    <div
                        className="desks-list"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {desksList}
                        {provided.placeholder}
                        <NewDeskItem onDeskAdded={onDeskAdded} />
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default DeskList;
