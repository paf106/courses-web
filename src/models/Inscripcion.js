class Inscripcion {

    constructor(isMayorEdad, nombre, telefono, email, nivel, gustos) {
        this.isMayorEdad = isMayorEdad;
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.nivel = nivel;
        this.gustos = gustos;
    }

    static createMessage(inscripcion) {

        // Comprobar si es mayor o menor de edad
        (inscripcion.isMayorEdad == 1) ? inscripcion.isMayorEdad = "Si" : inscripcion.isMayorEdad = "No";

        return `
        <div>
            <h2>¡Hola Carlos!</h2>
            <p>A <b>${inscripcion.nombre}</b> le gustaría reservar su plaza. Esta es la información para que contactes con el/ella.</p>
            <ul>
                <li>Mayor de edad: <b>${inscripcion.isMayorEdad}</b></li>
                <li>Teléfono: <b>${inscripcion.telefono}</b></li>
                <li>Email: <b>${inscripcion.email}</b></li>
                <li>Nivel: <b>${inscripcion.nivel}</b></li>
                <li>¿Qué te gustaría aprender?: <b>${inscripcion.gustos}</b></li>
            </ul>
        </div>
        `;
    }
}
module.exports = Inscripcion;