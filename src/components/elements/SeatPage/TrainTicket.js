/* eslint-disable array-callback-return */

import React, { useState } from "react";
import moment from "moment";

import {
  have_first_class,
  have_second_class,
  have_third_class,
  have_fourth_class,
  conditioner,
  wifi,
  linens,
  food,
} from "../../consts/consts";

const ServicesButtons = (props) => {
  // console.log(props);
  return (
    <button
      id={props.id}
      className={props.class}
      disabled={props.class === "non-active" ? true : false}
      onClick={props.click}
    >
      {props.data}
    </button>
  );
};

const TrainTicket = ({ result, anotherTrainClickHandler }) => {
  // console.log(result);
  const start_date = moment
    .unix(result.departure.from.datetime)
    .utc()
    .format("HH:mm");
  const end_date = moment
    .unix(result.departure.to.datetime)
    .utc()
    .format("HH:mm");

  const diff = moment(result.departure.to.datetime).diff(
    moment(result.departure.from.datetime)
  );

  const have_classes = [
    {
      id: "have_first_class",
      name: "Люкс",
      value: result.departure.have_first_class,
      alt: "first",
      image: have_first_class,
    },
    {
      id: "have_second_class",
      name: "Купе",
      value: result.departure.have_second_class,
      alt: "second",
      image: have_second_class,
    },
    {
      id: "have_third_class",
      name: "Плацкарт",
      value: result.departure.have_third_class,
      alt: "third",
      image: have_third_class,
    },
    {
      id: "have_fourth_class",
      name: "Сидячий",
      value: result.departure.have_fourth_class,
      alt: "fourth",
      image: have_fourth_class,
    },
  ];

  const seats = [
    result.departure.available_seats_info.first && {
      id: "first",
      seats: result.departure.available_seats_info.first,
      top_price: result.departure.price_info.first.top_price,
      bottom_price: result.departure.price_info.first.bottom_price,
    },
    result.departure.available_seats_info.second && {
      id: "second",
      seats: result.departure.available_seats_info.second,
      top_price: result.departure.price_info.second.top_price,
      bottom_price: result.departure.price_info.second.bottom_price,
    },
    result.departure.available_seats_info.third && {
      id: "third",
      seats: result.departure.available_seats_info.third,
      top_price: result.departure.price_info.third.top_price,
      bottom_price: result.departure.price_info.third.bottom_price,
    },
    result.departure.available_seats_info.fourth && {
      id: "fourth",
      seats: result.departure.available_seats_info.fourth,
      top_price: result.departure.price_info.fourth.top_price,
      bottom_price: result.departure.price_info.fourth.bottom_price,
    },
  ];

  const [services, setServices] = useState({
    conditioner: result.departure.have_air_conditioning ? "able" : "non-active",
    wifi: result.departure.have_wifi ? "able" : "non-active",
    linens: "able",
    food: "able",
  });

  const [showClass, setShowClass] = useState(
    result.departure.have_first_class
      ? "first"
      : result.departure.have_second_class
      ? "second"
      : result.departure.have_third_class
      ? "third"
      : "fourth"
  );
  const classChooseClickHandler = (event) => {
    setShowClass(event.target.id);
  };

  const serviceClickHandler = (event) => {
    const id = event.target.closest("button").getAttribute("id");
    switch (id) {
      case "conditioner": {
        setServices({
          ...services,
          conditioner: services.conditioner === "able" ? "choosen" : "able",
        });
        break;
      }
      case "wifi": {
        setServices({
          ...services,
          wifi: services.wifi === "able" ? "choosen" : "able",
        });
        break;
      }
      case "linens": {
        setServices({
          ...services,
          linens: services.linens === "able" ? "choosen" : "able",
        });
        break;
      }
      case "food": {
        setServices({
          ...services,
          food: services.food === "able" ? "choosen" : "able",
        });
        break;
      }

      default:
        break;
    };
  };
  
  const nextPageClickHandler = () => {
    console.log('next page');
  }

  return (
    <div className="ticket_info_block ticket_cards">
      <h2>Выбор мест</h2>
      <div className="train_ticket">
        <div className="ticket_top-buttons">
          <img src="assets/button_to.png" alt="button" />
          <button className="chooseOther" onClick={anotherTrainClickHandler}>
            Выбрать другой поезд
          </button>
        </div>
        <div className="ticket_top-info">
          <img
            src="assets/train_cards/train_orange.png"
            alt="train_icon"
            className="train_icon"
          />
          <div className="info_train">
            <div className="train_number">{result.departure.duration}</div>
            <div className="train_start_city">
              {result.departure.train.name}
              <img src="assets/train_cards/gray_arrow.svg" alt="arrow" />
            </div>
            <div className="train_path from">
              {result.departure.from.city.name}
              <img src="assets/train_cards/dark_arrow.svg" alt="arrow" />
            </div>
            <div className="train_path to">{result.departure.to.city.name}</div>
          </div>
          <div className="train_there">
            <div className="train_start">
              <div className="train__time">{start_date}</div>
              <div className="train__city">
                {result.departure.from.city.name}
              </div>
              <div className="train__station">
                {result.departure.from.railway_station_name} вокзал
              </div>
            </div>
            <div className="train__arrow">
              <img src="assets/train_cards/orange_arrow.svg" alt="arrow" />
            </div>
            <div className="train__end">
              <div className="train__time">{end_date}</div>
              <div className="train__city">{result.departure.to.city.name}</div>
              <div className="train__station">
                {result.departure.to.railway_station_name} вокзал
              </div>
            </div>
          </div>
          <div className="info_time">
            <img src="assets/clock.png" alt="clock" />
            <p>{moment.unix(diff).utc().format("kk часов mm минут")}</p>
          </div>
        </div>
        <div className="ticket_count">
          <h4>Количество билетов</h4>
          <div className="ticket_count-blocks">
            <div className="ticket_count-block">
              <select defaultValue={"0"}>
                <option value="0">Взрослых - 0</option>
                <option value="1">Взрослых - 1</option>
                <option value="2">Взрослых - 2</option>
                <option value="3">Взрослых - 3</option>
                <option value="4">Взрослых - 4</option>
                <option value="5">Взрослых - 5</option>
              </select>
              <p>Можно добавить еще 3 пассажиров</p>
            </div>
            <div className="ticket_count-block">
              <select defaultValue={"0"}>
                <option value="0">Детских - 0</option>
                <option value="1">Детских - 1</option>
                <option value="2">Детских - 2</option>
                <option value="3">Детских - 3</option>
                <option value="4">Детских - 4</option>
                <option value="5">Детских - 5</option>
              </select>
              <p>
                Можно добавить еще 3 детей до 10 лет.Свое место в вагоне, как у
                взрослых, но дешевле в среднем на 50-65%
              </p>
            </div>
            <div className="ticket_count-block">
              <select defaultValue={"0"}>
                <option value="0">Детских «без места» - 0</option>
                <option value="1">Детских «без места» - 1</option>
                <option value="2">Детских «без места» - 2</option>
                <option value="3">Детских «без места» - 3</option>
                <option value="4">Детских «без места» - 4</option>
                <option value="5">Детских «без места» - 5</option>
              </select>
            </div>
          </div>
        </div>
        <div className="ticket_type">
          <h4>Тип вагона</h4>
          <div className="ticekt_type-blocks">
            {have_classes.map((item) => {
              if (item.value) {
                return (
                  <div
                    className={
                      item.alt === showClass
                        ? "type_block active"
                        : "type_block"
                    }
                    key={item.id}
                  >
                    <div>{item.image}</div>
                    <p
                      className="type_block-text"
                      onClick={classChooseClickHandler}
                      id={item.alt}
                    >
                      {item.name}
                    </p>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="ticket_footer">
          <div className="ticket_footer-head">
            <div>
              <p>Вагоны</p>
              <p className="active">07</p>
              <p className="non-active">09</p>
            </div>
            <p>Нумерация вагонов начинается с головы поезда</p>
          </div>
          <div className="ticket_footer-main">
            <div className="chosen_block">
              <p>07</p>
              <p>вагон</p>
            </div>
            {seats.map((item) => {
              if (item !== undefined && item.id === showClass) {
                return (
                  <div className="seats_and_cost" key={item.id}>
                    <div className="seats">
                      <div className="head">
                        Места
                        <p className="place_total">{item.seats}</p>
                      </div>
                      <div className="seat">
                        Верхние{" "}
                        <p className="place_count">
                          {Math.floor(item.seats / 2)}
                        </p>
                      </div>
                      <div className="seat">
                        Нижние{" "}
                        <p className="place_count">
                          {Math.floor(item.seats / 2)}
                        </p>
                      </div>
                    </div>
                    <div className="prices">
                      <div className="head">Стоимость</div>
                      <div className="place_count">
                        {item.top_price}
                        <img src="assets/train_cards/price.svg" alt="price" />
                      </div>
                      <div className="place_count">
                        {item.bottom_price}
                        <img src="assets/train_cards/price.svg" alt="price" />
                      </div>
                    </div>
                  </div>
                );
              }
            })}

            <div className="services">
              <p>Обслуживание ФПК</p>
              <div className="services_icons">
                <ServicesButtons
                  id="conditioner"
                  class={services.conditioner}
                  click={serviceClickHandler}
                  data={conditioner}
                />
                <ServicesButtons
                  id="wifi"
                  class={services.wifi}
                  click={serviceClickHandler}
                  data={wifi}
                />
                <ServicesButtons
                  id="linens"
                  class={services.linens}
                  click={serviceClickHandler}
                  data={linens}
                />
                <ServicesButtons
                  id="food"
                  class={services.food}
                  click={serviceClickHandler}
                  data={food}
                />
              </div>
            </div>
            <p className="image_p">11 человек выбирают места в этом поезде</p>
            <div className="train_picture">
              <img src="assets/train_picture.png" alt="train_picture" />
            </div>
          </div>
        </div>
      </div>
      <button
        className="button_orange passengers_next_btn"
        onClick={nextPageClickHandler}
      >
        Далее
      </button>
    </div>
  );
};

export default TrainTicket;
