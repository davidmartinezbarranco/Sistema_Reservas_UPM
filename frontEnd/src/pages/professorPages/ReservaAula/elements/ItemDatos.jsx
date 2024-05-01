import React  from "react";
import { CustomRadio } from "./CustomRadio";
import styles from './../ReservaAula.module.css';


const ItemDatos = ({id, nombre, numero}) => {
return(
    <CustomRadio className={styles.customRadio} description={numero} value={id} >
                {nombre}
    </CustomRadio>
);
}

export default ItemDatos;