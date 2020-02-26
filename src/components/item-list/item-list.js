import React from "react";
import "./item-list.css";
import ItemListItem from "../item-list-item";
import NewItem from "../new-item";

const ItemList = ({ cardId, items, onItemDone, onItemAdded }) => {
    const itemsList = items
        .filter(item => {
            return item.cardId === cardId;
        })
        .map(item => {
            return (
                <ItemListItem
                    item={item}
                    onItemDone={onItemDone}
                    key={item.id}
                />
            );
        });
    return (
        <div className="items-list">
            <NewItem onItemAdded={onItemAdded} cardId={cardId} />
            {itemsList}
        </div>
    );
};

export default ItemList;
