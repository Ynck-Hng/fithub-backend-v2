const express = require("express");
const isAuthenticated = require("../../../utils/userValidations/isAuthenticated");
const commentArticleController = require("./../../../controllers/articles/commentArticleController");
const router = express.Router();
const bodySanitizer = require("./../../../utils/bodySanitizer");
const { errorCatcher } = require("./../../../utils/errorHandler");

// Currently on route http://localhost:PORT/comment-article/

router.get("/article/:articleId", errorCatcher(commentArticleController.findAllArticleComments));
//router.get("/:commentArticleId", commentArticleController.findOne);
router.post("/", isAuthenticated, bodySanitizer, errorCatcher(commentArticleController.createOne));
router.patch("/:commentArticleId", isAuthenticated, bodySanitizer, errorCatcher(commentArticleController.updateOne));
router.delete("/:commentArticleId", isAuthenticated, errorCatcher(commentArticleController.deleteOne));

module.exports = router;