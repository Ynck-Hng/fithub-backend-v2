const error = require("debug")("error");
const { CategoryArticle } = require("./../../models");

const categoryArticleController = {
    findAll: async (req, res) => {
        //double check
        const result = await CategoryArticle.findAll();

        if(!result){
            return res.status(404).json("Aucune catégorie n'a été trouvée.");
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
            return res.status(404).json("Cette catégorie est introuvable.");
        }

        res.status(200).json(findCategoryArticle);
    },

    createOne: async (req, res) => {
        const {label} = req.body;

        if(!label){
            return res.status(400).json("Le label est obligatoire.");
        };

        const findCategoryArticleLabel = await CategoryArticle.findOne({
            where: {
                label
            }
        });

        if(findCategoryArticleLabel){
            return res.status(409).json("Cette catégorie existe déjà.");
        };

        await CategoryArticle.create({label});

        res.status(201).json("Catégorie créée !");
    },

    updateOne: async (req, res) => {
        const categoryArticleId = req.params.categoryArticleId;
        const {label} = req.body;

        const findCategoryArticle = await CategoryArticle.findByPk(categoryArticleId);

        if(!findCategoryArticle){
            return res.status(404).json("Cette catégorie est introuvable.");
        }

        if(label){
            const findCategoryArticleLabel = await CategoryArticle.findOne({
                where: {
                    label
                }
            });

            if(findCategoryArticleLabel){
                return res.status(409).json("Cette catégorie existe déjà.");
            };
            findCategoryArticle.label = label;
        };

        await findCategoryArticle.save();

        res.status(200).json("Catégorie mise à jour !");
    },
    
    deleteOne: async (req, res) => {
        const categoryArticleId = req.params.categoryArticleId;

        const findCategoryArticle = await CategoryArticle.findByPk(categoryArticleId);

        if(!findCategoryArticle){
            return res.status(404).json("Cette catégorie est introuvable.");
        }

        await findCategoryArticle.destroy();

        res.status(200).json("Catégorie supprimée !");
    }
}

module.exports = categoryArticleController;