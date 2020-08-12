import React from "react";

const ArrowBlock = () => {
  return (
    <div className="arrow-2">
      <div className="arrow-2-top"></div>
      <div className="arrow-2-bottom"></div>
    </div>
  );
};

const ProgressBar = () => {
  return (
    <div className="ticket_line">
      <div className="ticket_line__block first done">
        <img
          src="/assets/line_assets/one.png"
          alt="one"
          className="line_number"
        />
        <p>Билеты</p>
        <ArrowBlock />
      </div>
      <div className="ticket_line__block second">
        <img
          src="/assets/line_assets/two.png"
          alt="two"
          className="line_number"
        />
        <p>Пассажиры</p>

        <ArrowBlock />
      </div>
      <div className="ticket_line__block third">
        <img
          src="/assets/line_assets/three.png"
          alt="three"
          className="line_number"
        />
        <p>Оплата</p>
        <ArrowBlock />
      </div>
      <div className="ticket_line__block fourth">
        <img
          src="/assets/line_assets/four.png"
          alt="four"
          className="line_number"
        />
        <p>Проверка</p>
      </div>
    </div>
  );
};

export default ProgressBar;
