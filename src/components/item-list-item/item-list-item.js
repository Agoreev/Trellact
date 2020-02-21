import React from "react";
import "./item-list-item.css";

const ItemListItem = ({ item, onItemDone }) => {
    return (
        <div
            className={item.state ? "item " + item.state : "item"}
            onClick={() => onItemDone(item)}
        >
            <span className="item__text">{item.name}</span>
            <span className="item__done-mark"></span>
        </div>
    );
};

export default ItemListItem;
