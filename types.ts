
export enum AppState {
  HOME,
  INPUT_FORM,
  GENERATING,
  RESULTS,
  ERROR,
}

export enum FrameRatio {
  NINE_SIXTEEN = '9:16',
  SIXTEEN_NINE = '16:9',
  ONE_ONE = '1:1',
  FOUR_FIVE = '4:5',
}

export enum CharacterType {
  HUMAN = 'Con người',
  ANIMAL = 'Động vật',
}

export interface HumanCharacter {
  type: CharacterType.HUMAN;
  id: string;
  gender: string;
  age: string;
  height: string;
  skinColor: string;
  hairStyle: string;
  hairColor: string;
  outfit: string;
  face: string;
  expression: string;
  style: string;
}

export interface AnimalCharacter {
  type: CharacterType.ANIMAL;
  id: string;
  species: string;
  furColor: string;
  furLength: string;
  accessories: string;
  clothing: string;
  eyes: string;
  ears: string;
  stance: string;
  size: string;
  personality: string;
}

export type Character = HumanCharacter | AnimalCharacter;

export interface GeneratedPrompt {
  id: number;
  title: string;
  description: string;
  text: string;
  duration: number;
  frame_ratio: FrameRatio;
}

export interface GeneratedContent {
  projectName: string;
  duration: string;
  frameRatio: FrameRatio;
  characters: Character[];
  script: string;
  imagePrompts: GeneratedPrompt[];
  videoPrompts: GeneratedPrompt[];
}

export interface ApiKeyConfig {
    key: string;
    label: string;
    isActive: boolean;
    isValid: boolean;
    addedAt: number;
}

export enum GeminiModelId {
    FLASH = 'gemini-2.5-flash',
    FLASH_LITE = 'gemini-2.5-flash-lite-latest',
    PRO = 'gemini-2.0-pro-exp-02-05', 
    PRO_3 = 'gemini-3-pro-preview',
}

export interface GeminiModelConfig {
    id: GeminiModelId;
    name: string;
    description: string;
}
