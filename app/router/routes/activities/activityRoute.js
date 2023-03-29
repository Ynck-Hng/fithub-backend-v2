const express = require("express");
const activityController = require("./../../../controllers/activities/activityController");
const router = express.Router();

// Currently on route http://localhost:PORT/activity/

router.get("/", activityController.findAll);
router.get("/:activityId", activityController.findOne);
router.post("/", activityController.createOne);
router.patch("/:activityId", activityController.updateOne);
router.delete("/:activityId", activityController.deleteOne);
router.post("/user/", activityController.assignActivityToUser);
router.delete("/user/:activityUserId", activityController.removeActivityFromUser);
// TODO! user activity 

module.exports = router;