// Cargo controlador a usar
const urlCtrl = require('../controller/url');

/**
  * initializationRoutes
  * @param {*} app
  * Metodo que define las rutas y define el controlador asociado a la ruta
**/
exports.initializationRoutes = function (app) {
    try {
        console.info("[Routes] initializationRoutes");
        app.post('/url', (req, res, next) => {
            urlCtrl.create(req, res);
        });

        app.delete('/url', (req, res, next) => {
            urlCtrl.delete(req, res);
        });

        app.post('/consult', (req, res, next) => {
            urlCtrl.consult(req, res);
        });

        app.get('/([A-Za-z0-9]{6})', (req, res, next) => {
            urlCtrl.start(req, res);
        });

        app.get('/stats', (req, res, next) => {
            urlCtrl.stats(req, res);
        });

        app.get('/', (req, res, next) => {
            res.status(200).send("Bienvenido al acortador de URL - Jv");
        });

        app.get('*',function (req, res) {
            res.redirect('/');
        });

    } catch (error) {
        console.info("[Routes] Exception");
        console.error(error);
    }
}