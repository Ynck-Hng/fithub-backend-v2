const express = require("express");
const categoryActivityController = require("./../../../controllers/activities/categoryActivityController");
const router = express.Router();
const bodySanitizer = require("./../../../utils/bodySanitizer");
// Currently on route http://localhost:PORT/category-activity/

router.get("/", categoryActivityController.findAll);
router.get("/:categoryActivityId", categoryActivityController.findOne);
router.post("/", bodySanitizer, categoryActivityController.createOne);
router.patch("/:categoryActivityId", bodySanitizer, categoryActivityController.updateOne);
router.delete("/:categoryActivityId", categoryActivityController.deleteOne);



module.exports = router;