const error = require("debug")("error");
const ActivityUser = require("../../models/schemas/activities/ActivityUser");
const totalDailyCaloriesCalculator = require("../../utils/totalDailyCaloriesCalculator");
const { Activity, CategoryActivity, User } = require("./../../models");
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

        //check total calories burned from this activity
        const caloriesFromActivity = caloriesCalculator(findActivity.met, duration, findUser.weight);

        // check total calories burned today
        const userDailyCaloriesTotal = totalDailyCaloriesCalculator(findAllUserActivityByDate);
        
        if(userDailyCaloriesTotal > 1000){
            // If user burned more than 1000 today
            // do nothing
        }else if( userDailyCaloriesTotal + caloriesFromActivity > 1000){
            // If the total calories burned today + calories burned from activty is more than 1000
            // then only add the required amount to reach 1000 cap
            // to the user exp
            findUser.xp += (1000 - findUser.xp);
            //save the changes
            await findUser.save();
        } else {
            // Default case add calories value to the user xp
            findUser.xp += caloriesFromActivity;
            await findUser.save();
        }

        const newActivity = {
            user_id,
            activity_id,
            duration,
            calories: caloriesFromActivity,
            date_assigned: formattedDate
        }

        await ActivityUser.create(newActivity);

        res.status(200).json("Activity assigned to user !");
    },

    removeActivityFromUser: async (req, res) => {
        const userId = req.params.userId;
        const activityId = req.params.activityId;
        const activityUserId = req.params.activityUserId;

        const findUser = await User.findByPk(userId);

        if(!findUser){
            return res.status(404).json("User cannot be found.");
        };

        const findActivity = await Activity.findByPk(activityId);
        console.log(findActivity);
        if(!findActivity){
            return res.status(404).json("Activity cannot be found.");;
        };

        const findUserActivity = await ActivityUser.findByPk(activityUserId);

        if(!findUserActivity) {
            return res.status(404).json("Activity already not assigned to user.");
        };

        const date = new Date();
        const formattedDate = date.toISOString().slice(0, 10);
    
        if(findUserActivity.date_assigned === formattedDate){
            const findAllUserActivityByDate = await ActivityUser.findAll({
                where: {
                    user_id: userId,
                    activity_id: activityId,
                    date_assigned: formattedDate
                }
            });

            //check total calories

            const caloriesFromActivity = findUserActivity.calories;
            // calculate total amount of calories burned on that day
            const userDailyCaloriesTotal = totalDailyCaloriesCalculator(findAllUserActivityByDate);
            // calculate total amount of calories burned before registering this activity
            const userDailyCaloriesTotalBeforeActivity = userDailyCaloriesTotal - caloriesFromActivity;


            if(userDailyCaloriesTotalBeforeActivity > 1000){
                // if calories before activity more than 1000, only delete entry
                await findUserActivity.destroy();
            } else if(userDailyCaloriesTotalBeforeActivity < 1000 && userDailyCaloriesTotalBeforeActivity + caloriesFromActivity > 1000) {
                // if calories less than 1000, but the sum before activity + calories burned is more than 1000
                // only substract by taking in account the extra that was not added
                // it will return a negative number
                const differenceFromMaxExp = userDailyCaloriesTotalBeforeActivity - 1000;
                findUser.xp += differenceFromMaxExp;
                // save modification
                await findUser.save();
                // delete entry
                await findUserActivity.destroy();
            } else {
                // default case, substract the full calories value
                findUser.xp -= caloriesFromActivity;
                await findUser.save();
                await findUserActivity.destroy();
            }
        }
        res.status(200).json("Activity removed from user !");
    }
}

module.exports = activityController;