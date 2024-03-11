import React from "react";
import "./PanelReservas.css";
import {Card, CardBody} from "@nextui-org/react";





function PanelReservas() {

    return (
        <div>
            <p id="title-panel">Panel de Reservas</p>
            <div className="grid">

                <Card>
                    <CardBody>
                        <p>Realizar reserva</p>
                        <img src="/public/realizarReserva.png" alt="realizar-reserva-button" className="w-14 h-14 center"/>

                    </CardBody>
                    
                </Card>

                <Card>
                    <CardBody>
                        <p>Mis reservas</p>
                    </CardBody>
                    
                </Card>

                <Card>
                    <CardBody>
                        <p>Opción 3</p>
                    </CardBody>
                    
                </Card>

                <Card>
                    <CardBody>
                        <p>Opción 4</p>
                    </CardBody>
                    
                </Card>

            
            </div>



        </div>

    );
}

export default PanelReservas;