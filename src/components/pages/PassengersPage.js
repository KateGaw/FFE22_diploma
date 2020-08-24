import React, { useState, useEffect } from "react";

import { routePaths } from "../../routePaths";
import { withRouter } from "react-router-dom";
import ProgressBar from "../elements/ProgressBar";
import PassengersSideBar from "../elements/Passengers/PassengersSideBar";
import PassengerCard from "../elements/Passengers/PassengerCard";
import { getItemsArray, addItem } from "../../utils/localStorage";

const getPassengers = (seats) => {
  let output = [],
    i = 0,
    j = 0,
    k = 0;
  while (i < seats.adult_passengers) {
    output.push({ passenger: "adult" });
    i += 1;
  }
  while (j < seats.child_passengers) {
    output.push({ passenger: "child" });
    j += 1;
  }
  while (k < seats.child_no_place) {
    output.push({ passenger: "child_no_place" });
    k += 1;
  }
  return output;
};

const PassengersPage = (props) => {
  const info = getItemsArray();
  const seats_departure = JSON.parse(info.seats_departure);
  const ticket_data = JSON.parse(info.ticket_data);
  const passegers_counter = getPassengers(seats_departure);

  const [personalData, setPersonalData] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data.length !== 0) {
      setPersonalData({ ...personalData, [data.id]: data });
    }
    // eslint-disable-next-line
  }, [data]);

  const nextPageClickHandler = () => {
    if (personalData[passegers_counter.length - 1]) {
      setError(null);
      addItem("personal_data", JSON.stringify(personalData));
      props.history.push(routePaths.PaymentPage);
    } else {
      setError(
        "Вы должны заполнить все карточки пассажиров или удалить лишние!"
      );
    }
  };

  return (
    <>
      <ProgressBar />
      <div className="tickets_main">
        <PassengersSideBar
          seats_departure={seats_departure}
          ticket_data={ticket_data}
        />
        <div>
          {passegers_counter.map((item, index) => (
            <PassengerCard
              id={index}
              type={item.passenger}
              key={index}
              setData={setData}
            />
          ))}
          <button
            className="button_orange passengers_next_btn"
            onClick={nextPageClickHandler}
          >
            Далее
          </button>
          {error !== null && <div className="error_div">{error}</div>}
        </div>
      </div>
    </>
  );
};

export default withRouter(PassengersPage);
