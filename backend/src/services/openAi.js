const openAi = require('../utils/functions/openAi');
const activityLevelValues = require('../enums/activityLevelValues');
const goalAdjustments = require('../enums/goalAdjustments');
const mealTypes = require('../enums/mealTypes');

const getActivityData = async (data) => {
    const dataStructure = {
        name: 'String (Activity name)',
        caloriesPerHour: 'Number',
    };

    const content = `
    ## User Input:
    ${JSON.stringify(data)}

    ## Task
    Correct the name and capitalize (if the case) and calculate the calories per hour of that activity based on user input.
    
    Return ONLY ${JSON.stringify(dataStructure)} as a valid JSON string.
    Do not include any explanations, formatting, or markdown. Just pure JSON.
    `;

    console.log(content);
    return await openAi.generateMessage(content);
};

const getCaloricTarget = async (data) => {
    const dataStructure = {
        kcal: 'Type Number',
        protein: 'Type Number',
        carb: 'Type Number',
        fat: 'Type Number',
    };

    const content = `
    ## User Input:
    ${JSON.stringify(data)}
    Activity levels: ${JSON.stringify(activityLevelValues)}
    Goal adjustements: ${JSON.stringify(goalAdjustments)}

    ## Task
    Calculate caloric target (kcal, protein, carb, fat) based on user input.
    'height' is in cm; 'weight' in kg; 'protein', 'carb' and 'fat' in g.

    Note: -1 values mean they were not provided. Use the most accurate formula.

    Return ONLY ${JSON.stringify(dataStructure)} as a valid JSON string.
    Do not include any explanations, formatting, or markdown. Just pure JSON.
    `;

    console.log(content);
    return await openAi.generateMessage(content);
};

const getMealEntry = async (data) => {
    const dataStructure = {
        name: 'String',
        per100: { kcal: 'Number', protein: 'Number', carb: 'Number', fat: 'Number', fibre: 'Number', salt: 'Number' },
        totalConsumed: {
            quantity: 'Number',
            kcal: 'Number',
            protein: 'Number',
            carb: 'Number',
            fat: 'Number',
            fibre: 'Number',
            salt: 'Number',
        },
    };

    const content = `
    ## User Input:
    ${JSON.stringify(data)}

    ## Task
    Calculate calories and nutrients for the provided meal.
    Create many meals of they are mutiple.
    Return -1 values for anything that is not food related.
    'protein', 'carb' and 'fat' in g.
    Extract each meal entry name (also capitalize) and also the total quantity.

    Return ONLY "[${JSON.stringify(dataStructure)}]" as a valid JSON string.
    Do not include any explanations, formatting, or markdown. Just pure list of JSON.
    `;

    console.log(content);
    return await openAi.generateMessage(content);
};

module.exports = {
    getActivityData,
    getCaloricTarget,
    getMealEntry,
};
