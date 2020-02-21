import React from "react";
import "./card-list-item.css";
import ItemList from "../item-list";

const CardListItem = ({ cardId, name, items, onItemDone }) => {
    return (
        <div className="card">
            <span className="card__title">{name}</span>
            <ItemList items={items} cardId={cardId} onItemDone={onItemDone} />
        </div>
    );
};

export default CardListItem;
