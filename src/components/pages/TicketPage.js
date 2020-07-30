import React from "react";
import HeaderMenu from "../elements/HeaderMenu";
import HeaderTickets from "../elements/HeaderTickets";

import { withRouter } from "react-router-dom";

const TicketPage = (props) => {
  console.log(props.history.location.state.data);

  return (
    <>
      <div className="ticket_header">
        <div className="logo">Лого</div>
        <HeaderMenu />
        <HeaderTickets />
      </div>
      <div className="ticket_line">
        <div className="ticket_line__block first done">
          <img src='/assets/line_assets/one.png' alt='one' className='line_number' />
          <p>Билеты</p>
          <img src='/assets/line_assets/arrow.png' alt='arrow' className='line_arrow' />
        </div>
        <div className="ticket_line__block second">
          <img src='/assets/line_assets/two.png' alt='two' className='line_number' />
          <p>Пассажиры</p>
        </div>
        <div className="ticket_line__block third">
          <img src='/assets/line_assets/three.png' alt='three' className='line_number' />
          <p>Оплата</p>
        </div>
        <div className="ticket_line__block fourth">
          <img src='/assets/line_assets/four.png' alt='four' className='line_number' />
          <p>Провека</p>
        </div>
      </div>

      <div className="ticket_main">
        <div className="ticket_filter"></div>
        <div className="ticket_cards"></div>
        <div className="ticket_last-tickets"></div>
      </div>
    </>
  );
};

export default withRouter(TicketPage);
