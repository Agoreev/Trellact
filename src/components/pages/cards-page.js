import React from "react";
import CardListContainer from "../card-list";
import { withRouter, Link } from "react-router-dom";

const CardsPage = ({ match }) => {
    return (
        <div className="cards-page">
            <Link to="/" className="back-link">
                <i className="fas fa-arrow-left"></i>
                <span className="back-link__text">Back</span>
            </Link>

            <CardListContainer deskId={match.params.id} />
        </div>
    );
};

export default withRouter(CardsPage);
