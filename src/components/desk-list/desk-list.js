import "./desk-list.css";
import React from "react";
import DeskListItem from "./desk-list-item";
import NewDeskItem from "./new-desk-item";
import DesksContext from "../desk-context";
import { useContext } from "react";

const DeskList = () => {
    const desksContext = useContext(DesksContext);
    const { desks, desksOrder, onDeskAdded } = desksContext;
    const desksList = desksOrder.map(deskId => {
        const desk = desks[deskId];
        return <DeskListItem key={deskId} desk={desk}></DeskListItem>;
    });
    return (
        <div className="desks-list">
            <NewDeskItem onDeskAdded={onDeskAdded} />
            {desksList}
        </div>
    );
};

export default DeskList;
