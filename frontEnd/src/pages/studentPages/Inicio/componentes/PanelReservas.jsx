import React from "react";
import "./PanelReservas.css";
import { Card, CardBody } from "@nextui-org/react";
import { Link } from 'react-router-dom';






function PanelReservas() {
    cambiarNavBar();



    function cambiarNavBar(){
        
    }

    return (
        <div>
            <p id="panel-title">PANEL DE RESERVAS</p>
            <div className="grid">
                <Link to="/Reserva">

                    <Card className="panel-box">
                        <CardBody >
                            <p className="center bold-text big-text">Realizar reserva</p>
                            <img src="/public/realizarReserva.png" alt="realizar-reserva-button" className="w-14 h-14 center panel-images" />

                        </CardBody>

                    </Card>
                </Link>
                <Link>

                    <Card className="panel-box">
                        <CardBody >
                            <p className="center bold-text big-text">Modificar reserva</p>
                            <img src="/public/modificarReserva.png" alt="realizar-reserva-button" className="w-14 h-14 center panel-images" />

                        </CardBody>

                    </Card>
                </Link>
                <Link>

                    <Card className="panel-box">
                        <CardBody>
                            <p className="center bold-text big-text">Cancelar reserva</p>
                            <img src="/public/cancelarReserva.png" alt="realizar-reserva-button" className="w-14 h-14 center panel-images" />

                        </CardBody>

                    </Card>
                </Link>
            </div>



        </div>

    );
}

export default PanelReservas;