const express = require("express");
const categoryArticleController = require("./../../../controllers/articles/categoryArticleController");
const router = express.Router();
const bodySanitizer = require("./../../../utils/bodySanitizer");
// Currently on route http://localhost:PORT/category-article/

router.get("/", categoryArticleController.findAll);
router.get("/:categoryArticleId", categoryArticleController.findOne);
router.post("/", bodySanitizer, categoryArticleController.createOne);
router.patch("/:categoryArticleId", bodySanitizer, categoryArticleController.updateOne);
router.delete("/:categoryArticleId", categoryArticleController.deleteOne);
router.post("/article/:articleId/category-article", bodySanitizer, categoryArticleController.assignCategoryToArticle);
router.delete("/article/:articleId/category-article/:categoryArticleId", categoryArticleController.removeCategoryFromArticle);
module.exports = router;