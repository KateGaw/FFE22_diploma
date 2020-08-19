import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { express, wifi, food } from "../consts/consts";
import { MoneyFormat } from "./MoneyFormat";

const LastTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (tickets.length === 0) {
      api.getLastTickets(setTickets);
    }
  }, [tickets]);

  return (
    tickets.length !== 0 && (
      <div className="last_tickets">
        <h3>последние билеты</h3>
        {tickets.map(
          (item, index) =>
            index < 3 && (
              <div className="last_ticket__card" key={index}>
                <div className="last_ticket__card-top">
                  <div className="card_top-left">
                    {item.departure.from.city.name}{" "}
                    <p>{item.departure.from.railway_station_name} вокзал</p>
                  </div>
                  <div className="card_top-right">
                    {item.departure.to.city.name}{" "}
                    <p>{item.departure.to.railway_station_name} вокзал</p>
                  </div>
                </div>
                <div className="last_ticket__card-bottom">
                  <div className="card_bottom-left">
                    {item.departure.is_express && express}
                    {item.departure.have_wifi && wifi}
                    {food}
                  </div>
                  <MoneyFormat
                    classList="card_bottom-right"
                    text="от"
                    price={item.departure.min_price}
                  />
                </div>
              </div>
            )
        )}
      </div>
    )
  );
};

export default LastTickets;
