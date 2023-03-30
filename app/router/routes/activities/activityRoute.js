const express = require("express");
const activityController = require("./../../../controllers/activities/activityController");
const router = express.Router();
const bodySanitizer = require("./../../../utils/bodySanitizer");
const { errorCatcher } = require("./../../../utils/errorHandler");

// Currently on route http://localhost:PORT/activity/

router.get("/", errorCatcher(activityController.findAll));
router.get("/:activityId", errorCatcher(activityController.findOne));
router.post("/", bodySanitizer, errorCatcher(activityController.createOne));
router.patch("/:activityId", bodySanitizer, errorCatcher(activityController.updateOne));
router.delete("/:activityId", errorCatcher(activityController.deleteOne));
router.post("/user", bodySanitizer, errorCatcher(activityController.assignActivityToUser));
router.delete("/user/:userId/:activityId/:activityUserId", errorCatcher(activityController.removeActivityFromUser));

module.exports = router;