import React from "react";
import "./new-desk-item.css";
import { withTrelloService } from "../hoc";


class NewDeskItem extends React.Component {
  state = {
    deskCreatingState: false,
    newDeskName: ""
  };

  changeDeskCreatingState = () => {
    this.setState(({ deskCreatingState }) => {
      return {
        deskCreatingState: !deskCreatingState,
        newDeskName: ""
      };
    });
  };

  onDeskNameChange = name => {
    this.setState(() => {
      return {
        newDeskName: name
      };
    });
  };

  render = () => {
    const { onDeskAdded } = this.props;
    const { deskCreatingState, newDeskName } = this.state;
    const newDesk = deskCreatingState ? (
      <div
        className={"new-desk-item desk " + (deskCreatingState ? "active" : "")}
      >
        <span className="new-desk-item__description">Create new desk...</span>
        <form
          className="new-desk-item__form"
          onSubmit={e => {
            e.preventDefault();
            this.changeDeskCreatingState();
            onDeskAdded(newDeskName);
          }}
        >
          <div className="form__group">
            <input
              type="text"
              name="desk-title"
              id="desk-title"
              value={newDeskName}
              className="form__field"
              placeholder="Desk title"
              required
              onChange={e => this.onDeskNameChange(e.target.value)}
            />
            <label htmlFor="desk-title" className="form__label">
              Desk title
            </label>
          </div>
          <div className="new-desk-item__controls">
            <button
              className="btn btn_cancel"
              onClick={() => this.changeDeskCreatingState()}
            >
              cancel
            </button>
            <button className="btn btn_confirm" type="submit">
              create
            </button>
          </div>
        </form>
      </div>
    ) : (
      <button
        className="new-desk-item desk"
        onClick={() => this.changeDeskCreatingState()}
      >
        Create new desk...
      </button>
    );
    return newDesk;
  };
}

export default withTrelloService(NewDeskItem);
