import React from "react";

const TrainTicket = (props) => {
  return (
    <div className="ticket_info_block">
      <h2>Выбор мест</h2>
      <div className="train_ticket">
        <div className="ticket_top-buttons">
          <img src="assets/button_to.png" alt="button" />
          <button className="chooseOther">Выбрать другой поезд</button>
        </div>
        <div className="ticket_top-info">
          <img src="assets/train_cards/train_icon.svg" alt="train_icon" />
          <div className="info_train">
            <div className="train_number">116C</div>
            <div className="train_start_city">
              Адлер
              <img src="assets/train_cards/gray_arrow.svg" alt="arrow" />
            </div>
            <div className="train_path from">
              Москва
              <img src="assets/train_cards/dark_arrow.svg" alt="arrow" />
            </div>
            <div className="train_path to">Санкт-Петербург</div>
          </div>
          <div className="train_there">
            <div className="train_start">
              <div className="train__time">00:10</div>
              <div className="train__city">Москва</div>
              <div className="train__station">Курский вокзал</div>
            </div>
            <div className="train__arrow">
              <img src="assets/train_cards/orange_arrow.svg" alt="arrow" />
            </div>
            <div className="train__end">
              <div className="train__time">09:52</div>
              <div className="train__city">Санкт-Петербург</div>
              <div className="train__station">Ладожский вокзал</div>
            </div>
          </div>
          <div className="info_time">
            <img src="assets/clock.png" alt="clock" />
            <p>9 часов 42 минуты</p>
          </div>
        </div>
        <div className="ticket_count">
          <h4>Количество билетов</h4>
          <div className="ticket_count-blocks">
            <div className="ticket_count-block">
              <select>
                <option selected value="0">
                  Взрослых - 0
                </option>
                <option value="1">Взрослых - 1</option>
                <option value="2">Взрослых - 2</option>
                <option value="3">Взрослых - 3</option>
                <option value="4">Взрослых - 4</option>
                <option value="5">Взрослых - 5</option>
              </select>
              <p>Можно добавить еще 3 пассажиров</p>
            </div>
            <div className="ticket_count-block">
              <select>
                <option selected value="0">
                  Детских - 0
                </option>
                <option value="1">Детских - 1</option>
                <option value="2">Детских - 2</option>
                <option value="3">Детских - 3</option>
                <option value="4">Детских - 4</option>
                <option value="5">Детских - 5</option>
              </select>
              <p>
                Можно добавить еще 3 детей до 10 лет.Свое место в вагоне, как у
                взрослых, но дешевле в среднем на 50-65%
              </p>
            </div>
            <div className="ticket_count-block">
              <select>
                <option selected value="0">
                  Детских «без места» - 0
                </option>
                <option value="1">Детских «без места» - 1</option>
                <option value="2">Детских «без места» - 2</option>
                <option value="3">Детских «без места» - 3</option>
                <option value="4">Детских «без места» - 4</option>
                <option value="5">Детских «без места» - 5</option>
              </select>
            </div>
          </div>
        </div>
        <div className="ticket_type">
          <h4>Тип вагона</h4>
          <div className="ticekt_type-blocks">
            <div className="type_block">
              <img src={`assets/filters_icons/sedentary.svg`} alt="sedentary" />
              <p className="type_block-text">Сидячий</p>
            </div>
            <div className="type_block">
              <img
                src={`assets/filters_icons/reservedseat.svg`}
                alt="reservedseat"
              />
              <p className="type_block-text">Плацкарт</p>
            </div>
            <div className="type_block">
              <img src={`assets/filters_icons/stateroom.svg`} alt="stateroom" />
              <p className="type_block-text">Купе</p>
            </div>
            <div className="type_block">
              <img src={`assets/filters_icons/lux.svg`} alt="lux" />
              <p className="type_block-text">Люкс</p>
            </div>
          </div>
        </div>
        <div className="ticket_footer">
          <div className="ticket_footer-head">
            <div>
              <p>Вагоны</p>
              <p>07</p>
              <p>09</p>
            </div>
            <p>Нумерация вагонов начинается с головы поезда</p>
          </div>
          <div className="ticket_footer-main">
            <div className="chosen_block">
              <p>07</p>
              <p>вагон</p>
            </div>
            <div className="seats">
              <p>места 11</p>
              <p>Верхние 3</p>
              <p>Нижние 8</p>
            </div>
            <div className="cost">
              <p>Стоимость</p>
              <p>2000</p>
              <p>3000</p>
            </div>
            <div className="services">
              <p>Обслуживание ФПК</p>
              <div className="services_icons">
                <img src="assets/services/conditioner.png" alt="conditioner" />
                <img src="assets/services/wifi.png" alt="wifi" />
                <img src="assets/services/linens.png" alt="linens" />
                <img src="assets/services/food.png" alt="food" />
              </div>
            </div>
            <p className="image_p">11 человек выбирают места в этом поезде</p>
            <div className="train_picture">
              <img src="assets/train_picture.png" alt="train_picture" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <button>Далее</button>
      </div>
    </div>
  );
};

export default TrainTicket;
