const Sequelize = require("sequelize");
const sequelize = require("./../../../data/sequelize");

class ActivityUser extends Sequelize.Model{}

ActivityUser.init({
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        }
    },
    activity_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        }
    },
    calories: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        }
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        }
    }
}, {
    sequelize,
    tableName: "activity_user"
})

module.exports = ActivityUser;