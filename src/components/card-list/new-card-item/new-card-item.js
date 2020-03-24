import React from "react";
import "./new-card-item.css";

class NewCardItem extends React.Component {
    state = {
        cardCreatingState: false,
        newCardName: ""
    };

    componentDidUpdate() {
        if (this.state.cardCreatingState) {
            this.nameInput.focus();
        }
    }

    changeCardCreatingState = () => {
        this.setState(({ cardCreatingState }) => {
            return {
                cardCreatingState: !cardCreatingState,
                newCardName: ""
            };
        });
    };

    onCardNameChange = name => {
        this.setState(() => {
            return {
                newCardName: name
            };
        });
    };

    render = () => {
        const { onCardAdded, deskId } = this.props;
        const { cardCreatingState, newCardName } = this.state;
        const newCard = cardCreatingState ? (
            <div
                className={
                    "new-card-item card " + (cardCreatingState ? "active" : "")
                }
            >
                <span className="new-card-item__description">
                    Create new list...
                </span>
                <form
                    className="new-card-item__form"
                    onSubmit={e => {
                        e.preventDefault();
                        this.changeCardCreatingState();
                        onCardAdded(newCardName, deskId);
                    }}
                >
                    <input
                        type="text"
                        name="card-title"
                        id="card-title"
                        value={newCardName}
                        className="text-input"
                        placeholder="Card title"
                        required
                        onChange={e => this.onCardNameChange(e.target.value)}
                        ref={input => {
                            this.nameInput = input;
                        }}
                    />
                </form>
                <i
                    className="fas fa-times-circle cancel-icon"
                    onClick={this.changeCardCreatingState}
                ></i>
            </div>
        ) : (
            <button
                className="new-card-item card"
                onClick={this.changeCardCreatingState}
            >
                Create new list...
            </button>
        );
        return newCard;
    };
}

export default NewCardItem;
