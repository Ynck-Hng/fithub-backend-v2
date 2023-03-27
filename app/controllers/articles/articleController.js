const error = require("debug")("error");
const { Article, CategoryArticle, User } = require("./../../models");

const articleController = {
    findAll: async (req, res) => {
        const result = await Article.findAll({
            include: ["user", "comments_article", "category_article"]
        });

        if(!result){
            return res.status(404).json("Aucun article n'a été trouvé.");
        }

        res.status(200).json(result);
    },

    findOne: async (req, res) => {

        const articleId = req.params.articleId;

        const result = await Article.findByPk(articleId, {
            include: ["user", "comments_article", "category_article"]
        });

        if(!result){
            return res.status(404).json("Aucun article n'a été trouvé.");
        }

        res.status(200).json(result);
    },

    createOne: async (req, res) => {
        const {title, slug, description, content, category_article_id, user_id} = req.body;

        if(!title || !slug || !description || !content || !category_article_id){
            return res.status(400).json("Le titre, la description, le contenu et la catégorie sont obligatoires.");
        }

        const findArticleTitle = await Article.findOne({
            where: {
                title
            }
        });

        if(findArticleTitle){
            return res.status(409).json("Ce titre d'article est déjà utilisé.");
        };

        const findCategory = await CategoryArticle.findByPk(category_article_id);

        if(!findCategory){
            return res.status(404).json("La catégorie recherchée est introuvable.");
        };

        const findUser = await User.findByPk(user_id);

        if(!findUser){
            return res.status(404).json("Cet utilisateur est introuvable.");
        };

        await Article.create({
            title,
            slug,
            description,
            content,
            category_article_id,
            user_id
        })

        res.status(201).json("Article créé !");
    },

    updateOne: async (req, res) => {
        const articleId = req.params.articleId;
        const {title, description, content, upvote, category_article_id} = req.body;

        const findArticle = await Article.findByPk(articleId);

        if(!findArticle){
            return res.status(404).json("Cet article est introuvable");
        };

        // title and slug will always be together
        // but the user won't be able to change the slug directly

        if(title){

            const findArticleTitle = await Article.findOne({
            where: {
                    title
                }
            });

            if(findArticleTitle){
                return res.status(409).json("Ce titre est déjà utilisé.");
            };
            findArticle.title = title;
            findArticle.slug = title.replaceAll(" ", "-");
        };

        if(description){
            findArticle.description = description;
        };

        if(content){
            findArticle.content = content;
        };

        if(upvote){
            findArticle.upvote = upvote;
        };

        if(category_article_id){
            const findCategoryArticle = await CategoryArticle.findByPk(category_article_id);

            if(!findCategoryArticle){
                return res.status(404).json("Cette catégorie est introuvable.");
            }

            findArticle.category_article_id = category_article_id;
        };

        await findArticle.save();

        return res.status(200).json("Article modifié !");

    },
    
    deleteOne: async (req, res) => {
        const articleId = req.params.articleId;

        const findArticle = await Article.findByPk(articleId);

        if(!findArticle){
            return res.status(404).json("Cet article est introuvable.");
        };

        await findArticle.destroy();

        return res.status(200).json("Article supprimé !");
    }
}

module.exports = articleController;