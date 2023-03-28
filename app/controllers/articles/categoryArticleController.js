const error = require("debug")("error");
const { CategoryArticle } = require("./../../models");

const categoryArticleController = {
    findAll: async (req, res) => {
        //double check
        const result = await CategoryArticle.findAll();

        if(result.length === 0){
            return res.status(404).json("Category cannot be found.");
        };

        res.status(200).json(result);
    },

    findOne: async (req, res) => {
        const categoryArticleId = req.params.categoryArticleId;
        
        const findCategoryArticle = await CategoryArticle.findByPk(categoryArticleId, {
            include: {
                association: "article_category",
                include: "user_author"
            }
        });
        if(!findCategoryArticle){
            return res.status(404).json("Category cannot be found.");
        }

        res.status(200).json(findCategoryArticle);
    },

    createOne: async (req, res) => {
        const {label} = req.body;

        if(!label){
            return res.status(400).json("Label is required.");
        };

        const findCategoryArticleLabel = await CategoryArticle.findOne({
            where: {
                label
            }
        });

        if(findCategoryArticleLabel){
            return res.status(409).json("Category already exists.");
        };

        await CategoryArticle.create({label});

        res.status(201).json("Catégorie créée !");
    },

    updateOne: async (req, res) => {
        const categoryArticleId = req.params.categoryArticleId;
        const {label} = req.body;

        const findCategoryArticle = await CategoryArticle.findByPk(categoryArticleId);

        if(!findCategoryArticle){
            return res.status(404).json("Category cannot be found.");
        }

        if(label){
            const findCategoryArticleLabel = await CategoryArticle.findOne({
                where: {
                    label
                }
            });

            if(findCategoryArticleLabel){
                return res.status(409).json("Category already exists.");
            };
            findCategoryArticle.label = label;
        };

        await findCategoryArticle.save();

        res.status(200).json("Category updated !");
    },
    
    deleteOne: async (req, res) => {
        const categoryArticleId = req.params.categoryArticleId;

        const findCategoryArticle = await CategoryArticle.findByPk(categoryArticleId);

        if(!findCategoryArticle){
            return res.status(404).json("Category cannot be found.");
        }

        await findCategoryArticle.destroy();

        res.status(200).json("Category deleted !");
    }
}

module.exports = categoryArticleController;