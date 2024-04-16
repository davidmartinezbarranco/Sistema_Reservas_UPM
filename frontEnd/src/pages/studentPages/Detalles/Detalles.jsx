function Detalles(){

    var id = obtenerID();
    return(
        <div>
            <p>Página en la que se mostrarán los detalles de una reserva {id}</p>
        </div>

    );
}

export default Detalles;

function obtenerID(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    return id;
}