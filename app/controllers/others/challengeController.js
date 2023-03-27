const error = require("debug")("error");
const { Challenge } = require("./../../models");

const challengeController = {
    findAll: async (req, res) => {
        const result = await Challenge.findAll();

        if(!result){
            return res.status(404).json("Aucun challenge n'a été trouvé.");
        };

        res.json(200).json(result);
    },

    findOne: async (req, res) => {
        const challengeId = req.params.challengeId;

        const findChallenge = await Challenge.findByPk(challengeId);
        
        if(!findChallenge){
            return res.status(404).json("Ce challenge est introuvable.");
        };

        res.status(200).json(findChallenge);
    },

    createOne: async (req, res) => {
        const {label} = req.body;

        if(!label){
            return res.status(400).json("Le label est obligatoire.");
        };

        const findChallengeLabel = await Challenge.findOne({
            where:{
                label
            }
        });

        if(findChallengeLabel){
            return res.status(409).json("Ce challenge existe déjà.");
        };

        const newChallenge = {
            label
        };

        await Challenge.create(newChallenge);

        res.status(201).json("Challenge créé !");
    },

    updateOne: async (req, res) => {
        const challengeId = req.params.challengeId;

        const {label} = req.params.challengeId;

        const findChallenge = await Challenge.findByPk(challengeId);
        
        if(!findChallenge){
            return res.status(404).json("Ce challenge est introuvable.");
        };

        if(label){
            const findChallengeLabel = await Challenge.findOne({
                where:{
                    label
                }
            });

            if(findChallengeLabel){
                return res.status(409).json("Ce challenge existe déjà.");
            };
        
            findChallenge.label = label;
        }

        await findChallenge.save();

        res.status(200).json("Challenge mis à jour !");
    },

        //user activity where ? 

    assignChallenge: async (req, res) => {
        // TODO!

        //check d'abord qu'il n'a pas encore reçu de challenge ajd

        const {userId, currentDate} = req.body;
        
        //format la date
        
        //through date_assigned

        //check si total calories > 1000

    },

    challengeCompleted: async (req, res) => {
        // TODO!
        //vérifier si mm date sinon on le laisse pas faire

    },

    challengeUncompleted: async (req, res) => {
        // TODO!
        //vérifier si mm date sinon on le laisse pas faire


    },
    
    deleteOne: async (req, res) => {
        const challengeId = req.params.challengeId;

        const findChallenge = await Challenge.findByPk(challengeId);
        
        if(!findChallenge){
            return res.status(404).json("Ce challenge est introuvable.");
        };

        await findChallenge.destroy();

        res.status(200).json("Challenge supprimé !");
    }
}

module.exports = challengeController;