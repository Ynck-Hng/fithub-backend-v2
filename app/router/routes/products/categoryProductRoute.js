const express = require("express");
const categoryProductController = require("./../../../controllers/products/categoryProductController");
const router = express.Router();
const bodySanitizer = require("./../../../utils/bodySanitizer");
const { errorCatcher } = require("./../../../utils/errorHandler");

// Currently on route http://localhost:PORT/category-product/

router.get("/", errorCatcher(categoryProductController.findAll));
router.get("/:categoryProductId", errorCatcher(categoryProductController.findOne));
router.post("/", bodySanitizer, errorCatcher(categoryProductController.createOne));
router.patch("/:categoryProductId", bodySanitizer, errorCatcher(categoryProductController.updateOne));
router.delete("/:categoryProductId", errorCatcher(categoryProductController.deleteOne));

module.exports = router;