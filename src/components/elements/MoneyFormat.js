import React from "react";

export const MoneyFormat = ({ price, classList, text }) => {
  const result = price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  return (
    <div className={`price_div ${classList ? classList : ""}`}>
      {text ? <p>{text}</p> : ""}
      {result}
      <img src="assets/train_cards/price.svg" alt="price" />
    </div>
  );
};
