import React from "react";

import MainHeader from "../elements/MainHeader";
import About from "../elements/About";
import HowItWorks from "../elements/HowItWorks";
import Rewiews from "../elements/Reviews";
import Footer from "../elements/Footer";

const MainPage = () => {
  return (
    <>
      <MainHeader />
      <About />
      <HowItWorks />
      <Rewiews />

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default MainPage;
