import Hero from "../components/widgets/Hero";
import Navbar from "../components/widgets/Navbar";
import React from "react";
import Products from "../components/widgets/Products";

const Dashboard = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Hero />
      </div>
      <div>
        <Products />
      </div>
    </div>
  );
};

export default Dashboard;
