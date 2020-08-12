import React from "react";
import TrainTicket from "./TrainTicket";

const ChooseSeat = (props) => {
  return (
    <div className='ticket_info_block'>
      <h2>Выбор мест</h2>
      <TrainTicket />
      <div>
        <button>Далее</button>
      </div>
    </div>
  );
};

export default ChooseSeat;
