const router = require("express").Router();
const controller = require("../controllers/docsController");

router.post("/create", controller.create);
router.post("/append", controller.append);

module.exports = router;
