import React, { useState } from "react";
import { MoneyFormat } from "../MoneyFormat";
import { shortTimeValue } from "../SeatPage/timeHandler";
import moment from "moment";

const DirectionTimes = ({ id, _name, name, arrow, data }) => {
  const [expandSrc, setExpandSrc] = useState(
    "assets/filters_icons/roll_up.svg"
  );
  const [hidden, setHidden] = useState(false);

  const start_date =
    _name === "direction" ? moment.unix(data.from.datetime).utc().format() : ""; // время отбытия
  const end_date =
    _name === "direction" ? moment.unix(data.to.datetime).utc().format() : ""; //время прибытия
  const time = shortTimeValue(start_date, end_date); //часов в дороге

  const handleExpand = () => {
    setHidden(hidden ? false : true);
    setExpandSrc(
      hidden
        ? "assets/filters_icons/roll_up.svg"
        : "assets/filters_icons/expand.svg"
    );
  };

  const child =
    parseInt(data.child_passengers) === 1
      ? "Ребенок"
      : parseInt(data.child_passengers) > 1 &&
        parseInt(data.child_passengers) < 5
      ? "Ребенка"
      : "Детей";

  const adult = parseInt(data.adult_passengers) === 1 ? "Взрослый" : "Взрослых";

  return _name === "direction" ? (
    <div className="filter_block">
      <div className="ticket_filter_header">
        <div className="text">
          <img src={`assets/filters_icons/${id}.svg`} alt={id} />
          <h4>{name}</h4>
          <p>{moment(start_date).format("DD.MM.YYYY")}</p>
        </div>
        <img
          className="toggleImg"
          id={id}
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
              <td className="train_number_td">{data.duration}</td>
            </tr>
            <tr>
              <td>Название</td>
              <td className="train_name_td">
                {data.train.name}
                <br />
                {data.city_to}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="data_time_block">
          <div className="arrow_time">
            {time.period_hours} : {time.period_minutes}
          </div>
          <div className="time_block">
            <p>{moment(start_date).format("HH:mm")}</p>
            <img src={`assets/train_cards/${arrow}.svg`} alt="arrow" />
            <p>{moment(end_date).format("HH:mm")}</p>
          </div>
          <div className="date_block">
            <p>{moment(start_date).format("DD.MM.YYYY")}</p>
            <p>{moment(end_date).format("DD.MM.YYYY")}</p>
          </div>
        </div>

        <div className="place_block">
          <div className="place_block__city">
            <p>{data.from.city_name}</p>
            <p>{data.to.city_name}</p>
          </div>
          <div className="place_block__station">
            <p>{data.from.railway_station_name} вокзал</p>
            <p>{data.to.railway_station_name} вокзал</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="filter_block">
      <div className="ticket_filter_header">
        <div className="text">
          <img src={`assets/filters_icons/${id}.svg`} alt={id} />
          <h4>{name}</h4>
        </div>
        <img
          className="toggleImg"
          id={id}
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
                {data.adult_passengers} {adult}
              </td>
              <td className="train_number_td">
                <MoneyFormat price={data.adult_price} />
              </td>
            </tr>
            <tr>
              <td>
                {data.child_passengers} {child}
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

const PassengersSideBar = ({ ticket_data, seats_departure }) => {
  return (
    <div className="ticket_filter passengers_sidebar">
      <div className="filter_block">
        <h3>Детали поездки</h3>
      </div>
      <DirectionTimes
        id="there"
        _name="direction"
        name="Туда"
        arrow="orange_arrow"
        data={ticket_data.departure}
      />

      {ticket_data.arrival && (
        <DirectionTimes
          id="back"
          _name="direction"
          name="Обратно"
          arrow="orange_arrow_back"
          data={ticket_data.arrival}
        />
      )}
      <DirectionTimes
        id="passengers"
        _name="passengers"
        name="Пассажиры"
        data={seats_departure}
      />
      <div className="passengers_sidebar__bottom filter_block">
        <h3>Итог</h3>
        <MoneyFormat
          classList="total_price"
          price={seats_departure.total_price}
        />
      </div>
    </div>
  );
};

export default PassengersSideBar;
