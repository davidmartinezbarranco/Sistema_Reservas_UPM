import { Input, Button, ButtonGroup, Card, CardHeader, CardBody, Link } from "@nextui-org/react";
import styles from './DetallesReserva.module.css';
import BarraNavegacion from "../Inicio/componentes/BarraNavegacion";
import { useEffect, useState } from "react";


function DetallesReserva() {

    const [reserva, setReserva] = useState(null);
    const [idReserva, setIdReserva] = useState(obtenerID());
    const [mostrarDatos, setMostrarDatos] = useState(false);

    const fetchData = () => {
        let id = 10;
        return fetch("http://localhost:8080/reservations/user/" + id)
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se han obtenido los datos.");
                }
                return response.json();
            })
            .then(data => {
                const reservaEncontrada = data.find(r => r.id == idReserva);
                let fechaFormatoDia = obtenerFechaFormateada(reservaEncontrada.startDate);
                let horaInicioFormateada = obtenerHoraMinutos(reservaEncontrada.startDate);
                let horaFinFormateada = obtenerHoraMinutos(reservaEncontrada.endDate);

                if (reservaEncontrada) {
                    let re = {
                        id: reservaEncontrada.id,
                        nombreAula: reservaEncontrada.classroom.name,
                        aula: reservaEncontrada.classroom.number,
                        fecha: fechaFormatoDia, // <- Aquí necesitas proporcionar valores adecuados para fechaFormatoDia, horaInicioFormateada y horaFinFormateada
                        horaInicio: horaInicioFormateada,
                        horaFin: horaFinFormateada
                    };
                    console.log(re);
                    setReserva(re);
                }
            })
            .catch(error => {
                console.error("Error al obtener los datos:", error);
            });
    }



    useEffect(() => {
        fetchData().then(data => {
            setMostrarDatos(true);
        });
    }, [idReserva]);

    function obtenerFechaFormateada(fechaString) {
        const fecha = new Date(fechaString);

        const meses = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];

        const dia = fecha.getDate();
        const mes = meses[fecha.getMonth()];


        const fechaFormateada = `${dia} de ${mes}`;

        return fechaFormateada;
    }

    function obtenerHoraMinutos(fechaString) {
        const fecha = new Date(fechaString);

        const horas = fecha.getHours();
        const minutos = fecha.getMinutes();

        const horaMinutos = `${horas < 10 ? '0' : ''}${horas}:${minutos < 10 ? '0' : ''}${minutos}`;

        return horaMinutos;
    }





    return (
        <div >
            <main className="bg-azul text-foreground min-h-screen">
                <div>
                    <BarraNavegacion></BarraNavegacion>
                </div>
                <div className={styles.reserva}>
                    <div className={styles["title-reserva"]}>
                        <p>DETALLES DE LA RESERVA</p>
                    </div>
                    <div className={styles["title-reserva"]}>
                        {mostrarDatos && <p> {reserva.nombreAula}</p>}
                    </div>



                    {mostrarDatos && <Card className="bg-background/90 px-10 pb-20 pt-20 mt-10 mb-10">
                        <CardBody>
                            <div className={styles.cardBodyContent}>
                                <div className={styles.detailItem}>
                                    <p className={styles.detailTitle}> - Nombre del aula:</p>
                                    <p className={styles.detailValue}><pre>   {reserva.nombreAula}</pre></p>
                                </div>
                                <div className={styles.detailItem}>
                                    <p className={styles.detailTitle}> - Número del aula:</p>
                                    <p className={styles.detailValue}><pre>   {reserva.aula}</pre></p>
                                </div>
                                <div className={styles.detailItem}>
                                    <p className={styles.detailTitle}> - Fecha de reserva:</p>
                                    <p className={styles.detailValue}><pre>   {reserva.fecha}</pre></p>
                                </div>
                                <div className={styles.detailItem}>
                                    <p className={styles.detailTitle}> - Hora de inicio de reserva:</p>
                                    <p className={styles.detailValue}><pre>   {reserva.horaInicio}</pre></p>
                                </div>
                                <div className={styles.detailItem}>
                                    <p className={styles.detailTitle}> - Hora de fin de reserva:</p>
                                    <p className={styles.detailValue}><pre>   {reserva.horaFin}</pre></p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>}
                </div>
            </main>
        </div>

    );
}

export default DetallesReserva;

function obtenerID() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    return id;
}