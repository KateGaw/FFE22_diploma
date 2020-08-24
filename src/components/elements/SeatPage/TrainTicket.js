/* eslint-disable array-callback-return */

import React, { useState, useEffect } from "react";
import moment from "moment";
import api from "../../../utils/api";
import Preloader from "../Preloader";
import { MoneyFormat } from "../MoneyFormat";
import { timeHandler } from "./timeHandler";
import { addItem } from "../../../utils/localStorage";

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

// выбираем свободные места в поезде (первые свободные по количеству выбранных мест)
const placesChooser = (counter, places) => {
  const output = [];
  places.map((item) => {
    if (item.available === true && output.length < counter) {
      output.push(item.index);
    }
  });
  return output;
};

const TrainTicket = ({ id, result, anotherTrainClickHandler, disabled }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [seatsInfo, setSeatsInfo] = useState([]);
  const [output, setOutput] = useState(null);
  const [choosenSeats, setChoosenSeats] = useState(null);

  // Получаем данные по местам и вагонам в выбранном поезде
  useEffect(() => {
    api.getRoutesSeats(result._id, setSeatsInfo, setErrorMessage, setIsLoading);
  }, [result]);

  // время отбытия
  const start_date = moment.unix(result.from.datetime).utc().format();

  //время прибытия
  const end_date = moment.unix(result.to.datetime).utc().format();

  //часов в дороге
  const time = timeHandler(start_date, end_date);

  // количество пассажиров
  const [passengers, setPassengers] = useState({
    adult: 0,
    child: 0,
    child_no_place: 0,
  });

  // выбор количества пассажирских мест
  const passengersChangeHandler = (event) => {
    setPassengers({
      ...passengers,
      [event.target.id]: parseInt(event.target.value),
    });
  };

  // верхние, средние и нижние места и цены на них
  const seats = [
    {
      id: 1,
      name: "Верхние",
      counter: 3,
      price: "top_price",
    },
    {
      id: 2,
      name: "Боковые",
      counter: 5,
      price: "side_price",
    },
    {
      id: 3,
      name: "Нижние",
      counter: 7,
      price: "bottom_price",
    },
  ];

  // услуги
  const [services, setServices] = useState({
    conditioner: result.have_air_conditioning ? "able" : "unable",
    wifi: result.have_wifi ? "able" : "unable",
    linens: "able",
    food: "able",
  });

  // выбор дополнительных услуг
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
    }
  };

  // какие классы доступны в поезде
  const have_classes = [
    {
      id: "have_first_class",
      name: "Люкс",
      value: result.have_first_class,
      alt: "first",
      image: have_first_class,
    },
    {
      id: "have_second_class",
      name: "Купе",
      value: result.have_second_class,
      alt: "second",
      image: have_second_class,
    },
    {
      id: "have_third_class",
      name: "Плацкарт",
      value: result.have_third_class,
      alt: "third",
      image: have_third_class,
    },
    {
      id: "have_fourth_class",
      name: "Сидячий",
      value: result.have_fourth_class,
      alt: "fourth",
      image: have_fourth_class,
    },
  ];
  // какой класс отобразить на странице
  const [showClass, setShowClass] = useState(
    result.have_first_class
      ? "first"
      : result.have_second_class
      ? "second"
      : result.have_third_class
      ? "third"
      : "fourth"
  );

  // какой класс "развернуть"
  const classChooseClickHandler = (event) => {
    setShowClass(event.target.id);
  };

  // массив данных по выбранному классу
  const [choosenTypeInfo, setChoosenTypeInfo] = useState(null);
  useEffect(() => {
    if (seatsInfo.length > 0) {
      seatsInfo.map((item) => {
        if (item.coach.class_type === showClass) {
          setChoosenTypeInfo(item);
          setServices({
            ...services,
            linens: item.coach.is_linens_included ? "non-active" : "able",
          });
        }
      });

      const counter = passengers.adult + passengers.child;
      if (counter !== 0) {
        setChoosenSeats(placesChooser(counter, seatsInfo[0].seats));
      }
    } // eslint-disable-next-line
  }, [seatsInfo, showClass, passengers]);

  // расчеты финальной стоимости
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    if (choosenTypeInfo !== null) {
      const place_price = choosenTypeInfo.coach.price
        ? choosenTypeInfo.coach.price
        : choosenTypeInfo.coach.top_price;
      const adult_passengers = passengers.adult;
      const child_passengers = passengers.child;
      let services_price = 0;

      if (services.wifi === "choosen") {
        services_price += choosenTypeInfo.coach.wifi_price;
      }
      if (services.conditioner === "choosen") {
        services_price += choosenTypeInfo.coach.conditioner_price;
      }
      if (
        services.linens === "choosen" &&
        !choosenTypeInfo.coach.is_linens_included
      ) {
        services_price += choosenTypeInfo.coach.linens_price;
      }

      const adult_final_price = adult_passengers * place_price;
      const child_final_price = Math.ceil((child_passengers * place_price) / 2);
      setTotalPrice(services_price + adult_final_price + child_final_price);

      setOutput({
        block_id: seatsInfo[0].coach._id,
        adult_passengers: passengers.adult,
        adult_price: adult_final_price,
        child_passengers: passengers.child,
        child_price: child_final_price,
        child_no_place: passengers.child_no_place,
        class: showClass,
        total_price: totalPrice,
        seats: choosenSeats,
      });
    } // eslint-disable-next-line
  }, [totalPrice, services, showClass, passengers, choosenTypeInfo]);

  // добавляем данные в storage и делаем кнопку Далее
  useEffect(() => {
    if (
      output !== null &&
      output.adult_passengers !== 0 &&
      output.total_price !== 0
    ) {
      id === "departure"
        ? addItem("seats_departure", JSON.stringify(output))
        : addItem("seats_arrival", JSON.stringify(output));
      disabled(false);
    }
    // eslint-disable-next-line
  }, [output]);

  return isLoading ? (
    <Preloader />
  ) : (
    <div className="ticket_info_block ticket_cards">
      {errorMessage === null ? (
        <>
          <h2>Выбор мест</h2>
          <div className="train_ticket">
            <div className="ticket_top-buttons">
              <img src="assets/button_to.png" alt="button" />
              <button
                className="chooseOther"
                onClick={anotherTrainClickHandler}
              >
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
                <div className="train_number">{result.duration}</div>
                <div className="train_start_city">
                  {result.train.name}
                  <img src="assets/train_cards/gray_arrow.svg" alt="arrow" />
                </div>
                <div className="train_path from">
                  {result.from.city.name}
                  <img src="assets/train_cards/dark_arrow.svg" alt="arrow" />
                </div>
                <div className="train_path to">{result.to.city.name}</div>
              </div>
              <div className="train_there">
                <div className="train_start">
                  <div className="train__time">
                    {moment(start_date).format("HH:mm")}
                  </div>
                  <div className="train__city">{result.from.city.name}</div>
                  <div className="train__station">
                    {result.from.railway_station_name} вокзал
                  </div>
                </div>
                <div className="train__arrow">
                  <img src="assets/train_cards/orange_arrow.svg" alt="arrow" />
                </div>
                <div className="train__end">
                  <div className="train__time">
                    {moment(end_date).format("HH:mm")}
                  </div>
                  <div className="train__city">{result.to.city.name}</div>
                  <div className="train__station">
                    {result.to.railway_station_name} вокзал
                  </div>
                </div>
              </div>
              <div className="info_time">
                <img src="assets/clock.png" alt="clock" />
                <p>{time}</p>
              </div>
            </div>
            <div className="ticket_count">
              <h4>Количество билетов</h4>
              <div className="ticket_count-blocks">
                <div className="ticket_count-block">
                  <select
                    id="adult"
                    defaultValue={"0"}
                    onChange={passengersChangeHandler}
                  >
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
                  <select
                    id="child"
                    defaultValue={"0"}
                    onChange={passengersChangeHandler}
                  >
                    <option value="0">Детских - 0</option>
                    <option value="1">Детских - 1</option>
                    <option value="2">Детских - 2</option>
                    <option value="3">Детских - 3</option>
                    <option value="4">Детских - 4</option>
                    <option value="5">Детских - 5</option>
                  </select>
                  <p>
                    Можно добавить еще 3 детей до 10 лет.Свое место в вагоне,
                    как у взрослых, но дешевле в среднем на 50-65%
                  </p>
                </div>
                <div className="ticket_count-block">
                  <select
                    id="child_no_place"
                    defaultValue={"0"}
                    onChange={passengersChangeHandler}
                  >
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

                {choosenTypeInfo !== null && (
                  <table className="seats_and_cost">
                    <tbody>
                      <tr>
                        <th className="head h_place">
                          Места
                          <p className="place_total">
                            {choosenTypeInfo.coach.available_seats}
                          </p>
                        </th>
                        <th className="head h_cost">Стоимость</th>
                      </tr>
                      {seats.map(
                        (item) =>
                          choosenTypeInfo.coach[item.price] !== 0 && (
                            <tr key={item.id}>
                              <th className="seat">
                                {item.name}
                                <p className="place_count">{item.counter}</p>
                              </th>
                              <th className="place_count t_price">
                                <MoneyFormat
                                  price={choosenTypeInfo.coach[item.price]}
                                />
                              </th>
                            </tr>
                          )
                      )}
                    </tbody>
                  </table>
                )}

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
                <p className="image_p">
                  11 человек выбирают места в этом поезде
                </p>
                <div className="train_picture">
                  <img src="assets/train_picture.png" alt="train_picture" />
                </div>
                {totalPrice > 0 && (
                  <MoneyFormat
                    classList="total_price_info"
                    price={totalPrice}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="ticket_error_message">{errorMessage}</div>
      )}
    </div>
  );
};

export default TrainTicket;
