const error = require("debug")("error");
const { Article, CategoryArticle, User } = require("./../../models");

const articleController = {
    findAll: async (req, res) => {
        const result = await Article.findAll({
            include: ["UserAuthor", "CommentsArticle", "CategoriesArticle"]
        });

        if(result.length === 0){
            return res.status(404).json("Article cannot be found.");
        }

        res.status(200).json(result);
    },

    findOne: async (req, res) => {

        const articleId = req.params.articleId;
        console.log(req.params.articleId);
        const result = await Article.findByPk(articleId, {
            include: ["UserAuthor", "CommentsArticle", "CategoriesArticle"]
        });

        if(!result){
            return res.status(404).json("Article cannot be found.");
        }

        res.status(200).json(result);
    },

    createOne: async (req, res) => {
        const {title, slug, description, content, category_article_id, user_id} = req.body;

        if(!title || !slug || !description || !content || !category_article_id){
            return res.status(400).json("Title, description, content and category are required.");
        }

        const findArticleTitle = await Article.findOne({
            where: {
                title
            }
        });

        if(findArticleTitle){
            return res.status(409).json("Title already exists.");
        };

        const findUser = await User.findByPk(user_id);

        if(!findUser){
            return res.status(404).json("User cannot be found.");
        };
        
        const findCategory = await CategoryArticle.findByPk(category_article_id);
        
        if(!findCategory){
            return res.status(404).json("Category cannot be found.");
        };

        const newArticle = await Article.create({
            title,
            slug,
            description,
            content,
            user_id, 
        })

        await newArticle.addCategoriesArticle(findCategory);

        res.status(201).json("Article created !");
    },

    updateOne: async (req, res) => {
        const articleId = req.params.articleId;
        const {title, description, content, upvote, category_article_id} = req.body;

        const findArticle = await Article.findByPk(articleId);

        if(!findArticle){
            return res.status(404).json("Article cannot be found.");
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
                return res.status(409).json("Title already exists.");
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
                return res.status(404).json("Category cannot be found.");
            }

            //findArticle.category_article_id = category_article_id;

            // check si + de 4 categories déjà et si y a pas de doublons

            await Article.addCategoryArticle(findCategory);
        };

        await findArticle.save();

        return res.status(200).json("Article updated !");

    },
    
    deleteOne: async (req, res) => {
        const articleId = req.params.articleId;

        const findArticle = await Article.findByPk(articleId);

        if(!findArticle){
            return res.status(404).json("Article cannot be found.");
        };

        await findArticle.destroy();

        return res.status(200).json("Article deleted !");
    }
}

module.exports = articleController;