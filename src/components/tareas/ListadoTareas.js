import React, { useContext, Fragment } from "react";
import Tarea from "./Tarea";

//context
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from '../../context/tareas/tareaContext';

//animaciones
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoTareas = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;


  //obtener las tareas del proyecto seleccionado
  const tareasContext = useContext(tareaContext);
  const { tareasproyecto } = tareasContext;

  if (!proyecto) return <h2>Selecciona un proyecto</h2>;

  //extraemos el proyecto que viene como array, se extrae la posicion cero por defecto
  const [proyectoActual] = proyecto;


  const mostrarTareas = () => {
    let resultado;
    if (tareasproyecto.lenght === 0) {
      resultado = <li className="tarea">No hay tareas</li>
    } else {
      resultado =
        <TransitionGroup>
          {tareasproyecto.map((t) =>
            <CSSTransition
              key={t._id}
              timeout={200}
              classNames="tarea"
            >
              <Tarea tarea={t} />
            </CSSTransition>
          )}
        </TransitionGroup>
    }
  return resultado;
  }

return (
  <Fragment>
    <h2>Proyecto: {proyectoActual.nombre}</h2>
    <ul className="listado-tareas">
      {/*Lista las tareas del proyecto */}
      {mostrarTareas()}
      {/*Para Eliminar El proyecto*/}
    </ul>
    <button type="button" className="btn btn-eliminar" onClick={() => eliminarProyecto(proyectoActual._id)}>
      {" "}
          Eliminar proyecto &times;
        </button>
  </Fragment>
);





};

export default ListadoTareas;
