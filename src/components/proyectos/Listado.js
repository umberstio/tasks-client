import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";

//importmamos el context
import proyectoContext from "../../context/proyectos/proyectoContext";

//animaciones
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import alertacontext from "../../context/alertas/alertaContext";


const ListadoProyectos = () => {
  //extraemos el context
  const proyectosContext = useContext(proyectoContext);
  //extraemos los datos
  const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

  const { alerta, mostrarAlerta } = useContext(alertacontext)

  //usando useEffect para obtener proyectos cuandoc arga el componente
  useEffect(() => {
    // si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }

    obtenerProyectos();
    // eslint-disable-next-line
  }, [mensaje])

  if (proyectos.length === 0) return <p>Comienza creando un proyecto...</p>;


return (
    <ul className="listado-proyectos">
      {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
      <TransitionGroup>
        {proyectos.map((p) => (
          <CSSTransition
            key={p._id}
            timeout={200}
            classNames="proyecto">
            <Proyecto proyecto={p}></Proyecto>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
