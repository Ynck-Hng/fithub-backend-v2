const express = require("express");
const router = express.Router();
const userController = require("./../../controllers/userController");
const { errorCatcher } = require("./../../utils/errorHandler");

// Currently on route http://localhost:PORT/user/

router.get("/", errorCatcher(userController.findAll));
router.get("/:userId", errorCatcher(userController.findOne));
router.post("/", errorCatcher(userController.createOne));
router.patch("/:userId", errorCatcher(userController.updateOne));
router.delete("/:userId", errorCatcher(userController.deleteOne));

//login logout to be tested with JWT

module.exports = router;