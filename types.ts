
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

export interface CharacterVisual {
  bodyType: string;
  mainShape: string;
  lineStyle: string;
  colorScheme: {
    base: string;
    accentColor: string;
    background: string;
  };
  eyesType: string;
  mouthType: string;
  props: string[];
  iconicSilhouette: string;
}

export interface CharacterPersonality {
  coreTraits: string[];
  strengths: string[];
  flaws: string[];
  motivation: string;
  runningGag: string;
}

export interface CharacterBehavior {
  defaultExpression: string;
  expressionRange: string[];
  signaturePoses: string[];
  movementStyle: string;
  timingNotes: string;
}

export interface CharacterVoice {
  tone: string;
  speechStyle: string;
  catchphrases: string[];
}

export interface CharacterAiPrompt {
  positive: string;
  negative: string;
}

export interface CharacterProductionNotes {
  usedInSeries: string[];
  animationTips: string;
  compatibility: string;
}

export interface Character {
  id: string;
  name: string;
  type: string; // Con người | Quái | Thần | Ma | Robot | Khác
  role: string; // Anh hùng | Phản anh hùng | Phản diện | Comic relief | NPC
  gender: string;
  ageRange: string;
  group?: string; // Group categorization
  
  visual: CharacterVisual;
  personality: CharacterPersonality;
  behavior: CharacterBehavior;
  voice: CharacterVoice;
  aiPrompt: CharacterAiPrompt;
  productionNotes: CharacterProductionNotes;
}

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
