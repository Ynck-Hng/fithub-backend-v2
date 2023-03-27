const express = require("express");
const categoryActivityController = require("./../../../controllers/activities/categoryActivityController");
const router = express.Router();

// Currently on route http://localhost:PORT/category-activity/

router.get("/", categoryActivityController.findAll);
router.get("/:categoryActivityId", categoryActivityController.findOne);
router.post("/", categoryActivityController.createOne);
router.patch("/:categoryActivityId", categoryActivityController.updateOne);
router.delete("/:categoryActivityId", categoryActivityController.deleteOne);



module.exports = router;