import React, { useContext, useEffect } from 'react';
import authContext from '../../context/autenticacion/authContext';

const Barra = () => {

    const { usuario, usuarioAutenticado, cerrarSesion } = useContext(authContext);

    useEffect(() => {
        usuarioAutenticado();// al cargar la pagina verifica si esta autenticado
        // eslint-disable-next-line
    }, [])

    return (
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p> : null}

            <nav className="nav-principal">
                <button className="btn btn-blank cerrar-sesion" onClick={() => cerrarSesion()}>Cerrar Sesión</button>
            </nav>
        </header>
    );
}

export default Barra;