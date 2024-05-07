async function obtenerData() {
    let url = "http://localhost:8080/classrooms";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        return data;
    } catch {
        console.error('Error:', error);
        throw error;
    }


}

export const data = await obtenerData();


/*
const aulasData = [
    {
        id: 1,
        nombre: "Aula 1",
        numero: "3001"
    },
    {
        id: 2,
        nombre: "Aula 2",
        numero: "3003"
    },
    {
        id: 3,
        nombre: "Aula 3",
        numero: "3003"
    },
    {
        id: 4,
        nombre: "Laboratorio Juniper Ejemplo",
        numero: "3004"
    },

];*/

