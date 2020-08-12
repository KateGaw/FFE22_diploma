import React from "react";

const About = () => {
  return (
    <div className="main_about" id="about">
      <h3>о нас</h3>
      <div className="about_block">
        <p className="about_text">
          Мы рады видеть вас! Мы рботаем для Вас с 2003 года. 14 лет мы
          наблюдаем, как с каждым днем все больше людей заказывают жд билеты
          через интернет.
        </p>
        <p className="about_text">
          Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика,
          но стоит ли это делать? Мы расскажем о преимуществах заказа через
          интернет.
        </p>
        <p className="about_text">
          <b>
            Покупать жд билеты дешево можно за 90 суток до отправления поезда. <br/>
            Благодаря динамическому ценообразованию цена на билеты в это время
            самая низкая.
          </b>
        </p>
      </div>
    </div>
  );
};

export default About;