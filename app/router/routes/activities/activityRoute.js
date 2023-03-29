const express = require("express");
const activityController = require("./../../../controllers/activities/activityController");
const router = express.Router();
const bodySanitizer = require("./../../../utils/bodySanitizer");
// Currently on route http://localhost:PORT/activity/

router.get("/", activityController.findAll);
router.get("/:activityId", activityController.findOne);
router.post("/", bodySanitizer, activityController.createOne);
router.patch("/:activityId", bodySanitizer, activityController.updateOne);
router.delete("/:activityId", activityController.deleteOne);
router.post("/user", bodySanitizer, activityController.assignActivityToUser);
router.delete("/user/:userId/:activityId/:activityUserId", activityController.removeActivityFromUser);
// TODO! user activity 

module.exports = router;