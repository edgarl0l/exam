const router = require("express").Router();
const controller = require("../controllers/reportController");

router.post("/daily", controller.daily);

module.exports = router;
