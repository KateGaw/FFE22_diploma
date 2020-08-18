import React, { useEffect, useState } from "react";
import TicketsFilter from "../elements/TicketPage/TicketsFilter";
import LastTickets from "../elements/LastTickets";
import Preloader from "../elements/Preloader";
import TicketsList from "../elements/TicketPage/TicketsList";

import { withRouter } from "react-router-dom";
import api from "../../utils/api";
import ProgressBar from "../elements/ProgressBar";

import { getItemsArray } from "../../utils/localStorage";

const TicketPage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [info, setInfo] = useState(getItemsArray());

  // Получаем карточки поездов
  useEffect(() => {
    api.getRoutes(info, setResults, setIsLoading);
  }, [info]);

  return isLoading ? (
    <Preloader />
  ) : (
    <>
      <ProgressBar />
      <div className="tickets_main">
      <div>
          <TicketsFilter setInfoPage={setInfo} />
          <LastTickets />
        </div>
        <TicketsList info={info} setInfo={setInfo} results={results} />
        <div className="ticket_last-tickets"></div>
      </div>
    </>
  );
};

export default withRouter(TicketPage);
