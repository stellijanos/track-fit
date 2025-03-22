const OpenAI = require('openai');
const env = require('../../config/env');

const OPENAI_API_KEY = env.openAiApiKey;

const client = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

const generateMessage = async (content) => {
    const completion = await client.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                role: 'user',
                content,
            },
        ],
    });

    return completion.choices[0].message.content;
};

module.exports = {
    generateMessage,
};
