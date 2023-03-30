const express = require("express");
const categoryActivityController = require("./../../../controllers/activities/categoryActivityController");
const router = express.Router();
const bodySanitizer = require("./../../../utils/bodySanitizer");
const { errorCatcher } = require("./../../../utils/errorHandler");

// Currently on route http://localhost:PORT/category-activity/

router.get("/", errorCatcher(categoryActivityController.findAll));
router.get("/:categoryActivityId", errorCatcher(categoryActivityController.findOne));
router.post("/", bodySanitizer, errorCatcher(categoryActivityController.createOne));
router.patch("/:categoryActivityId", bodySanitizer, errorCatcher(categoryActivityController.updateOne));
router.delete("/:categoryActivityId", errorCatcher(categoryActivityController.deleteOne));

module.exports = router;