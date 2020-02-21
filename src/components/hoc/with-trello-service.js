import React from "react";
import { TrelloserviceConsumer } from "../trello-service-context";

const withTrelloService = Wrapped => {
  return props => {
    return (
      <TrelloserviceConsumer>
        {trelloService => {
          return <Wrapped {...props} trelloService={trelloService} />;
        }}
      </TrelloserviceConsumer>
    );
  };
};

export default withTrelloService;
