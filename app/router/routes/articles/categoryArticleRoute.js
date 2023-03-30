const express = require("express");
const categoryArticleController = require("./../../../controllers/articles/categoryArticleController");
const router = express.Router();
const bodySanitizer = require("./../../../utils/bodySanitizer");
const { errorCatcher } = require("./../../../utils/errorHandler");

// Currently on route http://localhost:PORT/category-article/

router.get("/", errorCatcher(categoryArticleController.findAll));
router.get("/:categoryArticleId", errorCatcher(categoryArticleController.findOne));
router.post("/", bodySanitizer, errorCatcher(categoryArticleController.createOne));
router.patch("/:categoryArticleId", bodySanitizer, errorCatcher(categoryArticleController.updateOne));
router.delete("/:categoryArticleId", errorCatcher(categoryArticleController.deleteOne));
router.post("/article/:articleId/category-article", bodySanitizer, errorCatcher(categoryArticleController.assignCategoryToArticle));
router.delete("/article/:articleId/category-article/:categoryArticleId", errorCatcher(categoryArticleController.removeCategoryFromArticle));
module.exports = router;