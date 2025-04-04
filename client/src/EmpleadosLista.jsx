import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function EmpleadosLista({
  empleados,
  getEmpleados,
  editarEmpleado,
  deleteEmpleados,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    getEmpleados();
  }, []);

  return (
    <div className="lista">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Años de Experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((val) => (
            <tr key={val.id}>
              <th scope="row">{val.id}</th>
              <td>{val.nombre}</td>
              <td>{val.edad}</td>
              <td>{val.pais}</td>
              <td>{val.cargo}</td>
              <td>{val.anios}</td>
              <td>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => {
                      editarEmpleado(val);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      deleteEmpleados(val.id, val.nombre);
                    }}
                  >
                    Eliminar
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    onClick={() => navigate(`/mensajes/${val.id}/${val.nombre}`)}
                  >
                    Mensajes
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmpleadosLista;
