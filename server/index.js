import express from "express";
import mysql from "mysql2";
import cors from "cors";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "empleados_crud",
});

const app = express();

app.use(cors());
app.use(express.json());

app.post("/create", (req, res) => {
  const nombre = req.body.name;
  const edad = req.body.age;
  const pais = req.body.pais;
  const cargo = req.body.cargo;
  const anios = req.body.anios;

  db.query(
    "INSERT INTO empleados(nombre, edad, pais, cargo, anios) VALUES(?, ?, ?, ?, ?)",
    [nombre, edad, pais, cargo, anios],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al registrar empleado");
      } else {
        res.send("Empleado registrado");
      }
    }
  );
});

app.get("/empleados", (req, res) => {
  db.query("SELECT * FROM empleados", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al registrar empleado");
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const nombre = req.body.name;
  const edad = req.body.age;
  const pais = req.body.pais;
  const cargo = req.body.cargo;
  const anios = req.body.anios;
  const id = req.body.id;

  db.query(
    "UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE id=?",
    [nombre, edad, pais, cargo, anios, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al actualizar empleado");
      } else {
        res.send("Empleado actualizado");
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM empleados WHERE id=?", [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al Eliminado empleado");
    } else {
      res.send("Empleado Eliminado con exito");
    }
  });
});

app.listen(3001, () => {
  console.log("Corriendo en el puerto 3001");
});

app.post("/createMensaje", (req, res) => {
  const id = req.body.empleado_id;
  const menssaje = req.body.menssage;

  db.query(
    "INSERT INTO mensajes (empleado_id, contenido) VALUES (?, ?)",
    [id, menssaje],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al registrar el mensaje");
      } else {
        res.send("Mensaje registrado con éxito");
      }
    }
  );
});

app.get("/Mensajes/:idEmpleado", (req, res) => {
  const idEmpleado = req.params.idEmpleado;
  db.query(
    "SELECT * FROM mensajes WHERE empleado_id = ?",
    [idEmpleado],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al registrar empleado");
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/deletemessage/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM mensajes WHERE id=?", [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al Eliminador mensage");
    } else {
      res.send("Mensage Eliminado con exito");
    }
  });
});

app.put("/Mensajes/:id", (req, res) => {
  const { id } = req.params;
  const { contenido } = req.body;

  db.query(
    "UPDATE mensajes SET contenido = ? WHERE id = ?",
    [contenido, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al actualizar el mensaje");
      } else if (result.affectedRows === 0) {
        res.status(404).send("Mensaje no encontrado");
      } else {
        res.send("Mensaje actualizado con éxito");
      }
    }
  );
});


