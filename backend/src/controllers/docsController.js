const service = require("../services/docsService");

exports.create = async (req, res) => {
    const r = await service.create(req.body);
    res.json(r);
};

exports.append = async (req, res) => {
    const r = await service.append(req.body);
    res.json(r);
};
