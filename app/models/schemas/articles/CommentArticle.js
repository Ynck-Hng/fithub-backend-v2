const Sequelize = require("sequelize");
const sequelize = require("./../../../data/sequelize");

class CommentArticle extends Sequelize.Model{}

CommentArticle.init({
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    article_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
}, {
    sequelize,
    tableName: "comment_article"
})

module.exports = CommentArticle;