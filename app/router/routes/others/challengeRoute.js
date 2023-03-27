const express = require("express");
const challengeController = require("./../../../controllers/others/challengeController");
const router = express.Router();

// Currently on route http://localhost:PORT/challenge/

router.get("/", challengeController.findAll);
router.get("/:challengeId", challengeController.findOne);
router.post("/user", challengeController.assignChallenge);
router.post("/", challengeController.createOne);
router.patch("/:challengeId", challengeController.updateOne);
router.patch("/user/:userId", challengeController.challengeChecker);
router.delete("/:challengeId", challengeController.deleteOne);

module.exports = router;