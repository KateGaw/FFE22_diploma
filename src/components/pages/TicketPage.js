import React, { useEffect, useState } from "react";
import TicketsFilter from "../elements/TicketPage/TicketsFilter";
import Preloader from "../elements/Preloader";
import TicketsList from "../elements/TicketPage/TicketsList";

import { withRouter } from "react-router-dom";
import api from "../../utils/api";
import ProgressBar from "../elements/ProgressBar";

const TicketPage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [info, setInfo] = useState({
    from_city_id: props.history.location.state.data.from_id,
    to_city_id: props.history.location.state.data.in_id,
    date_start: props.history.location.state.data.date_from,
    date_end: props.history.location.state.data.date_in,
    start_departure_hour_from: 0,
    start_departure_hour_to: 23,
    start_arrival_hour_from: 0,
    start_arrival_hour_to: 23,
    end_departure_hour_from: 0,
    end_departure_hour_to: 23,
    end_arrival_hour_from: 0,
    end_arrival_hour_to: 23,
    have_first_class: false,
    have_second_class: false,
    have_third_class: false,
    have_fourth_class: false,
    have_wifi: false,
    have_express: false,
    price_from: 500,
    price_to: 7000,
    limit: 5,
    sort: "date",
    offset: 0,
  });

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
        <TicketsFilter info={info} setInfo={setInfo} />
        <TicketsList info={info} setInfo={setInfo} results={results} />
        <div className="ticket_last-tickets"></div>
      </div>
    </>
  );
};

export default withRouter(TicketPage);
