const error = require("debug")("error");
const { CategoryProduct } = require("./../../models");

const categoryProductController = {
    findAll: async (req, res) => {
        const result = await CategoryProduct.findAll({
            include: {
                association: "product_categories",
                include: ["company_selling", "company_delivering"]
            }
        });

        if(result.length === 0){
            return res.status(404).json("Category cannot be found.");
        };

        res.status(200).json(result);
    },

    findOne: async (req, res) => {
        const categoryProductId = req.params.categoryProductId;

        const findCategoryProduct = await CategoryProduct.findByPk(categoryProductId, {
            include: {
                association: "product_categories",
                include: ["company_selling", "company_delivering"]
            }
        });
        if(!findCategoryProduct){
            return res.status(404).json("Category cannot be found.");
        };

        res.status(200).json(findCategoryProduct);
    },

    createOne: async (req, res) => {
        const {label} = req.body;

        if(!label){
            return res.status(400).json("Label is required.");
        };

        const findCategoryProductLabel = await CategoryProduct.findOne({
            where: {
                label
            }
        });

        if(findCategoryProductLabel){
            return res.status(409).json("Category already exists.");
        };

        const newCategoryProduct = {
            label
        };

        await CategoryProduct.create(newCategoryProduct);

        res.status(201).json("Category created !");

    },

    updateOne: async (req, res) => {
        const categoryProductId = req.params.categoryProductId;
        const {label} = req.body;

        const findCategoryProduct = await CategoryProduct.findByPk(categoryProductId);

        if(!findCategoryProduct){
            return res.status(404).json("Category cannot be found.");
        };

        if(label){
            const findCategoryProductLabel = await CategoryProduct.findOne({
                where: {
                    label
                }
            });

            if(findCategoryProductLabel){
                return res.status(409).json("Category already exists.");
            };

            findCategoryProduct.label = label;
        };

        await findCategoryProduct.save();

        res.status(200).json("Category updated !");
    },
    
    deleteOne: async (req, res) => {
        const categoryProductId = req.params.categoryProductId;

        const findCategoryProduct = await CategoryProduct.findByPk(categoryProductId);

        if(!findCategoryProduct){
            return res.status(404).json("Category cannot be found.");
        };

        await findCategoryProduct.destroy();

        res.status(200).json("Category deleted !");
    }
}

module.exports = categoryProductController;