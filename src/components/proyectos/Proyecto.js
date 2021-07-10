import React, { useContext } from 'react';
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({ proyecto }) => {
    const proyectosContext = useContext(proyectoContext);
    const {
        proyectoActual
    } = proyectosContext;

    //tarea context
    const tareasContext = useContext(tareaContext);
    const { obtenerTareas } = tareasContext

    //funcion para agregar el proyecto actual
    const seleccionarproyecto = id => {
        proyectoActual(id); //fijar un proyecto
        obtenerTareas(id); //mostramos las tareas que corresponden a ese proyecto
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarproyecto(proyecto._id)}
            >
                {proyecto.nombre}
            </button>
        </li>
    );
}

export default Proyecto;