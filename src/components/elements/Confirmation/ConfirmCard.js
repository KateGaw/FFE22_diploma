import React from "react";
import { withRouter } from "react-router-dom";

import TrainBlock from "./TrainBlock";
import PassengerBlock from "./PassengerBlock";
import PaymentBlock from "./PaymentBlock";

const ConfirmCard = (props) => {

  const confirmClickHandler = () => {
    console.log("go to success page!");
  };
  
  return (
    <div className="confirm_main_block">
      <TrainBlock />
      <PassengerBlock />
      <PaymentBlock />
      <button
        className="button_orange confirm_button"
        onClick={confirmClickHandler}
      >
        подтвердить
      </button>
    </div>
  );
};

export default withRouter(ConfirmCard);
