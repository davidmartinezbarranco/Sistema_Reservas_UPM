import React from "react";
import "./PanelReservas.css";
import {Card, CardBody} from "@nextui-org/react";





function PanelReservas() {

    return (
        <div>
            <p id="panel-title">PANEL DE RESERVAS</p>
            <div className="grid">

                <Card className="panel-box">
                    <CardBody >
                        <p className="center bold-text big-text">Realizar reserva</p>
                        <img src="/public/realizarReserva.png" alt="realizar-reserva-button" className="w-14 h-14 center panel-images"/>

                    </CardBody>
                    
                </Card>

                <Card className="panel-box">
                    <CardBody >
                        <p className="center bold-text big-text">Modificar reserva</p>
                        <img src="/public/modificarReserva.png" alt="realizar-reserva-button" className="w-14 h-14 center panel-images"/>

                    </CardBody>
                    
                </Card>

                <Card className="panel-box">
                    <CardBody>
                        <p className="center bold-text big-text">Cancelar reserva</p>
                        <img src="/public/cancelarReserva.png" alt="realizar-reserva-button" className="w-14 h-14 center panel-images"/>

                    </CardBody>
                    
                </Card>
            </div>



        </div>

    );
}

export default PanelReservas;