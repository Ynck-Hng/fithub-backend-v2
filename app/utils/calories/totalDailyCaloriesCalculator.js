const totalDailyCaloriesCalculator = (userDailyActivitiesData) => {
    let totalCalories = 0;

    for(let element of userDailyActivitiesData){
        totalCalories += element.calories;
    }

    return totalCalories;
};

module.exports = totalDailyCaloriesCalculator;