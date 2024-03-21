import { Card, CardBody, Button } from "@nextui-org/react";
import React from "react";


function NotLoggedIn({ onToggle }) {
    return (
        <Card id="Not-registered-box" className="border-none bg-background/70 px-5">
          <div className="flex flex-col justify-center items-center h-full">
            <CardBody className="flex flex-col items-center justify-center">
                <h1> ¿Ya tienes una cuenta?</h1>
                <h2> Inicia sesión para entrar en la página </h2>
              <Button id="not-logged-in-button" onClick={onToggle}>Inicia sesión</Button>
            </CardBody>
          </div>
        </Card>
      );


}

export default NotLoggedIn;