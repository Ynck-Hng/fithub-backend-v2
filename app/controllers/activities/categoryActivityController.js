const error = require("debug")("error");
const { CategoryActivity } = require("./../../models");

const categoryActivityController = {
    findAll: async (req, res) => {
        const result = await CategoryActivity.findAll({
            include: "activities_category"
        });

        if(result.length === 0){
            return res.status(404).json("Aucune catégorie trouvée");
        }

        res.status(200).json(result);
    },

    findOne: async (req, res) => {

        const categoryActivityId = req.params.categoryActivityId;
        const findCategoryActivity = await CategoryActivity.findByPk(categoryActivityId, {
            include: "activities_category" 
        });
        
        if(!findCategoryActivity){
            return res.status(404).json("Cette catégorie est introuvable.");
        }

        res.status(200).json(findCategoryActivity);
    },

    createOne: async (req, res) => {
        const {label} = req.body;

        const findCategoryActivityLabel = await CategoryActivity.findOne({
            where: {
                label
            }
        });

        if(findCategoryActivityLabel){
            return res.status(409).json("Ce label est déjà utilisé.");
        };

        const newLabel = {
            label
        };

        await CategoryActivity.create(newLabel);

        res.status(201).json("Catégorie créée !");
    },

    updateOne: async (req, res) => {
        const categoryActivityId = req.params.categoryActivityId;
        const {label} = req.body;

        const findCategoryActivity = await CategoryActivity.findByPk(categoryActivityId);

        if(!findCategoryActivity){
            return res.status(404).json("Cette catégorie est introuvable.");
        };

        if(label){
            const findCategoryActivityLabel = await CategoryActivity.findOne({
                where: {
                    label
                }
            });
            
            if(findCategoryActivityLabel){
                return res.status(409).json("Ce label est déjà utilisé.");
            };

            findCategoryActivity.label = label;
        }

        await findCategoryActivity.save();

        res.status(200).json("Catégorie mise à jour !");
    },
    
    deleteOne: async (req, res) => {
        const categoryActivityId = req.params.categoryActivityId;

        const findCategoryActivity = await CategoryActivity.findByPk(categoryActivityId);

        if(!findCategoryActivity){
            return res.status(404).json("Cette catégorie est introuvable.");
        };

        await findCategoryActivity.destroy();

        res.status(200).json("Catégorie supprimée !");
    }
}

module.exports = categoryActivityController;