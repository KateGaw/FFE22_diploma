import React from "react";

import { withRouter } from "react-router-dom";
import ProgressBar from "../elements/ProgressBar";
import PassengersSideBar from "../elements/Passengers/PassengersSideBar";
import ConfirmCard from "../elements/Confirmation/ConfirmCard";

const PassengersPage = (props) => {
  return (
    <>
      <ProgressBar />
      <div className="tickets_main">
        <PassengersSideBar />
        <ConfirmCard />
      </div>
    </>
  );
};

export default withRouter(PassengersPage);
