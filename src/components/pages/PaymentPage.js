import React from "react";

import { withRouter } from "react-router-dom";
import ProgressBar from "../elements/ProgressBar";
import PassengersSideBar from "../elements/Passengers/PassengersSideBar";
import PaymentCard from "../elements/Payment/PaymentCard";

const PassengersPage = (props) => {
  return (
    <>
      <ProgressBar />
      <div className="tickets_main">
        <PassengersSideBar />
        <PaymentCard />
      </div>
    </>
  );
};

export default withRouter(PassengersPage);
