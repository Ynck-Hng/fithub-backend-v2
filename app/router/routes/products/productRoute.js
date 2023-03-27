const express = require("express");
const productController = require("../../../controllers/articles/productController");
const router = express.Router();

// Currently on route http://localhost:PORT/product/

router.get("/", productController.findAll);
router.get("/:productId", productController.findOne);
router.post("/", productController.createOne);
router.patch("/:productId", productController.updateOne);
router.delete("/:productId", productController.deleteOne);

module.exports = router;