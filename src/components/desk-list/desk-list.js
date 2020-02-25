import "./desk-list.css";
import React from "react";
import DeskListItem from "../desk-list-item";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import { withTrelloService } from "../hoc";
import NewDeskItem from "../new-desk-item";

const DeskList = ({ desks, children }) => {
    const desksList = desks.map(desk => {
        return <DeskListItem key={desk.id} desk={desk}></DeskListItem>;
    });
    return (
        <div className="desks-list">
            {children}
            {desksList}
        </div>
    );
};

class DesksListContainer extends React.Component {
    state = {
        desks: [],
        loading: true,
        error: false
    };

    updateDesks = () => {
        this.props.trelloService.getDesks().then(
            data => {
                this.setState({
                    desks: data,
                    loading: false,
                    error: false
                });
            },
            error => {
                this.setState({
                    desks: [],
                    loading: false,
                    error: true
                });
            }
        );
    };
    onDeskAdded = deskName => {
        this.props.trelloService.createDesk(deskName).then(
            data => {
                this.setState({
                    desks: data
                });
            },
            error => {
                this.setState({
                    error: true
                });
            }
        );
    };
    componentDidMount() {
        this.updateDesks();
    }

    render() {
        const { desks, loading, error } = this.state;
        if (loading) {
            return <Spinner />;
        }
        if (error) {
            return <ErrorIndicator />;
        }
        return (
            <DeskList desks={desks}>
                <NewDeskItem onDeskAdded={this.onDeskAdded} />
            </DeskList>
        );
    }
}

export default withTrelloService(DesksListContainer);
