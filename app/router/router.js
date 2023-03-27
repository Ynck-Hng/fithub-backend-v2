const express = require("express");
const router = express.Router();
const userRoute = require("./routes/users/userRoute");
const articleRoute = require("./routes/articles/articleRoute");
const categoryArticleRoute = require("./routes/articles/categoryArticleRoute");
const commentArticleRoute = require("./routes/articles/commentArticleRoute");

const activityRoute = require("./routes/activities/activityRoute");
const categoryActivityRoute = require("./routes/activities/categoryActivityRoute");

const challengeRoute = require("./routes/others/challengeRoute");
const companyRoute = require("./routes/others/companyRoute");

const productRoute = require("./routes/products/productRoute");
const commentProductRoute = require("./routes/products/commentProductRoute");
const categoryProductRoute = require("./routes/products/categoryProductRoute");


router.use("/user", userRoute);
router.use("/article", articleRoute);
router.use("/category-article", categoryArticleRoute);
router.use("/comment-article", commentArticleRoute);

router.use("/activity", activityRoute);
router.use("/category-activity", categoryActivityRoute);

router.use("/challenge", challengeRoute);
router.use("/company", companyRoute);

router.use("/product-route", productRoute);
router.use("/comment-product", commentProductRoute);
router.use("/category-product", categoryProductRoute);

module.exports = router;