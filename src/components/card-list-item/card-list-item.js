import React from "react";
import "./card-list-item.css";
import ItemList from "../item-list";

const CardListItem = ({ cardId, name, items, onItemDone, onItemAdded }) => {
    return (
        <div className="card">
            <span className="card__title">{name}</span>
            <ItemList
                items={items}
                cardId={cardId}
                onItemDone={onItemDone}
                onItemAdded={onItemAdded}
            />
        </div>
    );
};

export default CardListItem;
