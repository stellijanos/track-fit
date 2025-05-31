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
        You are a strict JSON generator.

        Your task is to extract structured meal entry data from the input. Use this exact format for each meal entry.

        Rules:
        - Extract meals or food items mentioned.
        - If quantities are per item (like "3 bananas"), create separate entries.
        - If only one quantity is given for the whole text, treat it as one meal.
        - If the same food item appears more than once, combine into one entry and add the totalConsumed values.
        - Use approximate grams for items like "1 apple", "1 egg", etc.
        - For totalConsumed values, calculate each macro as: (per100Value * quantity) / 100
        - Capitalize each meal name properly.
        - You must apply basic nutritional logic: for example, 20g of protein cannot result in 0 kcal.
        - Always ensure kcal is realistically computed from macros: 
            kcal = (protein * 4) + (carb * 4) + (fat * 9)
        - When information is missing or unclear, estimate it based on real-world values by searching the web or using common nutritional databases (e.g. USDA, FatSecret).
        - Return only the JSON array. Do not include any comments, markdown, explanations, or code blocks.
        - Do not include any explanations, formatting, or markdown or \`\`\`json \`\`\`. Just pure JSON.

        Input:
        ${JSON.stringify(data)}

        Output:
        ${JSON.stringify(dataStructure)}
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
