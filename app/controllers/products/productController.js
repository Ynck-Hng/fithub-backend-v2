const error = require("debug")("error");
const { Product, CategoryProduct, Company } = require("./../../models");

const productController = {

    findAll: async (req, res) => {
        const result = await Product.findAll({
            include: ["company_selling", "company_delivering"]
        });

        if(result.length === 0){
            return res.status(404).json("Aucun produit n'a été trouvé.");
        };

        res.status(200).json(result);
    },

    findOne: async (req, res) => {
        const productId = req.params.productId;
        const findProduct = await Product.findByPk(productId, {
            include: ["company_selling", "company_delivering"]
        });
        if(!findProduct){
            return res.status(404).json("Ce produit est introuvable.");
        };
        res.status(200).json(findProduct);
    },

    createOne: async (req, res) => {
        const {label, availability, category_product_id, company_id, delivery_company_id} = req.body;
        
        if(!label || !availability || !category_product_id || !company_id || !delivery_company_id){
            return res.status(400).json("Tous les champs sont obligatoires.");
        };

        const findProductLabel = await Product.findOne({
            where:{
                label
            }
        });

        if(findProductLabel){
            return res.status(409).json("Ce produit existe déjà.");
        };

        const findProductCategory = await CategoryProduct.findByPk(category_product_id);
        if(!findProductCategory){
            return res.status(404).json("Cette catégorie est introuvable.");
        };

        const findCompany = await Company.findByPk(company_id);

        if(!findCompany){
            return res.status(404).json("Cette entreprise est introuvable");
        };

        const findDeliveryCompany = await Company.findByPk(delivery_company_id);

        if(!findDeliveryCompany){
            return res.status(404).json("Cette entreprise est introuvable.");
        };


    },

    updateOne: async (req, res) => {
        const productId = req.params.productId;
        // attention price
        const {label, price, availability, category_product_id, company_id, delivery_company_id} = req.body;

        const findProduct = await Product.findByPk(productId);

        if(!findProduct){
            return res.status(404).json("Ce produit est introuvable.");
        };

        if(label){
            const findProductLabel = await Product.findOne({
                where:{
                    label
                }
            });

            if(findProductLabel){
                return res.status(409).json("Ce produit existe déjà.");
            };

            findProduct.label = label;
        };

        if(price){
            findProduct.price = price;
        };

        if(availability){
            findProduct.availability = availability;
        };
        
        if(category_product_id){
            const findProductCategory = await CategoryProduct.findByPk(category_product_id);

            if(!findProductCategory){
                return res.status(404).json("Cette catégorie est introuvable.");
            };

            findProduct.category_product_id = category_product_id;
        };

        if(company_id){

            const findCompany = await Company.findByPk(company_id);

            if(!findCompany){
                return res.status(404).json("Cette entreprise est introuvable");
            };

            findProduct.company_id = company_id;
        };

        if(delivery_company_id){

            const findDeliveryCompany = await Company.findByPk(delivery_company_id);

            if(!findDeliveryCompany){
                return res.status(404).json("Cette entreprise est introuvable.");
            };

            findProduct.delivery_company_id = delivery_company_id;
        };

        await findProduct.save();

        res.status(200).json("Produit mis à jour !");
    },
    
    deleteOne: async (req, res) => {
        const productId = req.params.productId;

        const findProduct = await Product.findByPk(productId);

        if(!findProduct){
            return res.status(404).json("Ce produit est introuvable.");
        };

        await findProduct.destroy();

        res.status(200).json("Produit supprimé !");
    }
    
}

module.exports = productController;