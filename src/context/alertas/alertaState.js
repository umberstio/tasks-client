import React, {useReducer} from "react";
import alertaReducer from "./alertaReducer";
import alertacontext from "./alertaContext";


import { OCULTAR_ALERTA, MOSTRAR_ALERTA } from "../../types";

const AlertaState = props =>{

    const initialState = {
        alerta:null
    }

    const [state,dispatch]= useReducer(alertaReducer, initialState);

    // Funciones
    const mostrarAlerta = (msg, categoria) => {
        dispatch({
            type:MOSTRAR_ALERTA,
            payload:{
                msg,
                categoria
            }
        })

        setTimeout(()=>{

            dispatch({
                type:OCULTAR_ALERTA,
            })

        }, 5000)
    }

    return(
        <alertacontext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </alertacontext.Provider>
    )

}

export default AlertaState;