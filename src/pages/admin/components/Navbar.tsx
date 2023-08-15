import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { useEffect, useState } from "react";
import { limitToLast, off, onValue, query, ref } from "firebase/database";
import { ordersType } from "../../../types/types";

const Navbar = () => {
  const [ordersCounter, setOrdersCounter] = useState<number | undefined>();
  const [lastOrder, setLastOrder] = useState<ordersType>();

  const navigate = useNavigate();
  const logout = () => {
    signOut(auth).then(() => {
      navigate("/sign-in");
    });
  };

  useEffect(() => {
    const dbRef = ref(db, "purchase/");

    const lastOrderRef = query(dbRef, limitToLast(2));

    onValue(lastOrderRef, (snapshot) => {
      const data = snapshot.val();
      const order = { ...data };
      delete order.ordersCounter;

      setLastOrder(Object.values(order));
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
              tabIndex={1}
              className="menu menu-md dropdown-content mt-3 z-[1] text-white p-4 shadow bg-[#000000d5] rounded-box w-64"
            >
              <li
                className={`${
                  ordersCounter && ordersCounter > 0
                } ? bg-[rgba(255,255,255,0.2)] : bg-transparent px-2 py-3`}
              >
                <div className="flex flex-nowrap justify-center items-center">
                  <img src={lastOrder?.imageURL} alt={lastOrder?.title} />
                  <h2>{lastOrder?.title}</h2>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
