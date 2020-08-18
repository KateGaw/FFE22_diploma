import React, { useState, useEffect } from "react";

import moment from "moment";
import "moment/locale/ru";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";

import api from "../../../utils/api";
import Autocomplete from "react-autocomplete";

import { routePaths } from "../../../routePaths";
import { withRouter } from "react-router-dom";

import {
  addItem,
  countItems,
  getItemsArray,
} from "../../../utils/localStorage";

const HeaderTickets = (props) => {
  const storageLength = countItems();
  const storageArray = storageLength > 0 ? getItemsArray() : null;
  const [cityNamesFrom, setCityNamesFrom] = useState([]);
  const [cityNamesIn, setCityNamesIn] = useState([]);
  const [nameFrom, setNameFrom] = useState(
    storageArray !== null ? storageArray.name_from : ""
  );
  const [nameIn, setNameIn] = useState(
    storageArray !== null ? storageArray.name_in : ""
  );

  const [startDate, setStartDate] = useState(
    storageArray !== null && storageArray.date_start !== ''
      ? moment.utc(storageArray.date_start, "YYYY-MM-DD")._d
      : ""
  );
  const [endDate, setEndDate] = useState(
    storageArray !== null && storageArray.date_end_arrival !== ''
      ? moment.utc(storageArray.date_end_arrival, "YYYY-MM-DD")._d
      : ""
  );

  // Получаем списки городов в зависимости от набранного слова
  useEffect(() => {
    if (nameFrom !== "") {
      api.getCityNames(nameFrom, setCityNamesFrom);
    } else {
      setCityNamesFrom([]);
    }
    if (nameIn !== "") {
      api.getCityNames(nameIn, setCityNamesIn);
    } else {
      setCityNamesIn([]);
    }
  }, [nameFrom, nameIn]);

  // при выборе города "откуда"
  const onSelectFromHandler = (value) => {
    setNameFrom(value);
  };

  // при выборе города "куда"
  const onSelectInHandler = (value) => {
    setNameIn(value);
  };

  // сменить направление
  const reverseClickHandler = () => {
    const from = nameFrom;
    setNameFrom(nameIn);
    setNameIn(from);
  };

  // кнопка "найти билеты"
  const findClickHandler = () => {
    if (nameFrom !== "" && nameIn !== "") {
      addItem("name_from", nameFrom);
      addItem("name_in", nameIn);
      addItem(
        "date_start",
        startDate !== ""
          ? moment.utc(startDate).add(1, "day").format("YYYY-MM-DD")
          : ""
      );
      addItem(
        "date_end_arrival",
        endDate !== ""
          ? moment.utc(endDate).add(1, "day").format("YYYY-MM-DD")
          : ""
      );
      addItem("from_city_id", cityNamesFrom[0]._id);
      addItem("to_city_id", cityNamesIn[0]._id);
      addItem("start_departure_hour_from", 0);
      addItem("start_departure_hour_to", 23);
      addItem("start_arrival_hour_from", 0);
      addItem("start_arrival_hour_to", 23);
      addItem("end_departure_hour_from", 0);
      addItem("end_departure_hour_to", 23);
      addItem("end_arrival_hour_from", 0);
      addItem("end_arrival_hour_to", 23);
      addItem("have_first_class", false);
      addItem("have_second_class", false);
      addItem("have_third_class", false);
      addItem("have_fourth_class", false);
      addItem("have_wifi", false);
      addItem("have_express", false);
      addItem("price_from", 500);
      addItem("price_to", 7000);
      addItem("limit", 5);
      addItem("sort", "date");
      addItem("offset", 0);

      if (props.history.location.pathname === "/ticket") {
        window.location.reload();
      }
      props.history.push(routePaths.TicketPage);
    }
  };

  return (
    <div className="header_tickets">
      <div>
        <h2 className="direction">Направление</h2>
        <div className="autocomplete_city_names">
          <Autocomplete
            inputProps={{ placeholder: "Откуда" }}
            getItemValue={(item) => item.name}
            items={cityNamesFrom}
            renderItem={(item) => <div key={item.id}>{item.name}</div>}
            value={nameFrom}
            onChange={(event) => setNameFrom(event.target.value)}
            onSelect={onSelectFromHandler}
          />

          <span
            role="img"
            aria-label="reverse"
            className="changeCity"
            onClick={reverseClickHandler}
          >
            🔄
          </span>

          <Autocomplete
            inputProps={{ placeholder: "Куда" }}
            getItemValue={(item) => item.name}
            items={cityNamesIn}
            renderItem={(item) => <div key={item.id}>{item.name}</div>}
            value={nameIn}
            onChange={(event) => setNameIn(event.target.value)}
            onSelect={onSelectInHandler}
          />
        </div>
      </div>

      <div>
        <h2 className="date">Дата</h2>
        <div className="datePicker_tickets_date">
          <DatePicker
            locale={ru}
            placeholderText="ДД.ММ.ГГГГ"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            closeOnScroll={(e) => e.target === document}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            maxDate={new Date("2018-12-31")}
            dateFormat="dd.MM.yyyy"
          />
          <DatePicker
            locale={ru}
            placeholderText="ДД.ММ.ГГГГ"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            closeOnScroll={(e) => e.target === document}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="dd.MM.yyyy"
          />
        </div>
      </div>

      <button className="findTickets button_orange" onClick={findClickHandler}>
        Найти билеты
      </button>
    </div>
  );
};

export default withRouter(HeaderTickets);
