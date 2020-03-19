import React from "react";
import "./card-list.css";
import CardListItem from "../card-list-item";
import NewCardItem from "../new-card-item";
import { DragDropContext } from "react-beautiful-dnd";
import DesksContext from "../desk-context";
import { useContext } from "react";

const CardList = ({ deskId }) => {
    const desksContext = useContext(DesksContext);
    const { desks, cards, onItemDragEnd, onCardAdded } = desksContext;
    const desk = desks[deskId];
    const cardsList = desk.cardIds.map(cardId => {
        const card = cards[cardId];
        return (
            <CardListItem
                key={card.id}
                cardId={card.id}
                name={card.name}
            ></CardListItem>
        );
    });
    return (
        <React.Fragment>
            <div className="cards-list__desk-title">{desk.name}</div>
            <DragDropContext onDragEnd={onItemDragEnd}>
                <div className="cards-list">
                    {cardsList}
                    <NewCardItem onCardAdded={onCardAdded} deskId={desk.id} />
                </div>
            </DragDropContext>
        </React.Fragment>
    );
};

export default CardList;
