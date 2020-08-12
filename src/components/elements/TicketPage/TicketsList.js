import React, { useState } from "react";
import TicketCard from "./TicketCard";
import Pagination from "./Pagination";

const TicketsList = ({ info, setInfo, results, setStep }) => {
  const sortValues = [
    { id: "date", value: "дате" },
    { id: "price_min", value: "цене" },
    { id: "duration", value: "продолжительности" },
  ];

  const [choosenLimit, setChoosenLimit] = useState(5);
  const limits = [{ value: 5 }, { value: 10 }, { value: 15 }];

  const handleChange = (event) => {
    setInfo({
      ...info,
      sort: event.target.value,
    });
  };

  const handleClickNumber = (event) => {
    setChoosenLimit(event.target.id);
    setInfo({
      ...info,
      limit: event.target.id,
    });
  };


  return results.total_count > 0 ? (
    <div className="ticket_cards">
      <div className="tickets_top_filters">
        <div className="find_items">найдено {results.total_count}</div>
        <div className="filters_top_right">
          <div className="sort_items">
            сортировать по: &nbsp;
            <select
              value={info.sort}
              onChange={handleChange}
              className="select"
            >
              {sortValues.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
          <div className="show_items">
            <p>показывать по:</p>
            {limits.map((item) => (
              <p
                key={item.value}
                id={item.value}
                className={
                  Number(choosenLimit) === item.value
                    ? "show_items__number active"
                    : "show_items__number"
                }
                onClick={handleClickNumber}
              >
                {item.value}
              </p>
            ))}
          </div>
        </div>
      </div>
      {results.items.map((item, index) => (
        <TicketCard key={index} data={item} setStep={setStep} />
      ))}
      {results.total_count > info.limit && (
        <Pagination max={results.total_count} info={info} setInfo={setInfo} />
      )}
    </div>
  ) : (
    <div>NotFound</div>
  );
};

export default TicketsList;
