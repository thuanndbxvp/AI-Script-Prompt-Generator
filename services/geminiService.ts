
import { GoogleGenAI, Type } from "@google/genai";
import { Character, FrameRatio, GeneratedContent, CharacterType, HumanCharacter, AnimalCharacter, GeminiModelId } from '../types';

// Helper to initialize AI with a specific key
const getAIClient = (apiKey: string) => {
    return new GoogleGenAI({ apiKey: apiKey });
};

export const validateApiKey = async (apiKey: string): Promise<boolean> => {
    try {
        const ai = getAIClient(apiKey);
        // Make a very cheap, lightweight call to verify validity
        await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: 'test',
        });
        return true;
    } catch (error) {
        console.error("API Key validation failed:", error);
        return false;
    }
};

const generateContentSchema = {
  type: Type.OBJECT,
  properties: {
    projectName: { type: Type.STRING },
    duration: { type: Type.STRING },
    frameRatio: { type: Type.STRING },
    script: { type: Type.STRING },
    imagePrompts: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER },
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          text: { type: Type.STRING },
          duration: { type: Type.INTEGER },
          frame_ratio: { type: Type.STRING },
        },
      },
    },
    videoPrompts: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER },
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          text: { type: Type.STRING },
          duration: { type: Type.INTEGER },
          frame_ratio: { type: Type.STRING },
        },
      },
    },
  },
};

export const generateScriptAndPrompts = async (
  apiKey: string,
  modelId: GeminiModelId,
  topic: string,
  totalSeconds: number,
  characters: Character[],
  frameRatio: FrameRatio,
  isConsistent: boolean,
  userScript?: string,
  imageStylePrompt?: string
): Promise<GeneratedContent> => {
    
  if (!apiKey) throw new Error("Vui lòng cấu hình API Key trước.");

  const ai = getAIClient(apiKey);

  const scriptInstruction = userScript
    ? `
- **Provided Script:** The user has provided a script. Use this exact script for the 'script' field in your JSON output and generate prompts based on it.
  """
  ${userScript}
  """
`
    : `
- **Script Generation:** Generate a script for a ${totalSeconds}-second video on the given topic. The script text should be approximately ${Math.round(totalSeconds / 60 * 1000)} characters long. The script should be engaging and divided into logical scenes.
`;

  const durationAndPromptCountInstructions = `
    - **Total Video Duration:** ${totalSeconds} seconds.
    - **Prompt Count:** ${Math.ceil(totalSeconds / 8)} prompts.
`;

  const visualStyleInstruction = imageStylePrompt ? `\n- **Visual Style Keywords:** ${imageStylePrompt}` : '';
  const visualStyleRuleAddition = imageStylePrompt ? ` At the very end of the generated prompt text, you MUST append the following style keywords exactly as they are: "${imageStylePrompt}"` : '';


  const prompt = `
    You are an expert scriptwriter and AI prompt engineer for visual content. 
    Your task is to generate a complete content package based on the following user specifications. 
    Please provide your response as a single JSON object matching the provided schema.

    **Specifications:**
    - **Topic / Project Name:** ${topic}
    ${durationAndPromptCountInstructions}
    - **Primary Frame Ratio:** ${frameRatio}${visualStyleInstruction}
    ${scriptInstruction}
    - **Characters (${characters.length}):**
      ${characters.map(c => `- ${JSON.stringify(c)}`).join('\n')}
    - **Character Consistency:** ${isConsistent ? 'All characters must be visually consistent throughout all prompts. Mention this in each prompt.' : 'Character appearance can vary slightly.'}

    **Rules:**
    1.  **Script:** ${userScript ? "Use the user-provided script and place it directly into the 'script' field of the JSON output." : "Generate a new script based on the topic and duration."}
    2.  **Prompt Generation:**
        -   Based on the specifications, generate the required number of prompts. Each prompt represents an 8-second segment of the video.
        -   Distribute these prompts between 'imagePrompts' and 'videoPrompts' arrays. Video prompts should be more common.
        -   Each prompt object must have an 'id', 'title', 'description', 'text', 'duration' (always 8), and 'frame_ratio'.
        -   The 'title' should be a short, descriptive name for the scene in Vietnamese (e.g., "Mở đầu", "Giới thiệu nhân vật", "Cảnh 1: Hành động").
        -   The 'description' should briefly explain the purpose of this specific prompt within the overall story in Vietnamese.
    3.  **Image Prompt Formula (Strict):** The 'text' for image prompts must be a detailed, single paragraph in English, describing a static scene. Follow this structure: 
        1.  **Subject:** Describe the main character or subject in detail (appearance, clothing).
        2.  **Setting:** Describe the environment and background.
        3.  **Action/Pose:** Describe the character's static pose or a frozen moment of action.
        4.  **Style:** End with a list of keywords for style, lighting, and quality. Example: "photorealistic, cinematic lighting, wide angle shot, 8K, hyper-detailed".${visualStyleRuleAddition}
    4.  **Video Prompt Formula (Strict):** The 'text' for video prompts must be a concise, single sentence in English, focusing on movement. Follow this structure:
        1.  **Camera:** Start with the camera shot and movement (e.g., "A cinematic tracking shot of...").
        2.  **Subject & Action:** Describe the character and what they are actively doing.
        3.  **Setting:** Briefly mention the location.
        4.  **Style:** End with keywords for style and frame ratio. Example: "cinematic, dramatic lighting, 8K, gentle camera shake, frame ratio ${frameRatio}".${visualStyleRuleAddition}
    5.  **Output Format:** Return ONLY a valid JSON object. Do not include any text, backticks, or explanations before or after the JSON.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: generateContentSchema,
        temperature: 0.7,
      },
    });

    const jsonString = response.text.trim();
    const parsedJson = JSON.parse(jsonString);

    return {
        ...parsedJson,
        characters: characters, // Add characters back in as they aren't in the response
    } as GeneratedContent;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate content from AI: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating content.");
  }
};


export const calculateDurationFromScript = async (apiKey: string, script: string, modelId: GeminiModelId = GeminiModelId.FLASH): Promise<number> => {
  if (!apiKey) throw new Error("Vui lòng cấu hình API Key.");
  const ai = getAIClient(apiKey);

  const prompt = `
    Analyze the following Vietnamese script and estimate the total video duration in seconds required to produce it. 
    Assume a standard speaking pace and pacing for a short video.
    Respond with ONLY a valid JSON object with a single key "totalSeconds".
    
    Script:
    """
    ${script}
    """
  `;
  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: { totalSeconds: { type: Type.INTEGER } },
        },
      },
    });
    const result = JSON.parse(response.text);
    return result.totalSeconds || 0;
  } catch (error) {
    console.error("Error calculating duration:", error);
    throw new Error("Failed to calculate duration from script.");
  }
};

const humanCharacterSchema = {
    type: Type.OBJECT,
    properties: {
        gender: { type: Type.STRING }, age: { type: Type.STRING }, height: { type: Type.STRING },
        skinColor: { type: Type.STRING }, hairStyle: { type: Type.STRING }, hairColor: { type: Type.STRING },
        outfit: { type: Type.STRING }, face: { type: Type.STRING }, expression: { type: Type.STRING },
        style: { type: Type.STRING }
    }
};

const animalCharacterSchema = {
    type: Type.OBJECT,
    properties: {
        species: { type: Type.STRING }, furColor: { type: Type.STRING }, furLength: { type: Type.STRING },
        accessories: { type: Type.STRING }, clothing: { type: Type.STRING }, eyes: { type: Type.STRING },
        ears: { type: Type.STRING }, stance: { type: Type.STRING }, size: { type: Type.STRING },
        personality: { type: Type.STRING }
    }
};


export const suggestCharacterFromScript = async (
  apiKey: string, 
  script: string, 
  currentCharacter: Character, 
  modelId: GeminiModelId = GeminiModelId.FLASH
): Promise<Partial<HumanCharacter | AnimalCharacter>> => {
    if (!apiKey) throw new Error("Vui lòng cấu hình API Key.");
    const ai = getAIClient(apiKey);

    const characterType = currentCharacter.type;
    const prompt = `
        Based on the provided script, suggest detailed attributes for a key character. 
        Analyze the context, actions, and tone of the script to infer the most suitable appearance and style.
        The character type to describe is: ${characterType}.

        Script:
        """
        ${script}
        """

        Respond with ONLY a valid JSON object containing the suggested attributes. Do not include the 'type' or 'id' fields.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: modelId,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: characterType === CharacterType.HUMAN ? humanCharacterSchema : animalCharacterSchema,
            },
        });
        return JSON.parse(response.text);
    } catch (error) {
        console.error("Error suggesting character:", error);
        throw new Error("Failed to suggest character from script.");
    }
};

export const cleanScript = async (apiKey: string, script: string, modelId: GeminiModelId = GeminiModelId.FLASH): Promise<string> => {
  if (!apiKey) return script; // Safe fallback
  const ai = getAIClient(apiKey);

  const prompt = `
    You are a script cleaning utility. Your task is to process the following script and remove all non-diegetic elements. 
    This includes:
    - Scene headings (e.g., "INT. OFFICE - DAY", "(Open - Tense, atmospheric music)")
    - Character parentheticals for tone or action (e.g., "(shouting)", "(VOICE - The 'Macro-Strategic Analyst')")
    - Sound effects and music cues (e.g., "(Tense music)", "(Music cuts abruptly. Pause)")
    - Any text enclosed in parentheses that describes actions or settings rather than being spoken dialogue.

    Return ONLY the cleaned script containing the dialogue and essential narrative. Do not add any explanations or introductory text.

    Original Script:
    """
    ${script}
    """
  `;
  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error cleaning script, returning original script:", error);
    // Fallback to original script if cleaning fails
    return script;
  }
};
