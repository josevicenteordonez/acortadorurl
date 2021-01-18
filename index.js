/**
 *  Se cargan las liberias a usar
**/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

/**
 * Se hace referencia al utilitario de conexión y operaciones de la BD
**/
const db = require('./app/db/db');
const routes = require('./app/route/route');

const PORT = 8080;

/**
 * Se abre conexión a base de datos al momento de levantar el servicio
**/

db.openConnection();

app.use(bodyParser.json());

var server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
server.setTimeout(5000);

/**
 * Se inicializan las rutas que soportara el servicio
**/
routes.initializationRoutes(app);

console.log("PID: ", process.pid);

/**
  * Manejo de eventos del S.O, donde se reacciona ante la caida de la instancia y se cierra la conexión abierta a MongoDB
  * Esto evita que queden conexiones abiertas en caso de caidas de las instancias
**/

process.on('SIGTERM', function () {
    console.log("SIGTERM Se cierra proceso de node");
    db.closeConnection();
    process.exit(0);
});

process.on('SIGINT', function () {
    console.log("SIGINT Se cierra proceso de node");
    db.closeConnection();
    process.exit(0);
});

module.exports = {
    app
};