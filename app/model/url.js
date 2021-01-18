const config = require('../config/config');
const operations = require('../db/operation');
const url = require('url');

const urlModel = {};

urlModel.create = function (url) {
    try {
        console.info("[Model] Create Method");
        return new Promise(async (resolve, reject) => {
            var id = '';
            var existeIdUrl = false;

            //Valido que el ID no exista, antes de crear la URL nueva
            do {
                for (var i = 0; i < config.id_length; i++) {
                    id += config.alphabet.charAt(Math.floor(Math.random() * config.alphabet.length));
                }
                console.log(id);
                await operations.find('acortadorurl', 'url', { "urlshort": id }).then(function (value) {
                    if (value.length > 0) {
                        existeIdUrl = true;
                    } else {
                        existeIdUrl = false;
                    }
                });
            } while (existeIdUrl);

            operations.insert('acortadorurl', 'url', {
                'url': url,
                'urlshort': id,
                'urlshortComplete': config.domain + id,
                'numberOfConsult': 0
            }).then(function (value) {
                resolve(
                    {
                        "urlshort": config.domain + id
                    });
            });
        });
    } catch (error) {
        console.info("[Model] Create Method Exception");
        console.error(error);
    }
}

urlModel.delete = function (shorturl) {
    try {
        console.info("[Model] Delete Method");
        return new Promise(async (resolve, reject) => {
            const pasedshorturl = url.parse(shorturl);
            operations.delete('acortadorurl', 'url', {
                'urlshort': pasedshorturl.path.replace('/', '')
            }).then(function (value) {
                if (value.deletedCount > 0) {
                    resolve(
                        {
                            "Resultado": "Borrado exitoso"
                        });
                } else {
                    resolve(
                        {
                            "Resultado": "No Existe URL"
                        });
                }
            });
        });
    } catch (error) {
        console.info("[Model] Create Delete Exception");
        console.error(error);
    }
}

urlModel.consult = function (urlReq) {
    try {
        console.info("[Model] Consult Method");
        return new Promise(async (resolve, reject) => {
            const pasedurl = url.parse(urlReq);
            if (pasedurl.host == config.domainHost) {
                await operations.find('acortadorurl', 'url', { "urlshort": pasedurl.path.replace('/', '') }).then(function (value) {
                    if (value.length > 0) {
                        resolve(
                            {
                                "url": value[0].url
                            });
                    } else {
                        resolve(
                            {
                                "url": "No existe"
                            });
                    }
                });
            } else {
                await operations.find('acortadorurl', 'url', { "url": urlReq }).then(function (value) {
                    if (value.length > 0) {
                        resolve(
                            {
                                "urlshort": value[0].urlshortComplete
                            });
                    } else {
                        resolve(
                            {
                                "url": "No existe"
                            });
                    }
                });
            }
        });
    } catch (error) {
        console.info("[Model] Create Consult Exception");
        console.error(error);
    }
}

urlModel.start = function (shorturl) {
    try {
        console.info("[Model] Start Method");
        return new Promise(async (resolve, reject) => {
            console.log("[Model] Start Method");
            await operations.find('acortadorurl', 'url', { "urlshort": shorturl.replace('/', '') }).then(function (value) {
                if (value.length > 0) {
                    resolve(
                        {
                            "url": value[0].url
                        });
                    operations.update('acortadorurl', 'url', { "urlshort": shorturl.replace('/', '') }, { $inc: { "numberOfConsult": 1 } }).then(function (value) { });
                } else {
                    resolve(
                        {
                            "url": config.default_url
                        });
                }
            });
        });
    } catch (error) {
        console.info("[Model] Start Exception");
        console.error(error);
    }
}

urlModel.stats = function (url) {
    try {
        console.info("[Model] Stats Method");
        return new Promise(async (resolve, reject) => {
            await operations.find('acortadorurl', 'url', {}).then(function (value) {
                resolve(
                    value
                );
            });
        });
    } catch (error) {
        console.info("[Model] Stats Exception");
        console.error(error);
    }
}

module.exports = urlModel;