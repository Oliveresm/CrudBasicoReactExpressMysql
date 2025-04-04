import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TablaMenssages from "./TablaMenssages";

const noti = withReactContent(Swal);

const Mensajes = () => {
  const [message, setMessage] = useState("");
  const [recargarMensajes, setRecargarMensajes] = useState(false);
  const [editMensajes, setEditMensajes] = useState(false);
  const [idMensajeEditando, setIdMensajeEditando] = useState(null);

  const { id, name } = useParams();
  const navigate = useNavigate();

  const camposVacios = () => {
    return !message.trim();
  };

  const alertaCamposVacios = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por favor, rellena el mensaje.",
      timer: 3000,
    });
  };

  const updateMessage = () => {
    axios
      .put(`http://localhost:3001/Mensajes/${idMensajeEditando}`, {
        contenido: message,
      })
      .then(() => {
        noti.fire({
          title: "<strong>Mensaje actualizado!</strong>",
          html: `<i>El contenido fue editado correctamente</i>`,
          icon: "success",
          timer: 3000,
        });
        setMessage("");
        setEditMensajes(false);
        setIdMensajeEditando(null);
        setRecargarMensajes((prev) => !prev);
      })
      .catch((err) => {
        console.error("Error al actualizar mensaje:", err);
      });
  };

  const addMessage = () => {
    axios
      .post("http://localhost:3001/createMensaje", {
        empleado_id: id,
        menssage: message,
      })
      .then(() => {
        noti.fire({
          title: "<strong>Registro exitoso!</strong>",
          html: `<i>El mensaje fue registrado con éxito!</i>`,
          icon: "success",
          timer: 3000,
        });
        setMessage("");
        setRecargarMensajes((prev) => !prev);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡No se pudo registrar el mensaje. Inténtalo más tarde!",
          footer: error.message,
        });
        console.error(error);
      });
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Mensajes del Empleado</h2>
      <strong>{name}</strong>

      <div className="input-group mb-3 mt-3">
        {editMensajes ? (
          <div
            class="btn-group"
            role="group"
            aria-label="Basic mixed styles example"
          >
            <button
              className="btn btn-warning"
              onClick={() => {
                if (camposVacios()) {
                  alertaCamposVacios();
                  return;
                }
                updateMessage();
              }}
            >
              Actualizar
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                setMessage("");
                setEditMensajes(false);
                setIdMensajeEditando(null);
                setRecargarMensajes((prev) => !prev);
              }}
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            className="btn btn-outline-secondary"
            onClick={() => {
              if (camposVacios()) {
                alertaCamposVacios();
                return;
              }
              addMessage();
            }}
          >
            Enviar
          </button>
        )}

        <input
          type="text"
          className="form-control"
          placeholder="Escribe un mensaje..."
          aria-label="Mensaje"
          aria-describedby="button-addon1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/")}
        >
          Regresar
        </button>
      </div>
      <TablaMenssages
        idEmpleado={id}
        recargar={recargarMensajes}
        setEditMensajes={setEditMensajes}
        setMessage={setMessage}
        setIdMensajeEditando={setIdMensajeEditando}
      />
    </div>
  );
};

export default Mensajes;
