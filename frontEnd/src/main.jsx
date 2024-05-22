import React from "react";
import ReactDOM from "react-dom/client";

import "tailwindcss/tailwind.css";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/studentPages/Inicio/Index";
import Inicio from "./pages/LoginPage/Inicio";
import Reserva from "./pages/studentPages/Reserva/Reserva"
import MisReservas from "./pages/studentPages/MisReservas/MisReservas"
import Detalles from "./pages/studentPages/Detalles/Detalles";

import Indice from "./pages/professorPages/Inicio/Indice";
import ReservaAula from "./pages/professorPages/ReservaAula/ReservaAula";
import AulasReservadas from "./pages/professorPages/AulasReservadas/AulasReservadas";
import DetallesReserva from "./pages/professorPages/Detalles/DetallesReserva";
import Profile from "./pages/profilePage/profile";


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
  {
    path: "/AulasReservadas",
    element: <AulasReservadas />,
  },
  {
    path: "/DetallesReserva",
    element: <DetallesReserva />,
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
  
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={routes} />
);