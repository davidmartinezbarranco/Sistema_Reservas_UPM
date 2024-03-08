import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";


function Index() {
  return (
    <NextUIProvider>
      <main className=" bg-azul text-foreground min-h-screen grid place-content-center">
        <Navbar className="fixed">
          <NavbarBrand>
            <img
              alt="Logo Sistema de Reserva"
              src="/public/Logo.png"
              className="w-14 h-14"
            />
            <p className="ml-2 font-bold text-inherit">SIRA</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link href="/Reserva">
                <Button color="primary">Realizar reserva</Button>
              </Link>
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
              <Link href="/Inicio">
                <Button color="primary" variant="flat">
                  Cerrar sesion
                </Button>
              </Link>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </main>
    </NextUIProvider>
  );
}

export default Index;
