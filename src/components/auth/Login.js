import React, { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from "../../context/autenticacion/authContext";




const Login = (props) => {

  // Context de Alertas
  const { alerta, mostrarAlerta } = useContext(AlertaContext);
  // Context de autenticacion
  const { mensaje, autenticado, iniciarSesion } = useContext(AuthContext);

  // Usando el useffect en caso de que el password o usuario no exista
  useEffect(() => {
    //usuarioAutenticado(); // verifica si esta autenticado
    console.log("autenticado", autenticado);
    if (autenticado) {
      props.history.push('/proyectos') // por react router lo llevamos a la pagina de proyectos
    }

    if (mensaje) {
      mostrarAlerta(mensaje.msg, 'alerta-error');
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado]);


  const [usuario, setUsuario] = useState({
    email: "",
    password: ""
  })
  const { email, password } = usuario;

  /*HANDLERS*/
  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  };

  const onSubmit = e => {
    e.preventDefault();
    //validamos campos vacios
    if (email.trim() === '' || password.trim() === '') {
      mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
      return;
    }

    // pasarlo al action
    iniciarSesion({ email, password });
  }




  return (
    <div className="form-usuario">
      {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}

      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>

        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={email}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Pasword</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Pasword"
              value={password}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesión"
            ></input>
          </div>
        </form>
        <Link to={'/nueva-cuenta'} className="enlace-cuenta">
          Obtener Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
