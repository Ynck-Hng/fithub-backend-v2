const express = require("express");
const productController = require("./../../../controllers/products/productController");
const router = express.Router();
const bodySanitizer = require("./../../../utils/bodySanitizer");
const { errorCatcher } = require("./../../../utils/errorHandler");

// Currently on route http://localhost:PORT/product/

// TODO! IMPLEMENT AUTH IF HAVE TIME

router.get("/", errorCatcher(productController.findAll));
router.get("/:productId", errorCatcher(productController.findOne));
router.post("/", bodySanitizer, errorCatcher(productController.createOne));
router.patch("/:productId", bodySanitizer, errorCatcher(productController.updateOne));
router.delete("/:productId", errorCatcher(productController.deleteOne));

module.exports = router;