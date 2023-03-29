const express = require("express");
const productController = require("./../../../controllers/products/productController");
const router = express.Router();
const bodySanitizer = require("./../../../utils/bodySanitizer");
// Currently on route http://localhost:PORT/product/

router.get("/", productController.findAll);
router.get("/:productId", productController.findOne);
router.post("/", bodySanitizer, productController.createOne);
router.patch("/:productId", bodySanitizer, productController.updateOne);
router.delete("/:productId", productController.deleteOne);

module.exports = router;