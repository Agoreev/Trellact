import React from "react";
import "./card-list.css";
import CardListItem from "../card-list-item";
import { withTrelloService } from "../hoc";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

const CardList = ({ data, onItemDone }) => {
    const { cards } = data;
    const cardsList = cards.map(card => {
        return (
            <CardListItem
                key={card.id}
                cardId={card.id}
                name={card.name}
                items={data.items}
                onItemDone={onItemDone}
            ></CardListItem>
        );
    });
    return (
        <React.Fragment>
            <div className="cards-list__desk-title">{data.desk}</div>
            <div className="cards-list">{cardsList}</div>
        </React.Fragment>
    );
};

class CardListContainer extends React.Component {
    state = {
        data: {},
        loading: true,
        error: false
    };

    updateDesk = deskId => {
        this.props.trelloService.getDesk(deskId).then(
            data => {
                this.setState({
                    data: data,
                    loading: false,
                    error: false
                });
            },
            error => {
                this.setState({
                    data: {},
                    loading: false,
                    error: true
                });
            }
        );
    };

    onItemDone = item => {
        this.props.trelloService.setItemState(item).then(
            newItem => {
                const { items } = this.state.data;
                const itemIdx = items.findIndex(itm => {
                    return itm.id === item.id;
                });
                this.setState({
                    data: {
                        ...this.state.data,
                        items: [
                            ...items.slice(0, itemIdx),
                            newItem,
                            ...items.slice(itemIdx + 1)
                        ]
                    }
                });
            },
            error => {
                this.setState({
                    data: {},
                    error: error
                });
            }
        );
    };

    componentDidMount() {
        const deskId = this.props.deskId;
        this.updateDesk(deskId);
    }

    render() {
        const { data, loading, error } = this.state;
        if (loading) {
            return <Spinner />;
        }
        if (error) {
            return <ErrorIndicator />;
        }
        return <CardList data={data} onItemDone={this.onItemDone} />;
    }
}

export default withTrelloService(CardListContainer);
