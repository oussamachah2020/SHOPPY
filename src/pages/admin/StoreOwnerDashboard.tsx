import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import LineChart from "./components/Charts";
import Table from "./components/Table";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const StoreOwnerDashboard = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (user == null) {
      navigate("/sign-in");
    }
  }, [navigate, user]);

  return (
    <React.Fragment>
      <Navbar />
      <div className="flex justify-between mt-5 gap-5 items-start px-5 w-full">
        <div className="cards-container">
          <div className="card w-[200%] bg-[#171717] shadow-xl mb-16">
            <div className="card-body">
              <h2 className="card-title">ORDERS</h2>
              <p>You have 5 orders</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Check All</button>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="card w-[200%] bg-[#171717] shadow-xl">
            <div className="card-body">
              <h2 className="card-title">PRODUCTS</h2>
              <p>Your Existing Products 10</p>
              <div className="card-actions justify-end mt-5">
                <button className="btn btn-primary">Add a product</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <LineChart />
        </div>
      </div>
      <h2 className="m-6 text-black text-xl">List of clients</h2>
      <Table />
    </React.Fragment>
  );
};

export default StoreOwnerDashboard;
