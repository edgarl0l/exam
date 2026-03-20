const router = require("express").Router();
const controller = require("../controllers/sheetsController");

router.get("/read", controller.read);
router.post("/append", controller.append);

module.exports = router;
