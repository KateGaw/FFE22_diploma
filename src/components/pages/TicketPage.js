import React, { useEffect, useState } from "react";
import TicketsFilter from "../elements/TicketPage/TicketsFilter";
import TicketCard from "../elements/TicketPage/TicketCard";

import { withRouter } from "react-router-dom";
import api from "../../utils/api";

const ArrowBlock = () => {
  return (
    <div className="arrow-2">
      <div className="arrow-2-top"></div>
      <div className="arrow-2-bottom"></div>
    </div>
  );
};

const TicketPage = (props) => {
  const [results, setResults] = useState([]);

  console.log(props.history.location.state.data.date_from);

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
    end_arrival_hour_to: 0,
    have_first_class: false,
    have_second_class: false,
    have_third_class: false,
    have_fourth_class: false,
    have_wifi: false,
    have_express: false,
    price_from: 500,
    price_to: 7000,
    limit: 5,
    sort: 'date',
  });

  // Получаем карточки поездов
  useEffect(() => {
    // console.log(info);
    api.getRoutes(info, setResults);
  }, [info]);

  return (
    <>
      <div className="ticket_line">
        <div className="ticket_line__block first done">
          <img
            src="/assets/line_assets/one.png"
            alt="one"
            className="line_number"
          />
          <p>Билеты</p>
          <ArrowBlock />
        </div>
        <div className="ticket_line__block second">
          <img
            src="/assets/line_assets/two.png"
            alt="two"
            className="line_number"
          />
          <p>Пассажиры</p>

          <ArrowBlock />
        </div>
        <div className="ticket_line__block third">
          <img
            src="/assets/line_assets/three.png"
            alt="three"
            className="line_number"
          />
          <p>Оплата</p>
          <ArrowBlock />
        </div>
        <div className="ticket_line__block fourth">
          <img
            src="/assets/line_assets/four.png"
            alt="four"
            className="line_number"
          />
          <p>Проверка</p>
        </div>
      </div>

      <div className="tickets_main">
        <TicketsFilter info={info} setInfo={setInfo} />

        {results.total_count > 0 ? (
          <div className="ticket_cards">
            <div>Найдено: {results.total_count}</div>
            {results.items.map((item, index) => (
              <TicketCard key={index} data={item} />
            ))}
          </div>
        ) : (
          <div>NotFound</div>
        )}

        <div className="ticket_last-tickets"></div>
      </div>
    </>
  );
};

export default withRouter(TicketPage);
