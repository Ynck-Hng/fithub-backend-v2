const express = require("express");
const categoryProductController = require("./../../../controllers/products/categoryProductController");
const router = express.Router();
const bodySanitizer = require("./../../../utils/bodySanitizer");

// Currently on route http://localhost:PORT/category-product/

router.get("/", categoryProductController.findAll);
router.get("/:categoryProductId", categoryProductController.findOne);
router.post("/", bodySanitizer, categoryProductController.createOne);
router.patch("/:categoryProductId", bodySanitizer, categoryProductController.updateOne);
router.delete("/:categoryProductId", categoryProductController.deleteOne);

module.exports = router;