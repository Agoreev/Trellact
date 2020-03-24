import React from "react";
import "./card-list-item.css";
import ItemList from "../../item-list";

const CardListItem = ({ cardId, name }) => {
    return (
        <div className="card">
            <span className="card__title">{name}</span>

            <ItemList cardId={cardId}></ItemList>
        </div>
    );
};

export default CardListItem;
