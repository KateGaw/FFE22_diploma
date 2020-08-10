import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { routePaths } from "./routePaths";

import Header from "./components/elements/Header/Header";
import MainPage from "./components/pages/MainPage";
import TicketPage from "./components/pages/TicketPage";
import ErrorPage from "./components/pages/ErrorPage";
import Footer from "./components/elements/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={routePaths.MainPage} component={MainPage} />
        <Route path={routePaths.TicketPage} component={TicketPage} />
        <Route component={ErrorPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
