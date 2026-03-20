const service = require("../services/sheetsService");

exports.read = async (req, res) => {
    const r = await service.read(req.query);
    res.json(r);
};

exports.append = async (req, res) => {
    const r = await service.append(req.body);
    res.json(r);
};
