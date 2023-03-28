const error = require("debug")("error");
const { Company } = require("./../../models");

const companyController = {
    findAll: async (req, res) => {
        const result = await Company.findAll();
        if(result.length === 0){
            return res.status(404).json("Company cannot be found.");
        };
        res.status(200).json(result);
    },

    findOne: async (req, res) => {
        const companyId = req.params.companyId;
        const findCompany = await Company.findByPk(companyId, {
            include: ["product_sold", "product_delivered"]
        });
        if(!findCompany){
            return res.status(404).json("Company cannot be found.");
        };
        res.status(200).json(findCompany);
    },

    createOne: async (req, res) => {
        const {label} = req.body;

        if(!label){
            return res.status(400).json("Label is required.");
        }

        const findCompanyLabel = await Company.findOne({
            where: {
                label
            }
        });

        if(findCompanyLabel){
            return res.status(404).json("Company already exists.");
        };

        const newCompany = {
            label
        };

        await Company.create(newCompany);

        res.status(201).json("Entreprise ajoutée !");
    },

    updateOne: async (req, res) => {
        const companyId = req.params.companyId;
        const {label} = req.body;

        const findCompany = await Company.findByPk(companyId);
        
        if(!findCompany){
            return res.status(404).json("Company cannot be found.");
        };

        if(label){
            const findCompanyLabel = await Company.findOne({
                where: {
                    label
                }
            });

            if(findCompanyLabel){
                return res.status(404).json("Company already exists.");
            };

            findCompany.label = label;
        }

        await findCompany.save();

        res.status(200).json("Company updated !");
    },
    
    deleteOne: async (req, res) => {
        const companyId = req.params.companyId;

        const findCompany = await Company.findByPk(companyId);
        
        if(!findCompany){
            return res.status(404).json("Company cannot be found.");
        };

        await findCompany.destroy();

        res.status(200).json("Company deleted !");
    }
}

module.exports = companyController;