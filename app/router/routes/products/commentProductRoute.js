const express = require("express");
const commentProductController = require("./../../../controllers/products/commentProductController");
const router = express.Router();
const bodySanitizer = require("./../../../utils/bodySanitizer");
const { errorCatcher } = require("./../../../utils/errorHandler");

// Currently on route http://localhost:PORT/comment-product/

router.get("/", errorCatcher(commentProductController.findAll));
router.get("/:commentProductId", errorCatcher(commentProductController.findOne));
router.post("/", bodySanitizer, errorCatcher(commentProductController.createOne));
router.patch("/:commentProductId", bodySanitizer, errorCatcher(commentProductController.updateOne));
router.delete("/:commentProductId", errorCatcher(commentProductController.deleteOne));

module.exports = router;