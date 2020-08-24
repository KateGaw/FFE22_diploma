import React from "react";
import { MoneyFormat } from "../MoneyFormat";

const PassengerBlock = (props) => {
  const input = Object.values(props.data);

  return (
    <div className="passenger_card confirm_card">
      <div className="passenger_card__header">
        <div className="passenger_card__header-left">
          <div className="passenger_title">Пассажиры</div>
        </div>
      </div>
      <div className="confirm_passengers">
        {input.map((item, index) => (
          <div key={index} className="confirm__passenger_card">
            <div className="confirm__passenger_card-left">
              <img src="assets/person_icon.png" alt="person" />
              {item.passenger_type === "adult" ? "Взрослый" : "Детский"}
            </div>
            <div className="confirm__passenger_card-right">
              <p className="full_name">
                {item.surname} {item.name} {item.middle_name}
              </p>
              <p className="confirn_passenger_data">
                Пол {item.gender === "male" ? "мужской" : "женский"}
              </p>
              <p className="confirn_passenger_data">
                Дата рождения {item.birth_date}
              </p>
              {item.document_type === "passport" ? (
                <p className="confirn_passenger_data">
                  Паспорт РФ {item.passport_series} {item.passport_number}
                </p>
              ) : (
                <p className="confirn_passenger_data">
                  Свидетельство о рождении {item.certificate_number}
                </p>
              )}
            </div>
          </div>
        ))}
        <div className="confirm_passengers_price">
          <MoneyFormat
            text="Всего"
            classList="price"
            price={props.total_price}
          />
          <button
            className="confirm_ticket_button"
            onClick={props.button}
          >
            Изменить
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassengerBlock;
