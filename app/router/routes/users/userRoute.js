const express = require("express");
const router = express.Router();
const userController = require("./../../../controllers/users/userController");
const { errorCatcher } = require("./../../../utils/errorHandler");
const bodySanitizer = require("./../../../utils/bodySanitizer");
// Currently on route http://localhost:PORT/user/

router.get("/", errorCatcher(userController.findAll));
router.get("/:userId", errorCatcher(userController.findOne));
router.post("/", bodySanitizer, errorCatcher(userController.createOne));
router.patch("/:userId", bodySanitizer, errorCatcher(userController.updateOne));
router.delete("/:userId", bodySanitizer, errorCatcher(userController.deleteOne));
router.post("/login", errorCatcher(userController.login));
router.get("/session/logout", errorCatcher(userController.logout));
//login logout to be tested with JWT

module.exports = router;