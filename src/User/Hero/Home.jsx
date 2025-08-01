import React from "react";
import Navbar from "../Features.jsx/Navbar";
import Section1 from "./section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4/>
    </div>
  );
};

export default Home;
