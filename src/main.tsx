import React from "react";
// import App from './App.tsx'
import "./index.css";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import Purchase from "./pages/Purchase";

import AuthModal from "./pages/admin/AuthModal";
import StoreOwnerDashboard from "./pages/admin/StoreOwnerDashboard";
import Orders from "./pages/admin/Orders";
import OrderDetails from "./pages/admin/OrderDetails";
import { NextUIProvider } from "@nextui-org/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/purchases",
    element: <Purchase />,
  },
  {
    path: "/admin-sign-in",
    element: <AuthModal />,
  },
  {
    path: "/admin",
    element: <StoreOwnerDashboard />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/order/:orderKey",
    element: <OrderDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </NextUIProvider>
    {/* <App /> */}
  </React.StrictMode>
);
