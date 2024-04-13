import React from "react";
import ReactDOM from "react-dom/client";

import "tailwindcss/tailwind.css";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/studentPages/Inicio/Index";
import Inicio from "./pages/LoginPage/Inicio";
import Reserva from "./pages/studentPages/Reserva/Reserva"
import MisReservas from "./pages/studentPages/MisReservas/MisReservas"


const routes = createBrowserRouter([
  {
    path: "/",
    element: <Inicio />,
  },
  {
    path: "/Index",
    element: <Index />,
  },
  {
    path: "/Reserva",
    element: <Reserva />,
  },
  {
    path: "/MisReservas",
    element: <MisReservas />,
  },
  
]);


ReactDOM.createRoot(document.getElementById("root")).render(
        <RouterProvider router={routes} />
);