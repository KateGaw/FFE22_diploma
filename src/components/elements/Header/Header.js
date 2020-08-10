import React from "react";
import { withRouter } from "react-router-dom";

import HeaderMenu from "./HeaderMenu";
import HeaderTickets from "./HeaderTickets";

const Header = (props) => {
  return (
    <>
      <div
        className={
          props.location.pathname === "/" ? "main_header" : "ticket_header"
        }
        id="header"
      >
        <div className="logo">Лого</div>
        <HeaderMenu />
        {props.location.pathname === "/" && (
          <h2 className="header_text">
            Вся жизнь - <br /> <b>путешествие!</b>
          </h2>
        )}
        <HeaderTickets />
      </div>
    </>
  );
};

export default withRouter(Header);
