
const aulasData = [];

function obtenerData() {
    let url = "http://localhost:8080/classrooms";
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }
            return response.json;
        })
        .then(data => {
            console.log("Datos obtenidos de /clasrooms" + data);
        })
}

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

export { aulasData, obtenerData };