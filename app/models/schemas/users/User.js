const Sequelize = require("sequelize");
const sequelize = require("./../../../data/sequelize");

class User extends Sequelize.Model{}

User.init({
    firstname: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            isAlpha: true
        }
    },
    lastname: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            isAlpha: true
        }
    },
    nickname: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    phone: {
        type: Sequelize.TEXT,
        allowNull: true,
        unique: true,
        defaultValue: null
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    gender: {
        type: Sequelize.ENUM('femme', 'homme', 'non-spécifié'),
        defaultValue: 'non-spécifié',
    },
    xp: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    profile_visibility: {
        type: Sequelize.ENUM('publique', 'privé'),
        defaultValue: 'publique'
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
}, {
    sequelize,
    tableName: "user"
})

module.exports = User;