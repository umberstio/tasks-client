import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//componentes
import Login from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
//import Proyecto from "./components/proyectos/Proyecto";
import Proyectos from "./components/proyectos/Proyectos";

//context
import ProyectoState from "./context/proyectos/proyectoState";
import TareaState from './context/tareas/tareaState';
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/autenticacion/authState";
import tokenAuth from "./config/token";

//higher order component para proteger componentes
import RutaPrivada from "./components/rutas/RutaPrivada";


// Revisar si tenemos un token
const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}


function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
