const error = require("debug")("error");
const { CommentArticle, Article, User } = require("./../../models");

// to discuss

const commentArticleController = {
    findAllArticleComments: async (req, res) => {
        const articleId = req.params.articleId;

        const result = await CommentArticle.findAll({
            where: {
                article_id: articleId
            },
            include: ["UserComments"]
        });

        if(result.length === 0){
            return res.status(404).json("No comments found, be the first !");
        };
        
        res.status(200).json(result);
    },

    createOne: async (req, res) => {
        const {content, article_id, user_id} = req.body;

        if(!content || !article_id || !user_id){
            return res.status(400).json("Content, article_id and user_id are required.");
        };
        
        const findArticle = await Article.findByPk(article_id);

        if(!findArticle){
            return res.status(404).json("Article cannot be found.");
        };

        const findUser = await User.findByPk(user_id, {
            attributes: {
                exclude: ["password"]
            }
        });

        if(!findUser){
            return res.status(404).json("User cannot be found.");
        };

        if(!content){
            return res.status(400).json("Content cannot be empty.");
        };

        const newComment = {
            content,
            article_id,
            user_id
        }

        CommentArticle.create(newComment);

        res.status(200).json("Comment created !");
    },

    updateOne: async (req, res) => {
        const commentArticleId = req.params.commentArticleId;
        const {content} = req.body;

        const findCommentArticle = await CommentArticle.findByPk(commentArticleId);

        if(!findCommentArticle){
            return res.status(404).json("Comment cannot be found.");
        }

        if(content){
            findCommentArticle.content = content;
        };

        await findCommentArticle.save();

        res.status(200).json("Comment updated !");
    },
    
    deleteOne: async (req, res) => {
        const commentArticleId = req.param.commentArticleId;
        const findCommentArticle = await CommentArticle.findByPk(commentArticleId);

        if(!findCommentArticle){
            return res.status(404).json("Comment cannot be found.");
        }

        await findCommentArticle.destroy();

        res.status(200).json("Comment deleted !");
    }
}

module.exports = commentArticleController;