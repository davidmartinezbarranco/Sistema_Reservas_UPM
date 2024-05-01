import React from "react";
import ReactDOM from "react-dom/client";

import "tailwindcss/tailwind.css";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/studentPages/Inicio/Index";
import Inicio from "./pages/LoginPage/Inicio";
import Reserva from "./pages/studentPages/Reserva/Reserva"
import MisReservas from "./pages/studentPages/MisReservas/MisReservas"
import Edicion from "./pages/studentPages/Edicion/Edicion";
import Detalles from "./pages/studentPages/Detalles/Detalles";

import Indice from "./pages/professorPages/Inicio/Indice";
import ReservaAula from "./pages/professorPages/ReservaAula/ReservaAula";


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
  {
    path: "/Edicion",
    element: <Edicion />,
  },
  {
    path: "/Detalles",
    element: <Detalles />,
  },
  {
    path: "/Indice",
    element: <Indice />,
  },
  {
    path: "/ReservaAula",
    element: <ReservaAula />,
  },
  
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={routes} />
);