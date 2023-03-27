const express = require("express");
const commentArticleController = require("./../../../controllers/articles/commentArticleController");
const router = express.Router();

// Currently on route http://localhost:PORT/comment-article/

router.get("/article/:articleId", commentArticleController.findAllArticleComments);
//router.get("/:commentArticleId", commentArticleController.findOne);
router.post("/", commentArticleController.createOne);
router.patch("/:commentArticleId", commentArticleController.updateOne);
router.delete("/:commentArticleId", commentArticleController.deleteOne);

module.exports = router;