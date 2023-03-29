const express = require("express");
const challengeController = require("./../../../controllers/others/challengeController");
const router = express.Router();
const bodySanitizer = require("./../../../utils/bodySanitizer");
// Currently on route http://localhost:PORT/challenge/

router.get("/", challengeController.findAll);
router.get("/:challengeId", challengeController.findOne);
router.post("/", bodySanitizer, challengeController.createOne);
router.patch("/:challengeId", bodySanitizer, challengeController.updateOne);
router.delete("/:challengeId", challengeController.deleteOne);
router.post("/user", bodySanitizer, challengeController.assignChallenge);
router.patch("/user/:userId", bodySanitizer, challengeController.challengeChecker);

module.exports = router;