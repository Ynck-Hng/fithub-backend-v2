const error = require("debug")("error");
const { User } = require("./../../models");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const passwordChecker = require("../../utils/userValidations/passwordChecker");
const fs = require("fs");

const userController = {
    findAll: async (req, res) => {
        // find all except password
        const result = await User.findAll({
            attributes: {
                exclude: ['password']
            },
        });

        // Must test result.length because findAll always returns [] if no users found
        if(result.length === 0){
            return res.status(404).json("User cannot be found.");
        };

        res.status(200).json(result);
    },

    findOne: async (req, res) => {
        
        const userId = req.params.userId;

        // Retrieve all infos except password
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
        // if user not found, return 404
        if(!result){
            return res.status(404).json("User cannot be found.");
        };
        console.log(result.image_path);
        res.status(200).json(result);
    },

    createOne: async (req, res) => {
        const {firstname, lastname, nickname, phone, password, passwordConfirm, weight, age, email, gender} = req.body;
        // checks that every fields have been properly received
        console.log("yo", req.body);
        console.log("wesh", req.file)
        
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
            return res.status(400).json("Secure your password with at least a capitalized letter, a symbole and a number.");
        };

        // hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        let filePath;

        if(req.file){
            const sourceFile = req.file.path;
            filePath = `uploads/${req.file.filename}`;
            fs.copyFileSync(sourceFile, filePath);
        }

        const newUser = {
            firstname,
            lastname,
            nickname,
            password: hashedPassword,
            weight,
            age,
            email,
            gender,
            image_path: filePath || null,
            image_mimetype: req.file.mimetype || null
        };

        console.log(newUser);
        // store in the database
        //await User.create(newUser);
        res.status(201).json("User created !");
    },

    updateOne: async (req, res) => {
        const userId = req.params.userId;

        isSameIdOrAdmin(req, res, userId);

        const {firstname, lastname, nickname, phone, password, passwordConfirm, role, age, weight, email, gender} = req.body;

        const findUser = await User.findByPk(userId);

        if(!findUser){
            return res.status(404).json("User cannot be found.");
        };

        // update value only if value is retrieved
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

        // if changing password, need to apply the same password verification process

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

        if(age){
            findUser.age = age;
        };

        if(req.file){
            const sourceFile = req.file.path;
            let filePath = `uploads/${req.file.filename}`;
            fs.copyFileSync(sourceFile, filePath);
            findUser.image_path = filePath;
            findUser.image_mimetype = req.file.mimetype;
        }

        // update the user data
        await findUser.save();

        res.status(200).json("User updated !");
    },
    
    deleteOne: async (req, res) => {
        const userId = req.params.userId;

        const findUser = await User.findByPk(userId);
        // make sure that user exists before deleting
        if(!findUser){
            return res.status(404).json("User cannot be found.");
        };

        await findUser.destroy();

        res.status(200).json("User deleted !");
    },

    login: async (req, res) => {
        // If user already logged in, then return 403 forbidden
        const findSession = req.session.user;
        if(findSession){
            return res.status(403).json("Access denied, user is already logged in.");
        }

        const {email, password} = req.body;
        // make sure that both email & password have been sent
        if(!email || !password){
            return res.status(400).json("Email and password are both required.");
        };
        // make sure that user exists
        const findUser = await User.findOne({
            exclude: ["password"],
            where:{
                email
            }
        });
        
        // if user does not exist, return 404

        if(!findUser){
            return res.status(404).json("Email or password is incorrect.");
        };

        const isPasswordCorrect = bcrypt.compare(password, findUser.password);
        
        if(!isPasswordCorrect){
            return res.status(400).json("Email or password is incorrect.");
        };
        // creates a user session
        req.session.user = {
            id: findUser.id,
            role: findUser.role
        }

        // to discuss what info we want to transmit to the client
        res.status(200).json(findUser);
    },
    
    logout: async (req, res) => {
        
        const findSession = req.session.user;
        
        // make sure that user exists before logging out
        const findUser = await User.findByPk(findSession.id);
        if(!findUser){
            return res.status(404).json("User cannot be found.");
        };

        delete req.session.user;

        res.status(200).json("Logged out !");
        
    },

    test: (req,res) => {
        console.log(req.body);
        console.log(`${req.file.path}`);
        console.log(req.file);
        console.log("YEP");
        res.status(200).json("YEP");
    },

    sendImage: (req, res)=> {
        
        const image = fs.readFileSync("uploads/b39ed820e5bb9004e3e278e28d593f28");
        const bufferImage = Buffer.from(image).toString("base64");
        const dataURI = `data:image/jpeg;base64,${bufferImage}`;
        res.json(dataURI);
    }
}

module.exports = userController;