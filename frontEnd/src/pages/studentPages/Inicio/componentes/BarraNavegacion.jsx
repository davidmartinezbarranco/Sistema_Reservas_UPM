import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import { Button, Link } from "@nextui-org/react";
import styles from "./../../../styles/BarraNavegacion.module.css"
import { deleteToken } from "../../../../helpers";
import { UserIcon } from "../../../../../public/UserIcon";


function BarraNavegacion() {
  const cerrarSesion = () => {
    deleteToken();
    localStorage.removeItem("id");
    window.location.href = "/";
  };

  const goToProfilePage = () => {
    window.location.href = "/Profile";
  }

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
          <Link href="/Index">

            <Button color="primary">INICIO</Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/MisReservas">
            <Button color="primary">MIS RESERVAS</Button>
          </Link>

        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
      <NavbarItem>
          <Button color="primary" variant="bordered" startContent={<UserIcon />} onClick={goToProfilePage}>
            Mi perfil
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            color="primary"
            variant="flat"
            onClick={cerrarSesion}
          >
            CERRAR SESIÓN
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>

  );
}




export default BarraNavegacion;