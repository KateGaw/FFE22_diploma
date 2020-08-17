import React, { useState } from "react";
import TicketsFilter from "../elements/TicketPage/TicketsFilter";
import LastTickets from "../elements/LastTickets";

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
      <div>
          <TicketsFilter setInfoPage={setInfo} />
          <LastTickets />
        </div>
        <TrainTicket result={result} anotherTrainClickHandler={anotherTrain}/>
        <div className="ticket_last-tickets"></div>
      </div>
    </>
  );
};

export default withRouter(TicketPage);
