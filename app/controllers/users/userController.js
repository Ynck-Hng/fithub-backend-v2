const error = require("debug")("error");
const { User, Article } = require("./../../models");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const passwordChecker = require("../../utils/passwordChecker");

const userController = {
    findAll: async (req, res) => {
        const result = await User.findAll({
            attributes: {
                exclude: ['password']
            },
        });

        if(!result){
            return res.status(404).json("Une erreur est survenue...");
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
                "activities_users",
                "comments_article",
                "challenges_users",
                "articles_written",
                "liked_articles"
            ]
        });

        if(!result){
            return res.status(404).json("Cet utilisateur est introuvable.");
        };

        res.status(200).json(result);
    },

    createOne: async (req, res) => {
        const {firstname, lastname, nickname, phone, password, passwordConfirm, email, gender} = req.body;

        if(!firstname || !lastname || !nickname || !password || !passwordConfirm || !email || !gender){
            return res.status(400).json("Veuillez remplir les champs obligatoires.");
        }

        const findUserNickname = await User.findOne({
            where: {
                nickname
            }
        });

        if(findUserNickname){
            return res.status(409).json("Ce pseudo existe déjà.");
        }

        const checkEmail = emailValidator.validate(email);

        if(!checkEmail){
            return res.status(404).json("L'email saisi est incorrect.");
        };

        const findUserEmail = await User.findOne({
            where: {
                email
            }
        });

        if(findUserEmail){
            return res.status(409).json("Cet email a déjà été utilisé.");
        }

        if(phone){
            const findUserPhone = await User.findOne({
                where: {
                    phone
                }
            });

            if(findUserPhone){
                return res.status(409).json("Ce numéro est déjà lié à un compte.");
            }

            findUser.phone = phone;
        };

        const checkPassword = passwordChecker(password);

        if(password !== passwordConfirm){
            return res.status(400).json("Le mot de passe et le mot de passe de confirmation ne sont pas identiques.");
        };

        if(!checkPassword){
            return res.status(400).json("Sécurisez votre mot de passe avec au moins une majuscule, un symbole et un chiffre.");
        };
        
        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = {
            firstname,
            lastname,
            nickname,
            password: hashedPassword,
            email,
            gender
        };

        await User.create(newUser);
        res.status(201).json("Utilisateur créé !");
    },

    updateOne: async (req, res) => {
        const userId = req.params.userId;
        const {firstname, lastname, nickname, phone, password, passwordConfirm, email, gender} = req.body;

        const findUser = await User.findByPk(userId);

        if(!findUser){
            return res.status(404).json("Cet utilisateur est introuvable.");
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
                return res.status(409).json("Ce numéro est déjà lié à un compte.");
            }

            findUser.phone = phone;
        };

        if(nickname){
            const findUserNickname = await User.findOne({
                where: {
                    nickname
                }
            })

            if(findUserNickname){
                return res.status(409).json("Ce pseudo est déjà utilisé.");
            }

            findUser.nickname = nickname;
        };

        if(password){

            if(password !== passwordConfirm){
                return res.status(400).json("Le mot de passe et le mot de passe de confirmation ne sont pas identiques.");
            };

            const checkPassword = passwordChecker(password);
            if(!checkPassword){
                return res.status(400).json("Sécurisez votre nouveau mot de passe avec au moins une majuscule, un symbole et un chiffre.")
            };

            const hashedPasssword = bcrypt.hashSync(password, 10);

            findUser.password = hashedPasssword;
        };

        if(email){

            const checkEmail = emailValidator.validate(email);
            
            if(!checkEmail){
                return res.status(409).json("Cet email est incorrect");
            };
            
            const findUserEmail = await User.findOne({
                where: {
                    email
                }
            });
            
            if(findUserEmail){
                return res.status(409).json("Cet email est déjà utilisé.");
            };
            
            findUser.email = email;
        }

        if(gender){
            findUser.gender = gender;
        };

        await findUser.save();

        res.status(200).json("Les données ont été mises à jour !");
    },
    
    deleteOne: async (req, res) => {
        const userId = req.params.userId;

        const findUser = await User.findByPk(userId);

        if(!findUser){
            return res.status(404).json("Cet utilisateur est introuvable.");
        };

        await findUser.destroy();

        res.status(200).json("Utilisateur supprimé !");
    },

    // /like route maybe ??

    likedArticle: async (req, res) => {
        const {userId, articleId} = req.body;

        const findUser = await User.findByPk(userId);
        const findArticle = await Article.findByPk(articleId);

        if(!findUser || !findArticle){
            return res.status(404).json("Cet utilisateur ou cet article n'existe pas.");
        }

        const findUserLikedArticle = await User.findByPk(userId, {
            include: {
                association: "liked_article_user",
                where: {
                    article_id: articleId
                }
            }
        });

        if(findUserLikedArticle){

            // retire le like

            await findUser.removeArticle(findArticle);

            return res.status(200).json("Article unliké !");

        } 

            // ajoute le like

        await findUser.addArticle(findArticle);

        res.status(200).json("Article liké !");
        
    },

    login: async (req, res) => {
        //TODO! IL FAUT IMPLEMENTER JWT ICI AUSSI
    },
    
    logout: async (req, res) => {

    }
}

module.exports = userController;