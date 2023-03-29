const express = require("express");
const commentProductController = require("./../../../controllers/products/commentProductController");
const router = express.Router();
const bodySanitizer = require("./../../../utils/bodySanitizer");
// Currently on route http://localhost:PORT/comment-product/

router.get("/", commentProductController.findAll);
router.get("/:commentProductId", commentProductController.findOne);
router.post("/", bodySanitizer, commentProductController.createOne);
router.patch("/:commentProductId", bodySanitizer, commentProductController.updateOne);
router.delete("/:commentProductId", commentProductController.deleteOne);

module.exports = router;