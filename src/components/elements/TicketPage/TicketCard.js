import React from "react";
import moment from "moment";

import { routePaths } from "../../../routePaths";
import { withRouter } from "react-router-dom";

import { addItem } from "../../../utils/localStorage";
import { express, wifi, food } from "../../consts/consts";

const TicketCard = (props) => {
  const date_from = moment
    .unix(props.data.departure.from.datetime)
    .utc()
    .format();
  const date_to = moment.unix(props.data.departure.to.datetime).utc().format();
  const period = moment
    .duration(moment(date_to).diff(moment(date_from)))
    .asMilliseconds();

  const chooseSeatClickHandler = () => {
    addItem("ticket_data", JSON.stringify(props.data));
    props.history.push(routePaths.SeatsPage);
  };

  const seatsTypes = [
    props.data.departure.have_first_class && {
      name: "Люкс",
      quantity: props.data.departure.available_seats_info.first,
      price: props.data.departure.price_info.first.top_price,
    },
    props.data.departure.have_second_class && {
      name: "Купе",
      quantity: props.data.departure.available_seats_info.second,
      price: props.data.departure.price_info.second.top_price,
    },
    props.data.departure.have_third_class && {
      name: "Плацкарт",
      quantity: props.data.departure.available_seats_info.third,
      price: props.data.departure.price_info.third.top_price,
    },
    props.data.departure.have_fourth_class && {
      name: "Сидячий",
      quantity: props.data.departure.available_seats_info.fourth,
      price: props.data.departure.price_info.fourth.top_price,
    },
  ];

  return (
    <div className="ticket_card">
      <div className="ticket_left">
        <img src="assets/train_cards/train_icon.svg" alt="train_icon" />
        <div className="train_number">{props.data.departure.duration}</div>
        <div className="train_start_city">
          {props.data.departure.train.name}
          <img src="assets/train_cards/gray_arrow.svg" alt="arrow" />
        </div>
        <div className="train_path from">
          {props.data.departure.from.city.name}
          <img src="assets/train_cards/dark_arrow.svg" alt="arrow" />
        </div>
        <div className="train_path to">{props.data.departure.to.city.name}</div>
      </div>
      <div className="ticket_main">
        <div className="train_there">
          <div className="train_start">
            <div className="train__time">
              {moment(date_from).format("HH:mm")}
            </div>
            <div className="train__city">
              {props.data.departure.from.city.name}
            </div>
            <div className="train__station">
              {props.data.departure.from.railway_station_name} вокзал
            </div>
          </div>
          <div className="train__arrow">
            <div className="arrow_time">{moment(period).format("HH:mm")}</div>
            <img src="assets/train_cards/orange_arrow.svg" alt="arrow" />
          </div>
          <div className="train__end">
            <div className="train__time">{moment(date_to).format("HH:mm")}</div>
            <div className="train__city">
              {props.data.departure.to.city.name}
            </div>
            <div className="train__station">
              {props.data.departure.to.railway_station_name} вокзал
            </div>
          </div>
        </div>
        <div className="train_back">
          <div className="train_start">
            <div className="train__time">
              {moment(date_from).format("HH:mm")}
            </div>
            <div className="train__city">
              {props.data.departure.from.city.name}
            </div>
            <div className="train__station">
              {props.data.departure.from.railway_station_name} вокзал
            </div>
          </div>
          <div className="train__arrow">
            <div className="arrow_time">{moment(period).format("HH:mm")}</div>
            <img src="assets/train_cards/orange_arrow.svg" alt="arrow" />
          </div>
          <div className="train__end">
            <div className="train__time">{moment(date_to).format("HH:mm")}</div>
            <div className="train__city">
              {props.data.departure.to.city.name}
            </div>
            <div className="train__station">
              {props.data.departure.to.railway_station_name} вокзал
            </div>
          </div>
        </div>
      </div>
      <div className="ticket_right">
        <div className="ticket_right__seats">
          <table>
            <tbody>
              {seatsTypes.map(
                (item, index) =>
                  item && (
                    <tr key={index} className="ticket_seat_variants">
                      <td className="seat_type">{item.name}</td>
                      <td className="seat_quantity">{item.quantity}</td>
                      <td className="seat_price">
                        от &nbsp; <p>{item.price}</p>
                        &nbsp;
                        <img src="assets/train_cards/price.svg" alt="price" />
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
        <div className="card_bottom-left">
          {props.data.departure.is_express && express}
          {props.data.departure.have_wifi && wifi}
          {food}
        </div>

        {props.button ? (
          <button className="confirm_ticket_button" onClick={props.click}>
            Изменить
          </button>
        ) : (
          <button
            className="chooseSeat button_orange"
            onClick={chooseSeatClickHandler}
            id={props.data.departure._id}
          >
            Выбрать места
          </button>
        )}
      </div>
    </div>
  );
};

export default withRouter(TicketCard);
