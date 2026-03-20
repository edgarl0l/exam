const router = require("express").Router();
const controller = require("../controllers/mapController");

router.get("/zones", controller.list);
router.post("/zones", controller.create);
router.delete("/zones/:id", controller.remove);

module.exports = router;
