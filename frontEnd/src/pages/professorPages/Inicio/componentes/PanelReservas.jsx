import React from "react";
import styles from "./PanelReservas.module.css";
import { Card, CardBody } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import classNames from 'classnames';


function PanelReservas() {
    const boxTitle = classNames(
        styles["center"],
        styles["bold-text"],
        styles["big-text"],
    );

    const imageStyle = classNames(
        "w-14",
        "h-14",
        styles.center,
        styles["panel-images"]
    );

    return (
        <div>
            <p id={styles["panel-title"]}>PANEL DE RESERVAS</p>
            <div className={styles.grid}>
                <Link to="/CrearReserva">
                    <Card className={styles["panel-box"]}>
                        <CardBody >
                            <p className={boxTitle}> Reservar aula </p>
                            <img src="/public/realizarReserva.png" alt="realizar-reserva-button" className={imageStyle} />
                        </CardBody>

                    </Card>
                </Link>
                <Link>
                    <Card className={styles["panel-box"]}>
                        <CardBody >
                            <p className={boxTitle} > Consultar aulas </p>
                            <img src="/public/consulta.png" alt="realizar-reserva-button" className={imageStyle} />
                        </CardBody>

                    </Card>
                </Link>
            </div>
        </div>
    );
}

export default PanelReservas;