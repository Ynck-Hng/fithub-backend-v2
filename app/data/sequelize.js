require("dotenv").config({override: true});

const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    define: {
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    },
});

module.exports = sequelize;

