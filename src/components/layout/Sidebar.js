import React from "react";
import NuevoProyecto from "../proyectos/NuevoProyecto"
import ListadoProyectos from "../proyectos/Listado"

const Sidebar = () => {
  return (
    <aside>
      <h1>
        Flash<span>Tasks</span>
      </h1>
      <NuevoProyecto/>
      <div className="proyectos">
        <h2>Tus Proyectos</h2>
        <ListadoProyectos/>
      </div>
    </aside>
  );
};

export default Sidebar;
