import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import LineChart from "./components/Charts";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Box, Modal } from "@mui/material";
import AddProductForm from "./components/AddProductForm";
import ProductsTable from "./components/ProductsTable";
import { ref as databaseRef, get } from "firebase/database";
import { fetchedProduct } from "../../types/types";

const StoreOwnerDashboard = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [open, setOpen] = React.useState(false);
  const [adminProducts, setAdminProducts] = React.useState<fetchedProduct[]>(
    []
  );

  const [orders, setOrders] = React.useState<unknown[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/sign-up");
      }
    });
  }, [navigate]);

  const fetchAdminProducts = async () => {
    const dbRef = databaseRef(db, "products/" + user?.uid);

    await get(dbRef)
      .then((snapshot) => {
        const data = snapshot.val();
        if (!snapshot.exists()) {
          setAdminProducts([]);
        }

        setAdminProducts(Object.values(data));
      })
      .catch((err) => console.error(err));
  };

  const fetchOrders = async () => {
    const dbRef = databaseRef(db, "purchase/");

    await get(dbRef)
      .then((snapshot) => {
        const data = snapshot.val();
        if (!snapshot.exists()) {
          setOrders([]);
        }

        setOrders(Object.values(data));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAdminProducts();
  }, [adminProducts]);

  useEffect(() => {
    fetchOrders();
  }, [orders]);

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
                <button className="btn btn-primary">Check All</button>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="card w-[200%] bg-[#fff] text-black shadow-xl">
            <div className="card-body">
              <h2 className="card-title">PRODUCTS</h2>
              <p>Your Existing Products: {adminProducts.length}</p>
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
        <Box>
          <AddProductForm userId={user?.uid} closeModal={handleClose} />
        </Box>
      </Modal>

      <ProductsTable rows={adminProducts} />
    </React.Fragment>
  );
};

export default StoreOwnerDashboard;
