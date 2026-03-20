const router = require("express").Router();
const controller = require("../controllers/authController");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/google", controller.googleRedirect);
router.get("/google/callback", controller.googleCallback);

module.exports = router;
