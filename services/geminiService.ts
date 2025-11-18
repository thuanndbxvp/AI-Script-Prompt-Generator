
import { GoogleGenAI, Type } from "@google/genai";
import { Character, FrameRatio, GeneratedContent, GeminiModelId } from '../types';
import { CHARACTER_UNIVERSE } from '../constants';

// Helper to initialize AI with a specific key
const getAIClient = (apiKey: string) => {
    return new GoogleGenAI({ apiKey: apiKey });
};

// Helper to clean JSON string from Markdown code blocks
const cleanJsonString = (jsonString: string): string => {
    let clean = jsonString.trim();
    // Remove ```json ... ``` or ``` ... ```
    if (clean.startsWith('```')) {
        clean = clean.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
    }
    // Find the first '{' and last '}' to ensure valid object bounds
    const firstBrace = clean.indexOf('{');
    const lastBrace = clean.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
        clean = clean.substring(firstBrace, lastBrace + 1);
    }
    return clean;
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
    // If AI auto-casts from Universe, we ask it to return the IDs of used characters here
    usedCharacterIds: { type: Type.ARRAY, items: { type: Type.STRING } },
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

  // LOGIC FOR CHARACTER UNIVERSE
  let characterInstruction = '';
  
  if (characters.length > 0) {
      // User selected specific characters
      const formattedCharacters = characters.map(c => `
      - Name: ${c.name} (ID: ${c.id}, ${c.type}, ${c.role})
        Visuals: ${JSON.stringify(c.visual)}
        Personality: ${JSON.stringify(c.personality)}
        AI Prompt Base: ${c.aiPrompt.positive}
      `).join('\n');
      
      characterInstruction = `
      - **Specific Casting:** You MUST use the following provided characters.
      ${formattedCharacters}
      `;
  } else {
      // User did not select -> AI decides from Universe
      // We send a summarized version of the universe to save some tokens but keep visuals
      const universeSummary = CHARACTER_UNIVERSE.map(c => `
      - ID: ${c.id} | Name: ${c.name} | Role: ${c.role}
        Visuals: ${JSON.stringify(c.visual)}
        AI Prompt Base: ${c.aiPrompt.positive}
      `).join('\n');

      characterInstruction = `
      - **Auto-Casting Mode:** The user has not selected specific characters. 
      - **Task:** You MUST choose the most appropriate characters from the "Character Universe" list below to cast in your script.
      - **Constraint:** Do NOT invent new main characters. Use the provided ones.
      - **Output:** In the JSON response, populate the 'usedCharacterIds' array with the IDs of the characters you chose.
      
      **Character Universe:**
      ${universeSummary}
      `;
  }

  const prompt = `
    You are an expert scriptwriter and AI prompt engineer for visual content (specializing in animation/stick-figure/storytelling). 
    Your task is to generate a complete content package based on the following user specifications. 
    Please provide your response as a single JSON object matching the provided schema.

    **Specifications:**
    - **Topic / Project Name:** ${topic}
    ${durationAndPromptCountInstructions}
    - **Primary Frame Ratio:** ${frameRatio}${visualStyleInstruction}
    ${scriptInstruction}
    
    **Character Instructions:**
    ${characterInstruction}

    **Character Consistency:** ${isConsistent ? 'All characters must be visually consistent throughout all prompts using the provided "Visuals" and "AI Prompt Base".' : 'Character appearance can vary slightly.'}

    **Rules:**
    1.  **Script:** ${userScript ? "Use the user-provided script and place it directly into the 'script' field of the JSON output." : "Generate a new script based on the topic and duration."}
    2.  **Prompt Generation:**
        -   Based on the specifications, generate the required number of prompts. Each prompt represents an 8-second segment of the video.
        -   Distribute these prompts between 'imagePrompts' and 'videoPrompts' arrays.
        -   Each prompt object must have an 'id', 'title', 'description', 'text', 'duration' (always 8), and 'frame_ratio'.
        -   The 'title' should be a short, descriptive name for the scene in Vietnamese.
        -   The 'description' should briefly explain the purpose of this specific prompt within the overall story in Vietnamese.
    3.  **Image Prompt Formula (Strict):** The 'text' for image prompts must be detailed, describing a static scene.
        -   **CRITICAL:** When a character appears, you MUST use their "AI Prompt Base" (positive prompt) provided in the character data as the foundation, then add the specific action/pose for this scene.
        -   Structure: [Character Visual Base] + [Specific Action/Pose] + [Setting/Background] + [Style Keywords].${visualStyleRuleAddition}
    4.  **Video Prompt Formula (Strict):** The 'text' for video prompts must focus on movement.
        -   **CRITICAL:** Use the "AI Prompt Base" for character consistency.
        -   Structure: [Camera Movement] + [Character Visual Base] + [Action] + [Setting] + [Style].${visualStyleRuleAddition}
    5.  **Output Format:** Return ONLY a valid JSON object.
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

    const jsonString = cleanJsonString(response.text);
    const parsedJson = JSON.parse(jsonString);

    // If AI auto-casted, we need to resolve the used IDs back to full character objects
    let finalCharacters = characters;
    if (characters.length === 0 && parsedJson.usedCharacterIds && Array.isArray(parsedJson.usedCharacterIds)) {
        const usedIds = parsedJson.usedCharacterIds;
        finalCharacters = CHARACTER_UNIVERSE.filter(c => usedIds.includes(c.id));
    }

    return {
        ...parsedJson,
        characters: finalCharacters, 
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
    
    const jsonString = cleanJsonString(response.text);
    const result = JSON.parse(jsonString);
    return result.totalSeconds || 0;
  } catch (error) {
    console.error("Error calculating duration:", error);
    throw new Error("Failed to calculate duration from script.");
  }
};

// New comprehensive character schema
const characterSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING },
        type: { type: Type.STRING },
        role: { type: Type.STRING },
        gender: { type: Type.STRING },
        ageRange: { type: Type.STRING },
        visual: {
            type: Type.OBJECT,
            properties: {
                bodyType: { type: Type.STRING },
                mainShape: { type: Type.STRING },
                lineStyle: { type: Type.STRING },
                colorScheme: {
                    type: Type.OBJECT,
                    properties: {
                        base: { type: Type.STRING },
                        accentColor: { type: Type.STRING },
                        background: { type: Type.STRING }
                    }
                },
                eyesType: { type: Type.STRING },
                mouthType: { type: Type.STRING },
                props: { type: Type.ARRAY, items: { type: Type.STRING } },
                iconicSilhouette: { type: Type.STRING }
            }
        },
        personality: {
            type: Type.OBJECT,
            properties: {
                coreTraits: { type: Type.ARRAY, items: { type: Type.STRING } },
                strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                flaws: { type: Type.ARRAY, items: { type: Type.STRING } },
                motivation: { type: Type.STRING },
                runningGag: { type: Type.STRING }
            }
        },
        behavior: {
            type: Type.OBJECT,
            properties: {
                defaultExpression: { type: Type.STRING },
                expressionRange: { type: Type.ARRAY, items: { type: Type.STRING } },
                signaturePoses: { type: Type.ARRAY, items: { type: Type.STRING } },
                movementStyle: { type: Type.STRING },
                timingNotes: { type: Type.STRING }
            }
        },
        voice: {
            type: Type.OBJECT,
            properties: {
                tone: { type: Type.STRING },
                speechStyle: { type: Type.STRING },
                catchphrases: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
        },
        aiPrompt: {
            type: Type.OBJECT,
            properties: {
                positive: { type: Type.STRING },
                negative: { type: Type.STRING }
            }
        },
        productionNotes: {
            type: Type.OBJECT,
            properties: {
                usedInSeries: { type: Type.ARRAY, items: { type: Type.STRING } },
                animationTips: { type: Type.STRING },
                compatibility: { type: Type.STRING }
            }
        }
    }
};


export const suggestCharacterFromScript = async (
  apiKey: string, 
  script: string, 
  currentCharacter: Character, 
  modelId: GeminiModelId = GeminiModelId.FLASH
): Promise<Partial<Character>> => {
    if (!apiKey) throw new Error("Vui lòng cấu hình API Key.");
    const ai = getAIClient(apiKey);

    const prompt = `
        Based on the provided script, suggest detailed attributes for a key character in the story. 
        The character should fit the following broad category if known: ${currentCharacter.type || 'Unknown'}.
        
        Fill in ALL fields in the schema, especially the 'visual', 'personality', and 'aiPrompt' sections.
        The 'aiPrompt.positive' should be a stable diffusion/midjourney style prompt description.

        Script:
        """
        ${script}
        """

        Respond with ONLY a valid JSON object.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: modelId,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: characterSchema,
            },
        });
        const jsonString = cleanJsonString(response.text);
        return JSON.parse(jsonString);
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
    return script;
  }
};
