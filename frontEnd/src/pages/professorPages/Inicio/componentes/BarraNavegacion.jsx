import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import { Button, Link } from "@nextui-org/react";
import styles from "./../../../styles/BarraNavegacion.module.css"

function BarraNavegacion() {
  return (
    <Navbar className={styles["nav-bar"]}>
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
          <Link href="/Indice">
          
            <Button color="primary">INICIO</Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/EspaciosReservados">
          <Button color="primary"> ESPACIOS RESERVADOS </Button>
          </Link>

        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/">
            <Button color="primary" variant="flat">
              CERRAR SESIÓN
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>

  );
}

export default BarraNavegacion;