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
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const anotherTrain = () => {
    props.history.push(routePaths.TicketPage);
  };

  // на следующую страницу
  const nextPageClickHandler = () => {
    props.history.push(routePaths.PassengersPage);
  };

  return (
    <>
      <ProgressBar />
      <div className="tickets_main">
        <div>
          <TicketsFilter setInfoPage={setInfo} disabled={true} />
          <LastTickets />
        </div>
        <div>
          <TrainTicket
            id="departure"
            result={result.departure}
            anotherTrainClickHandler={anotherTrain}
            disabled={setButtonDisabled}
          />
          {result.arrival && (
            <TrainTicket
              id="arrival"
              result={result.arrival}
              anotherTrainClickHandler={anotherTrain}
              disabled={setButtonDisabled}
            />
          )}
          <button
            className="button_orange passengers_next_btn"
            onClick={nextPageClickHandler}
            disabled={buttonDisabled}
          >
            Далее
          </button>
        </div>
      </div>
    </>
  );
};

export default withRouter(TicketPage);
