import React from "react";
// import App from './App.tsx'
import "./index.css";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import Purchase from "./pages/Purchase";

import global_fr from "./translation/fr/gloabal.json";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import AuthModal from "./pages/admin/AuthModal";
import StoreOwnerDashboard from "./pages/admin/StoreOwnerDashboard";
import Orders from "./pages/admin/Orders";
import OrderDetails from "./pages/admin/OrderDetails";
import { NextUIProvider } from "@nextui-org/react";

// import SignUp from "./pages/auth/SignUp";
// import SignIn from "./pages/auth/SignIn";

i18next.use(initReactI18next).init({
  resources: {
    fr: {
      global: global_fr,
    },
  },
  lng: document.querySelector("html")?.lang,
  interpolation: {
    escapeValue: true,
  },
});

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
  // {
  //   path: "sign-up",
  //   element: <SignUp />,
  // },
  // {
  //   path: "sign-in",
  //   element: <SignIn />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <I18nextProvider i18n={i18next}>
        <RouterProvider router={router} />
        <Toaster position="top-right" reverseOrder={false} />
      </I18nextProvider>
    </NextUIProvider>
    {/* <App /> */}
  </React.StrictMode>
);
