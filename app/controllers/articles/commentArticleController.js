const error = require("debug")("error");
const { CommentArticle, Article, User } = require("./../../models");

// to discuss

const commentArticleController = {
    findAllArticleComments: async (req, res) => {
        const articleId = req.params.articleId;
        const result = await CommentArticle.findAll({
            where: {
                article_id: articleId
            }
        });

        if(!result){
            return res.status(404).json("Aucun commentaire n'a été posté, soyez le premier !");
        };
        
    },

    createOne: async (req, res) => {
        const {content, article_id, user_id} = req.body;

        if(!content || !article_id || !user_id){
            return res.status(400).json("Le contenu, l'article et l'utilisateur sont obligatoires.");
        };
        
        const findArticle = await Article.findByPk(article_id);

        if(!findArticle){
            return res.status(404).json("Cet article est introuvable");
        };

        const findUser = await User.findByPk(user_id);

        if(!findUser){
            return res.status(404).json("Cet utilisateur est introuvable");
        };

        if(!content){
            return res.status(400).json("Le contenu ne peut être vide.");
        };

        const newCommentData = {
            content,
            article_id
        }

        const newCreatedComment = await CommentArticle.create(newCommentData);

        await newCreatedComment.addUser(findUser);

        res.status(200).json("Comment created !");
    },

    updateOne: async (req, res) => {
        const commentArticleId = req.params.commentArticleId;
        const {content} = req.body;

        const findCommentArticle = await CommentArticle.findByPk(commentArticleId);

        if(!findCommentArticle){
            return res.status(404).json("Ce commentaire est introuvable.");
        }

        if(content){
            findCommentArticle.content = content;
        };

        await findCommentArticle.save();

        res.status(200).json("Commentaire mis à jour !");
    },
    
    deleteOne: async (req, res) => {
        const commentArticleId = req.param.commentArticleId;
        const findCommentArticle = await CommentArticle.findByPk(commentArticleId);

        if(!findCommentArticle){
            return res.status(404).json("Ce commentaire est introuvable.");
        }

        await findCommentArticle.destroy();

        res.status(200).json("Commentaire supprimé !");
    }
}

module.exports = commentArticleController;