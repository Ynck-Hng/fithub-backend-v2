const Sequelize = require("sequelize");
const sequelize = require("./../../../data/sequelize");

class ChallengeUser extends Sequelize.Model{}

ChallengeUser.init({
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        }
    },
    challenge_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        }
    },
    date_assigned: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "challenge_user"
})

module.exports = ChallengeUser;