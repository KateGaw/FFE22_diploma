import React, { useState, useEffect } from "react";

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
    storageArray !== null && storageArray.date_start !== ""
      ? new Date(storageArray.date_start)
      : ""
  );
  const [endDate, setEndDate] = useState(
    storageArray !== null && storageArray.date_end_arrival !== ""
      ? new Date(storageArray.date_end_arrival)
      : ""
  );

  const [errorMessage, setErrorMessage] = useState(null);

  // Получаем списки городов в зависимости от набранного слова
  useEffect(() => {
    if (nameFrom !== "") {
      api.getCityNames(nameFrom, setCityNamesFrom, setErrorMessage);
    } else {
      setCityNamesFrom([]);
    }
    if (nameIn !== "") {
      api.getCityNames(nameIn, setCityNamesIn, setErrorMessage);
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

  const [nameError, setNameError] = useState(false);
  // кнопка "найти билеты"
  const findClickHandler = () => {
    if (
      (nameFrom !== "" && nameIn !== "") ||
      cityNamesFrom[0] !== undefined ||
      cityNamesIn[0] !== undefined
    ) {
      setNameError(false);
      addItem("name_from", nameFrom);
      addItem("name_in", nameIn);
      addItem("date_start", startDate !== "" ? startDate : "");
      addItem("date_end_arrival", endDate !== "" ? endDate : "");
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
    } else {
      setNameError(true);
    }
  };

  return (
    <div className="header_tickets">
      {errorMessage === null ? (
        <>
          <div>
            <h2 className="direction">Направление</h2>
            <div
              className={
                !nameError
                  ? "autocomplete_city_names"
                  : "autocomplete_city_names error_autocomplete"
              }
            >
              <Autocomplete
                inputProps={{ placeholder: "Откуда" }}
                getItemValue={(item) => item.name}
                items={cityNamesFrom}
                renderItem={(item) => <div key={item._id}>{item.name}</div>}
                value={nameFrom}
                onChange={(event) => {
                  setNameFrom(event.target.value);
                  setNameError(false);
                }}
                onSelect={onSelectFromHandler}
                autoHighlight={true}
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
                renderItem={(item) => <div key={item._id}>{item.name}</div>}
                value={nameIn}
                onChange={(event) => {
                  setNameIn(event.target.value);
                  setNameError(false);
                }}
                onSelect={onSelectInHandler}
                autoHighlight={true}
              />
              {nameError && (
                <p className="name_error_message">
                  Пожалуйста, выберите названия городов из списка.
                </p>
              )}
            </div>
          </div>

          <div>
            <h2 className="date">Дата</h2>
            <div className="datePicker_tickets_date">
              <DatePicker
                locale={ru}
                placeholderText="ДД.ММ.ГГГГ"
                selected={startDate}
                onChange={(date) => date !== null && setStartDate(date)}
                closeOnScroll={(e) => e.target === document}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date("2018-09-01")}
                maxDate={new Date("2018-12-31")}
                dateFormat="dd.MM.yyyy"
              />
              <DatePicker
                locale={ru}
                placeholderText="ДД.ММ.ГГГГ"
                selected={endDate}
                onChange={(date) => {
                  date !== null && setEndDate(date);
                }}
                closeOnScroll={(e) => e.target === document}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="dd.MM.yyyy"
              />
            </div>
          </div>

          <button
            className="findTickets button_orange"
            onClick={findClickHandler}
          >
            Найти билеты
          </button>
        </>
      ) : (
        <div className="header_error_message">{errorMessage}</div>
      )}
    </div>
  );
};

export default withRouter(HeaderTickets);
