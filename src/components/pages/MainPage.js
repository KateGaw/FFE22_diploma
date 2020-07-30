import React from "react";

import About from "../elements/About";
import HowItWorks from "../elements/HowItWorks";
import Rewiews from "../elements/Reviews";

import HeaderTickets from "../elements/HeaderTickets";

const MainPage = () => {
  return (
    <>
      <div className="main_header" id="header">
        <div className="logo">Лого</div>
        <div className="header_menu">
          <a href="#about">О нас</a>
          <a href="#how_it_works">Как это работает</a>
          <a href="#rewiews">Отзывы</a>
          <a href="#contacts">Контакты</a>
        </div>
        <h2 className="header_text">
          Вся жизнь - <br /> <b>путешествие!</b>
        </h2>
        <HeaderTickets />
      </div>
      <About />
      <HowItWorks />
      <Rewiews />
    </>
  );
};

export default MainPage;
