const express = require("express");
const challengeController = require("./../../../controllers/others/challengeController");
const router = express.Router();
const bodySanitizer = require("./../../../utils/bodySanitizer");
const { errorCatcher } = require("./../../../utils/errorHandler");

// Currently on route http://localhost:PORT/challenge/

router.get("/", errorCatcher(challengeController.findAll));
router.get("/:challengeId", errorCatcher(challengeController.findOne));
router.post("/", bodySanitizer, errorCatcher(challengeController.createOne));
router.patch("/:challengeId", bodySanitizer, errorCatcher(challengeController.updateOne));
router.delete("/:challengeId", errorCatcher(challengeController.deleteOne));
router.post("/user", bodySanitizer, errorCatcher(challengeController.assignChallenge));
router.patch("/user/:userId", bodySanitizer, errorCatcher(challengeController.challengeChecker));

module.exports = router;