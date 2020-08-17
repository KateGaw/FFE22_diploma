import React from "react";
import TicketCard from "../TicketPage/TicketCard";

const TrainBlock = (props) => {
  const data = {
    have_first_class: false,
    have_second_class: false,
    have_third_class: false,
    have_fourth_class: false,
    have_wifi: false,
    have_air_conditioning: false,
    is_express: false,
    min_price: 3900,
    available_seats: 65,
    available_seats_info: {
      first: 18,
      third: 48,
    },
    departure: {
      _id: "5b9a320ef83e028786ea6583",
      have_first_class: true,
      have_second_class: false,
      have_third_class: true,
      have_fourth_class: false,
      have_wifi: true,
      have_air_conditioning: false,
      is_express: false,
      min_price: 3900,
      duration: 355500,
      available_seats: 65,
      available_seats_info: {
        first: 18,
        third: 48,
      },
      train: {
        _id: "5b9a3077f83e028786ea5fa7",
        name: "Тройка - 2",
      },
      from: {
        railway_station_name: "Киевский",
        city: {
          _id: "5b9a2fa7f83e028786ea5672",
          name: "москва",
        },
        datetime: 1536923395,
      },
      to: {
        railway_station_name: "Ладожский",
        city: {
          _id: "5b9a2fa7f83e028786ea5673",
          name: "санкт-петербург",
        },
        datetime: 1537278895,
      },
      price_info: {
        first: {
          price: 4330,
          top_price: 3900,
          bottom_price: 4050,
        },
        third: {
          top_price: 4310,
          bottom_price: 4755,
          side_price: 4415,
        },
      },
    },
  };

  const changeClickHandler = () => {
      console.log('go to tickets page!');
  }

  return (
    <div className="passenger_card confirm_card">
      <div className="passenger_card__header">
        <div className="passenger_card__header-left">
          <div className="passenger_title">Поезд</div>
        </div>
      </div>
      <div className="confirm_ticket">
        <TicketCard data={data} button={true} click={changeClickHandler} />
      </div>
    </div>
  );
};

export default TrainBlock;
