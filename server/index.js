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