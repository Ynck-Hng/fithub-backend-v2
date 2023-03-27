const error = require("debug")("error");
const { Company } = require("./../../models");

const companyController = {
    findAll: async (req, res) => {
        const result = await Company.findAll();
        if(!result){
            return res.status(404).json("Aucune entreprise n'a été trouvée.");
        };
        res.status(200).json(result);
    },

    findOne: async (req, res) => {
        const companyId = req.params.companyId;
        const findCompany = await Company.findByPk(companyId, {
            include: ["product_sold", "product_delivered"]
        });
        if(!findCompany){
            return res.status(200).json("Cette entreprise est introuvable.");
        };
        res.status(200).json(findCompany);
    },

    createOne: async (req, res) => {
        const {label} = req.body;

        if(!label){
            return res.status(400).json("Le label est obligatoire");
        }

        const findCompanyLabel = await Company.findOne({
            where: {
                label
            }
        });

        if(findCompanyLabel){
            return res.status(404).json("Cette entreprise est déjà répertoriée.");
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
            return res.status(404).json("Cette entreprise est introuvable.");
        };

        if(label){
            const findCompanyLabel = await Company.findOne({
                where: {
                    label
                }
            });

            if(findCompanyLabel){
                return res.status(404).json("Cette entreprise est déjà répertoriée.");
            };

            findCompany.label = label;
        }

        await findCompany.save();

        res.status(200).json("Entreprise mise à jour !");
    },
    
    deleteOne: async (req, res) => {
        const companyId = req.params.companyId;

        const findCompany = await Company.findByPk(companyId);
        
        if(!findCompany){
            return res.status(404).json("Cette entreprise est introuvable.");
        };

        await findCompany.destroy();

        res.status(200).json("Entreprise supprimée !");
    }
}

module.exports = companyController;