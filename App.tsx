import React, { useState, useEffect } from 'react';
import { AppState, FrameRatio, Character, GeneratedContent, GeminiModelId } from './types';
import { FRAME_RATIO_OPTIONS, IMAGE_STYLES, CHARACTER_UNIVERSE } from './constants';
import { Logo, BackIcon, ExclamationCircleIcon, ClapperboardIcon, PlusIcon, TrashIcon, CheckIcon, XMarkIcon } from './components/icons';
import { generateScriptAndPrompts } from './services/geminiService';

const API_KEY = process.env.API_KEY || "";

interface DirectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  frameRatio: FrameRatio;
  setFrameRatio: (ratio: FrameRatio) => void;
  imageStyle: string;
  setImageStyle: (style: string) => void;
  addToast: (message: string) => void;
}

const DirectorModal: React.FC<DirectorModalProps> = ({ 
  isOpen, onClose, frameRatio, setFrameRatio, imageStyle, setImageStyle, addToast 
}) => {
  const [activeTab, setActiveTab] = useState<'ratio' | 'style'>('ratio');

  if (!isOpen) return null;

  const handleConfirm = () => {
     const ratioLabel = FRAME_RATIO_OPTIONS.find(r => r.value === frameRatio)?.label || frameRatio;
     const styleObj = IMAGE_STYLES.find(s => s.prompt === imageStyle);
     const styleName = styleObj ? styleObj.name : "Mặc định";

     addToast(`Đã lưu: Khung hình ${ratioLabel} & Phong cách ${styleName}`);
     onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
              <ClapperboardIcon />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Chế độ Đạo diễn</h3>
              <p className="text-xs text-gray-500">Cấu hình thông số kỹ thuật cho video</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100">
            <XMarkIcon />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab('ratio')}
            className={`flex-1 py-3 text-sm font-bold transition-colors relative ${
              activeTab === 'ratio' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Khung hình & Thiết bị
            {activeTab === 'ratio' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('style')}
            className={`flex-1 py-3 text-sm font-bold transition-colors relative ${
              activeTab === 'style' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Phong cách Nghệ thuật
            {activeTab === 'style' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          {activeTab === 'ratio' && (
            <div className="grid grid-cols-2 gap-4">
              {FRAME_RATIO_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFrameRatio(opt.value as FrameRatio)}
                  className={`relative p-4 rounded-xl border-2 text-left transition-all group hover:shadow-md ${
                    frameRatio === opt.value 
                      ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className={`p-2 rounded-lg ${frameRatio === opt.value ? 'bg-indigo-200 text-indigo-700' : 'bg-gray-100 text-gray-500'}`}>
                      {/* Simple visual representation of ratio */}
                      <div 
                        className="border-2 border-current rounded-sm"
                        style={{
                          width: opt.value === FrameRatio.SIXTEEN_NINE ? '24px' : opt.value === FrameRatio.ONE_ONE ? '18px' : '14px',
                          height: opt.value === FrameRatio.SIXTEEN_NINE ? '14px' : opt.value === FrameRatio.ONE_ONE ? '18px' : '24px',
                        }}
                      />
                    </div>
                    {frameRatio === opt.value && (
                      <div className="text-indigo-600">
                        <CheckIcon />
                      </div>
                    )}
                  </div>
                  <div className="font-bold text-gray-900">{opt.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{opt.description}</div>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'style' && (
            <div className="space-y-6">
              {/* Group styles by category if needed, for now list all */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {IMAGE_STYLES.map((style, i) => (
                  <button
                    key={i}
                    onClick={() => setImageStyle(style.prompt)}
                    className={`flex items-center p-3 rounded-xl border transition-all text-left hover:shadow-sm ${
                      imageStyle === style.prompt
                        ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 text-lg font-bold ${
                      imageStyle === style.prompt ? 'bg-indigo-200 text-indigo-700' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {style.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-gray-900">{style.name}</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wide">{style.group}</div>
                    </div>
                     {imageStyle === style.prompt && (
                      <div className="text-indigo-600">
                        <CheckIcon />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
            <button
                onClick={handleConfirm}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all transform active:scale-95"
            >
                Xác nhận
            </button>
        </div>
      </div>
    </div>
  );
};

interface UniverseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (char: Character) => void;
}

const UniverseModal: React.FC<UniverseModalProps> = ({ isOpen, onClose, onSelect }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">Vũ trụ Nhân vật</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <XMarkIcon />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-50">
                    {CHARACTER_UNIVERSE.map((char) => (
                        <div key={char.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col">
                            <div className="flex items-start justify-between mb-2">
                                <div className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded uppercase">{char.role}</div>
                                <div className="text-gray-400 text-xs">{char.gender}</div>
                            </div>
                            <h4 className="font-bold text-gray-900 text-lg mb-1">{char.name}</h4>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">{char.personality.coreTraits.join(', ')}</p>
                            <button 
                                onClick={() => onSelect(char)}
                                className="mt-auto w-full py-2 bg-indigo-50 text-indigo-600 font-bold rounded-lg hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2"
                            >
                                <PlusIcon /> Thêm nhân vật
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function App() {
    const [appState, setAppState] = useState<AppState>(AppState.HOME);
    const [topic, setTopic] = useState('');
    const [userScript, setUserScript] = useState('');
    
    const [duration, setDuration] = useState(60);
    const [frameRatio, setFrameRatio] = useState<FrameRatio>(FrameRatio.NINE_SIXTEEN);
    const [imageStyle, setImageStyle] = useState(IMAGE_STYLES[0].prompt);
    const [isConsistent, setIsConsistent] = useState(true);
    const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
    
    const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Modal States
    const [showDirectorModal, setShowDirectorModal] = useState(false);
    const [showUniverseModal, setShowUniverseModal] = useState(false);

    // Toast Notification
    const [toast, setToast] = useState<{message: string, visible: boolean} | null>(null);

    const addToast = (message: string) => {
        setToast({ message, visible: true });
        setTimeout(() => setToast(null), 3000);
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
        if (!selectedCharacters.some(c => c.id === char.id)) {
            setSelectedCharacters([...selectedCharacters, char]);
            addToast(`Đã thêm ${char.name}`);
        } else {
            addToast(`${char.name} đã được chọn`);
        }
        setShowUniverseModal(false);
    };

    const handleRemoveCharacter = (id: string) => {
        setSelectedCharacters(selectedCharacters.filter(c => c.id !== id));
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
        <div className="max-w-6xl mx-auto px-4 py-8">
            <button onClick={handleBack} className="flex items-center text-gray-600 hover:text-gray-900 mb-6 font-medium">
                <BackIcon /> <span className="ml-2">Quay lại</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Left Column: Section 1 & 2 */}
                <div className="space-y-8">
                    {/* Section 1: Duration */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-3">1</div>
                            <h3 className="text-lg font-bold text-gray-900">Thời lượng video</h3>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <input
                                    type="number"
                                    value={Math.floor(duration / 60)}
                                    onChange={(e) => setDuration((parseInt(e.target.value) || 0) * 60 + (duration % 60))}
                                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none text-center font-bold text-lg"
                                    min="0"
                                />
                                <div className="text-center text-xs text-gray-500 mt-1">phút</div>
                            </div>
                            <div className="flex-1">
                                <input
                                    type="number"
                                    value={duration % 60}
                                    onChange={(e) => setDuration(Math.floor(duration / 60) * 60 + (parseInt(e.target.value) || 0))}
                                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none text-center font-bold text-lg"
                                    min="0"
                                    max="59"
                                />
                                <div className="text-center text-xs text-gray-500 mt-1">giây</div>
                            </div>
                        </div>
                        <div className="mt-4 text-sm text-gray-500">
                            Tổng thời lượng: <span className="font-bold text-indigo-600">{duration} giây</span>
                        </div>
                    </div>

                    {/* Section 2: Consistency */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-3">2</div>
                            <h3 className="text-lg font-bold text-gray-900">Tùy chọn nhân vật</h3>
                        </div>
                        <label className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center mr-3 transition-colors ${isConsistent ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 bg-white'}`}>
                                {isConsistent && <CheckIcon />}
                            </div>
                            <input 
                                type="checkbox" 
                                className="hidden" 
                                checked={isConsistent}
                                onChange={(e) => setIsConsistent(e.target.checked)}
                            />
                            <span className="text-gray-700 font-medium select-none">Giữ nhân vật đồng nhất xuyên suốt video</span>
                        </label>
                    </div>
                </div>

                {/* Right Column: Section 3 */}
                <div className="flex flex-col h-full">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-3">3</div>
                                <h3 className="text-lg font-bold text-gray-900">Chi tiết nhân vật</h3>
                            </div>
                            <button 
                                onClick={() => setShowUniverseModal(true)}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold py-2 px-4 rounded-lg shadow-md transition-all flex items-center"
                            >
                                <PlusIcon /> <span className="ml-1">Chọn từ Vũ trụ Nhân vật</span>
                            </button>
                        </div>

                        {selectedCharacters.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-8 text-center">
                                <div className="text-gray-400 mb-2">
                                    <PlusIcon />
                                </div>
                                <p className="text-gray-500 font-medium">Chưa chọn nhân vật nào</p>
                                <p className="text-gray-400 text-sm mt-1">AI sẽ tự động chọn nhân vật phù hợp nếu bạn để trống.</p>
                            </div>
                        ) : (
                            <div className="space-y-3 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                                {selectedCharacters.map((char, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-start justify-between group hover:bg-indigo-50/50 transition-colors">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-gray-900">{char.name}</span>
                                                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold">{char.role}</span>
                                            </div>
                                            <div className="text-sm text-gray-600 line-clamp-1">{char.visual.mainShape}</div>
                                            <div className="text-xs text-gray-500 mt-1 italic">"{char.personality.coreTraits[0]}"</div>
                                        </div>
                                        <button 
                                            onClick={() => handleRemoveCharacter(char.id)}
                                            className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                                        >
                                            <TrashIcon />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <button
                onClick={handleGenerate}
                className="w-full text-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 px-8 rounded-2xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1"
            >
                Tạo Nội Dung Ngay
            </button>
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
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Kịch bản</h3>
                        <div className="prose max-w-none text-gray-700 whitespace-pre-wrap bg-gray-50 p-6 rounded-xl">
                            {generatedContent.script}
                        </div>
                    </div>

                    {/* Character usage summary if AI auto-casted */}
                    {generatedContent.characters && generatedContent.characters.length > 0 && (
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Nhân vật được sử dụng</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {generatedContent.characters.map(c => (
                                    <div key={c.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                                            {c.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">{c.name}</div>
                                            <div className="text-xs text-gray-500">{c.role}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

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
                     <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setShowDirectorModal(true)}
                            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium transition-colors bg-gray-50 hover:bg-indigo-50 px-4 py-2 rounded-lg border border-transparent hover:border-indigo-100"
                        >
                            <ClapperboardIcon />
                            <span className="hidden sm:inline">Đạo diễn</span>
                        </button>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all">
                            Đăng nhập
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

             {/* Toast Notification */}
             {toast && (
                <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-[60] transition-all duration-300 ${toast.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <CheckIcon />
                    <span className="font-medium">{toast.message}</span>
                </div>
            )}

            <DirectorModal 
                isOpen={showDirectorModal}
                onClose={() => setShowDirectorModal(false)}
                frameRatio={frameRatio}
                setFrameRatio={setFrameRatio}
                imageStyle={imageStyle}
                setImageStyle={setImageStyle}
                addToast={addToast}
            />

            <UniverseModal 
                isOpen={showUniverseModal}
                onClose={() => setShowUniverseModal(false)}
                onSelect={handleAddCharacter}
            />
        </div>
    );
}