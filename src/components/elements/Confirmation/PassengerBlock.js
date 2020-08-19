import React from "react";
import { MoneyFormat } from "../MoneyFormat";

const PassengerBlock = (props) => {
  const input = [
    {
      passenger_type: "adult",
      name: "Ирина",
      surname: "Мартынюк",
      middle_name: "Эдуардовна",
      gender: "female",
      birth_date: "17.02.1985",
      document_type: "passport",
      passport_series: "4204",
      passport_number: "380694",
      serteficate_number: "",
    },
    {
      passenger_type: "child",
      name: "Кирилл",
      surname: "Мартынюк",
      middle_name: "Сергеевич",
      gender: "male",
      birth_date: "25.01.2006",
      document_type: "serteficate",
      passport_series: "",
      passport_number: "",
      serteficate_number: "VIII УН 256319",
    },
    {
      passenger_type: "adult",
      name: "Сергей",
      surname: "Мартынюк",
      middle_name: "Петрович",
      gender: "male",
      birth_date: "19.06.1982",
      document_type: "passport",
      passport_series: "4204",
      passport_number: "380694",
      serteficate_number: "",
    },
  ];
  const input_total_price = 7760;

  const changeClickHandler = () => {
    console.log("go to person page!");
  };

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
                  Свидетельство о рождении {item.serteficate_number}
                </p>
              )}
            </div>
          </div>
        ))}
        <div className="confirm_passengers_price">
          <MoneyFormat
            text="Всего"
            classList="price"
            price={input_total_price}
          />
          <button
            className="confirm_ticket_button"
            onClick={changeClickHandler}
          >
            Изменить
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassengerBlock;
