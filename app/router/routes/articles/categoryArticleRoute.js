const express = require("express");
const isAdmin = require("../../../utils/userValidations/isAdmin");
const isAuthenticated = require("../../../utils/userValidations/isAuthenticated");
const categoryArticleController = require("./../../../controllers/articles/categoryArticleController");
const router = express.Router();
const bodySanitizer = require("./../../../utils/bodySanitizer");
const { errorCatcher } = require("./../../../utils/errorHandler");

// Currently on route http://localhost:PORT/category-article/

router.get("/", errorCatcher(categoryArticleController.findAll));
router.get("/:categoryArticleId", errorCatcher(categoryArticleController.findOne));
router.post("/", isAuthenticated, bodySanitizer, errorCatcher(categoryArticleController.createOne));
router.patch("/:categoryArticleId", isAuthenticated, bodySanitizer, errorCatcher(categoryArticleController.updateOne));
router.delete("/:categoryArticleId", isAdmin, errorCatcher(categoryArticleController.deleteOne));
router.post("/article/:articleId/category-article", isAuthenticated, bodySanitizer, errorCatcher(categoryArticleController.assignCategoryToArticle));
router.delete("/article/:articleId/category-article/:categoryArticleId", isAuthenticated, errorCatcher(categoryArticleController.removeCategoryFromArticle));
module.exports = router;