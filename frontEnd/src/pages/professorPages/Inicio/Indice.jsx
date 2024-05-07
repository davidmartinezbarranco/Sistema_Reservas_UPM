import React from "react";
import BarraNavegacion from "./componentes/BarraNavegacion";
import PanelReservas from "./componentes/PanelReservas";
import { NextUIProvider } from "@nextui-org/react";
import styles from "./../../styles/BarraNavegacion.module.css"

function Indice() {
  return (
    <div>
      <NextUIProvider>
        <div className={styles.Indice}>
          <main className="bg-azul text-foreground min-h-screen">
            <div>
              <BarraNavegacion></BarraNavegacion>
            </div>
            <div className={styles.content}>
              <PanelReservas></PanelReservas>
            </div>

          </main>
        </div>

      </NextUIProvider >


    </div>

  );
}

export default Indice;
