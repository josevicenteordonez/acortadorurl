const config = require('../config/config');
const operations = require('../db/operation');
const url = require('url');

var urlModel = {};

urlModel.stats = function (url) {

    console.log("[Model] Stats Method");

    return new Promise(async (resolve, reject) => {

        await operations.find('acortadorurl', 'url', {}).then(function (value) {
            resolve(
                value
            );
        });

        return;
    });

}

urlModel.consult = function (urlReq) {

    console.log("[Model] consult Method");

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

        return;
    });

}

urlModel.create = function (url) {

    console.log("[Model] Create Method");

    return new Promise(async (resolve, reject) => {

        var id = '';
        for (var i = 0; i < config.id_length; i++) {
            id += config.alphabet.charAt(Math.floor(Math.random() * config.alphabet.length));
        }

        operations.insert('acortadorurl', 'url', {
            'url': url,
            'urlshort': id,
            'urlshortComplete': config.domain + id,
            'numberOfConsult': 0
        }).then(function (value) {

        });

        resolve(
            {
                "urlshort": config.domain + id
            });

        return;
    });

}

urlModel.delete = function (shorturl) {

    console.log("[Model] Delete Method");

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

        return;
    });

}

urlModel.start = function (shorturl) {

    return new Promise(async (resolve, reject) => {

        console.log("[Model] Start Method");

        await operations.find('acortadorurl', 'url', { "urlshort": shorturl.replace('/', '') }).then(function (value) {
            if (value.length > 0) {
                resolve(
                    {
                        "url": value[0].url
                    });

                operations.update('acortadorurl', 'url', { "urlshort": shorturl.replace('/', '') }, { $inc: { "numberOfConsult": 1 } }).then(function (value) {

                });

            } else {
                resolve(
                    {
                        "url": config.default_url
                    });
            }
        });
        return;
    });

}

module.exports = urlModel;