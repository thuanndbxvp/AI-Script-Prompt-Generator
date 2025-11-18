
import React, { useState, useCallback, ChangeEvent, useMemo, useEffect } from 'react';
import { AppState, FrameRatio, CharacterType, HumanCharacter, AnimalCharacter, Character, GeneratedContent, GeneratedPrompt, ApiKeyConfig, GeminiModelConfig, GeminiModelId } from './types';
import { FRAME_RATIO_OPTIONS, HUMAN_OPTIONS, ANIMAL_OPTIONS, PRESET_CHARACTERS, IMAGE_STYLES } from './constants';
import { Frame916Icon, Frame169Icon, Frame11Icon, Frame45Icon, PlusIcon, TrashIcon, BackIcon, CopyIcon, DownloadIcon, EditIcon, GoogleIcon, BookmarkIcon, CheckIcon, Logo, XMarkIcon, ExclamationCircleIcon, InformationCircleIcon } from './components/icons';
import { generateScriptAndPrompts, calculateDurationFromScript, suggestCharacterFromScript, cleanScript, validateApiKey } from './services/geminiService';

// --- Constants & Config ---

const GEMINI_MODELS: GeminiModelConfig[] = [
    { id: GeminiModelId.FLASH, name: 'Gemini 2.5 Flash', description: 'Nhanh, tiết kiệm, tốt cho tác vụ cơ bản.' },
    { id: GeminiModelId.FLASH_LITE, name: 'Gemini 2.5 Flash Lite', description: 'Siêu tốc độ, chi phí thấp nhất.' },
    { id: GeminiModelId.PRO, name: 'Gemini 2.5 Pro', description: 'Thông minh hơn, lý tưởng cho kịch bản phức tạp.' },
    { id: GeminiModelId.PRO_3, name: 'Gemini 3.0 Pro Preview', description: 'Mô hình lý luận cao cấp nhất (Experimental).' },
];

// --- Toast Component ---

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

const ToastContainer: React.FC<{ toasts: Toast[], removeToast: (id: number) => void }> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3">
      {toasts.map(toast => (
        <div 
          key={toast.id} 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border transition-all duration-300 animate-fade-in-down min-w-[300px] max-w-md bg-white ${
            toast.type === 'success' ? 'border-l-4 border-l-green-500' :
            toast.type === 'error' ? 'border-l-4 border-l-red-500' :
            'border-l-4 border-l-blue-500'
          }`}
        >
          <div className="flex-shrink-0">
            {toast.type === 'success' && <CheckIcon className="text-green-500" />}
            {toast.type === 'error' && <ExclamationCircleIcon className="text-red-500" />}
            {toast.type === 'info' && <InformationCircleIcon className="text-blue-500" />}
          </div>
          <p className="text-sm font-medium text-gray-800 flex-grow">{toast.message}</p>
          <button onClick={() => removeToast(toast.id)} className="text-gray-400 hover:text-gray-600">
            <XMarkIcon />
          </button>
        </div>
      ))}
    </div>
  );
};


// --- Helper Components defined outside App to prevent re-renders ---

interface QuickSelectProps<T> {
  label: string;
  options: string[];
  value: string;
  name: keyof T;
  onChange: (name: keyof T, value: string) => void;
  allowManualInput?: boolean;
}

const QuickSelect = <T,>({ label, options, value, name, onChange, allowManualInput = true }: QuickSelectProps<T>) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
  };
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-text-secondary mb-1">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {options.map(option => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(name, option)}
            className={`px-3 py-1 text-sm rounded-lg border transition-all ${
              value === option 
                ? 'bg-brand-primary text-white border-brand-primary shadow-sm' 
                : 'bg-white text-neutral-text border-gray-200 hover:border-brand-primary hover:text-brand-primary'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {allowManualInput && (
        <input
          type="text"
          name={String(name)}
          value={value}
          onChange={handleInputChange}
          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-neutral-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-shadow shadow-sm"
          placeholder={`Hoặc nhập thủ công...`}
        />
      )}
    </div>
  );
};

interface CharacterFormProps {
  character: Character;
  updateCharacter: (id: string, newDetails: Partial<Character>) => void;
  removeCharacter: (id: string) => void;
  userScript: string;
  onSuggest: (id: string) => void;
  isSuggesting: boolean;
}

const CharacterForm: React.FC<CharacterFormProps> = ({ character, updateCharacter, removeCharacter, userScript, onSuggest, isSuggesting }) => {
  const handleFieldChange = (name: keyof HumanCharacter | keyof AnimalCharacter, value: string) => {
    updateCharacter(character.id, { [name]: value } as Partial<Character>);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 relative">
        <button 
            type="button" 
            onClick={() => removeCharacter(character.id)}
            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
        >
            <TrashIcon />
        </button>
      <div className="flex items-center gap-4">
        <label className="text-lg font-bold text-neutral-text">Nhân vật</label>
        <select 
            value={character.type}
            onChange={(e) => updateCharacter(character.id, { type: e.target.value as CharacterType })}
            className="bg-gray-50 border border-gray-300 rounded-md px-3 py-1 text-neutral-text focus:outline-none focus:ring-1 focus:ring-brand-primary"
        >
            <option value={CharacterType.HUMAN}>Con người</option>
            <option value={CharacterType.ANIMAL}>Động vật</option>
        </select>
      </div>

      {character.type === CharacterType.HUMAN && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickSelect label="Giới tính" options={HUMAN_OPTIONS.gender} value={character.gender} name="gender" onChange={handleFieldChange} />
            <QuickSelect label="Độ tuổi" options={HUMAN_OPTIONS.age} value={character.age} name="age" onChange={handleFieldChange} />
            <QuickSelect label="Chiều cao" options={HUMAN_OPTIONS.height} value={character.height} name="height" onChange={handleFieldChange} />
            <QuickSelect label="Màu da" options={HUMAN_OPTIONS.skinColor} value={character.skinColor} name="skinColor" onChange={handleFieldChange} />
            <QuickSelect label="Kiểu tóc" options={HUMAN_OPTIONS.hairStyle} value={character.hairStyle} name="hairStyle" onChange={handleFieldChange} />
            <QuickSelect label="Màu tóc" options={HUMAN_OPTIONS.hairColor} value={character.hairColor} name="hairColor" onChange={handleFieldChange} />
            <QuickSelect label="Trang phục" options={HUMAN_OPTIONS.outfit} value={character.outfit} name="outfit" onChange={handleFieldChange} />
            <QuickSelect label="Khuôn mặt" options={HUMAN_OPTIONS.face} value={character.face} name="face" onChange={handleFieldChange} />
            <QuickSelect label="Biểu cảm" options={HUMAN_OPTIONS.expression} value={character.expression} name="expression" onChange={handleFieldChange} />
            <QuickSelect label="Phong cách" options={HUMAN_OPTIONS.style} value={character.style} name="style" onChange={handleFieldChange} />
        </div>
      )}

      {character.type === CharacterType.ANIMAL && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickSelect label="Loài" options={ANIMAL_OPTIONS.species} value={character.species} name="species" onChange={handleFieldChange} />
            <QuickSelect label="Màu lông" options={ANIMAL_OPTIONS.furColor} value={character.furColor} name="furColor" onChange={handleFieldChange} />
            <QuickSelect label="Độ dài lông" options={ANIMAL_OPTIONS.furLength} value={character.furLength} name="furLength" onChange={handleFieldChange} />
            <QuickSelect label="Phụ kiện" options={ANIMAL_OPTIONS.accessories} value={character.accessories} name="accessories" onChange={handleFieldChange} />
            <QuickSelect label="Quần áo" options={ANIMAL_OPTIONS.clothing} value={character.clothing} name="clothing" onChange={handleFieldChange} />
            <QuickSelect label="Mắt" options={ANIMAL_OPTIONS.eyes} value={character.eyes} name="eyes" onChange={handleFieldChange} />
            <QuickSelect label="Tai" options={ANIMAL_OPTIONS.ears} value={character.ears} name="ears" onChange={handleFieldChange} />
            <QuickSelect label="Dáng đứng" options={ANIMAL_OPTIONS.stance} value={character.stance} name="stance" onChange={handleFieldChange} />
            <QuickSelect label="Kích thước" options={ANIMAL_OPTIONS.size} value={character.size} name="size" onChange={handleFieldChange} />
            <QuickSelect label="Tính cách" options={ANIMAL_OPTIONS.personality} value={character.personality} name="personality" onChange={handleFieldChange} />
        </div>
      )}
      {userScript && (
          <div className="border-t border-gray-100 pt-4 flex justify-end">
              <button
                  type="button"
                  onClick={() => onSuggest(character.id)}
                  disabled={isSuggesting}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-brand-secondary hover:bg-brand-primary rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  {isSuggesting ? (
                    <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang phân tích...
                    </>
                  ) : 'AI gợi ý'}
              </button>
          </div>
      )}
    </div>
  );
};

const PromptItem: React.FC<{ prompt: GeneratedPrompt, type: 'Ảnh' | 'Video' }> = ({ prompt, type }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(prompt.text);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt.text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };
    
    return (
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-md font-bold text-neutral-text">{prompt.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs font-bold px-2 py-1 rounded-md ${type === 'Ảnh' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{type} - {prompt.duration}s</span>
                        <span className="ml-2 text-xs font-mono px-2 py-1 rounded-md bg-gray-100 text-gray-600 border border-gray-200">{prompt.frame_ratio}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                    <button onClick={() => setIsEditing(!isEditing)} className="hover:text-brand-primary p-1"><EditIcon /></button>
                    <button 
                        onClick={handleCopy} 
                        className={`p-1 transition-all duration-200 ${isCopied ? 'text-green-500 scale-110' : 'hover:text-brand-primary'}`}
                        title={isCopied ? "Đã sao chép" : "Sao chép"}
                    >
                        {isCopied ? <CheckIcon /> : <CopyIcon />}
                    </button>
                </div>
            </div>
            <p className="mt-2 text-sm text-neutral-text-secondary italic border-l-2 border-gray-200 pl-3">{prompt.description}</p>
             {isEditing ? (
                <textarea 
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 mt-3 text-sm text-neutral-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    rows={4}
                />
            ) : (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-800 font-medium leading-relaxed">
                    {prompt.text}
                </div>
            )}
        </div>
    );
};

interface ResultsScreenProps {
    content: GeneratedContent;
    onBack: () => void;
    onDownload: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ content, onBack, onDownload }) => {
    const [activeTab, setActiveTab] = useState<'script' | 'image' | 'video'>('script');

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center mb-8 sticky top-20 bg-neutral-dark/90 backdrop-blur-md py-4 z-10 transition-all">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-white hover:shadow-sm mr-4 transition-all text-gray-600"><BackIcon /></button>
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-text truncate">Kết quả: <span className="text-brand-primary">{content.projectName}</span></h1>
                <button onClick={onDownload} className="ml-auto flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-sm transition-colors">
                    <DownloadIcon /> <span className="hidden md:inline">Tải Excel</span>
                </button>
            </div>
            
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button onClick={() => setActiveTab('script')} className={`${activeTab === 'script' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}>Kịch bản</button>
                    <button onClick={() => setActiveTab('image')} className={`${activeTab === 'image' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}>Prompt Ảnh ({content.imagePrompts.length})</button>
                    <button onClick={() => setActiveTab('video')} className={`${activeTab === 'video' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}>Prompt Video ({content.videoPrompts.length})</button>
                </nav>
            </div>

            <div className="min-h-[500px]">
                {activeTab === 'script' && (
                    <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                        <h2 className="text-xl font-bold mb-4 text-neutral-text">Nội dung kịch bản</h2>
                        <p className="whitespace-pre-wrap leading-relaxed text-lg text-gray-700">{content.script}</p>
                    </div>
                )}
                {activeTab === 'image' && (
                     <div className="space-y-6">
                        {content.imagePrompts.map(p => <PromptItem key={p.id} prompt={p} type="Ảnh" />)}
                     </div>
                )}
                {activeTab === 'video' && (
                    <div className="space-y-6">
                        {content.videoPrompts.map(p => <PromptItem key={p.id} prompt={p} type="Video" />)}
                     </div>
                )}
            </div>
        </div>
    );
};

// --- Persistent Header Component ---

interface HeaderProps {
    onGoHome: () => void;
    onOpenApi: () => void;
    apiKeyCount: number;
}

const Header: React.FC<HeaderProps> = ({ onGoHome, onOpenApi, apiKeyCount }) => {
    return (
        <header className="sticky top-0 z-50 w-full bg-neutral-dark/90 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo Left */}
                <div 
                    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" 
                    onClick={onGoHome}
                >
                    <Logo />
                </div>

                {/* Actions Right */}
                <div className="flex items-center gap-3">
                     {/* Icon / Theme Button */}
                    <button
                        className="h-9 w-9 flex items-center justify-center bg-white hover:bg-gray-50 text-gray-500 rounded-lg border border-gray-200 shadow-sm transition-all"
                        title="Edit / Theme"
                    >
                        <EditIcon />
                    </button>

                    {/* Login Button */}
                    <button
                        className="hidden md:flex items-center gap-2 h-9 px-4 bg-[#0F9D88] hover:bg-[#0d8a77] text-white text-sm font-medium rounded-lg shadow-sm transition-all"
                    >
                        <div className="bg-white p-0.5 rounded-full">
                            <GoogleIcon />
                        </div>
                        <span>Đăng nhập</span>
                    </button>

                    {/* Library Button */}
                    <button
                        className="flex items-center gap-2 h-9 px-4 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 shadow-sm transition-all relative"
                    >
                         <BookmarkIcon />
                         <span className="hidden sm:inline">Thư viện</span>
                         <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white ring-2 ring-white">
                            1
                         </span>
                    </button>

                    {/* API Button */}
                    <button
                        onClick={onOpenApi}
                        className="h-9 px-4 bg-[#22C55E] hover:bg-[#1ea951] text-white text-sm font-bold rounded-lg shadow-sm transition-all flex items-center gap-2"
                    >
                        API 
                        <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white font-normal">{apiKeyCount > 0 ? 'Active' : '!'}</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

// --- API Management Modal ---

interface ApiManagerModalProps {
    isOpen: boolean;
    onClose: () => void;
    apiKeys: ApiKeyConfig[];
    onAddKey: (key: string, label: string) => Promise<void>;
    onDeleteKey: (key: string) => void;
    onToggleKey: (key: string) => void;
    activeModelId: GeminiModelId;
    onChangeModel: (id: GeminiModelId) => void;
    addToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

const ApiManagerModal: React.FC<ApiManagerModalProps> = ({ 
    isOpen, onClose, apiKeys, onAddKey, onDeleteKey, onToggleKey, activeModelId, onChangeModel, addToast
}) => {
    const [newKey, setNewKey] = useState('');
    const [newLabel, setNewLabel] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    if (!isOpen) return null;

    const handleAdd = async () => {
        if (!newKey.trim()) return;
        setIsVerifying(true);
        setErrorMsg('');
        try {
            await onAddKey(newKey.trim(), newLabel.trim() || `API Key ${apiKeys.length + 1}`);
            setNewKey('');
            setNewLabel('');
            addToast("Thêm API Key thành công!", 'success');
        } catch (err) {
            setErrorMsg('API Key không hợp lệ hoặc không thể kết nối.');
            addToast("API Key không hợp lệ!", 'error');
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-neutral-text">Cấu hình API & Model</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="p-6 space-y-8">
                    {/* Model Selection - Dropdown */}
                    <section>
                         <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">1. Chọn Model AI</h3>
                         <div className="relative">
                            <select 
                                value={activeModelId} 
                                onChange={(e) => onChangeModel(e.target.value as GeminiModelId)}
                                className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 pr-8 font-medium text-neutral-text focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent cursor-pointer transition-shadow"
                            >
                                {GEMINI_MODELS.map(model => (
                                    <option key={model.id} value={model.id}>
                                        {model.name}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                         </div>
                         <p className="mt-2 text-xs text-gray-500">
                             {GEMINI_MODELS.find(m => m.id === activeModelId)?.description}
                         </p>
                    </section>

                    {/* API Key Management */}
                    <section>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">2. Quản lý API Keys</h3>
                        
                        {/* Add New Key */}
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-4">
                             <div className="mb-3">
                                <label className="block text-xs font-medium text-gray-600 mb-1">Tên gợi nhớ (tùy chọn)</label>
                                <input 
                                    type="text" 
                                    value={newLabel}
                                    onChange={(e) => setNewLabel(e.target.value)}
                                    placeholder="VD: Key cá nhân, Key công ty..."
                                    className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-brand-primary outline-none"
                                />
                             </div>
                             <div className="mb-3">
                                <label className="block text-xs font-medium text-gray-600 mb-1">Google API Key</label>
                                <input 
                                    type="password" 
                                    value={newKey}
                                    onChange={(e) => setNewKey(e.target.value)}
                                    placeholder="AIzaSy..."
                                    className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-brand-primary outline-none font-mono"
                                />
                             </div>
                             {errorMsg && <p className="text-red-500 text-xs mb-3">{errorMsg}</p>}
                             <button 
                                onClick={handleAdd}
                                disabled={isVerifying || !newKey}
                                className="w-full bg-neutral-text text-white text-sm font-bold py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors flex justify-center items-center gap-2"
                             >
                                 {isVerifying ? 'Đang kiểm tra...' : <><PlusIcon /> Thêm & Active Key</>}
                             </button>
                             <div className="mt-2 text-[10px] text-gray-400 text-center">Key được lưu trên trình duyệt của bạn (LocalStorage).</div>
                        </div>

                        {/* List Keys */}
                        <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                            {apiKeys.length === 0 && <div className="text-center text-sm text-gray-400 py-4">Chưa có API Key nào.</div>}
                            {apiKeys.map(keyConfig => (
                                <div key={keyConfig.key} className={`flex items-center justify-between p-3 rounded-lg border ${keyConfig.isActive ? 'border-green-200 bg-green-50' : 'border-gray-100 bg-white'}`}>
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div onClick={() => onToggleKey(keyConfig.key)} className={`flex-shrink-0 h-3 w-3 rounded-full cursor-pointer ${keyConfig.isActive ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-gray-300'}`}></div>
                                        <div className="flex flex-col min-w-0">
                                            <span className={`text-sm font-semibold truncate ${keyConfig.isActive ? 'text-green-900' : 'text-gray-600'}`}>{keyConfig.label}</span>
                                            <span className="text-[10px] text-gray-400 font-mono truncate">...{keyConfig.key.slice(-6)}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => onDeleteKey(keyConfig.key)} className="text-gray-400 hover:text-red-500 p-1"><TrashIcon /></button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                 <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl text-right">
                    <button onClick={onClose} className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-sm">Đóng</button>
                 </div>
            </div>
        </div>
    );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.HOME);
  
  // Data State
  const [topic, setTopic] = useState('');
  const [userScript, setUserScript] = useState('');
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isConsistent, setIsConsistent] = useState(true);
  const [frameRatio, setFrameRatio] = useState<FrameRatio>(FrameRatio.SIXTEEN_NINE);
  const [imageStyle, setImageStyle] = useState<string>(IMAGE_STYLES[0].prompt);
  
  // Results & UI State
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCalculatingDuration, setIsCalculatingDuration] = useState(false);
  const [isSuggestingCharacterId, setIsSuggestingCharacterId] = useState<string | null>(null);

  // Toast State
  const [toasts, setToasts] = useState<Toast[]>([]);

  // API & Model State
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [apiKeys, setApiKeys] = useState<ApiKeyConfig[]>([]);
  const [activeModelId, setActiveModelId] = useState<GeminiModelId>(GeminiModelId.FLASH);

  // Load API Config on Mount
  useEffect(() => {
      const storedKeys = localStorage.getItem('visora_api_keys');
      const storedModel = localStorage.getItem('visora_active_model');
      if (storedKeys) {
          try {
            setApiKeys(JSON.parse(storedKeys));
          } catch(e) {}
      }
      if (storedModel && Object.values(GeminiModelId).includes(storedModel as GeminiModelId)) {
          setActiveModelId(storedModel as GeminiModelId);
      }
  }, []);

  // Persistence Helper
  const saveApiKeys = (keys: ApiKeyConfig[]) => {
      setApiKeys(keys);
      localStorage.setItem('visora_api_keys', JSON.stringify(keys));
  };

  const getActiveKey = () => {
      return apiKeys.find(k => k.isActive)?.key || '';
  };

  // --- Toast Handlers ---

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // --- API Management Handlers ---

  const handleAddKey = async (key: string, label: string) => {
      const isValid = await validateApiKey(key);
      if (!isValid) throw new Error("Invalid Key");

      const newConfig: ApiKeyConfig = {
          key,
          label,
          isActive: true, // Auto activate new key
          isValid: true,
          addedAt: Date.now()
      };

      // Deactivate others if this one is active
      const updatedKeys = apiKeys.map(k => ({...k, isActive: false}));
      updatedKeys.push(newConfig);
      saveApiKeys(updatedKeys);
  };

  const handleDeleteKey = (keyToDelete: string) => {
      const updatedKeys = apiKeys.filter(k => k.key !== keyToDelete);
      // If we deleted the active key, activate the last one available
      if (apiKeys.find(k => k.key === keyToDelete)?.isActive && updatedKeys.length > 0) {
          updatedKeys[updatedKeys.length - 1].isActive = true;
      }
      saveApiKeys(updatedKeys);
      addToast("Đã xóa API Key.", 'info');
  };

  const handleToggleKey = (keyToActivate: string) => {
      const updatedKeys = apiKeys.map(k => ({
          ...k,
          isActive: k.key === keyToActivate
      }));
      saveApiKeys(updatedKeys);
      addToast("Đã chuyển đổi API Key hoạt động.", 'success');
  };

  const handleChangeModel = (id: GeminiModelId) => {
      setActiveModelId(id);
      localStorage.setItem('visora_active_model', id);
      addToast(`Đã đổi model sang: ${GEMINI_MODELS.find(m => m.id === id)?.name}`, 'info');
  };

  // --- Core App Logic ---

  const totalSeconds = useMemo(() => (minutes * 60) + seconds, [minutes, seconds]);

  const groupedImageStyles = useMemo(() => {
    return IMAGE_STYLES.reduce((acc, style) => {
        acc[style.group] = [...(acc[style.group] || []), style];
        return acc;
    }, {} as Record<string, typeof IMAGE_STYLES>);
  }, []);

  const handleStart = () => {
    if (topic.trim() === '' && userScript.trim() === '') {
      addToast("Vui lòng nhập chủ đề hoặc dán kịch bản của bạn.", "error");
      return;
    }
    if (!getActiveKey()) {
        setIsApiModalOpen(true);
        addToast("Vui lòng thêm và kích hoạt một API Key trước khi bắt đầu.", "info");
        return;
    }
    setAppState(AppState.INPUT_FORM);
  };
  
  const handleBack = () => {
      setGeneratedContent(null);
      setError(null);
      setAppState(AppState.INPUT_FORM);
  }

  const addNewCharacter = useCallback((preset: Partial<HumanCharacter | AnimalCharacter> | null = null) => {
    const newId = `char_${Date.now()}`;
    const newCharacter = preset 
      ? { ...preset, id: newId }
      : {
          type: CharacterType.HUMAN,
          id: newId,
          gender: 'Nam', age: '18–25', height: '170cm', skinColor: 'Sáng', hairStyle: 'Ngắn', hairColor: 'Đen', outfit: 'Casual', face: 'Tự nhiên', expression: 'Tự nhiên', style: 'Hiện đại'
        };
    setCharacters(prev => [...prev, newCharacter as Character]);
    if (!preset) addToast("Đã thêm nhân vật mới", "info");
  }, [addToast]);

  const updateCharacter = useCallback((id: string, newDetails: Partial<Character>) => {
    setCharacters(prev => prev.map(char => {
        if (char.id === id) {
            if (newDetails.type && newDetails.type !== char.type) {
                const newId = char.id;
                return newDetails.type === CharacterType.HUMAN ?
                    { type: CharacterType.HUMAN, id: newId, gender: 'Nam', age: '18–25', height: '170cm', skinColor: 'Sáng', hairStyle: 'Ngắn', hairColor: 'Đen', outfit: 'Casual', face: 'Tự nhiên', expression: 'Tự nhiên', style: 'Hiện đại' } :
                    { type: CharacterType.ANIMAL, id: newId, species: 'Mèo', furColor: 'Trắng', furLength: 'Ngắn', accessories: 'Nơ cổ', clothing: 'Không', eyes: 'Xanh', ears: 'Ngắn', stance: 'Bốn chân', size: 'Bé', personality: 'Lanh lợi' };
            }
            return { ...char, ...newDetails };
        }
        return char;
    }));
  }, []);

  const removeCharacter = useCallback((id: string) => {
    setCharacters(prev => prev.filter(char => char.id !== id));
    addToast("Đã xóa nhân vật", "info");
  }, [addToast]);
  
  const handleGenerate = async () => {
    const activeKey = getActiveKey();
    if (!activeKey) {
        addToast("Không tìm thấy API Key hợp lệ.", "error");
        setIsApiModalOpen(true);
        return;
    }

    setAppState(AppState.GENERATING);
    setError(null);
    try {
        const finalTopic = topic.trim() || "Dự án từ kịch bản có sẵn";
        
        let scriptForGeneration = userScript;
        if (userScript.trim()) {
            scriptForGeneration = await cleanScript(activeKey, userScript, activeModelId);
        }

        const result = await generateScriptAndPrompts(
            activeKey,
            activeModelId,
            finalTopic, 
            totalSeconds, 
            characters, 
            frameRatio, 
            isConsistent, 
            scriptForGeneration, 
            imageStyle
        );
        setGeneratedContent(result);
        setAppState(AppState.RESULTS);
        addToast("Tạo nội dung thành công!", "success");
    } catch (e) {
        const err = e as Error;
        setError(err.message || 'Đã xảy ra lỗi không xác định.');
        setAppState(AppState.ERROR);
        addToast("Đã xảy ra lỗi khi tạo nội dung.", "error");
    }
  };

  const handleCalculateDuration = async () => {
    if (!userScript.trim()) return;
    const activeKey = getActiveKey();
    if (!activeKey) {
        addToast("Cần API Key để tính toán.", "error");
        setIsApiModalOpen(true);
        return;
    }

    setIsCalculatingDuration(true);
    try {
        const estimatedSeconds = await calculateDurationFromScript(activeKey, userScript, activeModelId);
        setMinutes(Math.floor(estimatedSeconds / 60));
        setSeconds(estimatedSeconds % 60);
        addToast(`Ước tính thời lượng: ${estimatedSeconds}s`, "success");
    } catch (err) {
        addToast((err as Error).message, "error");
    } finally {
        setIsCalculatingDuration(false);
    }
  };

  const handleSuggestCharacter = async (characterId: string) => {
    if (!userScript.trim()) return;
    const activeKey = getActiveKey();
    if (!activeKey) {
        addToast("Cần API Key để gợi ý.", "error");
        setIsApiModalOpen(true);
        return;
    }

    const characterToUpdate = characters.find(c => c.id === characterId);
    if (!characterToUpdate) return;

    setIsSuggestingCharacterId(characterId);
    try {
        const suggestion = await suggestCharacterFromScript(activeKey, userScript, characterToUpdate, activeModelId);
        updateCharacter(characterId, suggestion);
        addToast("Đã cập nhật nhân vật từ kịch bản!", "success");
    } catch (err) {
        addToast((err as Error).message, "error");
    } finally {
        setIsSuggestingCharacterId(null);
    }
  };
  
  const downloadAsCSV = () => {
    if (!generatedContent) return;

    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    csvContent += "STT;Loại;Tiêu đề;Nội dung;Thời lượng (s);Nhân vật;Khung hình;Ghi chú\n";

    const characterNames = (generatedContent.characters as Character[]).map((c, i) => `NV${i + 1}`).join(', ');

    const allPrompts = [...generatedContent.imagePrompts, ...generatedContent.videoPrompts]
        .sort((a, b) => a.id - b.id);

    allPrompts.forEach((prompt, index) => {
        const type = generatedContent.imagePrompts.some(p => p.id === prompt.id) ? "Ảnh" : "Video";
        const row = [
            index + 1,
            type,
            `"${prompt.title.replace(/"/g, '""')}"`,
            `"${prompt.text.replace(/"/g, '""')}"`, 
            prompt.duration,
            characterNames,
            prompt.frame_ratio,
            `"${prompt.description.replace(/"/g, '""')}"`
        ].join(";"); 
        csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${generatedContent.projectName.replace(/ /g, '_')}_prompts.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast("Đã tải xuống file CSV!", "success");
};


  const renderHome = () => (
    <div className="text-center max-w-4xl mx-auto py-12 px-4 flex-1 flex flex-col justify-center">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-brand-light to-brand-primary tracking-tight">
        AI Script & Prompt Generator
      </h1>
      <p className="text-lg md:text-xl text-neutral-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">Tự động tạo kịch bản, prompt ảnh, và prompt video từ chủ đề của bạn.</p>
      
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100 w-full">
        <div className="mb-6">
            <label className="block text-left text-sm font-bold text-gray-700 mb-2 ml-1">Tên dự án / Chủ đề</label>
            <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="VD: TVC quảng cáo nước hoa..."
            className="w-full text-lg bg-gray-50 border border-gray-300 rounded-xl px-5 py-4 text-neutral-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-sm"
            />
        </div>

        <div className="relative my-6 flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 uppercase text-xs font-bold tracking-wider">Hoặc</span>
            <div className="flex-grow border-t border-gray-200"></div>
        </div>
        
        <div className="mb-6">
            <label className="block text-left text-sm font-bold text-gray-700 mb-2 ml-1">Kịch bản có sẵn (Tùy chọn)</label>
            <textarea
                value={userScript}
                onChange={(e) => setUserScript(e.target.value)}
                placeholder="Dán kịch bản của bạn vào đây để AI phân tích..."
                rows={6}
                className="w-full text-base bg-gray-50 border border-gray-300 rounded-xl px-5 py-4 text-neutral-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-sm"
            />
        </div>

        <button
          onClick={handleStart}
          className="w-full text-lg bg-brand-primary hover:bg-brand-secondary text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );

  const renderInputForm = () => (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 animate-fade-in">
        <div className="flex items-center mb-8">
             <button onClick={() => setAppState(AppState.HOME)} className="p-2 rounded-full hover:bg-white hover:shadow-sm mr-4 transition-all text-gray-600"><BackIcon /></button>
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-text">Chi tiết dự án: <span className="text-brand-primary">{topic.trim() || "Dự án từ kịch bản có sẵn"}</span></h1>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                    <div>
                        <h2 className="text-lg font-bold mb-4 text-neutral-text flex items-center gap-2">
                            <span className="bg-brand-primary text-white text-xs px-2 py-1 rounded">1</span> 
                            Thời lượng video
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <input 
                                    type="number" 
                                    value={minutes} 
                                    onChange={e => setMinutes(Number(e.target.value))} 
                                    min="0" 
                                    className="w-20 bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-center font-semibold text-neutral-text focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                    disabled={!!userScript.trim()}
                                /> <span className="text-sm font-medium text-gray-600">phút</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <input 
                                    type="number" 
                                    value={seconds} 
                                    onChange={e => setSeconds(Number(e.target.value))} 
                                    min="0" 
                                    max="59" 
                                    className="w-20 bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-center font-semibold text-neutral-text focus:ring-2 focus:ring-brand-primary focus:outline-none" 
                                    disabled={!!userScript.trim()}
                                /> <span className="text-sm font-medium text-gray-600">giây</span>
                            </div>

                            {userScript.trim() && (
                                <button
                                    type="button"
                                    onClick={handleCalculateDuration}
                                    disabled={isCalculatingDuration}
                                    className="ml-auto px-4 py-2 text-sm font-semibold text-brand-primary bg-indigo-50 hover:bg-indigo-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isCalculatingDuration ? 'Đang tính...' : 'Tính từ kịch bản'}
                                </button>
                            )}
                        </div>
                        <p className="text-sm text-gray-500 mt-2 ml-1">Tổng thời lượng: <span className="font-bold text-brand-primary">{totalSeconds}</span> giây</p>
                    </div>
                    <div className="pt-4 border-t border-gray-100">
                        <h2 className="text-lg font-bold mb-4 text-neutral-text flex items-center gap-2">
                             <span className="bg-brand-primary text-white text-xs px-2 py-1 rounded">2</span>
                             Tùy chọn nhân vật
                        </h2>
                         <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <input
                                type="checkbox"
                                id="consistent-char"
                                checked={isConsistent}
                                onChange={(e) => setIsConsistent(e.target.checked)}
                                className="h-5 w-5 rounded border-gray-300 text-brand-primary focus:ring-brand-primary cursor-pointer"
                            />
                            <label htmlFor="consistent-char" className="text-sm font-medium text-gray-700 cursor-pointer select-none">Giữ nhân vật đồng nhất xuyên suốt video</label>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold mb-4 text-neutral-text flex items-center gap-2">
                         <span className="bg-brand-primary text-white text-xs px-2 py-1 rounded">3</span>
                         Khung hình (Frame Ratio)
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        {FRAME_RATIO_OPTIONS.map(opt => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => setFrameRatio(opt.value)}
                                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center space-y-2 ${frameRatio === opt.value ? 'bg-indigo-50 border-brand-primary text-brand-primary' : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-200 hover:bg-gray-50'}`}
                            >
                                {opt.value === '16:9' && <Frame169Icon />}
                                {opt.value === '9:16' && <Frame916Icon />}
                                {opt.value === '1:1' && <Frame11Icon />}
                                {opt.value === '4:5' && <Frame45Icon />}
                                <span className="font-bold">{opt.label}</span>
                                <span className="text-xs text-center opacity-80">{opt.description.split('–')[0]}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Characters Section */}
            <div>
                 <h2 className="text-lg font-bold mb-4 text-neutral-text flex items-center gap-2">
                     <span className="bg-brand-primary text-white text-xs px-2 py-1 rounded">4</span>
                     Chi tiết nhân vật
                 </h2>
                 
                 <div className="flex flex-wrap gap-3 mb-6">
                    <span className="text-sm font-medium text-gray-500 py-1">Gợi ý mẫu:</span>
                    <button type="button" onClick={() => addNewCharacter(PRESET_CHARACTERS.human_male)} className="px-3 py-1 text-sm rounded-full bg-sky-100 hover:bg-sky-200 text-sky-700 font-medium transition-colors">Nam trẻ trung</button>
                    <button type="button" onClick={() => addNewCharacter(PRESET_CHARACTERS.human_female)} className="px-3 py-1 text-sm rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 font-medium transition-colors">Nữ thanh lịch</button>
                    <button type="button" onClick={() => addNewCharacter(PRESET_CHARACTERS.animal_cat)} className="px-3 py-1 text-sm rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-medium transition-colors">Mèo trắng 😺</button>
                 </div>

                 <div className="space-y-6">
                    {characters.map(char => (
                        <CharacterForm 
                            key={char.id} 
                            character={char} 
                            updateCharacter={updateCharacter} 
                            removeCharacter={removeCharacter}
                            userScript={userScript}
                            onSuggest={handleSuggestCharacter}
                            isSuggesting={isSuggestingCharacterId === char.id}
                        />
                    ))}
                 </div>

                 <button
                    type="button"
                    onClick={() => addNewCharacter()}
                    className="mt-6 w-full md:w-auto py-3 px-6 flex items-center justify-center gap-2 text-brand-primary bg-indigo-50 hover:bg-indigo-100 rounded-xl font-bold transition-colors border border-indigo-100"
                 >
                    <PlusIcon/> Thêm nhân vật
                 </button>
            </div>

             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold mb-4 text-neutral-text flex items-center gap-2">
                     <span className="bg-brand-primary text-white text-xs px-2 py-1 rounded">5</span>
                     Phong cách ảnh/video
                </h2>
                <select
                    value={imageStyle}
                    onChange={(e) => setImageStyle(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-neutral-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                >
                    {Object.entries(groupedImageStyles).map(([group, styles]) => (
                        <optgroup label={group} key={group} className="font-semibold text-gray-700">
                            {(styles as typeof IMAGE_STYLES).map(style => (
                                <option key={style.name} value={style.prompt} className="text-gray-900">
                                    {style.name}
                                </option>
                            ))}
                        </optgroup>
                    ))}
                </select>
            </div>
            
            <div className="sticky bottom-0 py-6 bg-neutral-dark/90 backdrop-blur-sm flex justify-center z-10 border-t border-gray-200">
                 <button
                    type="submit"
                    className="w-full md:w-auto text-lg bg-brand-primary hover:bg-brand-secondary text-white font-bold py-4 px-16 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                    Tạo kịch bản & Prompt
                </button>
            </div>
        </form>
    </div>
  );

    const renderGenerating = () => (
        <div className="text-center flex flex-col items-center justify-center h-[60vh]">
            <div className="relative">
                <div className="absolute inset-0 bg-brand-primary opacity-20 rounded-full animate-ping"></div>
                <svg className="animate-spin relative z-10 h-16 w-16 text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
            <h2 className="text-3xl font-bold mt-8 text-neutral-text">Đang sáng tạo...</h2>
            <p className="text-neutral-text-secondary mt-3 text-lg max-w-md">AI đang phân tích ý tưởng, viết kịch bản và tạo prompt hình ảnh cho bạn.</p>
        </div>
    );
    
    const renderError = () => (
        <div className="text-center max-w-lg mx-auto mt-20 p-8 bg-white rounded-2xl shadow-lg border border-red-100">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Đã xảy ra lỗi</h2>
            <p className="text-gray-600 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">{error}</p>
            <button onClick={handleBack} className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-6 rounded-xl transition-colors">
                Thử lại
            </button>
        </div>
    );
    
  const renderContent = () => {
    switch (appState) {
      case AppState.HOME:
        return renderHome();
      case AppState.INPUT_FORM:
        return renderInputForm();
      case AppState.GENERATING:
        return renderGenerating();
      case AppState.RESULTS:
        return generatedContent ? <ResultsScreen content={generatedContent} onBack={handleBack} onDownload={downloadAsCSV} /> : renderError();
      case AppState.ERROR:
        return renderError();
      default:
        return renderHome();
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center bg-neutral-dark font-sans selection:bg-brand-primary selection:text-white relative">
      <Header 
        onGoHome={() => setAppState(AppState.HOME)} 
        onOpenApi={() => setIsApiModalOpen(true)} 
        apiKeyCount={apiKeys.length}
      />
      <div className="w-full flex-1 flex flex-col items-center">
          {renderContent()}
      </div>
      <ApiManagerModal 
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        apiKeys={apiKeys}
        onAddKey={handleAddKey}
        onDeleteKey={handleDeleteKey}
        onToggleKey={handleToggleKey}
        activeModelId={activeModelId}
        onChangeModel={handleChangeModel}
        addToast={addToast}
      />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </main>
  );
};

export default App;
