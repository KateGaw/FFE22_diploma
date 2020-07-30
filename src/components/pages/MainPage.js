import React from "react";

import About from "../elements/About";
import HowItWorks from "../elements/HowItWorks";
import Rewiews from "../elements/Reviews";
import HeaderMenu from '../elements/HeaderMenu';

import HeaderTickets from "../elements/HeaderTickets";

const MainPage = () => {
  return (
    <>
      <div className="main_header" id="header">
        <div className="logo">Лого</div>
        <HeaderMenu/>
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
