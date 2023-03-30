const express = require("express");
const articleController = require("./../../../controllers/articles/articleController");
const router = express.Router();
const bodySanitizer = require("./../../../utils/bodySanitizer");
const { errorCatcher } = require("./../../../utils/errorHandler");
const isAuthenticated = require("./../../../utils/userValidations/isAuthenticated");
// Currently on route http://localhost:PORT/article/

router.get("/", errorCatcher(articleController.findAll));
router.post("/", isAuthenticated, bodySanitizer, errorCatcher(articleController.createOne));
router.get("/:articleId", errorCatcher(articleController.findOne));
router.patch("/:articleId", isAuthenticated, bodySanitizer, errorCatcher(articleController.updateOne));
router.delete("/:articleId", isAuthenticated, errorCatcher(articleController.deleteOne));

module.exports = router;