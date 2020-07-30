import React from "react";

import { withRouter } from "react-router-dom";

const HeaderTickets = (props) => {
  console.log(props.history.location.state.data);
  return <h1>Hi</h1>;
};

export default withRouter(HeaderTickets);
