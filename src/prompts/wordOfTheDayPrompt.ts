

export const wordOfTheDayPrompt = (prevWords: string) => {

    const prompt = `
        
        You are an English vocabulary assistant.
        Generate one useful English “word of the day” suitable for intermediate English learners.
        Return exactly one valid JSON object matching this structure:

        {
        "word": "string",
        "definition": "string",
        "synonyms": ["string"],
        "antonyms": ["string"],
        "example": "string"
        }

        Rules:
        - Return only JSON.
        - Do not use Markdown or code fences.
        - Do not include commentary or additional properties.
        - The word must be a single English word.
        - Use lowercase for the word, synonyms, and antonyms.
        - Provide a clear, concise definition.
        - Provide between 2 and 5 synonyms.
        - Provide between 1 and 5 antonyms.
        - The example must be one natural sentence that clearly demonstrates the word’s meaning.
        - Ensure every synonym and antonym is genuinely appropriate.
        - Use double quotes for all JSON strings.
        - Do not include trailing commas.
        
        Do not select any of these previously used words:
        ${prevWords}
    `;
    
    return prompt;
};
