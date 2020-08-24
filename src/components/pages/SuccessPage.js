import React from "react";
import { routePaths } from "../../routePaths";
import { withRouter } from "react-router-dom";

import { star } from "../consts/consts";
import { clearStorage } from "../../utils/localStorage";
import { MoneyFormat } from "../elements/MoneyFormat";
import { getItemsArray } from "../../utils/localStorage";

const SuccessPage = (props) => {
  const info = getItemsArray();
  const payment_info = JSON.parse(info.payment_info);
  const seats_departure = JSON.parse(info.seats_departure);

  const orderName = "285АА";

  const backClickHandler = () => {
    clearStorage();
    props.history.push(routePaths.MainPage);
  };

  return (
    <div className="success_main">
      <h1>Благодарим Вас за заказ!</h1>

      <div className="success_main__block">
        <div className="block_header">
          <p>№ Заказа {orderName}</p>
          <MoneyFormat
            classList={"block_header__right"}
            text={"сумма"}
            price={seats_departure.total_price}
          />
        </div>

        <div className="block_actions">
          <div className="action">
            <img src="assets/actions/action_1.png" alt="action_1" />
            <p>
              билеты будут отправлены на ваш <b>e-mail</b>
            </p>
          </div>
          <div className="action">
            <img src="assets/actions/action_2.png" alt="action_2" />
            <p>
              <b>распечатайте</b> и сохраняйте билеты до даты поездки
            </p>
          </div>
          <div className="action">
            <img src="assets/actions/action_3.png" alt="action_3" />
            <p>
              <b>предьявите</b> распечатанные билеты при посадке
            </p>
          </div>
        </div>

        <div className="block_info">
          <h4>
            {payment_info.name} {payment_info.middle_name}!
          </h4>
          <p>
            Ваш заказ успешно оформлен. <br />В ближайшее время с вами свяжется
            наш оператор для подтверждения.
          </p>

          <b>
            Благодарим Вас за оказанное доверие и желаем приятного путешествия!
          </b>
        </div>
      </div>

      <div className="success_footer">
        <p>Оценить сервис</p>
        <div className="stars">
          <p id={1}>{star}</p>
          <p id={2}>{star}</p>
          <p id={3}>{star}</p>
          <p id={4}>{star}</p>
          <p id={5}>{star}</p>
        </div>

        <button className="back_button" onClick={backClickHandler}>
          вернуться на главную
        </button>
      </div>
    </div>
  );
};

export default withRouter(SuccessPage);
