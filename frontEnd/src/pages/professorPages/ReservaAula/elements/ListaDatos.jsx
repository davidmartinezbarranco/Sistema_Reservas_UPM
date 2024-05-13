import React, { useState } from "react";
import ItemDatos from "./ItemDatos";


const ListaDatos = ({ datos, onSelectedOptionChange }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (id) => {
        setSelectedOption(id);
        onSelectedOptionChange(id);
    };


    return (
        <div >
            {datos?.map((dato => (
                <ItemDatos
                    key={dato.id}
                    {...dato}
                    selectedOption={selectedOption}
                    onOptionChange={handleOptionChange}
                />
            )))}
        </div>
    );
}

export default ListaDatos;
