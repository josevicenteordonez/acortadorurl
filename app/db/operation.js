var db = require('./db');

/**
  * initializationRoutes
  * @param {*} dbName 
  * @param {*} collectionName
  * @param {*} query
  * Metodo que realiza la busqueda de una query especifica
**/
exports.find = function (dbName, collectionName, query) {
    return new Promise((resolve, reject) => {
        return db.getConnection().db(dbName).collection(collectionName).find(query).toArray(function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};

/**
  * initializationRoutes
  * @param {*} dbName 
  * @param {*} collectionName
  * @param {*} query
  * Metodo que realiza la insercion de una query especifica
**/
exports.insert = function (dbName, collectionName, query) {
    return new Promise((resolve, reject) => {
        return db.getConnection().db(dbName).collection(collectionName).insertOne(query, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};

/**
  * initializationRoutes
  * @param {*} dbName 
  * @param {*} collectionName
  * @param {*} query
  * Metodo que realiza la eliminacion de una query especifica
**/
exports.delete = function (dbName, collectionName, query) {
    return new Promise((resolve, reject) => {
        return db.getConnection().db(dbName).collection(collectionName).deleteOne(query, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};
