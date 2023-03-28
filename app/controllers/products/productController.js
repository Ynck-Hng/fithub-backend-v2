const error = require("debug")("error");
const { Product, CategoryProduct, Company } = require("./../../models");

const productController = {

    findAll: async (req, res) => {
        const result = await Product.findAll({
            include: ["company_selling", "company_delivering"]
        });

        if(result.length === 0){
            return res.status(404).json("Product cannot be found.");
        };

        res.status(200).json(result);
    },

    findOne: async (req, res) => {
        const productId = req.params.productId;
        const findProduct = await Product.findByPk(productId, {
            include: ["company_selling", "company_delivering"]
        });
        if(!findProduct){
            return res.status(404).json("Product cannot be found.");
        };
        res.status(200).json(findProduct);
    },

    createOne: async (req, res) => {
        const {label, availability, category_product_id, company_id, delivery_company_id} = req.body;
        
        if(!label || !availability || !category_product_id || !company_id || !delivery_company_id){
            return res.status(400).json("Label, availability, category_product_id, company_id, delivery_company_id are required.");
        };

        const findProductLabel = await Product.findOne({
            where:{
                label
            }
        });

        if(findProductLabel){
            return res.status(409).json("Product already exists.");
        };

        const findProductCategory = await CategoryProduct.findByPk(category_product_id);
        if(!findProductCategory){
            return res.status(404).json("Category cannot be found.");
        };

        const findCompany = await Company.findByPk(company_id);

        if(!findCompany){
            return res.status(404).json("Company cannot be found.");
        };

        const findDeliveryCompany = await Company.findByPk(delivery_company_id);

        if(!findDeliveryCompany){
            return res.status(404).json("Company cannot be found.");
        };


    },

    updateOne: async (req, res) => {
        const productId = req.params.productId;
        // attention price
        const {label, price, availability, category_product_id, company_id, delivery_company_id} = req.body;

        const findProduct = await Product.findByPk(productId);

        if(!findProduct){
            return res.status(404).json("Product cannot be found.");
        };

        if(label){
            const findProductLabel = await Product.findOne({
                where:{
                    label
                }
            });

            if(findProductLabel){
                return res.status(409).json("Product already exists.");
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
                return res.status(404).json("Category cannot be found.");
            };

            findProduct.category_product_id = category_product_id;
        };

        if(company_id){

            const findCompany = await Company.findByPk(company_id);

            if(!findCompany){
                return res.status(404).json("Company cannot be found.");
            };

            findProduct.company_id = company_id;
        };

        if(delivery_company_id){

            const findDeliveryCompany = await Company.findByPk(delivery_company_id);

            if(!findDeliveryCompany){
                return res.status(404).json("Company cannot be found.");
            };

            findProduct.delivery_company_id = delivery_company_id;
        };

        await findProduct.save();

        res.status(200).json("Product updated !");
    },
    
    deleteOne: async (req, res) => {
        const productId = req.params.productId;

        const findProduct = await Product.findByPk(productId);

        if(!findProduct){
            return res.status(404).json("Product cannot be found.");
        };

        await findProduct.destroy();

        res.status(200).json("Product deleted !");
    }
    
}

module.exports = productController;