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

        if(!result){
            return res.status(404).json("Aucune catégorie n'a été trouvée");
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
            return res.status(404).json("Cette catégorie est introuvable.");
        };

        res.status(200).json(findCategoryProduct);
    },

    createOne: async (req, res) => {
        const {label} = req.body;

        if(!label){
            return res.status(400).json("Le label est obligatoire.");
        };

        const findCategoryProductLabel = await CategoryProduct.findOne({
            where: {
                label
            }
        });

        if(findCategoryProductLabel){
            return res.status(404).json("Cette catégorie est introuvable");
        };

        const newCategoryProduct = {
            label
        };

        await CategoryProduct.create(newCategoryProduct);

        res.status(201).json("Catégorie créée !");

    },

    updateOne: async (req, res) => {
        const categoryProductId = req.params.categoryProductId;
        const {label} = req.body;

        const findCategoryProduct = await CategoryProduct.findByPk(categoryProductId);

        if(!findCategoryProduct){
            return res.status(404).json("Cette catégorie est introuvable.");
        };

        if(label){
            const findCategoryProductLabel = await CategoryProduct.findOne({
                where: {
                    label
                }
            });

            if(findCategoryProductLabel){
                return res.status(404).json("Cette catégorie est introuvable");
            };

            findCategoryProduct.label = label;
        };

        await findCategoryProduct.save();

        res.status(200).json("Catégorie mise à jour !");
    },
    
    deleteOne: async (req, res) => {
        const categoryProductId = req.params.categoryProductId;

        const findCategoryProduct = await CategoryProduct.findByPk(categoryProductId);

        if(!findCategoryProduct){
            return res.status(404).json("Cette catégorie est introuvable.");
        };

        await findCategoryProduct.destroy();

        res.status(200).json("Catégorie supprimée !");
    }
}

module.exports = categoryProductController;