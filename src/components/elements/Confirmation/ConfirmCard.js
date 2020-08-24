/* eslint-disable array-callback-return */

import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { routePaths } from "../../../routePaths";
import { getItemsArray } from "../../../utils/localStorage";

import PassengerBlock from "./PassengerBlock";
import PaymentBlock from "./PaymentBlock";

import TicketCard from "../TicketPage/TicketCard";
import api from "../../../utils/api";

const ConfirmCard = (props) => {
  const info = getItemsArray();
  const seats_departure = JSON.parse(info.seats_departure);
  const ticket_data = JSON.parse(info.ticket_data);
  const personal_data = JSON.parse(info.personal_data);
  const payment_data = JSON.parse(info.payment_info);
  const total_price = seats_departure.total_price;

  const [responseStatus, setResponseStatus] = useState(null);

  const changeTicketClickHandler = () => {
    props.history.push(routePaths.TicketPage);
  };

  const changePersonalInfoClickHandler = () => {
    props.history.push(routePaths.PassengersPage);
  };

  const changePaymentClickHandler = () => {
    props.history.push(routePaths.PaymentPage);
  };

  const user = {
    first_name: payment_data.name,
    last_name: payment_data.surname,
    patronymic: payment_data.middle_name,
    phone: payment_data.phone,
    email: payment_data.email,
    payment_method: payment_data.payment_type,
  };
  const seats = [];
  Object.values(personal_data).map((item, index) => {
    seats.push({
      coach_id: seats_departure.block_id,
      person_info: {
        is_adult: item.passenger_type === "adult" ? true : false,
        first_name: item.name,
        last_name: item.surname,
        patronymic: item.middle_name,
        gender: item.gender === "male" ? true : false,
        birthday: item.birth_date,
        document_type:
          item.document_type === "passport"
            ? "паспорт"
            : "свидетельство о рождении",
        document_data:
          item.document_type === "passport"
            ? `${item.passport_series} ${item.passport_number}`
            : item.certificate_number,
      },
      seat_number: seats_departure.seats[index],
      is_child: item.passenger_type === "adult" ? false : true,
      include_children_seat:
        item.passenger_type === "adult" && seats_departure.child_no_place !== 0
          ? true
          : false,
    });
  });
  const route_direction_id = ticket_data.departure._id;

  const confirmClickHandler = () => {
    const output = JSON.stringify({
      user: user,
      departure: {
        route_direction_id: route_direction_id,
        seats: seats,
      },
    });
    api.setTicket(output, setResponseStatus);
    if (responseStatus === true) {
      props.history.push(routePaths.SuccessPage);
    }
  };

  return (
    <div className="confirm_main_block">
      <div className="passenger_card confirm_card">
        <div className="passenger_card__header">
          <div className="passenger_card__header-left">
            <div className="passenger_title">Поезд</div>
          </div>
        </div>
        <div className="confirm_ticket">
          <TicketCard
            data={ticket_data}
            button={true}
            click={changeTicketClickHandler}
          />
        </div>
      </div>

      <PassengerBlock
        data={personal_data}
        total_price={total_price}
        button={changePersonalInfoClickHandler}
      />
      <PaymentBlock data={payment_data} button={changePaymentClickHandler} />
      <button
        className="button_orange confirm_button"
        onClick={confirmClickHandler}
      >
        подтвердить
      </button>
    </div>
  );
};

export default withRouter(ConfirmCard);
