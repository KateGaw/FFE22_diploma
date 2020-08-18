import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";

import Switch from "react-switch";
import { useRanger } from "react-ranger";
import styled from "styled-components";

import { addItem, getItemsArray } from "../../../utils/localStorage";

const SwitchButton = (props) => {
  const [checked, setChecked] = useState(props.value);
  const handleChange = (value) => {
    setChecked(value);
    // eslint-disable-next-line
    props.switch_filters.map((item) => {
      if (item.id === props.id) {
        item.value = value;
        props.output(item.id, value);
      }
    });
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      onColor="#FCDC9D"
      offColor="#FFFFFF"
      onHandleColor="#FFA800"
      offHandleColor="#C4C4C4"
      handleDiameter={28}
      uncheckedIcon={false}
      checkedIcon={false}
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
      height={20}
      width={70}
      className="react_switch"
      id={props.id}
    />
  );
};

const RangeSlider = (props) => {
  const values = props.current;

  const { getTrackProps, segments, handles } = useRanger({
    min: props.min,
    max: props.max,
    stepSize: props.step,
    values,
    onChange: props.changeCurrent,
  });
  const Segment = styled("div")`
    background: ${(props) => (props.index === 1 ? "#FFA800" : "#3E3C41")};
    height: 100%;
    border-radius: 8px;
  `;

  return (
    <>
      <div
        {...getTrackProps({
          className: "rangeClass",
        })}
      >
        {segments.map(({ getSegmentProps }, i) => (
          <Segment {...getSegmentProps()} index={i} />
        ))}
        {handles.map(({ getHandleProps }) => (
          <div
            {...getHandleProps({
              className: "rangeClass__handles",
            })}
          ></div>
        ))}
      </div>
    </>
  );
};

const DirectionTimes = (props) => {
  const [expandSrc, setExpandSrc] = useState("assets/filters_icons/expand.svg");
  const [hidden, setHidden] = useState(true);

  const handleExpand = () => {
    setHidden(hidden ? false : true);
    setExpandSrc(
      hidden
        ? "assets/filters_icons/roll_up.svg"
        : "assets/filters_icons/expand.svg"
    );
  };

  return (
    <div className="ticket_filter__direction filter_block">
      <div className="ticket_filter_header">
        <div className="text">
          <img src={`assets/filters_icons/${props.id}.svg`} alt={props.id} />
          <h4>{props.name}</h4>
        </div>
        <img
          id={props.id}
          src={expandSrc}
          alt="expand"
          onClick={handleExpand}
        />
      </div>

      <div
        className={hidden ? "ticket_filter_main hidden" : "ticket_filter_main"}
      >
        <div className="departure">
          <h4 className="departure_time">Время отбытия</h4>
          <RangeSlider
            min={0}
            max={24}
            current={props.departureTime}
            changeCurrent={props.setDepartureTime}
            step={1}
          />
          <div className="current">
            <p className="from">{`${props.departureTime[0]}:00`}</p>
            <p className="to">{`${props.departureTime[1]}:00`}</p>
          </div>
        </div>
        <div className="arrival">
          <h4 className="arrival_time">Время прибытия</h4>
          <RangeSlider
            min={0}
            max={24}
            current={props.arrivalTime}
            changeCurrent={props.setArrivalTime}
            step={1}
          />
          <div className="current">
            <p className="from">{`${props.arrivalTime[0]}:00`}</p>
            <p className="to">{`${props.arrivalTime[1]}:00`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TicketFilter = (props) => {
  const [info, setInfo] = useState(getItemsArray());

  const switch_filters = [
    { id: "have_second_class", name: "Купе", value: info.have_second_class === 'true' ? true : false },
    { id: "have_third_class", name: "Плацкарт", value: info.have_third_class === 'true' ? true : false },
    { id: "have_fourth_class", name: "Сидячий", value: info.have_fourth_class === 'true' ? true : false },
    { id: "have_first_class", name: "Люкс", value: info.have_first_class === 'true' ? true : false },
    { id: "have_wifi", name: "Wi-Fi", value: info.have_wifi === 'true' ? true : false },
    { id: "have_express", name: "Экспресс", value: info.have_express === 'true' ? true : false },
  ];

  const setSwitchValue = (id, value) => {
    switch (id) {
      case "have_first_class": {
        changeItem("have_first_class", value);
        break;
      }
      case "have_second_class": {
        changeItem("have_second_class", value);
        break;
      }
      case "have_third_class": {
        changeItem("have_third_class", value);
        break;
      }
      case "have_fourth_class": {
        changeItem("have_fourth_class", value);
        break;
      }
      case "have_wifi": {
        changeItem("have_wifi", value);
        break;
      }
      case "have_express": {
        changeItem("have_express", value);
        break;
      }
      default:
        break;
    }
  };

  const changeItem = (key, value) => {
    addItem(key, value);
    setInfo(getItemsArray());
    props.setInfoPage(getItemsArray());
  };

  let date_start = info.date_start !== "" ? new Date(info.date_start) : "";
  let date_end_arrival = info.date_end_arrival !== "" ? new Date(info.date_end_arrival) : "";

  return (
    <div className="ticket_filter">
      <div className="ticket_filter__date filter_block">
        <h4>Дата поездки</h4>
        <DatePicker
          locale={ru}
          placeholderText="ДД.ММ.ГГГГ"
          selected={date_start}
          onChange={(date) => changeItem("date_start", date)}
          closeOnScroll={(e) => e.target === document}
          selectsStart
          startDate={date_start}
          endDate={date_end_arrival}
          maxDate={new Date("2018-12-31")}
          dateFormat="dd.MM.yyyy"
        />

        <h4 className="date_h4">Дата возвращения</h4>
        <DatePicker
          locale={ru}
          placeholderText="ДД.ММ.ГГГГ"
          selected={date_end_arrival}
          onChange={(date) => changeItem("date_end_arrival", date)}
          closeOnScroll={(e) => e.target === document}
          selectsEnd
          startDate={date_start}
          endDate={date_end_arrival}
          minDate={date_start}
          dateFormat="dd.MM.yyyy"
        />
      </div>
      <div className="ticket_filter__filters filter_block">
        {switch_filters.map((item) => (
          <div className={`filter_${item.id} switch`} key={item.id}>
            <div className="filter__text">
              <img src={`assets/filters_icons/${item.id}.svg`} alt={item.id} />
              <p>{item.name}</p>
            </div>
            <SwitchButton
              id={item.id}
              value={item.value}
              output={setSwitchValue}
              switch_filters={switch_filters}
            />
          </div>
        ))}
      </div>

      <div className="ticket_filter__cost filter_block">
        <h4>Стоимость</h4>
        <div className="filter_cost">
          <p className="cost_from">от</p>
          <p className="cost_to">до</p>
        </div>
        <RangeSlider
          min={500}
          max={7000}
          current={[info.price_from, info.price_to]}
          changeCurrent={(item) => {
            changeItem("price_from", item[0]);
            changeItem("price_to", item[1]);
          }}
          step={100}
        />

        <div className="current">
          <p className="from">{info.price_from}</p>
          <p className="to">{info.price_to}</p>
        </div>
      </div>

      <DirectionTimes
        id="there"
        name="Туда"
        departureTime={[
          info.start_departure_hour_from,
          info.start_departure_hour_to,
        ]}
        setDepartureTime={(item) => {
          changeItem("start_departure_hour_from", item[0]);
          changeItem("start_departure_hour_to", item[1]);
        }}
        arrivalTime={[info.start_arrival_hour_from, info.start_arrival_hour_to]}
        setArrivalTime={(item) => {
          changeItem("start_arrival_hour_from", item[0]);
          changeItem("start_arrival_hour_to", item[1]);
        }}
      />

      <DirectionTimes
        id="back"
        name="Обратно"
        departureTime={[
          info.end_departure_hour_from,
          info.end_departure_hour_to,
        ]}
        setDepartureTime={(item) => {
          changeItem("end_departure_hour_from", item[0]);
          changeItem("end_departure_hour_to", item[1]);
        }}
        arrivalTime={[info.end_arrival_hour_from, info.end_arrival_hour_to]}
        setArrivalTime={(item) => {
          changeItem("end_arrival_hour_from", item[0]);
          changeItem("end_arrival_hour_to", item[1]);
        }}
      />
    </div>
  );
};

export default TicketFilter;
