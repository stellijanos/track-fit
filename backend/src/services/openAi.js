const openAi = require('../utils/functions/openAi');

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

module.exports = {
    getActivityData,
};
