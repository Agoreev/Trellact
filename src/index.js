import ReactDom from "react-dom";
import React from "react";
import { TrelloserviceProvider } from "./components/trello-service-context";
import TrelloService from "./services/trello-service";
import ErrorBoundry from "./components/error-boundry";
import App from "./components/app";
import {BrowserRouter as Router} from "react-router-dom";

const trelloService = new TrelloService();

ReactDom.render(

    <ErrorBoundry>
        <TrelloserviceProvider value={trelloService}>
            <Router>
                <App />
            </Router>
        </TrelloserviceProvider>
    </ErrorBoundry>,

    document.getElementById("root")
  );
