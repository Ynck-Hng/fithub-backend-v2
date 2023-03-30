const express = require("express");
const activityController = require("./../../../controllers/activities/activityController");
const router = express.Router();
const bodySanitizer = require("./../../../utils/bodySanitizer");
const { errorCatcher } = require("./../../../utils/errorHandler");
const isAdmin = require("./../../../utils/userValidations/isAdmin");
const isAuthenticated = require("./../../../utils/userValidations/isAuthenticated");
// Currently on route http://localhost:PORT/activity/

router.get("/", errorCatcher(activityController.findAll));
router.get("/:activityId", errorCatcher(activityController.findOne));
router.post("/", isAdmin, bodySanitizer, errorCatcher(activityController.createOne));
router.patch("/:activityId", isAdmin, bodySanitizer, errorCatcher(activityController.updateOne));
router.delete("/:activityId", isAdmin, errorCatcher(activityController.deleteOne));
router.post("/user", isAuthenticated, bodySanitizer, errorCatcher(activityController.assignActivityToUser));
router.delete("/user/:userId/:activityId/:activityUserId", isAuthenticated, errorCatcher(activityController.removeActivityFromUser));

module.exports = router;