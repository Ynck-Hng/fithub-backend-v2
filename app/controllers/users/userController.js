const error = require("debug")("error");
const { User } = require("./../../models");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const passwordChecker = require("../../utils/userValidations/passwordChecker");

const userController = {
    findAll: async (req, res) => {
        const result = await User.findAll({
            attributes: {
                exclude: ['password']
            },
        });

        if(result.length === 0){
            return res.status(404).json("User cannot be found.");
        };

        res.status(200).json(result);
    },

    findOne: async (req, res) => {
        
        const userId = req.params.userId;
        const result = await User.findByPk(userId, {
            attributes: {
                exclude: ['password']
            },
            include: [
                "ActivitiesUsers",
                "CommentsUser",
                "ChallengesUser",
                "ArticlesWritten",
                "LikedArticles"
            ]
        });

        if(!result){
            return res.status(404).json("User cannot be found.");
        };

        res.status(200).json(result);
    },

    createOne: async (req, res) => {
        const {firstname, lastname, nickname, phone, password, passwordConfirm, weight, email, gender} = req.body;

        if(!firstname || !lastname || !nickname || !password || !passwordConfirm || !weight || !email || !gender){
            return res.status(400).json("firstname, lastname, nickname, password, passwordConfirm, weight, email, gender are required.");
        }

        const findUserNickname = await User.findOne({
            where: {
                nickname
            }
        });

        if(findUserNickname){
            return res.status(409).json("Nickname already exists.");
        };

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

        const checkPassword = passwordChecker(password);

        if(password !== passwordConfirm){
            return res.status(400).json("Password and passwordConfirm do not match.");
        };

        if(!checkPassword){
            return res.status(400).json("Secure your password with at least a capitalized letter, a symble and a number.");
        };
        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = {
            firstname,
            lastname,
            nickname,
            password: hashedPassword,
            weight,
            email,
            gender
        };

        await User.create(newUser);
        res.status(201).json("User created !");
    },

    updateOne: async (req, res) => {
        const userId = req.params.userId;

        isSameIdOrAdmin(req, res, userId);

        const {firstname, lastname, nickname, phone, password, passwordConfirm, role, weight, email, gender} = req.body;

        const findUser = await User.findByPk(userId);

        if(!findUser){
            return res.status(404).json("User cannot be found.");
        };

        if(firstname){
            findUser.firstname = firstname;
        };

        if(lastname){
            findUser.lastname = lastname;
        };

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

        if(nickname){
            const findUserNickname = await User.findOne({
                where: {
                    nickname
                }
            });

            if(findUserNickname){
                return res.status(409).json("Nickname already exists.");
            };

            findUser.nickname = nickname;
        };

        if(password){

            if(password !== passwordConfirm){
                return res.status(400).json("Password and passwordConfirm do not match.");
            };

            const checkPassword = passwordChecker(password);
            if(!checkPassword){
                return res.status(400).json("Secure your password with at least a capitalized letter, a symbol and a number.");
            };

            const hashedPasssword = bcrypt.hashSync(password, 10);

            findUser.password = hashedPasssword;
        };

        if(role){
            findUser.role = role;
        };

        if(weight){
            findUser.weight = weight;
        };

        if(email){

            const checkEmail = emailValidator.validate(email);
            
            if(!checkEmail){
                return res.status(409).json("Email is incorrect.");
            };
            
            const findUserEmail = await User.findOne({
                where: {
                    email
                }
            });
            
            if(findUserEmail){
                return res.status(409).json("Email already exists.");
            };
            
            findUser.email = email;
        }

        if(gender){
            findUser.gender = gender;
        };

        await findUser.save();

        res.status(200).json("User updated !");
    },
    
    deleteOne: async (req, res) => {
        const userId = req.params.userId;

        const findUser = await User.findByPk(userId);

        if(!findUser){
            return res.status(404).json("User cannot be found.");
        };

        await findUser.destroy();

        res.status(200).json("User deleted !");
    },

    login: async (req, res) => {
   
        const findSession = req.session.user;
        if(findSession){
            return res.status(403).json("Access denied, user is already logged in.");
        }

        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json("Email and password are both required.");
        };

        const findUser = await User.findOne({
            exclude: ["password"],
            where:{
                email
            }
        });

        if(!findUser){
            return res.status(404).json("Email or password is incorrect.");
        };

        const isPasswordCorrect = bcrypt.compare(password, findUser.password);
        
        if(!isPasswordCorrect){
            return res.status(400).json("Email or password is incorrect.");
        };

        req.session.user = {
            id: findUser.id,
            role: findUser.role
        }

        // to discuss what info we want to transmit to the client
        res.status(200).json(findUser);
    },
    
    logout: async (req, res) => {
  
        const findSession = req.session.user;
   
        const findUser = await User.findByPk(findSession.id);
        if(!findUser){
            return res.status(404).json("User cannot be found.");
        };

        delete req.session.user;

        res.status(200).json("YEP");
        
    }
}

module.exports = userController;