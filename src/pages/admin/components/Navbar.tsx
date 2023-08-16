/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { useEffect, useState } from "react";
import { off, onValue, ref, update } from "firebase/database";
import { ordersType } from "../../../types/types";
import moment from "moment";

const Navbar = () => {
  const [ordersCounter, setOrdersCounter] = useState<number>(0);
  const [newOrders, setNewOrders] = useState<ordersType[]>([]);

  const navigate = useNavigate();
  const logout = () => {
    signOut(auth).then(() => {
      navigate("/sign-in");
    });
  };

  // const checkOrders = () => {

  // };

  const updateOrderAndCounterStates = () => {
    const dbRef = ref(db, "purchase/");

    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childItem = childSnapshot.val();
        if (childItem.seen == false) {
          const childRef = ref(db, "purchase/" + childSnapshot.key);

          update(childRef, {
            seen: true,
          });
        }
      });
    });

    const counterReset = {
      ordersCounter: 0,
    };

    update(dbRef, counterReset);

    navigate("/orders");
  };

  useEffect(() => {
    const dbRef = ref(db, "purchase/");

    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const orderData = childSnapshot.val();

        if (typeof orderData === "object" && orderData.seen === false) {
          newOrders.push(orderData);
        }
      });
      newOrders.sort((a, b) => {
        const orderedAtAUnix = moment(a.ordered_at).format();
        const orderedAtBUnix = moment(b.ordered_at).format();
        return moment(orderedAtBUnix).diff(orderedAtAUnix);
      });

      setNewOrders(newOrders);
    });

    return () => {
      off(dbRef);
    };
  }, []);

  useEffect(() => {
    const ordersCounterRef = ref(db, "purchase/");

    onValue(ordersCounterRef, (snapshot) => {
      const count = snapshot.val().ordersCounter;
      setOrdersCounter(count);
    });

    return () => {
      off(ordersCounterRef);
    };
  }, [ordersCounter]);

  return (
    <div>
      <div className="navbar bg-[#5a38e4]">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost text-white btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box w-52"
            >
              <li onClick={logout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-white normal-case text-xl">SHOPPY</a>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost text-white btn-circle">
              <button className="btn btn-ghost btn-circle text-white">
                <div className="indicator">
                  <Badge badgeContent={ordersCounter} color="error">
                    <NotificationsIcon sx={{ color: "#fff" }} />
                  </Badge>
                </div>
              </button>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content mt-3 z-[1] text-white p-4 shadow bg-[#000000d5] rounded-box w-96 overflow-auto"
            >
              {ordersCounter > 0 ? (
                newOrders.map((order) => (
                  <li key={order.orderId} onClick={updateOrderAndCounterStates}>
                    <div
                      className={`${
                        ordersCounter > 0 && order.seen === false
                      } ? bg-[rgba(255,255,255,0.19)] : bg-transparent px-2 py-3 flex flex-wrap justify-between items-center w-[100%] mt-2 overflow-auto`}
                    >
                      <div className="flex flex-nowrap justify-between gap-3 items-center w-[100%]">
                        <img
                          src={order?.imageURL}
                          alt={order?.title}
                          className="w-[80px] h-[80px]"
                        />
                        <div>
                          <p className="w-[100%] text-md text-red-400">
                            New Order
                          </p>
                          <p className="w-[100%] text-md">{order?.title}</p>
                        </div>
                      </div>
                      <p>
                        Client:{" "}
                        <span className="font-bold text-red-400">
                          {order.name}
                        </span>
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <p>No order for the moment</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
