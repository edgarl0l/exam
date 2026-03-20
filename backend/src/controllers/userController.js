const service = require("../services/userService");

exports.list = async (req, res) => {
    const r = await service.list();
    res.json(r);
};

exports.pending = async (req, res) => {
    const r = await service.pending();
    res.json(r);
};

exports.confirm = async (req, res) => {
    const r = await service.confirm(req.params.id);
    res.json(r);
};

exports.remove = async (req, res) => {
    const r = await service.remove(req.params.id);
    res.json(r);
};
