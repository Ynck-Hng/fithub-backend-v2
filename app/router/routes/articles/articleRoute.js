const express = require("express");
const articleController = require("./../../../controllers/articles/articleController");
const router = express.Router();
const bodySanitizer = require("./../../../utils/bodySanitizer");
const { errorCatcher } = require("./../../../utils/errorHandler");

// Currently on route http://localhost:PORT/article/

router.get("/", errorCatcher(articleController.findAll));
router.post("/", bodySanitizer, errorCatcher(articleController.createOne));
router.get("/:articleId", errorCatcher(articleController.findOne));
router.patch("/:articleId", bodySanitizer, errorCatcher(articleController.updateOne));
router.delete("/:articleId", errorCatcher(articleController.deleteOne));

module.exports = router;