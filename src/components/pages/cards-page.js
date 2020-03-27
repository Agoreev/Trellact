import React, { useContext } from "react";
import CardList from "../card-list";
import { withRouter, Link } from "react-router-dom";
import ItemStatusFilter from "../item-status-filter";
import DeskContext from "../desk-context";
import "./cards-page.css";

const CardsPage = ({ match }) => {
    const deskContext = useContext(DeskContext);
    const { onChangeFilter, currentFilter } = deskContext;
    return (
        <div className="cards-page">
            <div className="page__header">
                <Link to="/" className="back-link">
                    <i className="fas fa-arrow-left"></i>
                    <span className="back-link__text">Back</span>
                </Link>
                <ItemStatusFilter
                    currentFilter={currentFilter}
                    onChangeFilter={onChangeFilter}
                />
            </div>

            <CardList deskId={match.params.id} />
        </div>
    );
};

export default withRouter(CardsPage);
