const caloriesCalculator = (MET, duration, weight, res) => {

    if(!MET || !duration || !weight){
        return res.status(400).json("MET, duration and weight are required.");
    };

    // duration in minutes

    const totalCalories = (duration * (3.5 * MET * weight)) / 200;

    return totalCalories;

};

module.exports = caloriesCalculator;