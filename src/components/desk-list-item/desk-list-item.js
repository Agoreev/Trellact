import "./desk-list-item.css";
import React from "react";
import { Link } from "react-router-dom";

const DeskListItem = ({ desk }) => {
  const { id, name } = desk;
  return (
    <Link className="desk-link" to={`/desks/${id}`}>
      <div className="desk" key={id}>
        <span className="desk__title">{name}</span>
      </div>
    </Link>
  );
};

export default DeskListItem;
