import React from "react";

const MainHeader = () => {
  return (
    <div className="main_header">
      <div className="logo">Лого</div>
      <div className="header_menu">
        <a href='#about'>О нас</a>
        <a href='#how_it_works'>Как это работает</a>
        <a href='#rewiews'>Отзывы</a>
        <a href='#contacts'>Контакты</a>
      </div>
      <h2 className="header_text">
        Вся жизнь - <br/> <b>путешествие!</b>
      </h2>
      <div className="header_tickets"></div>
    </div>
  );
};

export default MainHeader;
