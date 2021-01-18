
const urlModel = require('../model/url');
const config = require('../config/config');

const urlCtrl = {};

urlCtrl.create = async function (req, res) {
    try {
        console.info("[Controller] Create Method");
        var shorturl = await urlModel.create(req.body.url);
        if (shorturl) {
            res.status(200).json(shorturl);
        } else {
            res.status(403).json("403");
        }
    } catch (error) {
        console.info("[Controller] Create Method Exception");
        console.error(error);
        res.status(500).json("Error");
    }
};

urlCtrl.delete = async function (req, res) {
    try {
        console.info("[Controller] Delete Method");
        var deleted = await urlModel.delete(req.body.url);
        if (deleted) {
            res.status(200).json(deleted);
        } else {
            res.status(403).json("403");
        }
    } catch (error) {
        console.info("[Controller] Delete Method Exception");
        console.error(error);
        res.status(500).json("Error");
    }
};

urlCtrl.consult = async function (req, res) {
    try {
        console.info("[Controller] Consult Method");
        var url = await urlModel.consult(req.body.url);
        if (url) {
            res.status(200).json(url);
        } else {
            res.status(403).json("403");
        }
    } catch (error) {
        console.info("[Controller] Consult Method Exception");
        console.error(error);
        res.status(500).json("Error");
    }
};

urlCtrl.start = async function (req, res) {
    try {
        console.log("[Controller] Start Method");
        var url = await urlModel.start(req.url);
        if (url) {
            res.redirect(url.url);
        } else {
            res.redirect(config.default_url);
        }
    } catch (error) {
        console.info("[Controller] Start Method Exception");
        console.error(error);
        res.status(500).json("Error");
    }
};

urlCtrl.stats = async function (req, res) {
    try {
        console.log("[Controller] Stats Method");
        var urlStats = await urlModel.stats();
        if (url) {
            res.status(200).json(urlStats);
        } else {
            res.status(403).json("403");
        }
    } catch (error) {
        console.info("[Controller] Stats Method Exception");
        console.error(error);
        res.status(500).json("Error");
    }
};

module.exports = urlCtrl;