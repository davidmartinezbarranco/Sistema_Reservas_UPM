import React from "react";
import ItemDatos from "./ItemDatos";


const ListaDatos = ({ datos }) => {

    return (
        <div >
            {datos.map((dato => (
                <ItemDatos key={dato.id} {...dato}/>
            )))}
        </div>
    );
}

export default ListaDatos;
