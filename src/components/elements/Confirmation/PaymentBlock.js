import React from "react";

const PaymentBlock = (props) => {
  return (
    <div className="passenger_card confirm_card">
      <div className="passenger_card__header">
        <div className="passenger_card__header-left">
          <div className="passenger_title">Способ оплаты</div>
        </div>
      </div>
      <div className="confirm__payment">
        {props.data.payment_type === "online" ? (
          <p>Онлайн, {props.data.online_type}</p>
        ) : (
          <p>Наличными</p>
        )}
        <button className="confirm_ticket_button" onClick={props.button}>
          Изменить
        </button>
      </div>
    </div>
  );
};

export default PaymentBlock;
