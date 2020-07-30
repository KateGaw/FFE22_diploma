import React, { useState, useEffect } from "react";

import moment from "moment";
import "moment/locale/ru";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";

import api from "../../utils/api";
import Autocomplete from "react-autocomplete";

import { routePaths } from "../../routePaths";
import { withRouter } from "react-router-dom";

const HeaderTickets = (props) => {
  const [cityNamesFrom, setCityNamesFrom] = useState([]);
  const [cityNamesIn, setCityNamesIn] = useState([]);
  const [nameFrom, setNameFrom] = useState("");
  const [nameIn, setNameIn] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
    if (
      nameFrom !== "" &&
      nameIn !== "" &&
      startDate !== "" &&
      endDate !== ""
    ) {
      props.history.push({
        pathname: routePaths.TicketPage,
        state: {
          data: {
            name_from: nameFrom,
            name_in: nameIn,
            date_from: moment(startDate).format("DD.MM.YYYY"),
            date_in: moment(endDate).format("DD.MM.YYYY"),
          },
        },
      });
    }
  };

  return (
    <div className="header_tickets">
      <h2>Направление</h2>
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

      <h2>Дата</h2>
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
          minDate={new Date()}
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

      <button className="findTickets button_orange" onClick={findClickHandler}>
        Найти билеты
      </button>
    </div>
  );
};

export default withRouter(HeaderTickets);
