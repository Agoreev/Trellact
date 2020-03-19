import React, { Component } from "react";
import "./new-item.css";

class NewItem extends Component {
    state = {
        newItemName: ""
    };

    componentDidMount() {
        this.nameInput.focus();
    }

    onItemEnter = () => {
        this.setState({
            newItemName: ""
        });
    };

    onItemNameChange = name => {
        this.setState({
            newItemName: name
        });
    };

    render() {
        const { onItemAdded, cardId } = this.props;
        const { newItemName } = this.state;
        return (
            <div className="new-item">
                <form
                    className="new-item__form"
                    onSubmit={e => {
                        e.preventDefault();
                        this.onItemEnter();
                        onItemAdded(newItemName, cardId);
                    }}
                >
                    <input
                        type="text"
                        name="item-title"
                        id="item-title"
                        value={newItemName}
                        className="text-input"
                        placeholder="Add new..."
                        required
                        onChange={e => this.onItemNameChange(e.target.value)}
                        ref={input => {
                            this.nameInput = input;
                        }}
                    />
                </form>
            </div>
        );
    }
}

export default NewItem;
