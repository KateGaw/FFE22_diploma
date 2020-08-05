import React from "react";
import HeaderMenu from "../elements/HeaderMenu";
import HeaderTickets from "../elements/HeaderTickets";
import TicketsFilter from '../elements/TicketPage/TicketsFilter';
import TicketCards from '../elements/TicketPage/TicketCards';

import { withRouter } from "react-router-dom";

const ArrowBlock = () => {
  return (
    <div className="arrow-2">
      <div className="arrow-2-top"></div>
      <div className="arrow-2-bottom"></div>
    </div>
  );
};

const TicketPage = (props) => {
  // console.log(props.history.location.state.data);

  return (
    <>
      <div className="ticket_header">
        <div className="logo">Лого</div>
        <HeaderMenu />
        <HeaderTickets />
      </div>
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

      <div className="tickets_main">
        <TicketsFilter/>
        <div className="ticket_cards">
          <TicketCards />
        </div>
        <div className="ticket_last-tickets"></div>
      </div>
    </>
  );
};

export default withRouter(TicketPage);
