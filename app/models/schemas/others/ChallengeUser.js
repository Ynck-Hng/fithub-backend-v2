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
    completed:{
        type: Sequelize.ENUM('yes', 'no'),
        defaultValue: 'no'
    },
    date_assigned: Sequelize.DATEONLY
}, {
    sequelize,
    tableName: "challenge_user"
})

module.exports = ChallengeUser;