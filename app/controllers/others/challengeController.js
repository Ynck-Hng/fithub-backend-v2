const error = require("debug")("error");
const { Challenge, User, ChallengeUser } = require("./../../models");

const challengeController = {
    findAll: async (req, res) => {
        const result = await Challenge.findAll();

        if(result.length === 0){
            return res.status(404).json("No challenges found.");
        };

        res.status(200).json(result);
    },

    findOne: async (req, res) => {
        const challengeId = req.params.challengeId;

        const findChallenge = await Challenge.findByPk(challengeId);
        
        if(!findChallenge){
            return res.status(404).json("Challenge cannot be found.");
        };

        res.status(200).json(findChallenge);
    },

    createOne: async (req, res) => {
        const {label} = req.body;

        if(!label){
            return res.status(400).json("Label is required.");
        };

        const findChallengeLabel = await Challenge.findOne({
            where:{
                label
            }
        });

        if(findChallengeLabel){
            return res.status(409).json("Challenge already exists.");
        };

        const newChallenge = {
            label
        };

        await Challenge.create(newChallenge);

        res.status(201).json("Challenge created !");
    },

    updateOne: async (req, res) => {
        const challengeId = req.params.challengeId;

        const {label} = req.params.challengeId;

        const findChallenge = await Challenge.findByPk(challengeId);
        
        if(!findChallenge){
            return res.status(404).json("Challenge cannot be found.");
        };

        if(label){
            const findChallengeLabel = await Challenge.findOne({
                where:{
                    label
                }
            });

            if(findChallengeLabel){
                return res.status(409).json("Challenge already exists.");
            };
        
            findChallenge.label = label;
        }

        await findChallenge.save();

        res.status(200).json("Challenge updated !");
    },

        //user activity where ? 

    assignChallenge: async (req, res) => {
        // TODO!

        //check d'abord qu'il n'a pas encore reçu de challenge ajd

        const {userId} = req.body;
        
        //format la date
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0,10);
        console.log(formattedDate);
        //multiple checks, si on tente de check user + présence challenge
        //ambigû psk on sait pas si user existe du coup
        const findUser = await User.findByPk(userId)
        if(!findUser){
            return res.status(404).json("User cannot be found.");
        };

        // random number here

        const findChallengeUserByDate = await ChallengeUser.findOne({
            where: {
                date_assigned: formattedDate
            }
        });

        if(findChallengeUserByDate){
            return res.status(409).json("User already received a daily challenge.");
        };

        const allChallenges = await Challenge.findAll();

        const newUserChallenge = {
            user_id: userId,
            challenge_id: allChallenges[0].id,
            date_assigned: formattedDate
        }

        await ChallengeUser.create(newUserChallenge);

        res.status(200).json("Challenge created !");
        
        //through date_assigned

        //check si total calories > 1000
    },

    challengeChecker: async (req, res) => {

        const userId = req.params.userId;

        const {challengeId} = req.body;

        const currentDate = new Date();

        const formattedDate = currentDate.toISOString().slice(0, 10);

        const findUser = await User.findByPk(userId);
        if(!findUser){
            return res.status(404).json("User cannot be found.");
        }

        const findChallengeUserByDate = await ChallengeUser.findOne({
            where: {
                user_id: userId,
                challenge_id: challengeId,
                date_assigned: formattedDate
            }
        });

        if(!findChallengeUserByDate){
            return res.status(404).json("Only current day's challenge can be completed.");
        };

        switch(findChallengeUserByDate.completed){
            case 'no':
                findChallengeUserByDate.completed = 'yes';
                findChallengeUserByDate.save();
                break;
            case 'yes':
                findChallengeUserByDate.completed = 'no';
                findChallengeUserByDate.save();
                break;
        }
        res.status(200).json("Challenge completion updated !");
    },
    
    deleteOne: async (req, res) => {
        const challengeId = req.params.challengeId;

        const findChallenge = await Challenge.findByPk(challengeId);
        
        if(!findChallenge){
            return res.status(404).json("Challenge cannot be found.");
        };

        await findChallenge.destroy();

        res.status(200).json("Challenge deleted !");
    }
}

module.exports = challengeController;