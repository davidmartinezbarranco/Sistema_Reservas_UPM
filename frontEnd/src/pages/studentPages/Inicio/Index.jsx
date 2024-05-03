import React from "react";
import BarraNavegacion from "./componentes/BarraNavegacion";
import PanelReservas from "./componentes/PanelReservas";
import { NextUIProvider } from "@nextui-org/react";
import styles from "./../../styles/BarraNavegacion.module.css";

function Index() {
  return (
    <div>
      <NextUIProvider>
        <main className="bg-azul text-foreground min-h-screen">
          <div>
            <BarraNavegacion></BarraNavegacion>
          </div>
          <div className={styles.content}>
            <PanelReservas></PanelReservas>
          </div>
        </main>
      </NextUIProvider >


    </div>

  );
}

export default Index;
