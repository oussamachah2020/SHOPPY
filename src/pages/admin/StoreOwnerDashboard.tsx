import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import LineChart from "./components/Charts";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import AddProductForm from "./components/AddProductForm";

const StoreOwnerDashboard = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <div className="card w-[200%] bg-gradient-to-r bg-[#fff] text-black shadow-xl mb-16">
            <div className="card-body">
              <h2 className="card-title">ORDERS</h2>
              <p>You have 5 orders</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Check All</button>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="card w-[200%] bg-[#fff] text-black shadow-xl">
            <div className="card-body">
              <h2 className="card-title">PRODUCTS</h2>
              <p>Your Existing Products 10</p>
              <div className="card-actions justify-end mt-5">
                <button className="btn btn-primary" onClick={handleOpen}>
                  Add a product
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <LineChart />
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddProductForm userId={user?.uid} />
      </Modal>
    </React.Fragment>
  );
};

export default StoreOwnerDashboard;
