import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";

import Switch from "react-switch";
import { useRanger } from "react-ranger";
import styled from "styled-components";

const SwitchButton = (props) => {
  const [checked, setChecked] = useState(props.value);
  const handleChange = (value) => {
    setChecked(value);
    // eslint-disable-next-line
    switch_filters.map((item) => {
      if (item.id === props.id) {
        item.value = value;
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

const switch_filters = [
  { id: "stateroom", name: "Купе", value: false },
  { id: "reservedseat", name: "Плацкарт", value: false },
  { id: "sedentary", name: "Сидячий", value: false },
  { id: "lux", name: "Люкс", value: false },
  { id: "wifi", name: "Wi-Fi", value: false },
  { id: "express", name: "Экспресс", value: false },
];

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

const TicketFilter = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [currentPriceRange, setCurrentPriceRange] = useState([500, 7000]);

  const [arrivalTimeThere, setArrivalTimeThere] = useState([0, 24]);
  const [departureTimeThere, setDepartureTimeThere] = useState([0, 24]);
  const [arrivalTimeBack, setArrivalTimeBack] = useState([0, 24]);
  const [departureTimeBack, setDepartureTimeBack] = useState([0, 24]);

  return (
    <div className="ticket_filter">
      <div className="ticket_filter__date filter_block">
        <h4>Дата поездки</h4>
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

        <h4>Дата возвращения</h4>
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
      <div className="ticket_filter__filters filter_block">
        {switch_filters.map((item) => (
          <div className={`filter_${item.id} switch`} key={item.id}>
            <div className="filter__text">
              <img src={`assets/filters_icons/${item.id}.svg`} alt={item.id} />
              <p>{item.name}</p>
            </div>
            <SwitchButton id={item.id} value={item.value} />
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
          current={currentPriceRange}
          changeCurrent={setCurrentPriceRange}
          step={100}
        />

        <div className="current">
          <p className="from">{currentPriceRange[0]}</p>
          <p className="to">{currentPriceRange[1]}</p>
        </div>
      </div>

      <DirectionTimes
        id="there"
        name="Туда"
        departureTime={departureTimeThere}
        setDepartureTime={setDepartureTimeThere}
        arrivalTime={arrivalTimeThere}
        setArrivalTime={setArrivalTimeThere}
      />

      <DirectionTimes
        id="back"
        name="Обратно"
        departureTime={departureTimeBack}
        setDepartureTime={setDepartureTimeBack}
        arrivalTime={arrivalTimeBack}
        setArrivalTime={setArrivalTimeBack}
      />
    </div>
  );
};

export default TicketFilter;
