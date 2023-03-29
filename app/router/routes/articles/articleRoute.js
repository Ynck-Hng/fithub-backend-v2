const express = require("express");
const articleController = require("./../../../controllers/articles/articleController");
const router = express.Router();
const bodySanitizer = require("./../../../utils/bodySanitizer");
// Currently on route http://localhost:PORT/article/

router.get("/", articleController.findAll);
router.post("/", bodySanitizer, articleController.createOne);
router.get("/:articleId", articleController.findOne);
router.patch("/:articleId", bodySanitizer, articleController.updateOne);
router.delete("/:articleId", articleController.deleteOne);

module.exports = router;