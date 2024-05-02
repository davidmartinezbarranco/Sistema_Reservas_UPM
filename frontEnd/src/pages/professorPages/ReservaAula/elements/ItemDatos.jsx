import React  from "react";
import { CustomRadio } from "./CustomRadio";
import styles from './../ReservaAula.module.css';


const ItemDatos = ({id, name, number, type}) => {
return(
    <CustomRadio className={styles.customRadio} description={number} value={id} >
                {name}
    </CustomRadio>
);
}

export default ItemDatos;