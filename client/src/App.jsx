import { useState } from "react";
import axios from "axios";
import "./App.css";
import EmpleadosLista from "./EmpleadosLista";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";


const noti = withReactContent(Swal);

function App() {
  const [name, setname] = useState("");
  const [age, setage] = useState("");
  const [pais, setpais] = useState("");
  const [cargo, setcargo] = useState("");
  const [anios, setanios] = useState("");
  const [empleadosList, setEmpleados] = useState([]);
  const [editar, setEditar] = useState(false);
  const [id, setid] = useState(0);

  const camposVacios = () => {
    return !name || !age || !pais || !cargo || !anios;
  };

  const alertaCamposVacios = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por favor, completa todos los campos antes de continuar.",
      timer: 3000,
    });
  };

  const editarEmpleado = (val) => {
    setEditar(true);
    setid(val.id);
    setname(val.nombre);
    setage(val.edad);
    setpais(val.pais);
    setcargo(val.cargo);
    setanios(val.anios);
  };

  const limpiar = () => {
    setEditar(false);
    setid(0);
    setname("");
    setage("");
    setpais("");
    setcargo("");
    setanios("");
  };

  const getEmpleados = () => {
    axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    });
  };

  const add = () => {
    axios
      .post("http://localhost:3001/create", {
        name,
        age,
        pais,
        cargo,
        anios,
      })
      .then(() => {
        getEmpleados();
        noti.fire({
          title: "<strong>Registro exitoso!</strong>",
          html: `<i>El empleado ${name} fue registrado con éxito!</i>`,
          icon: "success",
          timer: 3000,
        });
      }).catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡No se pudo registrar el empleado. Inténtalo más tarde!",
          footer: JSON.parse(JSON.stringify(error)).message
        });
        console.error(error);
      });
  };

  const putEmpleados = () => {
    axios
      .put("http://localhost:3001/update", {
        name,
        age,
        pais,
        cargo,
        anios,
        id,
      })
      .then(() => {
        setEditar(false);
        getEmpleados();
        noti.fire({
          title: "<strong>Empleado Actualizado!</strong>",
          html: `<i>El empleado ${name} fue Actualizado con éxito!</i>`,
          icon: "success",
          timer: 3000,
        });
      }).catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡No se pudo Actualizar el empleado. Inténtalo más tarde!",
          footer: JSON.parse(JSON.stringify(error)).message
        });
        console.error(error);
      });;
  };

  const deleteEmpleados = (id, name) => {
    Swal.fire({
      title: `¿Estás seguro?`,
      text: `¡No podrás revertir esto! Eliminarás a ${name}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3001/delete/${id}`)
          .then(() => {
            getEmpleados();
            Swal.fire({
              title: "¡Eliminado!",
              text: `El empleado ${name} fue eliminado con éxito.`,
              icon: "success",
              timer: 3000,
              showConfirmButton: false,
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "¡No se ha encontrado el empleado o hubo un error en el servidor!",
              footer: JSON.parse(JSON.stringify(error)).message
            });
            console.error(error);
          });
      }
    });
  };
  

  return (
    <>
      <div className="container">
        <div className="card text-center">
          <div className="card-header">GESTIÓN DE EMPLEADOS</div>
          <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Nombre:
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                aria-label="Nombre"
                aria-describedby="basic-addon1"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon2">
                Edad:
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Edad"
                aria-label="Edad"
                aria-describedby="basic-addon2"
                value={age}
                onChange={(e) => setage(e.target.value)}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon3">
                País:
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="País"
                aria-label="País"
                aria-describedby="basic-addon3"
                value={pais}
                onChange={(e) => setpais(e.target.value)}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon4">
                Cargo:
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Cargo"
                aria-label="Cargo"
                aria-describedby="basic-addon4"
                value={cargo}
                onChange={(e) => setcargo(e.target.value)}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon5">
                Años:
              </span>
              <input
                type="number"
                className="form-control"
                placeholder="Años de experiencia"
                aria-label="Años"
                aria-describedby="basic-addon5"
                value={anios}
                onChange={(e) => setanios(e.target.value)}
              />
            </div>
          </div>
          <div className="card-footer text-body-secondary">
            {editar ? (
              <div>
                <button
                  className="btn btn-warning m-2"
                  type="button"
                  onClick={() => {
                    if (camposVacios()) {
                      alertaCamposVacios();
                      return;
                    }
                    putEmpleados();
                    limpiar();
                  }}
                >
                  Editar
                </button>
                <button
                  className="btn btn-info m-2"
                  type="button"
                  onClick={() => {
                    limpiar();
                  }}
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                className="btn btn-success"
                type="button"
                onClick={() => {
                  if (camposVacios()) {
                    alertaCamposVacios();
                    return;
                  }
                  add();
                  limpiar();
                }}
              >
                Registrar
              </button>
            )}
          </div>
        </div>
        <br />
        <div className="App">
          <EmpleadosLista
            empleados={empleadosList}
            setEmpleados={setEmpleados}
            getEmpleados={getEmpleados}
            editarEmpleado={editarEmpleado}
            deleteEmpleados={deleteEmpleados}
          />
        </div>
      </div>
    </>
  );
}

export default App;
