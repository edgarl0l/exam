const service = require("../services/mapService");

exports.list = async (req, res) => {
    const r = await service.list();
    res.json(r);
};

exports.create = async (req, res) => {
    const r = await service.create(req.body);
    res.json(r);
};

exports.remove = async (req, res) => {
    const r = await service.remove(req.params.id);
    res.json(r);
};
