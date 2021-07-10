import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREAS,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

import clienteAxios from '../../config/axios'
const TareaState = props => {
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null

    }

    const [state, dispatch] = useReducer(TareaReducer, initialState);


    //funciones
    // Obtener las tareas del proyecto
    const obtenerTareas = async proyecto => {
        try {
            const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto } })
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas,
            });
        } catch (error) {
            console.log(error);
        }
    }

    //agrega una tarea al proyecto seleccionado
    const agregarTareas = async tarea => {
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            dispatch({
                type: AGREGAR_TAREAS,
                payload: resultado.data.tarea
            });

        } catch (error) {

        }
    }

    //valida y muestra un error en caso de que sea necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //eliminarmos una tarea
    const eliminarTarea = async (tareaId, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${tareaId}`, { params: { proyecto } })
            dispatch({
                type: ELIMINAR_TAREA,
                payload: tareaId
            })
        } catch (error) {

        }
    }

    //Edita o modifica una tarea
    const actualizarTarea = async tarea => {
       try {
           const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
           dispatch({
               type: ACTUALIZAR_TAREA,
               payload: resultado.data.tarea
           })
           
       } catch (error) {
           console.log(error);
       }
    }

    //extrae una tarea para editarla
    const guardarTareaActual = tarea => {
        dispatch(
            {
                type: TAREA_ACTUAL,
                payload: tarea
            }
        )
    }



    //Elimina la tarea seleccionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }
    return (
        <TareaContext.Provider
            value={{
                //states
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                //funciones
                obtenerTareas,
                agregarTareas,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}>
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;