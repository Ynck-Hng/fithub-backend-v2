const express = require("express");
const articleController = require("./../../../controllers/articles/articleController");
const router = express.Router();

// Currently on route http://localhost:PORT/article/

router.get("/", articleController.findAll);
router.get("/:acticleId", articleController.findOne);
router.post("/", articleController.createOne);
router.patch("/:articleId", articleController.updateOne);
router.delete("/:articleId", articleController.deleteOne);

module.exports = router;