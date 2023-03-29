const error = require("debug")("error");
const ActivityUser = require("../../models/schemas/activities/ActivityUser");
const totalDailyCaloriesCalculator = require("../../utils/totalDailyCaloriesCalculator");
const { Activity, CategoryActivity, User, ChallengeUser } = require("./../../models");
const caloriesCalculator = require("./../../utils/caloriesCalculator");

const activityController = {
    findAll: async (req, res) => {
        const result = await Activity.findAll({
            include: ["UsersActivities", "CategoriesActivity"]
        });

        if(result.length === 0){
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
            return res.status(400).json("Code, label, MET and category are required.");
        };

        const findActivityCode = await Activity.findOne({
            where: {
                code
            }
        });

        if(findActivityCode){
            return res.status(409).json("Code already exists.");
        };

        const findActivityLabel = await Activity.findOne({
            where: {
                label
            }
        });

        if(findActivityLabel){
            return res.status(409).json("Label already exists.");
        };

        const findCategoryActivity = await CategoryActivity.findByPk(category_activity_id);
        
        if(!findCategoryActivity){
            return res.status(404).json("Category cannot be found.");
        };

        const newActivity = {
            code,
            label,
            met,
            category_activity_id
        };

        await Activity.create(newActivity);

        res.status(201).json("Activity created !");
    },

    updateOne: async (req, res) => {
        const activityId = req.params.activityId;

        const {code, label, met, category_activity_id} = req.body;

        const findActivity = await Activity.findByPk(activityId);

        if(!findActivity){
            return res.status(404).json("Activity cannot be found.");
        };

        if(code){
            const findActivityCode = await Activity.findOne({
                where: {
                    code
                }
            });

            if(findActivityCode){
                return res.status(409).json("Code already exists.");
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
                return res.status(409).json("Label already exists.");
            };
            findActivity.label = label;
        };

        if(met){
            findActivity.met = met;
        };

        if(category_activity_id){
            const findCategoryActivity = await CategoryActivity.findByPk(category_activity_id);
        
            if(!findCategoryActivity){
                return res.status(404).json("Category cannot be found.");
            };
            findActivity.category_activity_id = category_activity_id;
        };

        await findActivity.save();

        res.status(200).json("Activity updated !");
    },
    
    deleteOne: async (req, res) => {
        const activityId = req.params.activityId;

        const findActivity = await Activity.findByPk(activityId);

        if(!findActivity){
            return res.status(404).json("Activity cannot be found.");
        };

        await findActivity.destroy();

        res.status(200).json("Activity deleted !");
    },

    assignActivityToUser: async (req, res) => {
        // post
        const {user_id, activity_id, duration} = req.body;
        
        const findUser = await User.findByPk(user_id);
        if(!findUser) {
            return res.status(404).json("User cannot be found.");
        };

        const findActivity = await Activity.findByPk(activity_id);
        
        if(!findActivity){
            return res.status(404).json("Activity cannot be found.");
        };

        const date = new Date();
        const formattedDate = date.toISOString().slice(0, 10);

        const findAllUserActivityByDate = await ActivityUser.findAll({
            where: {
                user_id,
                activity_id,
                date_assigned: formattedDate
            }
        });

        //check total calories

        const caloriesFromActivity = caloriesCalculator(findActivity.met, duration, findUser.weight);

        const userDailyCaloriesTotal = totalDailyCaloriesCalculator(findAllUserActivityByDate, caloriesFromActivity);

        switch(userDailyCaloriesTotal){
        case userDailyCaloriesTotal > 1000:
            break;
        case userDailyCaloriesTotal + caloriesFromActivity > 1000:
            findUser.xp += 1000 - caloriesFromActivity;
            await findUser.save();
            break;
        default:
            findUser.xp += caloriesFromActivity;
            await findUser.save();
            break;
    }

        const newActivity = {
            user_id,
            activity_id,
            duration,
            calories: caloriesFromActivity,
            date_assigned: formattedDate
        }

        await ActivityUser.create(newActivity);

        res.status(200).json("YEP");
    },

    removeActivityFromUser: async (req, res) => {
        // Permettre ? No imo, mais bonne route à garder pour les admins

        // Check que possède droit admin
    }
}

module.exports = activityController;