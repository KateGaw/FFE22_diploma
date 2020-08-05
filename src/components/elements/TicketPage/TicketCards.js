import React, { useState } from "react";

const TicketFilter = () => {
  return (
    <div className="ticket_card">
      <div className="ticket_left">
        <img src="assets/train_cards/train_icon.svg" alt="train_icon" />
        <div className="train_number">116С</div>
        <div className="train_start_city">
          Адлер <img src="assets/train_cards/gray_arrow.svg" alt="arrow" />{" "}
        </div>
        <div className="train_path from">
          Москва <img src="assets/train_cards/dark_arrow.svg" alt="arrow" />
        </div>
        <div className="train_path to">Санкт-Петербург </div>
      </div>
      <div className="ticket_main">
        <div className="train_there">
          <div className="train_start">
            <div className="train__time">00:10</div>
            <div className="train__city">Москва</div>
            <div className="train__station">Курский вокзал</div>
          </div>
          <div className="train__arrow">
            <div className="arrow_time">9 : 42</div>
            <img src="assets/train_cards/orange_arrow.svg" alt="arrow" />
          </div>
          <div className="train__end">
            <div className="train__time">09:52</div>
            <div className="train__city">Санкт-Петербург</div>
            <div className="train__station">Ладожский вокзал</div>
          </div>
        </div>
        <div className="train_back">
          <div className="train_start">
            <div className="train__time">00:10</div>
            <div className="train__city">Москва</div>
            <div className="train__station">Курский вокзал</div>
          </div>
          <div className="train__arrow">
            <div className="arrow_time">9 : 42</div>
            <img src="assets/train_cards/orange_arrow.svg" alt="arrow" />
          </div>
          <div className="train__end">
            <div className="train__time">09:52</div>
            <div className="train__city">Санкт-Петербург</div>
            <div className="train__station">Ладожский вокзал</div>
          </div>
        </div>
      </div>
      <div className="ticket_right">
        <div className="ticket_seat_variants">
          <div className="seat_type">Купе</div>
          <div className="seat_quantity">90</div>
          <div className="seat_price">
            от &nbsp;<p>2 530</p>&nbsp;<img src="assets/train_cards/price.svg" alt="price" />
          </div>
        </div>
        <img src="assets/train_cards/icons.png" alt="icons" />
        <button className='chooseSeat button_orange'>Выбрать места</button>
      </div>
    </div>
  );
};

export default TicketFilter;
