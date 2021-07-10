import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";




const FormTarea = () => {

  //context de proyectos
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  //context de tareas
  const tareasContext = useContext(tareaContext);
  const { tareaseleccionada, errortarea, agregarTareas, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

  //Effect que detecta si hay una tarea seleccioanda
  useEffect(() => {
    if (tareaseleccionada !== null)
      guardarTarea(tareaseleccionada)
    else
      guardarTarea({
        nombre: ''
      })
  }, [tareaseleccionada])

  //state del formulario
  const [tarea, guardarTarea] = useState({
    nombre: ''
  });

  //nombre de la tarea
  const { nombre } = tarea;

  //si no hay proyecto seleccionado no muestra nada
  if (!proyecto) return null;

  const [proyectoActual] = proyecto;

  //leer lo valores del formuilario
  const handleChange = e => {
    guardarTarea(
      {
        ...tarea,
        [e.target.name]: e.target.value
      }
    );
  }

  const onSubmit = e => {
    e.preventDefault();
    //validar
    if (nombre.trim() === '') {
      validarTarea();
      return;
    }

    if (tareaseleccionada === null) {
      //pasar validacion
      //agregar la nueva tarea
      tarea.proyecto = proyectoActual._id;
      agregarTareas(tarea)
    } else {
      //actualizar tarea existente
      actualizarTarea(tarea);
      limpiarTarea();
    }

    //OBtener las tareas del proyecto actual
    obtenerTareas(proyectoActual._id);

    //reinicar el form
    guardarTarea({
      nombre: ''
    });
  }


  return (
    <div className="formulario">
      <form
        onSubmit={onSubmit}
      >
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea"
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit- btn-block"
            value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
          />

        </div>
      </form>

      {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
    </div>
  );
};

export default FormTarea;
