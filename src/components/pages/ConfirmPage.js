import React from "react";

import { withRouter } from "react-router-dom";
import ProgressBar from "../elements/ProgressBar";
import PassengersSideBar from "../elements/Passengers/PassengersSideBar";
import ConfirmCard from "../elements/Confirmation/ConfirmCard";
import { getItemsArray } from "../../utils/localStorage";

const PassengersPage = (props) => {
  const info = getItemsArray();
  const seats_departure = JSON.parse(info.seats_departure);
  const ticket_data = JSON.parse(info.ticket_data);
  return (
    <>
      <ProgressBar />
      <div className="tickets_main">
        <PassengersSideBar
          seats_departure={seats_departure}
          ticket_data={ticket_data}
        />
        <ConfirmCard />
      </div>
    </>
  );
};

export default withRouter(PassengersPage);
