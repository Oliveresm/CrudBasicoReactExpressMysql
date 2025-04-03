# 📚 CrudBasicoReactExpressMysql

Este es un proyecto CRUD completo utilizando **React** para el frontend, **Express (Node.js)** para el backend y **MySQL** como base de datos relacional. Permite gestionar empleados (crear, listar, actualizar y eliminar) de forma dinámica y con alertas amigables.

---

## 🛠️ Tecnologías utilizadas

- ⚛️ React.js
- 🖥️ Node.js + Express
- 🐬 MySQL
- 📡 Axios
- 🎨 Bootstrap 5
- 💬 SweetAlert2

---

## 🚀 Instalación del proyecto

### 1. Clona el repositorio

```bash
git clone https://github.com/Oliversm/CrudBasicoReactExpressMysql.git
cd CrudBasicoReactExpressMysql
```

### 2. Instala dependencias

#### 📦 Frontend

```bash
cd client
npm install
```

#### 🔧 Backend

```bash
cd ../server
npm install
```

---

## 🧠 Base de Datos

El archivo `.sql` para importar la base se encuentra en la carpeta `db/`.

### 📥 Cómo importarla

1. Abre **MySQL Workbench**
2. Ve a `Server > Data Import`
3. Selecciona **Import from Self-Contained File**
4. Busca el archivo `db/empleados_crud.sql`
5. Marca **Create new schema** y asigna un nombre (ej: `empleados_crud`)
6. Haz clic en **Start Import**

---

## 🖥️ Scripts de ejecución

### 🔙 Backend (servidor Express)

```bash
cd server
npm run dev
```

Se ejecutará en: `http://localhost:3001`

---

### 🌐 Frontend (React)

```bash
cd client
npm run dev
```

Se ejecutará en: `http://localhost:5173` (o similar, según Vite)

---

## 📸 Capturas

<sub>(Puedes agregar imágenes aquí si lo deseas)</sub>

---

## 🙌 Autor

- [@Oliversm](https://github.com/Oliversm)

---

¡Gracias por visitar este proyecto! Si te fue útil, no olvides darle ⭐ en GitHub.
