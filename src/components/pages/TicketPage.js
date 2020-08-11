import React, { useEffect, useState } from "react";
import TicketsFilter from "../elements/TicketPage/TicketsFilter";
import TicketCard from "../elements/TicketPage/TicketCard";
import Preloader from "../elements/Preloader";

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
  });

  const sortValues = [
    { id: "date", value: "дате" },
    { id: "price_min", value: "цене" },
    { id: "duration", value: "продолжительности" },
  ];

  const [choosenLimit, setChoosenLimit] = useState(5);
  const limits = [{ value: 5 }, { value: 10 }, { value: 15 }];

  // Получаем карточки поездов
  useEffect(() => {
    // console.log(info);
    api.getRoutes(info, setResults);
  }, [info]);

  const handleChange = (event) => {
    console.log(event.target.value);
    setInfo({
      ...info,
      sort: event.target.value,
    });
  };

  const handleClickNumber = (event) => {
    setChoosenLimit(event.target.id);
    setInfo({
      ...info,
      limit: event.target.id,
    });
  };

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

      {results === [] ? (
        <Preloader />
      ) : (
        <div className="tickets_main">
          <TicketsFilter info={info} setInfo={setInfo} />
          {results.total_count > 0 ? (
            <div className="ticket_cards">
              <div className="tickets_top_filters">
                <div className="find_items">найдено {results.total_count}</div>
                <div className="filters_top_right">
                  <div className="sort_items">
                    сортировать по:
                    <select value={info.sort} onChange={handleChange}>
                      {sortValues.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.value}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="show_items">
                    <p>показывать по:</p>
                    {limits.map((item) => (
                      <p
                        key={item.value}
                        id={item.value}
                        className={
                          Number(choosenLimit) === item.value
                            ? "show_items__number active"
                            : "show_items__number"
                        }
                        onClick={handleClickNumber}
                      >
                        {item.value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              {results.items.map((item, index) => (
                <TicketCard key={index} data={item} />
              ))}
            </div>
          ) : (
            <div>NotFound</div>
          )}

          <div className="ticket_last-tickets"></div>
        </div>
      )}
    </>
  );
};

export default withRouter(TicketPage);
