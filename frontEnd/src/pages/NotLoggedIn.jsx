import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import React from "react";
import "../styles2.css"


function NotLoggedIn() {
    return (
        <Card className="border-none bg-background/70 px-10 pb-5 pt-10">
            <CardHeader className="text-xl font-bold justify-center">
                <div className="flex flex-col items-center justify-center">
                    <h1> ¿Ya tienes una cuenta?</h1>
                </div>
            </CardHeader>
            <CardBody className="text-m justify-center">
                <p> Inicia sesión para entrar en la página </p>
                <br />
                <Button>
                    Inicia sesión
                </Button>

            </CardBody>
        </Card>
    );


}

export default NotLoggedIn;