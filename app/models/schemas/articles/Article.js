const Sequelize = require("sequelize");
const sequelize = require("./../../../data/sequelize");

class Article extends Sequelize.Model{}

Article.init({
    title: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    slug: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    upvote: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    category_article_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
}, {
    sequelize,
    tableName: "article"
})

module.exports = Article;