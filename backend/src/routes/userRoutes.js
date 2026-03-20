const router = require("express").Router();
const controller = require("../controllers/userController");

router.get("/", controller.list);
router.get("/pending", controller.pending);
router.post("/confirm/:id", controller.confirm);
router.delete("/:id", controller.remove);

module.exports = router;
