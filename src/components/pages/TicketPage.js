import React, { useEffect, useState } from "react";
import TicketsFilter from "../elements/TicketPage/TicketsFilter";
import TicketCard from "../elements/TicketPage/TicketCard";

import { withRouter } from "react-router-dom";
import api from "../../utils/api";

const ArrowBlock = () => {
  return (
    <div className="arrow-2">
      <div className="arrow-2-top"></div>
      <div className="arrow-2-bottom"></div>
    </div>
  );
};

const TicketPage = (props) => {
  // console.log(props.history.location.state);
  const [results, setResults] = useState([]);
  const id = {
    id_from: props.history.location.state.data.from_id,
    id_to: props.history.location.state.data.in_id,
  };

  // Получаем карточки поездов
  useEffect(() => {
    api.getRoutes(id.id_from, id.id_to, setResults);
  }, [id]);

  return (
    <>
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
        <TicketsFilter />

        {results.total_count > 0 ? (
          <div className="ticket_cards">
            <div>Найдено: {results.total_count}</div>
            {results.items.map((item, index) => (
              <TicketCard key={index} data={item} />
            ))}
          </div>
        ) : (
          <div>NotFound</div>
        )}

        <div className="ticket_last-tickets"></div>
      </div>
    </>
  );
};

export default withRouter(TicketPage);
