import React from "react";
import { CustomRadio } from "./CustomRadio";
import styles from './../ReservaAula.module.css';


const ItemDatos = ({ id, name, number, type, selectedOption, onOptionChange }) => {
  const isChecked = selectedOption === id;

  const handleOptionChange = () => {
    onOptionChange(id);
  };

  return (
    <CustomRadio
      className={styles.customRadio} 
      description={number} 
      value={id} 
      checked={isChecked} 
      onChange={handleOptionChange}
      >
      {name}
    </CustomRadio>
  );
}

export default ItemDatos;