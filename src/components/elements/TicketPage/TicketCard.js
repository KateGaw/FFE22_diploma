import React from "react";
import moment from "moment";

const TicketCard = (props) => {
  const date_from = moment
    .unix(props.data.departure.from.datetime)
    .utc()
    .format();
  const date_to = moment.unix(props.data.departure.to.datetime).utc().format();
  const period = moment
    .duration(moment(date_to).diff(moment(date_from)))
    .asMilliseconds();

  console.log(props.data);

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
          {props.data.departure.have_first_class && (
            <div className="ticket_seat_variants">
              <div className="seat_type">Люкс</div>
              <div className="seat_quantity">
                {props.data.departure.available_seats_info.first}
              </div>
              <div className="seat_price">
                от &nbsp;
                <p>{props.data.departure.price_info.first.top_price}</p>&nbsp;
                <img src="assets/train_cards/price.svg" alt="price" />
              </div>
            </div>
          )}
          {props.data.departure.have_second_class && (
            <div className="ticket_seat_variants">
              <div className="seat_type">Купе</div>
              <div className="seat_quantity">
                {props.data.departure.available_seats_info.second}
              </div>
              <div className="seat_price">
                от &nbsp;
                <p>{props.data.departure.price_info.second.top_price}</p>&nbsp;
                <img src="assets/train_cards/price.svg" alt="price" />
              </div>
            </div>
          )}
          {props.data.departure.have_third_class && (
            <div className="ticket_seat_variants">
              <div className="seat_type">Плацкарт</div>
              <div className="seat_quantity">
                {props.data.departure.available_seats_info.third}
              </div>
              <div className="seat_price">
                от &nbsp;
                <p>{props.data.departure.price_info.third.top_price}</p>&nbsp;
                <img src="assets/train_cards/price.svg" alt="price" />
              </div>
            </div>
          )}
          {props.data.departure.have_fourth_class && (
            <div className="ticket_seat_variants">
              <div className="seat_type">Сидячий</div>
              <div className="seat_quantity">
                {props.data.departure.available_seats_info.fourth}
              </div>
              <div className="seat_price">
                от &nbsp;
                <p>{props.data.departure.price_info.fourth.top_price}</p>&nbsp;
                <img src="assets/train_cards/price.svg" alt="price" />
              </div>
            </div>
          )}
        <img src="assets/train_cards/icons.png" alt="icons" />
        <button className="chooseSeat button_orange">Выбрать места</button>
      </div>
    </div>
  );
};

export default TicketCard;
