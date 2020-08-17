import React from "react";

import { routePaths } from "../../routePaths";
import { withRouter } from "react-router-dom";
import ProgressBar from "../elements/ProgressBar";
import PassengersSideBar from "../elements/Passengers/PassengersSideBar";
import PassengeCard from "../elements/Passengers/PassengerCard";

const PassengersPage = (props) => {
  const nextPageClickHandler = () => {
    props.history.push(routePaths.PaymentPage);
  };
  return (
    <>
      <ProgressBar />
      <div className="tickets_main">
        <PassengersSideBar />
        <div>
          <PassengeCard />
          <button
            className="button_orange passengers_next_btn"
            onClick={nextPageClickHandler}
          >
            Далее
          </button>
        </div>
      </div>
    </>
  );
};

export default withRouter(PassengersPage);
