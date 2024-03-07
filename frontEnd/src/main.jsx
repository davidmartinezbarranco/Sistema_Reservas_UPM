import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import "tailwindcss/tailwind.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Signin from "./pages/NotRegistered";
import Index from "./pages/studentPages/Index";
import Reserva from "./pages/studentPages/Reserva";
import Inicio from "./pages/Inicio";

const router = createBrowserRouter([
  {
    path: "/Inicio",
    element: <Inicio />,
  },
  {
    path: "/",
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
  <NextUIProvider>
      <main className=" bg-azul text-foreground min-h-screen grid place-content-center">
        <RouterProvider router={router} />
      </main>
  </NextUIProvider>


);