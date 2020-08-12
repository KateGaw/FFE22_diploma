import React, { useEffect, useState } from "react";
import TicketsFilter from "../elements/TicketPage/TicketsFilter";
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
  // console.log(info);

  // Получаем карточки поездов
  useEffect(() => {
    console.log('search!!!');
    api.getRoutes(info, setResults, setIsLoading);
  }, [info]);

  // useEffect(() => {
  //     // setInfo(getItemsArray());
  // });

  return isLoading ? (
    <Preloader />
  ) : (
    <>
      <ProgressBar />
      <div className="tickets_main">
        <TicketsFilter setInfoPage={setInfo} />
        <TicketsList info={info} setInfo={setInfo} results={results} />
        <div className="ticket_last-tickets"></div>
      </div>
    </>
  );
};

export default withRouter(TicketPage);
