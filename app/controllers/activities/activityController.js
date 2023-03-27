const error = require("debug")("error");
const { Activity, CategoryActivity } = require("./../../models");

const activityController = {
    findAll: async (req, res) => {
        const result = await Activity.findAll({
            include: ["user", "category_activity"]
        });

        if(!result){
            return res.status(404).json("Aucune activité n'a été trouvée.");
        };

        res.status(200).json(result);
    },

    findOne: async (req, res) => {
        // besoin ???

    },

    createOne: async (req, res) => {
        const {code, label, met, category_activity_id} = req.body;

        if(!code || !label || !met || !category_activity_id){
            return res.status(400).json("Le code, le label, le met et la catégorie sont obligatoires.");
        };

        const findActivityCode = await Activity.findOne({
            where: {
                code
            }
        });

        if(findActivityCode){
            return res.status(409).json("Ce code existe déjà.");
        };

        const findActivityLabel = await Activity.findOne({
            where: {
                label
            }
        });

        if(findActivityLabel){
            return res.status(409).json("Ce label existe déjà.");
        };

        const findCategoryActivity = await CategoryActivity.findByPk(category_activity_id);
        
        if(!findCategoryActivity){
            return res.status(404).json("Cette catégorie est introuvable.");
        };

        const newActivity = {
            code,
            label,
            met,
            category_activity_id
        };

        await Activity.create(newActivity);

        res.status(201).json("Activité créée !");
    },

    updateOne: async (req, res) => {
        const activityId = req.params.activityId;

        const {code, label, met, category_activity_id} = req.body;

        const findActivity = await Activity.findByPk(activityId);

        if(!findActivity){
            return res.status(404).json("Cette activité est introuvable.");
        };

        if(code){
            const findActivityCode = await Activity.findOne({
                where: {
                    code
                }
            });

            if(findActivityCode){
                return res.status(409).json("Ce code existe déjà.");
            };
            findActivity.code = code;
        };

        if(label){
            const findActivityLabel = await Activity.findOne({
                where: {
                    label
                }
            });

            if(findActivityLabel){
                return res.status(409).json("Ce label existe déjà.");
            };
            findActivity.label = label;
        };

        if(met){
            findActivity.met = met;
        };

        if(category_activity_id){
            const findCategoryActivity = await CategoryActivity.findByPk(category_activity_id);
        
            if(!findCategoryActivity){
                return res.status(404).json("Cette catégorie est introuvable.");
            };
            findActivity.category_activity_id = category_activity_id;
        };

        await findActivity.save();

        res.status(200).json("Activité mise à jour !");
    },
    
    deleteOne: async (req, res) => {
        const activityId = req.params.activityId;

        const findActivity = await Activity.findByPk(activityId);

        if(!findActivity){
            return res.status(404).json("Cette activité est introuvable.");
        };

        await findActivity.destroy();

        res.status(200).json("Activité supprimée !");
    }
}

module.exports = activityController;