import React from "react";
import BarraNavegacion from "./componentes/BarraNavegacion";
import PanelReservas from "./componentes/PanelReservas";
import { NextUIProvider } from "@nextui-org/react";

function Index() {
  return (
    <div>
      <NextUIProvider>
        <main className="bg-azul text-foreground min-h-screen">
          <BarraNavegacion></BarraNavegacion>
          <PanelReservas></PanelReservas>
        </main>
      </NextUIProvider >

      
    </div>

  );
}

export default Index;
