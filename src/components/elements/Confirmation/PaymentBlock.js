import React from "react";

const PaymentBlock = (props) => {
  const input = {
    payment_type: "online",
    online_type: "paypal",
  };

  const changeClickHandler = () => {
    console.log("go to payment page!");
  };

  return (
    <div className="passenger_card confirm_card">
      <div className="passenger_card__header">
        <div className="passenger_card__header-left">
          <div className="passenger_title">Способ оплаты</div>
        </div>
      </div>
      <div className="confirm__payment">
        {input.payment_type === "online" ? (
          <p>Онлайн, {input.online_type}</p>
        ) : (
          <p>Наличными</p>
        )}
        <button className="confirm_ticket_button" onClick={changeClickHandler}>
          Изменить
        </button>
      </div>
    </div>
  );
};

export default PaymentBlock;
