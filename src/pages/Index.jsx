import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";

import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";

function Index() {
  return (
    <Navbar className="fixed">
      <NavbarBrand>
        <img
          alt="Logo Sistema de Reserva"
          src="Logo.png"
          className="w-14 h-14"
        />
        <p className="ml-2 font-bold text-inherit">SIRA</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <p>Realizar reserva</p>
        </NavbarItem>
        <NavbarItem>
          <p>Cancelar reserva</p>
        </NavbarItem>
        <NavbarItem>
          <p>Mis reservas</p>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/Login">
            <Button color="primary" variant="flat">
              Cerrar sesion
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Index;
