/* eslint-disable no-useless-escape */

import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { addItem } from "../../../utils/localStorage";
import { routePaths } from "../../../routePaths";

const phoneValidation = (phone) => {
  const phoneRegExp = /^((\+7)[ \-] ?)?((\(\d{3}\))|(\d{3}))?([ \-])?(\d{3}[ \-]?\d{2}[ \-]?\d{2})$/;
  return phoneRegExp.test(phone);
};
const emailValidation = (email) => {
  const emailRegExp = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
  return emailRegExp.test(email);
};

const fieldsValidation = (name, surname, middle_name, phone, email) => {
  const output = {
    name: false,
    surname: false,
    middle_name: false,
    phone: false,
    email: false,
  };
  const phoneValid = phoneValidation(phone);
  const emailValid = emailValidation(email);

  name !== "" ? (output.name = false) : (output.name = true);
  surname !== "" ? (output.surname = false) : (output.surname = true);
  middle_name !== ""
    ? (output.middle_name = false)
    : (output.middle_name = true);
  phoneValid ? (output.phone = false) : (output.phone = true);
  emailValid ? (output.email = false) : (output.email = true);

  return output;
};

const PassengerCard = (props) => {
  const [personName, setPersonName] = useState({
    name: "",
    surname: "",
    middle_name: "",
  });
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [paymentVariant, setPaymentVariant] = useState({
    online: false,
    cash: true,
  });
  const [onlinePaymentVars, setOnlinePaymentVars] = useState({
    card: false,
    paypal: false,
    other: false,
  });

  const [fieldError, setFieldError] = useState({
    name: false,
    surname: false,
    middle_name: false,
    phone: false,
    email: false,
  });

  const paymentChooser = (event) => {
    if (event.target.name === "online") {
      setPaymentVariant({
        online: paymentVariant.online ? false : true,
        cash: false,
      });
    } else {
      setPaymentVariant({
        online: false,
        cash: paymentVariant.cash ? false : true,
      });
    }
  };

  useEffect(() => {
    if (!paymentVariant.online) {
      setOnlinePaymentVars({ card: false, paypal: false, other: false });
    }
  }, [paymentVariant]);

  const checkOnlineVariant = () => {
    for (let item in onlinePaymentVars) {
      if (onlinePaymentVars[item] === true) {
        return item;
      } else {
        return false;
      }
    }
  };

  const paymentOutput = {
    name: "",
    surname: "",
    middle_name: "",
    phone: "",
    email: "",
    payment_type: "",
    online_type: "",
  };

  const buyTicketsClickHandler = () => {
    const online_var = checkOnlineVariant();
    const validation = fieldsValidation(
      personName.name,
      personName.surname,
      personName.middle_name,
      phone,
      email
    );
    setFieldError(validation);

    if (online_var !== false) {
      paymentOutput.payment_type = "online";
      paymentOutput.online_type = online_var;
    } else {
      paymentOutput.payment_type = "cash";
    }

    if (Object.values(validation).indexOf(true) === -1) {
      paymentOutput.name = personName.name;
      paymentOutput.surname = personName.surname;
      paymentOutput.middle_name = personName.middle_name;
      paymentOutput.phone = phone;
      paymentOutput.email = email;
      addItem("payment_info", JSON.stringify(paymentOutput));
      props.history.push(routePaths.ConfirmPage);
    }
  };

  return (
    <div className="payment_card">
      <div className="passenger_card">
        <div className="passenger_card__header">
          <div className="passenger_card__header-left">
            <div className="passenger_title">Персональные данные</div>
          </div>
        </div>
        <div className="passenger_card__main-person person_fullname">
          <label>
            <p>Фамилия:</p>
            <input
              type="text"
              name="surname"
              className={
                fieldError.surname !== true
                  ? "label_output"
                  : "label_output error_output"
              }
              value={personName.surname}
              onChange={(event) =>
                setPersonName({ ...personName, surname: event.target.value })
              }
            />
          </label>
          <label>
            <p>Имя:</p>
            <input
              type="text"
              name="name"
              className={
                fieldError.name !== true
                  ? "label_output"
                  : "label_output error_output"
              }
              value={personName.name}
              onChange={(event) =>
                setPersonName({ ...personName, name: event.target.value })
              }
            />
          </label>
          <label>
            <p>Отчество:</p>
            <input
              type="text"
              name="middle_name"
              className={
                fieldError.middle_name !== true
                  ? "label_output"
                  : "label_output error_output"
              }
              value={personName.middle_name}
              onChange={(event) =>
                setPersonName({
                  ...personName,
                  middle_name: event.target.value,
                })
              }
            />
          </label>
        </div>
        <div className="passenger_card__main-person phone_email">
          <label>
            <p>Контактный телефон</p>
            <input
              type="text"
              name="phone"
              className={
                fieldError.phone !== true
                  ? "label_output"
                  : "label_output error_output"
              }
              value={phone}
              placeholder="+7 ___ ___ __ __"
              onChange={(event) => setPhone(event.target.value)}
            />
          </label>
          <label>
            <p>E-mail</p>
            <input
              type="text"
              name="email"
              className={
                fieldError.email !== true
                  ? "label_output"
                  : "label_output error_output"
              }
              value={email}
              placeholder="inbox@gmail.ru"
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
        </div>

        <div className="passenger_card__header top_bottom_border">
          <div className="passenger_card__header-left">
            <div className="passenger_title">Способ оплаты</div>
          </div>
        </div>
        <div className="passenger_card__main-person payment_type">
          <label className="payment">
            <input
              name="online"
              type="checkbox"
              checked={paymentVariant.online}
              onChange={paymentChooser}
            />
            <p>Онлайн</p>
          </label>

          <button
            id="card"
            className={
              onlinePaymentVars.card
                ? "payment__online active"
                : "payment__online"
            }
            onClick={() =>
              paymentVariant.online &&
              setOnlinePaymentVars({
                card: onlinePaymentVars.card ? false : true,
                paypal: false,
                other: false,
              })
            }
          >
            Банковской картой
          </button>
          <button
            id="paypal"
            className={
              onlinePaymentVars.paypal
                ? "payment__online active"
                : "payment__online"
            }
            onClick={() =>
              paymentVariant.online &&
              setOnlinePaymentVars({
                paypal: onlinePaymentVars.paypal ? false : true,
                card: false,
                other: false,
              })
            }
          >
            PayPal
          </button>
          <button
            id="other"
            className={
              onlinePaymentVars.other
                ? "payment__online active"
                : "payment__online"
            }
            onClick={() =>
              paymentVariant.online &&
              setOnlinePaymentVars({
                other: onlinePaymentVars.other ? false : true,
                paypal: false,
                card: false,
              })
            }
          >
            Visa QIWI Wallet
          </button>
        </div>
        <div className="passenger_card__main-person">
          <label className="payment">
            <input
              name="cash"
              type="checkbox"
              checked={paymentVariant.cash}
              onChange={paymentChooser}
            />
            <p>Наличными</p>
          </label>
        </div>
      </div>

      <div className="payment_button">
        <button className="button_orange" onClick={buyTicketsClickHandler}>
          КУПИТЬ БИЛЕТЫ
        </button>
      </div>
    </div>
  );
};

export default withRouter(PassengerCard);
