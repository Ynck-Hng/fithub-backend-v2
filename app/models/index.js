// activities

const Activity = require("./schemas/activities/Activity");
const CategoryActivity = require("./schemas/activities/CategoryActivity");

// articles

const Article = require("./schemas/articles/Article");
const CommentArticle = require("./schemas/articles/CommentArticle");
const CategoryArticle = require("./schemas/articles/CategoryArticle");

// products 

const Product = require("./schemas/products/Product");
const CommentProduct = require("./schemas/products/CommentProduct");
const CategoryProduct = require("./schemas/products/CategoryProduct");

// others

const Company = require("./schemas/others/Company");
const Challenge = require("./schemas/others/Challenge");

// users

const User = require("./schemas/users/User");


// liked_article_user

User.belongsToMany(Article, {
    as: "articles",
    through: "liked_article_user",
    foreignKey: "user_id",
    otherKey: "article_id"
})

Article.belongsToMany(User, {
    as: "users",
    through: "liked_article_user",
    foreignKey: "article_id",
    otherKey: "user_id"
})

// post

Article.belongsTo(User, {
    as: "user",
    foreignKey: "user_id"
})

User.hasMany(Article, {
    as: "articles",
    foreignKey: "user_id"
})


// have

Article.belongsTo(CategoryArticle, {
    as: "category_article",
    foreignKey: "category_id"
})

CategoryArticle.hasMany(Article, {
    as: "articles",
    foreignKey: "category_id"
})

// own

Article.hasMany(CommentArticle, {
    as: "comment_article",
    foreignKey: "article_id",
})

CommentArticle.belongsTo(Article, {
    as: "article",
    foreignKey: "article_id"
})

// comment_article_user

User.belongsToMany(CommentArticle, {
    as: "comment_article",
    through: "comments_article_user",
    foreignKey: "user_id",
    otherKey: "comment_article_id"
})

CommentArticle.belongsToMany(User, {
    as: "user",
    through: "comments_article_user",
    foreignKey: "comment_article_id",
    otherKey: "user_id"
})

// TOP PART DONE

// challenge_user

User.belongsToMany(Challenge, {
    as: "challenges",
    through: "challenge_user",
    foreignKey: "user_id",
    otherKey: "challenge_id"
})

Challenge.belongsToMany(User, {
    as: "users",
    through: "challenge_user",
    foreignKey: "challenge_id",
    otherKey: "user_id"
})

// activity_user

User.belongsToMany(Activity, {
    as: "activities",
    through: "activity_user",
    foreignKey: "user_id",
    otherKey: "activity_id"
})

Activity.belongsToMany(User, {
    as: "users",
    through: "activity_user",
    foreignKey: "activity_id",
    otherKey: "user_id"
})

// possess

Activity.belongsTo(CategoryActivity, {
    as: "category_activity",
    foreignKey: "category_id"
})

CategoryActivity.hasMany(Activity, {
    as: "activities",
    foreignKey: "category_id"
})

// TODO missing achievement
/*
// comment_product_user

User.belongsToMany(CommentProduct, {
    as: "comments_product",
    through: "comment_product_user",
    foreignKey: "user_id",
    otherKey: "comment_product_id"
})

CommentProduct.belongsToMany(User, {
    as: "users",
    through: "comment_product_user",
    foreignKey: "comment_product_id",
    otherKey: "user_id"
})

// bought_product_user

User.belongsToMany(Product, {
    as: "products",
    through: "bought_product_user",
    foreignKey: "user_id",
    otherKey: "product_id"
})

Product.belongsToMany(User, {
    as: "users",
    through: "bought_product_user",
    foreignKey: "product_id",
    otherKey: "user_id"
})

// assign

Product.hasMany(CommentProduct, {
    as: "comments_product",
    foreignKey: "product_id"
})

CommentProduct.belongsTo(Product, {
    as: "product",
    foreignKey: "product_id"
})
*/
// belong 

Product.belongsTo(CategoryProduct, {
    as: "category_product",
    foreignKey: "category_product_id"
})

CategoryProduct.hasMany(Product, {
    as: "products",
    foreignKey: "category_product_id"
})

// sell

Product.belongsTo(Company, {
    as: "company_selling",
    foreignKey: "company_id"
})

Company.hasMany(Product, {
    as: "products",
    foreignKey: "company_id"
})

// deliver

Product.belongsTo(Company, {
    as: "company_delivering",
    foreignKey: "delivery_company_id"
})

module.exports = {
    Activity,
    CategoryActivity,
    Article,
    CommentArticle,
    CategoryArticle,
    Product,
    CommentProduct,
    CategoryProduct,
    Company,
    Challenge,
    User
}