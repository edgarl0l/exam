const router = require("express").Router();
const controller = require("../controllers/shiftController");

router.get("/", controller.list);
router.post("/", controller.create);
router.delete("/:id", controller.remove);

module.exports = router;
