const { User } = require("../../models");
const emailValidator = require("email-validator");
const passwordChecker = require("./passwordChecker");
const verifyCreateUserData = async (req, res, next) => {
    const {firstname, lastname, nickname, phone, password, passwordConfirm, weight, age, email} = req.body;
        // checks that every fields have been properly received
        console.log("yo", req.body);
        //console.log("wesh", req.file)
        
        if(!firstname || !lastname || !nickname || !password || !passwordConfirm || !weight || !email || !age){
            return res.status(400).json("firstname, lastname, nickname, password, passwordConfirm, weight, email, age are required.");
        }

        // checks if nickname is already taken
        const findUserNickname = await User.findOne({
            where: {
                nickname
            }
        });

        // if taken, return 409 conflict
        if(findUserNickname){
            return res.status(409).json("Nickname already exists.");
        };

        // check email with email validator
        const checkEmail = emailValidator.validate(email);

        if(!checkEmail){
            return res.status(404).json("Email is incorrect.");
        };

        const findUserEmail = await User.findOne({
            where: {
                email
            }
        });

        if(findUserEmail){
            return res.status(409).json("Email already exists.");
        }

        if(phone){
            const findUserPhone = await User.findOne({
                where: {
                    phone
                }
            });

            if(findUserPhone){
                return res.status(409).json("Number already linked to an account.");
            }

            findUser.phone = phone;
        };

        
        if(password !== passwordConfirm){
            return res.status(400).json("Password and passwordConfirm do not match.");
        };

        // check function to make sure the password contains
        // 1capitalized letter, 1 symbol, 1 number and is between 1 - 50 characters.
        const checkPassword = passwordChecker(password);
        if(!checkPassword){
            return res.status(400).json("Secure your password with at least a capitalized letter, a symbol and a number.");
        };

        next();
}

module.exports = verifyCreateUserData;