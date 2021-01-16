/**
 *  Se cargan las liberias a usar
**/
const MongoClient = require("mongodb").MongoClient;

// Variable para crear una sola instancia de la conexión a MongoDB
var state = {
    db: null
};

// String de conexion para la base de datos MongoDB
//const url = "mongodb://localhost:27017";
const url = "mongodb+srv://admin:adminJV@clusterjv-qiidx.gcp.mongodb.net/test?retryWrites=true&w=majority";

/**
  * openConnection
  * Metodo que abre la conexion hacia MongoDB
  * 
**/
exports.openConnection = function () {
    if (state.db) {
        return;
    }
    var options = {
        poolSize: 40
    };

    MongoClient.connect(url, options, function (err, db) {

        if (err) {
            console.log("[Evento MongoDB] Error conexión", err);
            return;
        }

        console.log("[Evento MongoDB] Crea conexión");

        // Se asigna la conexión la primera vez que se levanta
        state.db = db;

        // Se agregan Listeners en los distintos eventos que pueden ocurrir luego de que la conexión se realizo
        state.db.on("close", function (reason) {
            console.log("[Evento MongoDB] Conexión esta cerrada", reason);
        });

        state.db.on("error", function (reason) {
            console.log("[Evento MongoDB] Se genera error en conexión", reason);
        });

        state.db.on("reconnect", function (info) {
            console.log("[Evento MongoDB] Conexión reconectada", info);
        });

        state.db.on("timeout", function (err) {
            console.log("[Evento MongoDB] Timeout al realizar la conexión", err);
        })

        return;
    });
};

/**
  * closeConnection
  * Metodo que cierra la conexion hacia MongoDB
**/
exports.closeConnection = function () {
    if (state.db) {
        state.db.close(function (err, result) {
            state.db = null;
            return;
        });
    }
};

/**
  * getConnection
  * Metodo que obtiene la conexion existe con MongoDB
**/
exports.getConnection = function () {
    return state.db;
};
