const express = require("express");
const categoryArticleController = require("../../../controllers/articles/categoryArticleController");
const router = express.Router();

// Currently on route http://localhost:PORT/category-article/

router.get("/", categoryArticleController.findAll);
router.get("/:categoryArticleId", categoryArticleController.findOne);
router.post("/", categoryArticleController.createOne);
router.patch("/:categoryArticleId", categoryArticleController.updateOne);
router.delete("/:categoryArticleId", categoryArticleController.deleteOne);

module.exports = router;