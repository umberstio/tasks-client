import React, { useReducer } from "react";

import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";

//los types
import {
  VALIDAR_FORMULARIO,
  AGREGAR_PROYECTO,
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR
} from "../../types";

import clienteAxios from '../../config/axios'

const ProyectoState = (props) => {

  const initialState = {
    proyectos: [],
    formulario: false,
    errorFormulario: false,
    proyecto: null,
    mensaje: null
  };

  //dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  /**
   * FUNCIONES PARA EL CRUD
   */

  // Mostrar formulario
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  // Obtener PROYECTOS
  const obtenerProyectos = async () => {

    try {
      const resultado = await clienteAxios.get('/api/proyectos');
      dispatch({
        type: OBTENER_PROYECTOS,
        payload: resultado.data.proyectos,
      });
    } catch (error) {
      console.log(error);
      const alerta ={
        msg:  'Hubo un error',
        categoria: 'alerta-error'
      }
      dispatch({
        type:PROYECTO_ERROR,
        payload: alerta
      })
    }

  };

  // Agregar Proyecto
  const agregarProyecto = async (proyecto) => {

    try {
      const resultado = await clienteAxios.post('/api/proyectos', proyecto);

      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data,
      });

    } catch (error) {
      console.log(error);
      const alerta = {
        msg: 'Hubo un error',
        categoria: 'alerta-error'
      }
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }
  };

  // MostrarError
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };

  //selecciona el proyecto que el usuario dio clic
  const proyectoActual = (idProyecto) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: idProyecto,
    });
  };

  const eliminarProyecto = async idProyecto => {

    try {
      await clienteAxios.delete(`/api/proyectos/${idProyecto}`);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: idProyecto
      })
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: 'Hubo un error',
        categoria: 'alerta-error'
      }
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }
  }

  return (
    <proyectoContext.Provider
      value={{
        //states
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorFormulario: state.errorFormulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        //funciones
        mostrarError,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        proyectoActual,
        eliminarProyecto
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
