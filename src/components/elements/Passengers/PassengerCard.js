import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import {
  showBlock,
  hideBlock,
  errorMessageButton,
  successMessageButton,
} from "../../consts/consts";
import inputsValidation from "./inputsValidation";

const PassengerCard = (props) => {
  const [showCard, setShowCard] = useState(props.id > 0 ? false : true);
  const [mobility, setMobility] = useState(false);

  // информация из формы
  const [output, setOutput] = useState({
    //form sends from props and set there?
    id: props.id,
    passenger_type: props.type,
    surname: "",
    name: "",
    middle_name: "",
    gender: "male",
    birth_date: "",
    mobility: false,
    document_type: props.type === "adult" ? "passport" : "certificate",
    passport_series: "",
    passport_number: "",
    certificate_number: "",
  });

  const [checkFields, setCheckFields] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [textMessage, setTextMessage] = useState([]);
  const [messageType, setMessageType] = useState();

  const outputText = [];
  // верны или нет поля формы
  const [result, setResult] = useState({
    surname: true,
    name: true,
    middle_name: true,
    birth_date: true,
    passport_series: true,
    passport_number: true,
    certificate_number: true,
  });

  // отправляем форму на проверку
  const submitClickHandler = (event) => {
    event.preventDefault();
    setCheckFields(true);
    setResult(inputsValidation(output));
  };

  // выводим результаты проверки формы, если все ок, отправляем в PassengersPage
  useEffect(() => {
    if (checkFields) {
      const str = "Все поля должны быть заполнены!";
      setShowMessage(true);
      for (let item in result) {
        if (result[item] !== true) {
          setMessageType(false);
          if (result[item] === null && !outputText.includes(str)) {
            outputText.push(str);
          }
          if (result[item] === false) {
            if (item === "birth_date") {
              outputText.push(
                `Дата рождения указана некорректно. Пример: 24/04/95`
              );
            }
            if (item === "passport_series") {
              outputText.push(
                `Серия паспорта указана некорректно. Пример: 1234`
              );
            }
            if (item === "passport_number") {
              outputText.push(
                `Номер паспорта указана некорректно. Пример: 123456`
              );
            }
            if (item === "certificate_number") {
              outputText.push(
                `Номер свидетельства о рождении указан некорректно. Пример: VIII-ЫП-123456`
              );
            }
          }
        } else {
          if (!outputText.includes("Готово!")) outputText.push("Готово!");
        }
      }

      if (outputText.length > 1 && outputText.includes("Готово!")) {
        outputText.splice(outputText.indexOf("Готово!"), 1);
      }

      if (outputText[0] === "Готово!") {
        setMessageType(true);
        props.setData(output);
      }
      setTextMessage(outputText);
    } // eslint-disable-next-line
  }, [result, checkFields]);

  // при переключении кнопки "ограниченная подвижность"
  const mobilityToggle = () => {
    setMobility(mobility ? false : true);
    setOutput({ ...output, mobility: mobility ? false : true });
  };

  return (
    <div className="passenger_card">
      <div className="passenger_card__header">
        <div className="passenger_card__header-left">
          <p
            onClick={() => setShowCard(showCard ? false : true)}
            className="toggleImg"
          >
            {showCard ? hideBlock : showBlock}
          </p>
          <div className="passenger_title">Пассажир {props.id + 1}</div>
        </div>
      </div>
      <div className={showCard ? "" : "hidden"}>
        <form className="passenger_form" onSubmit={submitClickHandler}>
          <div className="passenger_card__main-person">
            <select
              defaultValue={props.type}
              className="passenger_type"
              onChange={(event) =>
                setOutput({ ...output, passenger_type: event.target.value })
              }
            >
              <option value="adult">Взрослый</option>
              <option value="child">Детский</option>
              <option value="child_no_place">Детский «без места»</option>
            </select>
            <div className="person_fullname">
              <label className="label_gray">
                <p>Фамилия:</p>
                <input
                  type="text"
                  name="surname"
                  placeholder="Фамилия"
                  onChange={(event) =>
                    setOutput({ ...output, surname: event.target.value })
                  }
                  className={
                    result.surname === true
                      ? "label_output"
                      : "label_output error_output"
                  }
                />
              </label>
              <label className="label_gray">
                <p>Имя:</p>
                <input
                  type="text"
                  name="name"
                  placeholder="Имя"
                  onChange={(event) =>
                    setOutput({ ...output, name: event.target.value })
                  }
                  className={
                    result.name === true
                      ? "label_output"
                      : "label_output error_output"
                  }
                />
              </label>
              <label className="label_gray">
                <p>Отчество:</p>
                <input
                  type="text"
                  name="middle_name"
                  placeholder="Отчество"
                  onChange={(event) =>
                    setOutput({ ...output, middle_name: event.target.value })
                  }
                  className={
                    result.middle_name === true
                      ? "label_output"
                      : "label_output error_output"
                  }
                />
              </label>
            </div>
            <div className="person_gender_date">
              <label className="label_gray">
                <p>Пол:</p>
                <button
                  id="male"
                  className={
                    output.gender === "male" ? "gender active" : "gender"
                  }
                  onClick={(event) => {
                    event.preventDefault();
                    setOutput({ ...output, gender: event.target.id });
                  }}
                >
                  М
                </button>
                <button
                  id="female"
                  className={
                    output.gender === "female" ? "gender active" : "gender"
                  }
                  onClick={(event) => {
                    event.preventDefault();
                    setOutput({ ...output, gender: event.target.id });
                  }}
                >
                  Ж
                </button>
              </label>
              <label className="label_gray">
                <p> Дата рождения:</p>
                <input
                  type="text"
                  name="birth_date"
                  placeholder="ДД/ММ/ГГ"
                  onChange={(event) =>
                    setOutput({ ...output, birth_date: event.target.value })
                  }
                  className={
                    result.birth_date === true
                      ? "label_output"
                      : "label_output error_output"
                  }
                />
              </label>
            </div>
            <label className="mobility">
              <input
                name="mobility"
                type="checkbox"
                checked={mobility}
                onChange={mobilityToggle}
              />
              <p>ограниченная подвижность</p>
            </label>
          </div>
          <div className="passenger_card__main-passport top_bottom_border">
            <div className="passport_data">
              <label className="label_gray">
                <p>Тип документа</p>
                <select
                  defaultValue={output.document_type}
                  className="passenger_type"
                  onChange={(event) =>
                    setOutput({ ...output, document_type: event.target.value })
                  }
                >
                  <option value="passport">Паспорт РФ</option>
                  <option value="certificate">Свидетельство о рождении</option>
                </select>
              </label>
              {output.document_type === "passport" ? (
                <>
                  <label className="label_gray">
                    <p>Серия</p>
                    <input
                      type="text"
                      name="passport_series"
                      placeholder="_ _ _ _"
                      onChange={(event) =>
                        setOutput({
                          ...output,
                          passport_series: event.target.value,
                        })
                      }
                      className={
                        result.passport_series === true
                          ? "label_output"
                          : "label_output error_output"
                      }
                    />
                  </label>
                  <label className="label_gray">
                    <p>Номер</p>
                    <input
                      type="text"
                      name="passport_number"
                      placeholder="_ _ _ _ _ _"
                      onChange={(event) =>
                        setOutput({
                          ...output,
                          passport_number: event.target.value,
                        })
                      }
                      className={
                        result.passport_number === true
                          ? "label_output"
                          : "label_output error_output"
                      }
                    />
                  </label>
                </>
              ) : (
                <label className="label_gray">
                  <p>Номер</p>
                  <input
                    type="text"
                    name="certeficate_series"
                    placeholder="_ _ _ _ _ _ _ _ _ _ _ _"
                    onChange={(event) =>
                      setOutput({
                        ...output,
                        certificate_number: event.target.value,
                      })
                    }
                    className={
                      result.certificate_number === true
                        ? "label_output"
                        : "label_output error_output"
                    }
                  />
                </label>
              )}
            </div>
          </div>
          <div className="passenger_card__footer">
            {showMessage ? (
              <div
                className={
                  !messageType
                    ? "message_field error_field"
                    : "message_field success_field"
                }
              >
                <button
                  className="message_button"
                  onClick={() => setShowMessage(false)}
                  disabled={messageType}
                >
                  {messageType ? successMessageButton : errorMessageButton}
                </button>
                <div
                  className={
                    messageType ? "message_text success_text" : "message_text"
                  }
                >
                  {textMessage.map((item, index) => {
                    return <p key={index}>{item}</p>;
                  })}
                </div>
              </div>
            ) : (
              <input type="submit" value="Следующий пассажир" />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(PassengerCard);
