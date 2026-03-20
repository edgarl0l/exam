const service = require("../services/reportService");

exports.daily = async (req, res) => {
    const r = await service.daily(req.body);
    res.json(r);
};
