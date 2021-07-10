import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from "../../context/autenticacion/authContext";


const NuevaCuenta = (props) => {


  // extraer los valores del context  
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  // Context de autenticacion
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;


  // Usando el useffect en caso de que el usuario se haya autenticado o sea un registro duplicado o error
  useEffect(() => {
    console.log("paso por aqui", autenticado);
    if (autenticado) {
      props.history.push('/proyectos') // por react router lo llevamos a la pagina de proyectos
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, 'alerta-error');
    }

    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history])

  // State para inciar sesion
  const [usuario, setUsuario] = useState({
    nombre: "",
    confirmar: "",
    email: "",
    password: "",
  });
  const { confirmar, nombre, email, password } = usuario;

  /*HANDLERS*/
  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("entro aqui");
    //validamos campos vacios

    if (
      nombre.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirmar.trim() === ''
    ) {
      mostrarAlerta("Debe completar todos los campos", 'alerta-error');
      return;
    }

    //password validación
    if (password.length < 6) {
      mostrarAlerta("El password debe ser de almenos 6 caracteres", 'alerta-error');
      return
    }
    if (password !== confirmar) {
      mostrarAlerta("Los dos pasword deben ser iguales", 'alerta-error');
      return;
    }

    console.log("validacion pasada");
    //pasarlo al action
    registrarUsuario({
      nombre,
      email,
      password
    })

  };

  return (
    <div className="form-usuario">

      {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}

      <div className="contenedor-form sombra-dark">
        <h1>Obtener Una Cuenta</h1>

        <form onSubmit={onSubmit}>

          <div className="campo-form">
            <label htmlFor="email">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu Nombre"
              value={nombre}
              onChange={onChange}
            />
          </div>

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
            <label htmlFor="password">Confirmar Pasword</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Tu Password"
              value={confirmar}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Crear Cuenta"
            ></input>
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta">
          Volver a iniciar sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
