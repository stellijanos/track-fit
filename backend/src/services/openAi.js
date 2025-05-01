const openAi = require('../utils/functions/openAi');
const activityLevelValues = require('../enums/activityLevelValues');
const goalAdjustments = require('../enums/goalAdjustments');
const mealTypes = require('../enums/mealTypes');
const mealPlanTypes = require('../enums/mealPlanTypes');

/**
 * Generate activity data based on user data
 *
 * @param {Object} data - Data containing user input /details
 * @returns
 */
const getActivityData = async (data) => {
    // 1. Define data structure to return
    const dataStructure = {
        name: 'String (Activity name)',
        caloriesPerHour: 'Number',
    };

    // 2. Define content (message) to OpenAI service
    const content = `
    ## User Input:
    ${JSON.stringify(data)}

    ## Task
    Correct the name and capitalize (if the case) and calculate the calories per hour of that activity based on user input.
    
    Return ONLY ${JSON.stringify(dataStructure)} as a valid JSON string.
    Do not include any explanations, formatting, or markdown or \`\`\`json \`\`\`. Just pure JSON.
    `;

    // 3. Retrieve response from OpenAI (Defined data structure at step 1. in JSON format)
    const response = await openAi.generateMessage(content);

    // 4. Return parsed response
    return JSON.parse(response);
};

const getCaloricTarget = async (data) => {
    // 1. Define data structure to return
    const dataStructure = {
        kcal: 'Type Number',
        protein: 'Type Number',
        carb: 'Type Number',
        fat: 'Type Number',
    };

    // 2. Define content (message) to OpenAI service
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
    Do not include any explanations, formatting, or markdown or \`\`\`json \`\`\`. Just pure JSON
    `;

    // 3. Retrieve response from OpenAI (Defined data structure at step 1. in JSON format)
    const response = await openAi.generateMessage(content);

    // 4. Return parsed response
    return JSON.parse(response);
};

const getMealEntry = async (data) => {
    // 1. Define data structure to return
    const dataStructure = {
        name: 'String',
        per100: {
            kcal: 'Number',
            protein: 'Number',
            carb: 'Number',
            fat: 'Number',
            fibre: 'Number',
            salt: 'Number',
        },
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

    // 2. Define content (message) to OpenAI service
    const content = `
    ## User Input:
    ${JSON.stringify(data)}

    ## Task:
    - Extract all meals from the user input.
    - If quantities are provided separately for each meal/food item, create separate meal entries.
    - If only one quantity is provided for the whole list, treat it as one meal.
    - If there is specified some other numeric data, take that in account please.
    - Return 'protein', 'carb', and 'fat' in grams.
    - Capitalize each meal name.
    - Always return a list of JSON objects matching exactly this structure:
    [${JSON.stringify(dataStructure)}]
    - Please do not include any explanation, markdown, comments, or \`\`\`json \`\`\`
    `;

    // 3. Retrieve response from OpenAI (Defined data structure at step 1. in JSON format)
    const response = await openAi.generateMessage(content);

    // 4. Return parsed response
    return JSON.parse(response);
};

const getMealPlan = async (data) => {
    // 1. Define data structure to return
    const dataStructure = {
        name: 'String',
        type: `one of: ${Object.values(mealPlanTypes).join(', ')}`,
        days: [
            {
                name: 'String',
                description: 'String',
                dailyCaloricTarget: 'Number',
                dailyMacros: {
                    protein: 'Number',
                    carb: 'Number',
                    fat: 'Number',
                },
                meals: [
                    {
                        name: 'String',
                        description: 'String',
                        type: `one of: ${Object.values(mealTypes).join(', ')}`,
                        kcal: 'Number',
                        protein: 'Number',
                        carb: 'Number',
                        fat: 'Number',
                        fibre: 'Number',
                        salt: 'Number',
                    },
                ],
            },
        ],
    };

    // 2. Define content (message) to OpenAI service
    const content = `
    You are a strict JSON generator.
    
    ### Input:
    ${JSON.stringify(data)}
    
    ### Instructions:
    - Based on the input, generate a meal plan as a JSON object.
    - Do not return explanations, comments, markdown, or surrounding text.
    - Return **only** valid JSON (no \`\`\`, no text before or after).
    - Use only these allowed values for "type": ${Object.values(mealPlanTypes).join(', ')}.
    - Each day must include meals with nutritional values.
    - Return protein, carb, and fat in grams.
    - Capitalize each meal name (e.g. "Grilled Chicken").
    - The output MUST match this structure exactly:
    
    ${JSON.stringify(dataStructure, null, 2)}
    
    If the input is not food/meal-related, return: {}
    `;

    // 3. Retrieve response from OpenAI (Defined data structure at step 1. in JSON format)
    const response = await openAi.generateMessage(content);

    // 4. Return parsed response
    return JSON.parse(response);
};

module.exports = {
    getActivityData,
    getCaloricTarget,
    getMealEntry,
    getMealPlan,
};
