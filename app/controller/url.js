
const urlModel = require('../model/url');

const urlCtrl = {};

urlCtrl.stats = async function (req, res) {
    console.log("stats");
    res.status(200).json("stats");
};

urlCtrl.consult = async function (req, res) {

    console.log("consult");
    res.status(200).json("consult");

};

urlCtrl.create = async function (req, res) {

    console.log("[Controller] Create Method");

    var shorturl = await urlModel.create(req.body.url);

    if (shorturl) {
        res.status(200).json(shorturl);
    } else {
        res.status(403).json("403");
    }
};

urlCtrl.delete = async function (req, res) {

    console.log("[Controller] Delete Method");

    var deleted = await urlModel.delete(req.body.url);

    if (deleted) {
        res.status(200).json(deleted);
    } else {
        res.status(403).json("403");
    }

};

urlCtrl.start = async function (req, res) {

    console.log("[Controller] Start Method");

    var url = await urlModel.start(req.url);

    res.redirect(url.url);

};








module.exports = urlCtrl;