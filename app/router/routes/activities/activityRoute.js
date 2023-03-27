const express = require("express");
const activityController = require("../../../controllers/activities/activityController");
const router = express.router();

// Currently on route http://localhost:PORT/activity

router.get("/", activityController.findAll);
router.get("/:activityId", activityController.findOne);
router.post("/", activityController.createOne);
router.patch("/:activityId", activityController.updateOne);
router.delete("/:activityId", activityController.deleteOne);

// TODO! user activity 

module.exports = router;