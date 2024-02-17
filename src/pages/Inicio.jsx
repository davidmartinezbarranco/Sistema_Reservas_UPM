import React from "react";
import Login from "./Login";
import RegisterBack from "./RegisterBack";
import LoginBack from "./LoginBack";
import Register from "./Register";




function Inicio() {
        return (
                <div className="Inicio">
                        <div className="Back">
                                <div className="RegisterBackBox">
                                        <RegisterBack></RegisterBack>
                                </div>
                                <div className="LoginBackBox">
                                        <LoginBack></LoginBack>
                                </div>
                                

                        </div>

                        <div className="Front">
                                <div className="RegisterBox">
                                        <Register></Register>
                                </div>
                                <div className="LoginBox">
                                        <Login></Login>
                                </div>
                               



                        </div>



                </div>

        );
}
export default Inicio;