import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import { Button, Link } from "@nextui-org/react";


function BarraNavegacion() {
  return (
    <Navbar>
      <NavbarBrand>
        <img
          alt="Logo Sistema de Reserva"
          src="/public/Logo.png"
          className="w-14 h-14"
        />
        <p className="ml-2 font-bold text-inherit">Sistema de reserva de aulas</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/Reserva">
            <Button color="primary">Inicio</Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/Reserva">
            <p>Mis reservas</p>
          </Link>

        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/">
            <Button color="primary" variant="flat">
              Cerrar sesion
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>

  );
}

export default BarraNavegacion;