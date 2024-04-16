function Edicion(){
    var id = obtenerID();
return(
    <div>
        <p> Página de edición de una reserva {id}</p>
    </div>
);
}

export default Edicion;


function obtenerID(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    return id;
}