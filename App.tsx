
import React, { useState } from 'react';
import { AppState, FrameRatio, Character, GeneratedContent, GeminiModelId } from './types';
import { FRAME_RATIO_OPTIONS, IMAGE_STYLES, CHARACTER_UNIVERSE } from './constants';
import { Logo, BackIcon, ExclamationCircleIcon, SettingsIcon, PlusIcon, TrashIcon, XMarkIcon, CheckIcon, KeyIcon, UserIcon, MoonIcon, SunIcon, FolderOpenIcon, ClapperboardIcon } from './components/icons';
import { generateScriptAndPrompts } from './services/geminiService';

const API_KEY = process.env.API_KEY || "";

interface UniverseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (character: Character) => void;
    selectedIds: string[];
}

const UniverseModal: React.FC<UniverseModalProps> = ({ isOpen, onClose, onSelect, selectedIds }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Vũ Trụ Nhân Vật</h2>
                        <p className="text-gray-500 text-sm mt-1">Chọn nhân vật để thêm vào kịch bản của bạn</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <XMarkIcon />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {CHARACTER_UNIVERSE.map((char) => {
                            const isSelected = selectedIds.includes(char.id);
                            return (
                                <div 
                                    key={char.id} 
                                    className={`bg-white p-5 rounded-xl border-2 transition-all cursor-pointer hover:shadow-lg ${isSelected ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-100 hover:border-indigo-300'}`}
                                    onClick={() => !isSelected && onSelect(char)}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                            char.role === 'Anh hùng' ? 'bg-blue-100 text-blue-700' :
                                            char.role === 'Phản diện' ? 'bg-red-100 text-red-700' :
                                            'bg-green-100 text-green-700'
                                        }`}>
                                            {char.role}
                                        </span>
                                        {isSelected && <div className="text-indigo-600"><CheckIcon /></div>}
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-1">{char.name}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-3">{char.visual.mainShape}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

interface DirectorModalProps {
    isOpen: boolean;
    onClose: () => void;
    frameRatio: FrameRatio;
    setFrameRatio: (r: FrameRatio) => void;
    imageStyle: string;
    setImageStyle: (s: string) => void;
    addToast: (msg: string) => void;
}

const DirectorModal: React.FC<DirectorModalProps> = ({ isOpen, onClose, frameRatio, setFrameRatio, imageStyle, setImageStyle, addToast }) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        const ratioLabel = FRAME_RATIO_OPTIONS.find(r => r.value === frameRatio)?.label || frameRatio;
        const styleObj = IMAGE_STYLES.find(s => s.prompt === imageStyle);
        const styleName = styleObj ? styleObj.name : 'Custom';
        
        addToast(`Đã lưu: ${ratioLabel} - ${styleName}`);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
             <div className="bg-white rounded-2xl w-full max-w-2xl flex flex-col overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                        <span className="mr-2 text-indigo-600"><SettingsIcon /></span>
                        Chế độ Đạo diễn
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full">
                        <XMarkIcon />
                    </button>
                </div>
                <div className="p-8 overflow-y-auto max-h-[70vh]">
                     <div className="mb-8">
                        <label className="block text-sm font-bold text-gray-700 mb-3">Tỉ lệ khung hình</label>
                        <div className="grid grid-cols-2 gap-4">
                            {FRAME_RATIO_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => setFrameRatio(opt.value as FrameRatio)}
                                    className={`p-4 rounded-xl border-2 text-left transition-all ${frameRatio === opt.value ? 'border-indigo-600 bg-indigo-50 text-indigo-900' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
                                >
                                    <div className="font-bold">{opt.label}</div>
                                    <div className="text-xs opacity-80">{opt.description}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-3">Phong cách hình ảnh</label>
                        <div className="grid grid-cols-1 gap-3">
                            {IMAGE_STYLES.map((style, i) => (
                                <div 
                                    key={i} 
                                    onClick={() => setImageStyle(style.prompt)}
                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${imageStyle === style.prompt ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div>
                                        <div className="font-bold text-gray-900">{style.name}</div>
                                        <div className="text-xs text-gray-500">{style.group}</div>
                                    </div>
                                    {imageStyle === style.prompt && <div className="text-indigo-600"><CheckIcon /></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
                    <button 
                        onClick={handleConfirm}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all"
                    >
                        Lưu Cấu Hình
                    </button>
                </div>
             </div>
        </div>
    );
};

const LibraryModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 text-center shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Thư viện của tôi</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><XMarkIcon/></button>
                </div>
                <div className="py-12 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                    <FolderOpenIcon />
                    <p className="mt-2 font-medium">Chưa có dự án nào được lưu.</p>
                    <p className="text-xs">Hãy tạo dự án mới để xem chúng ở đây.</p>
                </div>
            </div>
        </div>
    );
};

const ApiModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Cấu hình API</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><XMarkIcon/></button>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start mb-4">
                     <div className="text-green-500 mt-1"><CheckIcon /></div>
                     <div className="ml-3">
                        <h4 className="text-sm font-bold text-green-800">Hệ thống đã sẵn sàng</h4>
                        <p className="text-xs text-green-700 mt-1">API Key đã được cấu hình tự động thông qua biến môi trường.</p>
                     </div>
                </div>
                <button onClick={onClose} className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700">Đóng</button>
            </div>
        </div>
    );
};

export default function App() {
    const [appState, setAppState] = useState<AppState>(AppState.HOME);
    const [topic, setTopic] = useState('');
    const [userScript, setUserScript] = useState('');
    
    const [duration, setDuration] = useState(30);
    const [isConsistent, setIsConsistent] = useState(true);
    const [frameRatio, setFrameRatio] = useState<FrameRatio>(FrameRatio.NINE_SIXTEEN);
    const [imageStyle, setImageStyle] = useState(IMAGE_STYLES[0].prompt);
    const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
    const [expandedCharacterId, setExpandedCharacterId] = useState<string | null>(null);
    
    const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    const [showUniverseModal, setShowUniverseModal] = useState(false);
    const [showDirectorModal, setShowDirectorModal] = useState(false);
    const [showLibraryModal, setShowLibraryModal] = useState(false);
    const [showApiModal, setShowApiModal] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const [toasts, setToasts] = useState<{id: number, msg: string}[]>([]);

    const addToast = (msg: string) => {
        const id = Date.now();
        setToasts(prev => [...prev, {id, msg}]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    const handleThemeToggle = () => {
        setIsDarkMode(!isDarkMode);
        addToast(isDarkMode ? "Chuyển sang chế độ Sáng" : "Chuyển sang chế độ Tối");
    };

    const handleStart = () => {
        if (!topic.trim() && !userScript.trim()) {
            alert("Vui lòng nhập chủ đề hoặc kịch bản.");
            return;
        }
        setAppState(AppState.INPUT_FORM);
    };

    const handleBack = () => {
        if (appState === AppState.INPUT_FORM) setAppState(AppState.HOME);
        if (appState === AppState.RESULTS) setAppState(AppState.INPUT_FORM);
        if (appState === AppState.ERROR) setAppState(AppState.INPUT_FORM);
    };

    const handleAddCharacter = (char: Character) => {
        if (!selectedCharacters.find(c => c.id === char.id)) {
            setSelectedCharacters([...selectedCharacters, char]);
        }
        setShowUniverseModal(false);
    };

    const handleRemoveCharacter = (id: string) => {
        setSelectedCharacters(selectedCharacters.filter(c => c.id !== id));
        if (expandedCharacterId === id) setExpandedCharacterId(null);
    };

    const handleGenerate = async () => {
        setAppState(AppState.GENERATING);
        setError(null);
        try {
            const content = await generateScriptAndPrompts(
                API_KEY,
                GeminiModelId.FLASH,
                topic,
                duration,
                selectedCharacters,
                frameRatio,
                isConsistent,
                userScript,
                imageStyle
            );
            setGeneratedContent(content);
            setAppState(AppState.RESULTS);
        } catch (err: any) {
            setError(err.message || "Có lỗi xảy ra");
            setAppState(AppState.ERROR);
        }
    };

    const renderHome = () => (
        <div className="text-center max-w-4xl mx-auto px-4 flex-1 flex flex-col justify-start pt-12 md:pt-24">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-light to-brand-primary tracking-tight text-indigo-600">
            AI Script & Prompt Generator
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">Tự động tạo kịch bản, prompt ảnh, và prompt video từ chủ đề của bạn.</p>
          
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100 w-full">
            <div className="mb-6">
                <label className="block text-left text-sm font-bold text-gray-700 mb-2 ml-1">Tên dự án / Chủ đề</label>
                <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="VD: TVC quảng cáo nước hoa..."
                className="w-full text-lg bg-gray-50 border border-gray-300 rounded-xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
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
                    className="w-full text-base bg-gray-50 border border-gray-300 rounded-xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
                />
            </div>
    
            <button
              onClick={handleStart}
              className="w-full text-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              Tiếp tục
            </button>
          </div>
        </div>
    );

    const renderInputForm = () => (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <button onClick={handleBack} className="flex items-center text-gray-600 hover:text-gray-900 font-medium">
                    <BackIcon /> <span className="ml-2">Quay lại</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* COLUMN 1: DURATION & CONSISTENCY */}
                <div className="space-y-6">
                    {/* Section 1: Duration */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">1</div>
                            <h3 className="text-lg font-bold text-gray-900">Thời lượng video</h3>
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-2">
                            <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden">
                                <input
                                    type="number"
                                    min="0"
                                    value={Math.floor(duration / 60)}
                                    onChange={(e) => setDuration((parseInt(e.target.value) || 0) * 60 + (duration % 60))}
                                    className="w-full py-3 px-4 text-center font-bold text-gray-900 outline-none"
                                />
                                <span className="text-gray-500 text-sm px-3 bg-gray-50 border-l border-gray-200 py-3">phút</span>
                            </div>
                            <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden">
                                <input
                                    type="number"
                                    min="0"
                                    max="59"
                                    value={duration % 60}
                                    onChange={(e) => setDuration(Math.floor(duration / 60) * 60 + (parseInt(e.target.value) || 0))}
                                    className="w-full py-3 px-4 text-center font-bold text-gray-900 outline-none"
                                />
                                <span className="text-gray-500 text-sm px-3 bg-gray-50 border-l border-gray-200 py-3">giây</span>
                            </div>
                        </div>
                        <div className="text-sm text-indigo-600 font-medium ml-1">
                            Tổng thời lượng: <span className="font-bold">{duration} giây</span>
                        </div>
                    </div>

                    {/* Section 2: Consistency */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">2</div>
                            <h3 className="text-lg font-bold text-gray-900">Tùy chọn nhân vật</h3>
                        </div>
                        <div 
                            className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${isConsistent ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                            onClick={() => setIsConsistent(!isConsistent)}
                        >
                             <div className={`w-6 h-6 rounded bg-white border-2 flex items-center justify-center mr-3 ${isConsistent ? 'border-indigo-500' : 'border-gray-300'}`}>
                                {isConsistent && <div className="w-3 h-3 bg-indigo-600 rounded-sm"></div>}
                             </div>
                             <span className="text-gray-900 font-medium">Giữ nhân vật đồng nhất xuyên suốt video</span>
                        </div>
                    </div>
                </div>

                {/* COLUMN 2: CHARACTER DETAILS */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[400px] flex flex-col">
                     <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">3</div>
                            <h3 className="text-lg font-bold text-gray-900">Chi tiết nhân vật</h3>
                        </div>
                        <button 
                            onClick={() => setShowUniverseModal(true)}
                            className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md"
                        >
                            <PlusIcon /> <span className="ml-1">Chọn từ Vũ trụ Nhân vật</span>
                        </button>
                    </div>

                    <div className="space-y-4 flex-1">
                        {selectedCharacters.length === 0 ? (
                             <div className="h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl p-8">
                                <span className="mb-2 text-3xl">🎭</span>
                                <p>Chưa có nhân vật nào được chọn.</p>
                                <p className="text-xs">AI sẽ tự chọn nhân vật nếu bạn để trống.</p>
                            </div>
                        ) : (
                            selectedCharacters.map((char) => (
                                <div key={char.id}>
                                    <div 
                                        className={`relative p-4 rounded-xl border transition-all cursor-pointer group ${expandedCharacterId === char.id ? 'border-indigo-500 bg-indigo-50 shadow-md' : 'border-gray-200 hover:border-indigo-300 bg-white shadow-sm'}`}
                                        onClick={() => setExpandedCharacterId(expandedCharacterId === char.id ? null : char.id)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-bold text-gray-900 text-lg">{char.name}</h4>
                                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                                                        char.role === 'Anh hùng' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                        char.role === 'Phản diện' ? 'bg-red-50 text-red-700 border-red-200' :
                                                        'bg-purple-50 text-purple-700 border-purple-200'
                                                    }`}>
                                                        {char.role}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500 italic mb-2">{char.visual.mainShape}</p>
                                                <p className="text-xs text-gray-400">"{char.personality.coreTraits.join(', ')}"</p>
                                            </div>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); handleRemoveCharacter(char.id); }}
                                                className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors"
                                            >
                                                <TrashIcon />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* EXPANDED DETAILS PANEL */}
                                    {expandedCharacterId === char.id && (
                                        <div className="mt-2 ml-4 p-4 bg-gray-50 border-l-4 border-indigo-500 rounded-r-xl text-sm space-y-3 animate-fadeIn">
                                            <div>
                                                <span className="font-bold text-gray-700 block mb-1">Đặc điểm ngoại hình:</span>
                                                <p className="text-gray-600 bg-white p-2 rounded border border-gray-200">{char.visual.bodyType}, {char.visual.lineStyle}, {JSON.stringify(char.visual.colorScheme)}</p>
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-700 block mb-1">Prompt AI (Positive):</span>
                                                <textarea 
                                                    readOnly 
                                                    className="w-full bg-white p-2 rounded border border-gray-200 text-gray-600 text-xs h-20 resize-none focus:outline-none"
                                                    value={char.aiPrompt.positive}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <button
                    onClick={handleGenerate}
                    className="w-full text-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    Tạo Nội Dung
                </button>
            </div>
        </div>
    );

    const renderGenerating = () => (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-6"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Đang tạo nội dung...</h3>
            <p className="text-gray-500 text-center max-w-md">AI đang viết kịch bản và thiết kế hình ảnh cho bạn. Quá trình này có thể mất vài giây.</p>
        </div>
    );

    const renderError = () => (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="text-red-500 mb-4"><ExclamationCircleIcon /></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Đã có lỗi xảy ra</h3>
            <p className="text-gray-600 text-center max-w-md mb-6">{error}</p>
            <button
                onClick={() => setAppState(AppState.INPUT_FORM)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition-all"
            >
                Thử lại
            </button>
        </div>
    );

    const renderResults = () => (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <button onClick={handleBack} className="flex items-center text-gray-600 hover:text-gray-900 font-medium">
                    <BackIcon /> <span className="ml-2">Quay lại</span>
                </button>
                <h2 className="text-2xl font-bold text-gray-900">Kết quả</h2>
                <div className="w-20"></div> 
            </div>

            {generatedContent && (
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h1 className="text-3xl font-bold text-indigo-900 mb-4">{generatedContent.projectName}</h1>
                        <div className="flex space-x-6 text-sm text-gray-600 border-t pt-4">
                            <div><span className="font-bold">Thời lượng:</span> {generatedContent.duration}</div>
                            <div><span className="font-bold">Tỉ lệ:</span> {generatedContent.frameRatio}</div>
                        </div>
                        {generatedContent.characters.length > 0 && (
                             <div className="mt-4 pt-4 border-t border-gray-100">
                                <span className="font-bold text-gray-700 text-sm block mb-2">Nhân vật:</span>
                                <div className="flex flex-wrap gap-2">
                                    {generatedContent.characters.map(c => (
                                        <span key={c.id} className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-1 rounded-full border border-indigo-100">
                                            {c.name}
                                        </span>
                                    ))}
                                </div>
                             </div>
                        )}
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Kịch bản</h3>
                        <div className="prose max-w-none text-gray-700 whitespace-pre-wrap bg-gray-50 p-6 rounded-xl">
                            {generatedContent.script}
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Image Prompts ({generatedContent.imagePrompts.length})</h3>
                        <div className="space-y-6">
                            {generatedContent.imagePrompts.map((prompt) => (
                                <div key={prompt.id} className="border border-gray-200 rounded-xl overflow-hidden">
                                    <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
                                        <span className="font-bold text-gray-700">Scene {prompt.id}: {prompt.title}</span>
                                        <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-1 rounded">{prompt.duration}s</span>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-gray-600 mb-3 italic">{prompt.description}</p>
                                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                                            {prompt.text}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {generatedContent.videoPrompts.length > 0 && (
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Video Prompts ({generatedContent.videoPrompts.length})</h3>
                            <div className="space-y-6">
                                {generatedContent.videoPrompts.map((prompt) => (
                                    <div key={prompt.id} className="border border-gray-200 rounded-xl overflow-hidden">
                                        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
                                            <span className="font-bold text-gray-700">Video Scene {prompt.id}: {prompt.title}</span>
                                            <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded">{prompt.duration}s</span>
                                        </div>
                                        <div className="p-6">
                                            <p className="text-gray-600 mb-3 italic">{prompt.description}</p>
                                            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                                                {prompt.text}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                     <div className="cursor-pointer" onClick={() => setAppState(AppState.HOME)}>
                        <Logo />
                     </div>
                     <div className="flex items-center space-x-2">
                        <button 
                            onClick={() => setShowDirectorModal(true)}
                            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-all hidden md:flex items-center"
                            title="Chế độ Đạo diễn"
                        >
                            <SettingsIcon />
                            <span className="ml-1 text-sm font-medium">Đạo diễn</span>
                        </button>
                         <button 
                            onClick={() => setShowLibraryModal(true)}
                            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition-all"
                            title="Thư viện"
                        >
                            <FolderOpenIcon />
                        </button>
                        <button 
                            onClick={() => setShowApiModal(true)}
                            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition-all"
                            title="API"
                        >
                            <KeyIcon />
                        </button>
                        <button 
                            onClick={handleThemeToggle}
                            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition-all"
                            title="Giao diện"
                        >
                            {isDarkMode ? <SunIcon /> : <MoonIcon />}
                        </button>
                         <button 
                            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition-all"
                            title="Tài khoản"
                        >
                            <UserIcon />
                        </button>
                     </div>
                </div>
            </header>
            
            <main className="flex-grow flex flex-col">
                {appState === AppState.HOME && renderHome()}
                {appState === AppState.INPUT_FORM && renderInputForm()}
                {appState === AppState.GENERATING && renderGenerating()}
                {appState === AppState.RESULTS && renderResults()}
                {appState === AppState.ERROR && renderError()}
            </main>

            <UniverseModal 
                isOpen={showUniverseModal} 
                onClose={() => setShowUniverseModal(false)} 
                onSelect={handleAddCharacter}
                selectedIds={selectedCharacters.map(c => c.id)}
            />

            <DirectorModal
                isOpen={showDirectorModal}
                onClose={() => setShowDirectorModal(false)}
                frameRatio={frameRatio}
                setFrameRatio={setFrameRatio}
                imageStyle={imageStyle}
                setImageStyle={setImageStyle}
                addToast={addToast}
            />

            <LibraryModal 
                isOpen={showLibraryModal}
                onClose={() => setShowLibraryModal(false)}
            />

            <ApiModal 
                isOpen={showApiModal}
                onClose={() => setShowApiModal(false)}
            />

            {/* Toast Notifications */}
            <div className="fixed bottom-4 right-4 space-y-2 z-50">
                {toasts.map(toast => (
                    <div key={toast.id} className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl text-sm flex items-center animate-fadeIn">
                        <CheckIcon />
                        <span className="ml-2">{toast.msg}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
