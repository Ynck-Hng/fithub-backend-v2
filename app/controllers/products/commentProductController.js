const error = require("debug")("error");
const { CommentProduct, User, Article } = require("./../../models");

const commentProductController = {
    findAll: async (req, res) => {
        // TODO! to discuss
        const productId = req.params.productId;
        const result = await CommentProduct.findAll({
            include: ["users"],
            where: {
                product_id: productId
            }
        });

        if(result.length === 0){
            return res.status(404).json("Aucun commentaire n'a été trouvé.");
        }

        res.status(200).json(result);
    },

    findOne: async (req, res) => {
        const commentProductId = req.params.commentProductId;
        const findCommentProduct = await CommentProduct.findByPk(commentProductId, {
            include: ["user"]
        });
        if(!findCommentProduct){
            return res.status(404).json("Ce commentaire est introuvable.");
        }

        res.status(200).json(findCommentProduct);
    },

    createOne: async (req, res) => {
        const {userId, articleId, content} = req.body;

        if(!userId || !articleId || !content) {
            return res.status(400).json("L'utilisateur, l'article et le contenu sont obligatoires.");
        };

        const findUser = await User.findByPk(userId);
        if(!findUser){
            return res.status(404).json("Cet utilisateur est introuvable.");
        };

        const findArticleId = await Article.findByPk(articleId);

        if(!findArticleId){
            return res.status(404).json("Cet article est introuvable.");
        };

        const newComment = {
            content
        };

        const newCreatedComment = await CommentProduct.create(newComment);

        await findUser.addCommentProduct(newCreatedComment);

        res.status(200).json("Commentaire créé !");
    },

    updateOne: async (req, res) => {
        const commentProductId = req.params.commentProductId;
        const {content} = req.body;

        const findCommentProduct = await CommentProduct.findByPk(commentProductId);
        if(!findCommentProduct){
            return res.status(404).json("Ce commentaire est introuvable.");
        };

        if(content){
 
        }
    },
    
    deleteOne: async (req, res) => {

    }
}

module.exports = commentProductController;