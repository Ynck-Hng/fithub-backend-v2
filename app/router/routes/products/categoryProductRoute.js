const express = require("express");
const categoryProductController = require("../../../controllers/articles/categoryProductController");
const router = express.Router();

// Currently on route http://localhost:PORT/category-product/

router.get("/", categoryProductController.findAll);
router.get("/:categoryProductId", categoryProductController.findOne);
router.post("/", categoryProductController.createOne);
router.patch("/:categoryProductId", categoryProductController.updateOne);
router.delete("/:categoryProductId", categoryProductController.deleteOne);

module.exports = router;