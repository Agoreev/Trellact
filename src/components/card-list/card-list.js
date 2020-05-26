import React from "react";
import "./card-list.css";
import CardListItem from "./card-list-item";
import NewCardItem from "./new-card-item";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DesksContext from "../desk-context";
import { useContext, useEffect } from "react";

const CardList = ({ deskId }) => {
    const desksContext = useContext(DesksContext);
    const { desks, cards, onDragEnd, onCardAdded, updateCards } = desksContext;
    const desk = desks[deskId];
    let cardsList = null;

    useEffect(() => {
        updateCards(deskId);
    });
    if (desk["cardIds"]) {
        cardsList = desk.cardIds.map((cardId, index) => {
            const card = cards[cardId];
            return (
                <CardListItem
                    key={card.id}
                    card={card}
                    index={index}
                ></CardListItem>
            );
        });
    }
    return (
        <React.Fragment>
            <div className="cards-list__desk-title">{desk.name}</div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    droppableId={deskId.toString()}
                    direction="horizontal"
                    type="card"
                >
                    {(provided) => (
                        <div
                            className="cards-list"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {cardsList}
                            {provided.placeholder}
                            <NewCardItem
                                onCardAdded={onCardAdded}
                                deskId={desk.id}
                            />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </React.Fragment>
    );
};

export default CardList;
