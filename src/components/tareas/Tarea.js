import React, { useContext } from "react";
import TareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';



const Tarea = ({ tarea }) => {

  const { proyecto } = useContext(proyectoContext);
  const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = useContext(TareaContext);


  //extraemos el proyecto actual que es el porimero de el array proyecto ( tiene un uno elemento)
  const [proyectoActual] = proyecto;

  //eliminar la tarea
  const eliminar = tareaId => {
    eliminarTarea(tareaId, proyectoActual._id);
    obtenerTareas(proyectoActual._id);
  }


  //modifica el estado de las tareas
  const cambiarEstado = tarea => {
    if (tarea.estado) {
      tarea.estado = false
    } else
      tarea.estado = true

      actualizarTarea(tarea);
  }

  //seleccionarTarea 
  const seleccionarTarea = tarea =>{
    guardarTareaActual(tarea);
  }

  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado === true ? (
          <button type="button" className="completo" onClick={() => cambiarEstado(tarea)}>
            Completo
          </button>
        ) : (
          <button type="button" className="incompleto" onClick={() => cambiarEstado(tarea)}>
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button type="button" className="btn btn-primario" onClick={()=> seleccionarTarea(tarea)}>
          Editar
        </button>
        <button type="button" className="btn btn-secundario" onClick={() => eliminar(tarea._id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
