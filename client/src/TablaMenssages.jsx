import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const TablaMenssages = ({
  idEmpleado,
  recargar,
  setEditMensajes,
  setMessage,
  setIdMensajeEditando,
}) => {
  const [hismenssages, sethismenssages] = useState([]);

  const obtenerMensajes = () => {
    if (idEmpleado) {
      axios
        .get(`http://localhost:3001/Mensajes/${idEmpleado}`)
        .then((response) => {
          sethismenssages(response.data);
          console.log("Mensajes recibidos:", response.data);
        })
        .catch((error) => {
          console.error("Error al obtener mensajes:", error);
        });
    }
  };

  const deleteMenssages = (id) => {
    Swal.fire({
      title: `¿Estás seguro?`,
      text: `¡No podrás revertir esto! Eliminarás el mensaje.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3001/deletemessage/${id}`)
          .then(() => {
            obtenerMensajes();
            Swal.fire({
              title: "¡Eliminado!",
              text: `El mensaje fue eliminado con éxito.`,
              icon: "success",
              timer: 3000,
              showConfirmButton: false,
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "¡No se ha encontrado el mensaje o hubo un error en el servidor!",
              footer: JSON.parse(JSON.stringify(error)).message,
            });
            console.error(error);
          });
      }
    });
  };

  useEffect(() => {
    if (idEmpleado) {
      obtenerMensajes();
    }
  }, [idEmpleado, recargar]);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Mensaje</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {hismenssages.map((val) => (
            <tr key={val.id}>
              <th scope="row">{val.id}</th>
              <td>{val.contenido}</td>
              <td>
                <div
                  class="btn-group"
                  role="group"
                  aria-label="Basic mixed styles example"
                >
                  <button
                    className="btn btn-info"
                    onClick={() => {
                      setEditMensajes(true);
                      setMessage(val.contenido);
                      setIdMensajeEditando(val.id);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteMenssages(val.id);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaMenssages;
