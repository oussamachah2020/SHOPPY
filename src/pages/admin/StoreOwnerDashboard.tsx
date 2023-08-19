import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import LineChart from "./components/Charts";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Box, Modal } from "@mui/material";
import AddProductForm from "./components/AddProductForm";
import ProductsTable from "./components/ProductsTable";
import { ref as databaseRef, off, onValue } from "firebase/database";
import { fetchedProduct, ordersType } from "../../types/types";
import moment from "moment";
import useAuthStore from "../../store/authStore";

const StoreOwnerDashboard = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [adminProducts, setAdminProducts] = useState<fetchedProduct[]>([]);
  const [orders, setOrders] = React.useState<ordersType[]>([]);

  const { user, setUser } = useAuthStore();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/admin-sign-in");
      } else {
        setUser(user);
      }
    });
  }, []);

  useEffect(() => {
    const dbRef = databaseRef(db, "products/" + user?.uid);
    onValue(dbRef, (snapshot) => {
      if (!snapshot.exists()) {
        return;
      }

      const data = snapshot.val();
      if (data) {
        setAdminProducts(Object.values(data));
      }
    });

    return () => {
      off(dbRef);
    };
  }, [user?.uid]);

  useEffect(() => {
    const dbRef = databaseRef(db, "purchase/");

    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();

        if (typeof data === "object") {
          orders.push(data);
        }
      });

      orders.sort((a, b) => {
        const orderedAtAUnix = moment(a.ordered_at).format();
        const orderedAtBUnix = moment(b.ordered_at).format();
        return moment(orderedAtBUnix).diff(orderedAtAUnix);
      });

      setOrders(orders);
    });

    return () => {
      off(dbRef);
    };
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <div className="flex justify-between mt-5 gap-5 items-start px-5 w-full">
        <div className="cards-container">
          <div className="card w-[200%] bg-gradient-to-r bg-[#fff] text-black shadow-xl mb-16">
            <div className="card-body">
              <h2 className="card-title">ORDERS</h2>
              <p>You have {orders.length} orders</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary text-white"
                  onClick={() => navigate("/orders")}
                >
                  Check All
                </button>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="card w-[200%] bg-[#fff] text-black shadow-xl">
            <div className="card-body">
              <h2 className="card-title">PRODUCTS</h2>
              <p>Your Existing Products: {adminProducts.length}</p>
              <div className="card-actions justify-end mt-5">
                <button
                  className="btn btn-primary text-white"
                  onClick={handleOpen}
                >
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
        <Box>
          <AddProductForm userId={user?.uid} closeModal={handleClose} />
        </Box>
      </Modal>

      <ProductsTable rows={adminProducts} />
    </React.Fragment>
  );
};

export default StoreOwnerDashboard;
