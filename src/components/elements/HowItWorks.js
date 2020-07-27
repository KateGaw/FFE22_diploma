import React from "react";

const HowItWorks = () => {
  return (
    <div className="main_how">
      <div className='how_header'>
        <h3>как это работает</h3>
        <button className='how__more_btn'>Узнать больше</button>
      </div>
      <div className="how_blocks">
        <div className="how__block">
          <img src="/assets/how_1.png" alt="how_1" />
          <p>Удобный заказ на сайте</p>
        </div>
        <div className="how__block">
          <img src="/assets/how_2.png" alt="how_2" />
          <p>Нет необходимости ехать в офис</p>
        </div>
        <div className="how__block">
          <img src="/assets/how_3.png" alt="how_3" />
          <p>Огромный выбор направлений</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
