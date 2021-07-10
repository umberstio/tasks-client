import React, { Fragment, useContext, useState } from "react";

//importamos el context
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  //obtenemos el state del formulario desde el context --> se hace asi para no estar pasando las props
  const proyectosContext = useContext(proyectoContext);
  //extraemos el estado del formulario
  const {
    errorFormulario,
    mostrarError,
    formulario,
    mostrarFormulario,
    agregarProyecto,
  } = proyectosContext;

  //state para proyecto
  const [proyecto, setProyecto] = useState({
    nombre: "",
  });

  //extraer nombre de proyecto
  const { nombre } = proyecto;

  //contenidpo del input
  const onChangeProyecto = (e) => {
    setProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  //cuando el usuario envia el proyecto
  const onSubmitProyecto = (e) => {
    e.preventDefault();

    //validamos el proyecto
    if (nombre === "") {
      mostrarError(true);
      return;
    }

    //agregar al state
    agregarProyecto(proyecto);

    //reiniciar el form
    setProyecto({ nombre: "" });
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => mostrarFormulario()}
      >
        Nuevo Proyecto
      </button>

      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Proyecto"
            name="nombre"
            value={nombre}
            onChange={onChangeProyecto}
          />

          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
          />
        </form>
      ) : null}
      {errorFormulario ? (
        <p className="mensaje error"> El nombre del proyecto es obligatorio</p>
      ) : null}
    </Fragment>
  );
};

export default NuevoProyecto;
