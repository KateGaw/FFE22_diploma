import React, { useState } from "react";
import { MoneyFormat } from "../MoneyFormat";

const DirectionTimes = ({ data }) => {
  const [expandSrc, setExpandSrc] = useState(
    "assets/filters_icons/roll_up.svg"
  );
  const [hidden, setHidden] = useState(false);

  const handleExpand = () => {
    setHidden(hidden ? false : true);
    setExpandSrc(
      hidden
        ? "assets/filters_icons/roll_up.svg"
        : "assets/filters_icons/expand.svg"
    );
  };

  const child =
    data.childs === 1
      ? "Ребенок"
      : data.childs > 1 && data.childs < 5
      ? "Ребенка"
      : "Детей";

  const adult = data.adults === 1 ? "Взрослый" : "Взрослых";

  return data._name === "direction" ? (
    <div className="filter_block">
      <div className="ticket_filter_header">
        <div className="text">
          <img src={`assets/filters_icons/${data.id}.svg`} alt={data.id} />
          <h4>{data.name}</h4>
          <p>{data.date_from}</p>
        </div>
        <img
          className="toggleImg"
          id={data.id}
          src={expandSrc}
          alt="expand"
          onClick={handleExpand}
        />
      </div>

      <div
        className={hidden ? "ticket_filter_main hidden" : "ticket_filter_main"}
      >
        <table className="train_table_block">
          <tbody>
            <tr>
              <td>№ Поезда</td>
              <td className="train_number_td">{data.train_number}</td>
            </tr>
            <tr>
              <td>Название</td>
              <td className="train_name_td">
                {data.train_name}
                <br />
                {data.city_to}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="data_time_block">
          <div className="arrow_time">{data.time_diff}</div>
          <div className="time_block">
            <p>{data.time_from}</p>
            <img src={`assets/train_cards/${data.arrow}.svg`} alt="arrow" />
            <p>{data.time_to}</p>
          </div>
          <div className="date_block">
            <p>{data.date_from}</p>
            <p>{data.date_to}</p>
          </div>
        </div>

        <div className="place_block">
          <div className="place_block__city">
            <p>{data.city_from}</p>
            <p>{data.city_to}</p>
          </div>
          <div className="place_block__station">
            <p>{data.station_from} вокзал</p>
            <p>{data.station_to} вокзал</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="filter_block">
      <div className="ticket_filter_header">
        <div className="text">
          <img src={`assets/filters_icons/${data.id}.svg`} alt={data.id} />
          <h4>{data.name}</h4>
        </div>
        <img
          className="toggleImg"
          id={data.id}
          src={expandSrc}
          alt="expand"
          onClick={handleExpand}
        />
      </div>
      <div
        className={hidden ? "ticket_filter_main hidden" : "ticket_filter_main"}
      >
        <table className="train_table_block">
          <tbody>
            <tr>
              <td>
                {data.adults} {adult}
              </td>
              <td className="train_number_td">
                <MoneyFormat price={data.adults_price} />
              </td>
            </tr>
            <tr>
              <td>
                {data.childs} {child}
              </td>
              <td className="train_number_td">
                <MoneyFormat price={data.child_price} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PassengersSideBar = (props) => {
  const from = {
    id: "there",
    _name: "direction",
    name: "Туда",
    train_number: "116С",
    train_name: "Адлер",
    date_from: "30.08.2018",
    time_from: "00:10",
    time_diff: "9 : 42",
    arrow: "orange_arrow",
    date_to: "31.08.2018",
    time_to: "09:52",
    city_from: "Москва",
    station_from: "Курский",
    city_to: "Санкт-Петербург",
    station_to: "Ладожский",
  };
  const back = {
    id: "back",
    _name: "direction",
    name: "Обратно",
    train_number: "116С",
    train_name: "Адлер",
    date_from: "09.09.2018",
    time_from: "00:10",
    time_diff: "9 : 42",
    arrow: "orange_arrow_back",
    date_to: "31.08.2018",
    time_to: "09:52",
    city_from: "Москва",
    station_from: "Курский",
    city_to: "Санкт-Петербург",
    station_to: "Ладожский",
  };
  const passengers = {
    id: "passengers",
    _name: "passengers",
    name: "Пассажиры",
    adults: 1,
    adults_price: 5840,
    childs: 5,
    child_price: 1920,
  };
  const total_price = 7760;
  return (
    <div className="ticket_filter passengers_sidebar">
      <div className="filter_block">
        <h3>Детали поездки</h3>
      </div>
      <DirectionTimes data={from} />
      <DirectionTimes data={back} />
      <DirectionTimes data={passengers} />
      <div className="passengers_sidebar__bottom filter_block">
        <h3>Итог</h3>
        <MoneyFormat classList="total_price" price={total_price} />
      </div>
    </div>
  );
};

export default PassengersSideBar;
