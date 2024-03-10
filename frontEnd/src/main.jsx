import React from "react";
import ReactDOM from "react-dom/client";

import "tailwindcss/tailwind.css";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Signin from "./pages/NotRegistered";
import Index from "./pages/studentPages/Inicio/Index";
import Reserva from "./pages/studentPages/Reserva";
import Inicio from "./pages/Inicio";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Inicio />,
  },
  {
    path: "/Index",
    element: <Index />,
  },
  
]);

const router2 = createBrowserRouter([
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/Reserva",
    element: <Reserva />,
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
        <RouterProvider router={routes} />
);