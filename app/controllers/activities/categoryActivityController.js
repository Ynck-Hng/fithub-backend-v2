const error = require("debug")("error");
const { CategoryActivity } = require("./../../models");

const categoryActivityController = {
    findAll: async (req, res) => {
        const result = await CategoryActivity.findAll({
            include: "ActivitiesCategory"
        });

        if(result.length === 0){
            return res.status(404).json("Category cannot be found.");
        }

        res.status(200).json(result);
    },

    findOne: async (req, res) => {

        const categoryActivityId = req.params.categoryActivityId;
        const findCategoryActivity = await CategoryActivity.findByPk(categoryActivityId, {
            include: "ActivitiesCategory" 
        });
        
        if(!findCategoryActivity){
            return res.status(404).json("Category cannot be found.");
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
            return res.status(409).json("Label already exists.");
        };

        const newLabel = {
            label
        };

        await CategoryActivity.create(newLabel);

        res.status(201).json("Category created !");
    },

    updateOne: async (req, res) => {
        const categoryActivityId = req.params.categoryActivityId;
        const {label} = req.body;

        const findCategoryActivity = await CategoryActivity.findByPk(categoryActivityId);

        if(!findCategoryActivity){
            return res.status(404).json("Category cannot be found.");
        };

        if(label){
            const findCategoryActivityLabel = await CategoryActivity.findOne({
                where: {
                    label
                }
            });
            
            if(findCategoryActivityLabel){
                return res.status(409).json("Label already exists.");
            };

            findCategoryActivity.label = label;
        }

        await findCategoryActivity.save();

        res.status(200).json("Category updated !");
    },
    
    deleteOne: async (req, res) => {
        const categoryActivityId = req.params.categoryActivityId;

        const findCategoryActivity = await CategoryActivity.findByPk(categoryActivityId);

        if(!findCategoryActivity){
            return res.status(404).json("Category cannot be found.");
        };

        await findCategoryActivity.destroy();

        res.status(200).json("Category deleted !");
    }
}

module.exports = categoryActivityController;