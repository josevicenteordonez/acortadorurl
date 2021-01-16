const urlCtrl = require('../controller/url');

/**
  * initializationRoutes
  * @param {*} app
  * Metodo que define las rutas y define el controlador asociado a la ruta
**/
exports.initializationRoutes = function (app) {
    app.get('/stats', (req, res, next) => {
        urlCtrl.stats(req, res);
    });

    app.get('/url', (req, res, next) => {
        urlCtrl.consult(req, res);
    });

    app.post('/url', (req, res, next) => {
        urlCtrl.create(req, res);
    });

    app.delete('/url', (req, res, next) => {
        urlCtrl.delete(req, res);
    });

    app.get('/([A-Z]{6})', (req, res, next) => {
        urlCtrl.start(req, res);
    });
}