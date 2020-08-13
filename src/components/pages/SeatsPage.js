import React, { useState } from "react";
import TicketsFilter from "../elements/TicketPage/TicketsFilter";

import { withRouter } from "react-router-dom";
import { routePaths } from "../../routePaths";
import ProgressBar from "../elements/ProgressBar";

import { getItemsArray } from "../../utils/localStorage";
import TrainTicket from "../elements/SeatPage/TrainTicket";

const TicketPage = (props) => {
  const [info, setInfo] = useState(getItemsArray());
  const result = JSON.parse(info.ticket_data);
  const anotherTrain = () => {
    props.history.push(routePaths.TicketPage);
  }

  return (
    <>
      <ProgressBar />
      <div className="tickets_main">
        <TicketsFilter setInfoPage={setInfo} />
        <TrainTicket result={result} anotherTrainClickHandler={anotherTrain}/>
        <div className="ticket_last-tickets"></div>
      </div>
    </>
  );
};

export default withRouter(TicketPage);
