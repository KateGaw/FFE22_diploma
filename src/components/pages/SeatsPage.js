import React, { useState, useEffect } from "react";
import TicketsFilter from "../elements/TicketPage/TicketsFilter";
import LastTickets from "../elements/LastTickets";

import { withRouter } from "react-router-dom";
import { routePaths } from "../../routePaths";
import api from "../../utils/api";
import ProgressBar from "../elements/ProgressBar";

import { getItemsArray } from "../../utils/localStorage";
import TrainTicket from "../elements/SeatPage/TrainTicket";
import Preloader from "../elements/Preloader";

const TicketPage = (props) => {
  const [info, setInfo] = useState(getItemsArray());
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [seatsInfo, setSeatsInfo] = useState([]);
  const result = JSON.parse(info.ticket_data);
  const anotherTrain = () => {
    props.history.push(routePaths.TicketPage);
  };

  // Получаем данные по местам и вагонам в выбранном поезде
  useEffect(() => {
    api.getRoutesSeats(
      result.departure._id,
      setSeatsInfo,
      setErrorMessage,
      setIsLoading
    );
  }, [result]);

  return (
    <>
      <ProgressBar />
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="tickets_main">
          {errorMessage === null ? (
            <>
              <div>
                <TicketsFilter setInfoPage={setInfo} />
                <LastTickets />
              </div>
              <TrainTicket
                result={result}
                anotherTrainClickHandler={anotherTrain}
                seatsInfo={seatsInfo}
              />
            </>
          ) : (
            <div className="ticket_error_message">{errorMessage}</div>
          )}
        </div>
      )}
    </>
  );
};

export default withRouter(TicketPage);
