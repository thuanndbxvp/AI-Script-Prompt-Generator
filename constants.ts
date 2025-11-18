import { FrameRatio, Character } from './types';

export const FRAME_RATIO_OPTIONS = [
  { value: FrameRatio.SIXTEEN_NINE, label: '16:9', description: 'Ngang – Video dài (YouTube, Cinematic)' },
  { value: FrameRatio.NINE_SIXTEEN, label: '9:16', description: 'Dọc – Video ngắn (TikTok, Shorts)' },
  { value: FrameRatio.ONE_ONE, label: '1:1', description: 'Vuông – Hình ảnh (Thumbnail, Avatar)' },
  { value: FrameRatio.FOUR_FIVE, label: '4:5', description: 'Dọc nhẹ – Bài viết mạng xã hội' },
];

export const CHARACTER_TYPES = ['Con người', 'Quái vật', 'Thần', 'Ma', 'Robot', 'Động vật', 'Sinh vật', 'Khác'];
export const CHARACTER_ROLES = ['Anh hùng', 'Phản anh hùng', 'Phản diện', 'Comic relief', 'NPC', 'Dẫn chuyện', 'Phụ'];
export const BODY_TYPES = ['Stick cơ bản', 'Chibi-stick', 'Cao gầy', 'Lùn mũm mĩm', 'Cơ bắp', 'Biến dị'];

export const IMAGE_STYLES = [
  { group: 'Animation / Cartoon', name: 'Stick Figure Basic', prompt: 'simple stick figure style, black lines on white background, minimal detail, focus on expression and pose, 2D flat' },
  { group: 'Animation / Cartoon', name: 'Stick Figure Hand-drawn', prompt: 'hand-drawn stickman style, sketch lines, pencil texture, rough edges, notebook paper background, doodle aesthetic' },
  { group: 'Animation / Cartoon', name: 'Modern Flat Vector', prompt: 'modern flat vector art, clean geometry, bold solid colors, no outlines, corporate art style' },
  { group: 'Animation / Cartoon', name: 'Chibi Cute', prompt: 'chibi anime style, big head small body, expressive eyes, soft pastel colors, cute and wholesome atmosphere' },
  
  { group: 'Tranh vẽ / Painting', name: 'Tranh sơn dầu (Oil Painting)', prompt: 'classic oil painting style, thick textured brushstrokes, warm and saturated colors, soft lighting, slightly blurred background, realistic proportions, elegant fine art look' },
  { group: 'Tranh vẽ / Painting', name: 'Tranh màu nước (Watercolor)', prompt: 'watercolor painting style, soft bleeding colors, lots of white space, low saturation, delicate outlines, airy and dreamy mood' },
  { group: 'Tranh vẽ / Painting', name: 'Anime / Manga', prompt: 'Japanese anime manga style, big expressive eyes, clean lineart, bright flat colors, simple cel-shading, background like an anime scene' },
  { group: 'Tranh vẽ / Painting', name: 'Pixel Art', prompt: '16-bit pixel art style, low resolution blocky pixels, limited color palette, hard edges, classic retro video game look' },
  
  { group: 'Ảnh chụp / Photography', name: 'Ảnh hiện đại / Digital Modern', prompt: 'modern digital photography style, high sharpness, accurate neutral colors, natural lighting, medium contrast, highly detailed image' },
  { group: 'Ảnh chụp / Photography', name: 'Cinematic', prompt: 'cinematic movie still style, wide aspect ratio, teal and orange or moody color grading, dramatic lighting, high contrast, film-like atmosphere' },
];

// Helper to determine group based on ID range
const getCharacterGroup = (id: string): string => {
    const match = id.match(/char_(\d+)/);
    if (!match) return "Khác";
    
    const num = parseInt(match[1], 10);
    
    if (num >= 1 && num <= 10) return "Nhân vật người que hài “cơ bản”";
    if (num >= 11 && num <= 20) return "Nhân vật PHỤ NỮ người que";
    if (num >= 21 && num <= 30) return "Nhân vật PHẢN DIỆN hài hước";
    if (num >= 31 && num <= 40) return "Nhân vật CHIBI–STICK dễ thương";
    if (num >= 41 && num <= 50) return "ANH HÙNG & PHẢN ANH HÙNG";
    if (num >= 51 && num <= 60) return "Nhân vật CHUYÊN TẤU HÀI (comic relief)";
    if (num >= 61 && num <= 70) return "CỔ TRANG – KIẾM HIỆP – THẦN TIÊN";
    
    return "Khác";
};

// Helper to map simplified JSON to full Character interface
const mapToCharacter = (data: any): Character => ({
    id: data.id,
    name: data.name,
    type: data.type,
    role: data.role,
    gender: data.gender,
    ageRange: data.ageRange,
    group: getCharacterGroup(data.id),
    visual: {
        bodyType: data.visual.bodyType,
        mainShape: "Dáng tiêu chuẩn", // Default
        lineStyle: data.visual.lineStyle,
        colorScheme: {
            base: "Đen trắng",
            accentColor: data.visual.accentColor,
            background: "Trắng"
        },
        eyesType: "Cơ bản", // Default
        mouthType: "Cơ bản", // Default
        props: data.visual.props || [],
        iconicSilhouette: data.visual.iconicSilhouette
    },
    personality: {
        coreTraits: data.personality.coreTraits || [],
        strengths: [], // Default
        flaws: [], // Default
        motivation: "Không rõ", // Default
        runningGag: data.personality.runningGag || ""
    },
    behavior: {
        defaultExpression: data.behavior.defaultExpression,
        expressionRange: [], // Default
        signaturePoses: data.behavior.signaturePoses || [],
        movementStyle: data.behavior.movementStyle,
        timingNotes: "" // Default
    },
    voice: {
        tone: "Bình thường", // Default
        speechStyle: "Bình thường", // Default
        catchphrases: [] // Default
    },
    aiPrompt: {
        positive: data.aiPrompt.positive,
        negative: data.aiPrompt.negative
    },
    productionNotes: {
        usedInSeries: [],
        animationTips: "",
        compatibility: ""
    }
});

const RAW_CHARACTERS = [
  {
    "id": "char_001",
    "name": "Người Que Tự Tin Quá Đà",
    "type": "Con người",
    "role": "Anh hùng",
    "gender": "Nam",
    "ageRange": "18-30",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Nét đen vừa",
      "accentColor": "Đỏ",
      "props": ["Áo choàng"],
      "iconicSilhouette": "Tay chống hông, áo choàng bay"
    },
    "personality": {
      "coreTraits": ["Tự tin", "Khoe mẽ", "Hài hước"],
      "runningGag": "Pose siêu anh hùng rồi fail"
    },
    "behavior": {
      "defaultExpression": "Cười ngầu quá đà",
      "signaturePoses": ["Tay chống hông", "Chỉ tay lên trời"],
      "movementStyle": "Đi như đang diễn trên sân khấu"
    },
    "aiPrompt": {
      "positive": "stick figure hero, hands on hips, red cape, smug face, simple black lines, white background",
      "negative": "realistic, 3d, detailed"
    }
  },
  {
    "id": "char_002",
    "name": "Người Que Nhát Nhé",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nam",
    "ageRange": "18-25",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Nét mảnh",
      "accentColor": "Xanh nhạt",
      "props": ["Giọt mồ hôi"],
      "iconicSilhouette": "Co người, tay ôm thân"
    },
    "personality": {
      "coreTraits": ["Nhát", "Lo xa", "Nhạy cảm"],
      "runningGag": "Sợ cả cái bóng của mình"
    },
    "behavior": {
      "defaultExpression": "Mắt to lo lắng",
      "signaturePoses": ["Ôm đầu", "Nhảy giật lùi"],
      "movementStyle": "Giật cục, hay lùi lại"
    },
    "aiPrompt": {
      "positive": "stick figure scared of its own shadow, trembling pose, big worried eyes, sweat drops, minimalist cartoon, white background",
      "negative": "realistic, 3d, detailed"
    }
  },
  {
    "id": "char_003",
    "name": "Thợ Sửa Bất Đắc Dĩ",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nam",
    "ageRange": "20-35",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Nét vừa",
      "accentColor": "Cam",
      "props": ["Búa cầm ngược"],
      "iconicSilhouette": "Cầm búa ngược, vai khom"
    },
    "personality": {
      "coreTraits": ["Hậu đậu", "Tốt bụng", "Ngơ"],
      "runningGag": "Sửa đâu hỏng đó"
    },
    "behavior": {
      "defaultExpression": "Mặt bối rối",
      "signaturePoses": ["Gãi đầu bằng búa", "Nhìn đồ hỏng"],
      "movementStyle": "Vụng về, hay vấp"
    },
    "aiPrompt": {
      "positive": "stick figure holding a hammer backwards, confused face, breaking something, humorous disaster, simple black outline, white background",
      "negative": "realistic, 3d, detailed workshop"
    }
  },
  {
    "id": "char_004",
    "name": "Dân Văn Phòng Bất Mãn",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nam",
    "ageRange": "22-35",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Nét vừa",
      "accentColor": "Xanh dương",
      "props": ["Cốc cà phê", "Núi giấy tờ"],
      "iconicSilhouette": "Ngồi gù trước đống giấy"
    },
    "personality": {
      "coreTraits": ["Mệt mỏi", "Cà khịa", "Chán đời"],
      "runningGag": "Bị deadline đè nát người"
    },
    "behavior": {
      "defaultExpression": "Mắt lờ đờ",
      "signaturePoses": ["Gục đầu lên bàn", "Ôm cốc cà phê"],
      "movementStyle": "Chậm, lết từng bước"
    },
    "aiPrompt": {
      "positive": "stick figure stressed office worker, mountain of paperwork, coffee cup shaking, tired face, minimalist cartoon, white background",
      "negative": "realistic, 3d, detailed office"
    }
  },
  {
    "id": "char_005",
    "name": "Ninja Ngố",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nam",
    "ageRange": "16-25",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Nét vừa",
      "accentColor": "Tím",
      "props": ["Khăn ninja"],
      "iconicSilhouette": "Đang té nhào trong tư thế ninja"
    },
    "personality": {
      "coreTraits": ["Hăng", "Ngố", "Thích thể hiện"],
      "runningGag": "Vừa xuất hiện ngầu là té"
    },
    "behavior": {
      "defaultExpression": "Cười tự tin",
      "signaturePoses": ["Nhảy lên rồi ngã", "Giang tay ninja pose"],
      "movementStyle": "Nhanh, nhiều cú vấp"
    },
    "aiPrompt": {
      "positive": "stick figure ninja tripping over own feet, embarrassed face, comic pose, simple black lines, white background",
      "negative": "realistic, 3d, detailed ninja suit"
    }
  },
  {
    "id": "char_006",
    "name": "Hiệp Sĩ Hơi Đần",
    "type": "Con người",
    "role": "Anh hùng",
    "gender": "Nam",
    "ageRange": "18-30",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Nét vừa",
      "accentColor": "Xám",
      "props": ["Giáp quá khổ", "Khiên nhỏ"],
      "iconicSilhouette": "Giáp to, người nhỏ"
    },
    "personality": {
      "coreTraits": ["Tốt bụng", "Chậm hiểu", "Ngây thơ"],
      "runningGag": "Không hiểu kế hoạch dù nghe nhiều lần"
    },
    "behavior": {
      "defaultExpression": "Mặt ngơ ngác",
      "signaturePoses": ["Gãi đầu trong bộ giáp", "Giơ khiên chậm chạp"],
      "movementStyle": "Nặng nề, hơi chậm"
    },
    "aiPrompt": {
      "positive": "stick figure knight in oversized armor, shy smile, medieval comedic style, simple outline, white background",
      "negative": "realistic, 3d, detailed armor"
    }
  },
  {
    "id": "char_007",
    "name": "Thầy Thuốc Lang Băm",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nam",
    "ageRange": "25-40",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Nét vừa",
      "accentColor": "Xanh lá",
      "props": ["Lọ thuốc", "Túi thảo dược"],
      "iconicSilhouette": "Cầm lọ thuốc nhìn nghi ngờ"
    },
    "personality": {
      "coreTraits": ["Tò mò", "Liều", "Tấu hài"],
      "runningGag": "Thuốc chữa bệnh này sinh thêm bệnh khác"
    },
    "behavior": {
      "defaultExpression": "Mặt suy nghĩ không chắc chắn",
      "signaturePoses": ["Giơ lọ thuốc lên soi", "Chạy khỏi khói nổ"],
      "movementStyle": "Lung tung, hốt hoảng"
    },
    "aiPrompt": {
      "positive": "stick figure doctor holding potion bottle, confused face, comedic healer, simple line art, white background",
      "negative": "realistic, 3d, detailed lab"
    }
  },
  {
    "id": "char_008",
    "name": "Ẩm Thực Tai Nạn",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nam",
    "ageRange": "18-35",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Nét vừa",
      "accentColor": "Cam",
      "props": ["Chảo cháy", "Khói"],
      "iconicSilhouette": "Cầm chảo đen bốc khói"
    },
    "personality": {
      "coreTraits": ["Nhiệt tình", "Hậu đậu", "Vui vẻ"],
      "runningGag": "Mọi món đều cháy đen"
    },
    "behavior": {
      "defaultExpression": "Cười gượng",
      "signaturePoses": ["Giơ chảo cháy lên khoe", "Xua khói khỏi mặt"],
      "movementStyle": "Rối rít trong bếp"
    },
    "aiPrompt": {
      "positive": "stick figure chef holding burnt pan, smoke rising, hopeless face, cooking disaster, simple cartoon, white background",
      "negative": "realistic, 3d, detailed kitchen"
    }
  },
  {
    "id": "char_009",
    "name": "Tây Du Ký Phiên Bản Lỗi",
    "type": "Sinh vật",
    "role": "Comic relief",
    "gender": "Nam",
    "ageRange": "Không rõ",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Nét vừa",
      "accentColor": "Vàng",
      "props": ["Gậy nhỏ", "Vòng đầu đơn giản"],
      "iconicSilhouette": "Gậy bé tí so với người"
    },
    "personality": {
      "coreTraits": ["Lém lỉnh", "Ngổ ngáo", "Tấu hài"],
      "runningGag": "Gậy nhỏ vung lên chẳng ai sợ"
    },
    "behavior": {
      "defaultExpression": "Cười tinh quái",
      "signaturePoses": ["Chống gậy bé tí", "Nhảy nhót tức giận"],
      "movementStyle": "Nhanh, nghịch ngợm"
    },
    "aiPrompt": {
      "positive": "stick figure monkey king parody, tiny staff, playful smirk, humorous cosplay, simple drawing, white background",
      "negative": "realistic, 3d, detailed fur"
    }
  },
  {
    "id": "char_010",
    "name": "Thầy Pháp Rớt Bùa",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nam",
    "ageRange": "20-40",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Nét vừa",
      "accentColor": "Vàng",
      "props": ["Lá bùa", "Gậy trừ tà"],
      "iconicSilhouette": "Bùa dán trên đầu chính mình"
    },
    "personality": {
      "coreTraits": ["Tự tin", "Hơi ẩu", "Hài"],
      "runningGag": "Bùa rơi trúng đầu mình"
    },
    "behavior": {
      "defaultExpression": "Mặt tập trung làm phép",
      "signaturePoses": ["Giơ bùa ra trước", "Ôm đầu gỡ bùa"],
      "movementStyle": "Múa tay nhiều, kịch tính"
    },
    "aiPrompt": {
      "positive": "stick figure exorcist dropping talisman on own head, shocked face, spiritual comedy, minimal line art, white background",
      "negative": "realistic, 3d, detailed temple"
    }
  },
  {
    "id": "char_011",
    "name": "Cô Gái Đang Giảm Cân Nhưng Thèm Ăn",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nữ",
    "ageRange": "18-30",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Nét vừa",
      "accentColor": "Hồng",
      "props": ["Tạ tay", "Bánh kem"],
      "iconicSilhouette": "Một tay tạ, một tay bánh"
    },
    "personality": {
      "coreTraits": ["Dễ thương", "Thiếu kỷ luật", "Ham ăn"],
      "runningGag": "Vừa tập vừa ăn"
    },
    "behavior": {
      "defaultExpression": "Cười tội lỗi",
      "signaturePoses": ["Giấu bánh ra sau lưng", "Cắn bánh khi nâng tạ"],
      "movementStyle": "Năng động nhưng hay xìu giữa chừng"
    },
    "aiPrompt": {
      "positive": "stick figure woman lifting dumbbell in one hand and eating cake with the other, guilty smile, simple cartoon, white background",
      "negative": "realistic, 3d, detailed gym"
    }
  },
  {
    "id": "char_012",
    "name": "Cô Gái Drama Queen",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nữ",
    "ageRange": "18-25",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Nét vừa",
      "accentColor": "Tím",
      "props": ["Giọt nước mắt"],
      "iconicSilhouette": "Tay che mặt khóc lóc"
    },
    "personality": {
      "coreTraits": ["Cảm xúc mạnh", "Làm quá", "Thích chú ý"],
      "runningGag": "Chuyện nhỏ cũng phản ứng như phim Hàn"
    },
    "behavior": {
      "defaultExpression": "Mặt sắp khóc",
      "signaturePoses": ["Ôm ngực ngước lên trời", "Ngồi bệt khóc"],
      "movementStyle": "Kịch tính, lố"
    },
    "aiPrompt": {
      "positive": "stick figure woman dramatically crying with huge tears, exaggerated pose, soap opera parody, simple lines, white background",
      "negative": "realistic, 3d, detailed face"
    }
  },
  {
    "id": "char_013",
    "name": "Đi Làm Đẹp Nhưng Thất Bại",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nữ",
    "ageRange": "18-30",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Nét vừa",
      "accentColor": "Hồng",
      "props": ["Son", "Cọ trang điểm"],
      "iconicSilhouette": "Mặt lem nhem, cầm son sai chiều"
    },
    "personality": {
      "coreTraits": ["Vụng về", "Thích đẹp", "Tự trêu mình"],
      "runningGag": "Mỗi lần makeup là một phong cách horror mới"
    },
    "behavior": {
      "defaultExpression": "Cười ngại",
      "signaturePoses": ["Nhìn gương hoảng hốt", "Chấm son lệch"],
      "movementStyle": "Xoay trước gương, tay loạn xạ"
    },
    "aiPrompt": {
      "positive": "stick figure woman with messy makeup, holding lipstick wrong, embarrassed face, funny beauty fail, simple cartoon, white background",
      "negative": "realistic, 3d, detailed makeup"
    }
  },
  {
    "id": "char_014",
    "name": "Cô Gái Cuồng Mua Sắm",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nữ",
    "ageRange": "18-30",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Nét vừa",
      "accentColor": "Hồng đậm",
      "props": ["Nhiều túi đồ", "Ví trống"],
      "iconicSilhouette": "Ngập trong túi shopping"
    },
    "personality": {
      "coreTraits": ["Hào hứng", "Bốc đồng", "Tiêu hoang"],
      "runningGag": "Ví trống nhưng vẫn nói deal hời"
    },
    "behavior": {
      "defaultExpression": "Mắt lấp lánh",
      "signaturePoses": ["Xoay túi đồ", "Đếm vài đồng lẻ"],
      "movementStyle": "Nhảy nhót khi thấy sale"
    },
    "aiPrompt": {
      "positive": "stick figure woman with many shopping bags, empty wallet, excited yet worried face, simple cartoon, white background",
      "negative": "realistic, 3d, detailed mall"
    }
  },
  {
    "id": "char_015",
    "name": "Phù Thủy Tập Sự",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nữ",
    "ageRange": "16-25",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Nét vừa",
      "accentColor": "Tím",
      "props": ["Chổi bay", "Nón phù thủy nhỏ"],
      "iconicSilhouette": "Rơi khỏi chổi"
    },
    "personality": {
      "coreTraits": ["Hồn nhiên", "Vụng về", "Mơ mộng"],
      "runningGag": "Cứ bay là rơi"
    },
    "behavior": {
      "defaultExpression": "Mặt ngây thơ",
      "signaturePoses": ["Ôm chổi bám chặt", "Đáp đất chúi đầu"],
      "movementStyle": "Bay lắc lư, khó giữ thăng bằng"
    },
    "aiPrompt": {
      "positive": "stick figure witch girl falling off broomstick, surprised face, tiny hat, simple line art, white background",
      "negative": "realistic, 3d, detailed sky"
    }
  },
  {
    "id": "char_016",
    "name": "Ninja Hồng",
    "type": "Con người",
    "role": "Anh hùng",
    "gender": "Nữ",
    "ageRange": "16-25",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Nét rõ",
      "accentColor": "Hồng",
      "props": ["Dao nhỏ có sticker"],
      "iconicSilhouette": "Ninja pose với điểm nhấn màu hồng"
    },
    "personality": {
      "coreTraits": ["Mạnh mẽ", "Thích dễ thương", "Tự tin"],
      "runningGag": "Đánh xong chỉnh lại nơ"
    },
    "behavior": {
      "defaultExpression": "Nghiêm nhưng cute",
      "signaturePoses": ["Pose ninja", "Khoanh tay bực mà đỏ mặt"],
      "movementStyle": "Nhanh, linh hoạt, hơi điệu"
    },
    "aiPrompt": {
      "positive": "stick figure woman ninja in pink outfit, small dagger, fierce yet adorable, simple cartoon, white background",
      "negative": "realistic, 3d, detailed ninja armor"
    }
  },
  {
    "id": "char_017",
    "name": "Cô Gái Nấu Ăn Thảm Họa",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nữ",
    "ageRange": "18-30",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Nét vừa",
      "accentColor": "Cam",
      "props": ["Nồi canh nổ", "Khói"],
      "iconicSilhouette": "Đứng trước nồi nổ tung"
    },
    "personality": {
      "coreTraits": ["Nhiệt tình", "Hậu đậu", "Lạc quan"],
      "runningGag": "Món nào cũng như vũ khí sinh học"
    },
    "behavior": {
      "defaultExpression": "Cười gượng",
      "signaturePoses": ["Cầm muôi đảo nồi cháy", "Phẩy khói khỏi mặt"],
      "movementStyle": "Vội vã, rối rít"
    },
    "aiPrompt": {
      "positive": "stick figure woman chef near exploded pot, smoke, shocked face, cooking fail, simple cartoon, white background",
      "negative": "realistic, 3d, detailed kitchen"
    }
  },
  {
    "id": "char_018",
    "name": "Gamer Nghiêm Túc Quá Mức",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nữ",
    "ageRange": "16-25",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Nét vừa",
      "accentColor": "Xanh neon",
      "props": ["Tay cầm game"],
      "iconicSilhouette": "Ngồi gù trước màn hình vô hình"
    },
    "personality": {
      "coreTraits": ["Cạnh tranh", "Căng thẳng", "Nội tâm"],
      "runningGag": "Mặt căng như thi đại học vì 1 trận game"
    },
    "behavior": {
      "defaultExpression": "Mặt lạnh tập trung",
      "signaturePoses": ["Bóp chặt tay cầm", "Ngửa mặt ăn mừng"],
      "movementStyle": "Ít di chuyển, tay hoạt động nhiều"
    },
    "aiPrompt": {
      "positive": "stick figure woman gamer gripping controller, intense eyes, tryhard vibe, simple cartoon, white background",
      "negative": "realistic, 3d, detailed setup"
    }
  },
  {
    "id": "char_019",
    "name": "Đi Làm Nhưng Buồn Ngủ",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nữ",
    "ageRange": "20-35",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Nét vừa",
      "accentColor": "Nâu",
      "props": ["Cốc cà phê to"],
      "iconicSilhouette": "Ôm cốc cà phê to hơn người"
    },
    "personality": {
      "coreTraits": ["Lười", "Hài", "Thích ngủ"],
      "runningGag": "Uống cà phê xong vẫn díp mắt"
    },
    "behavior": {
      "defaultExpression": "Mắt hí, ngáp",
      "signaturePoses": ["Tựa đầu vào bàn", "Ôm cốc cà phê"],
      "movementStyle": "Lê từng bước"
    },
    "aiPrompt": {
      "positive": "stick figure woman office worker with huge coffee cup, sleepy eyes, yawning, simple line art, white background",
      "negative": "realistic, 3d, detailed office"
    }
  },
  {
    "id": "char_020",
    "name": "Thánh Cà Khịa",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nữ",
    "ageRange": "18-30",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Nét rõ",
      "accentColor": "Tím đậm",
      "props": [],
      "iconicSilhouette": "Tay chống hông, đầu nghiêng, mắt liếc"
    },
    "personality": {
      "coreTraits": ["Mặn", "Thẳng", "Mỉa mai"],
      "runningGag": "Luôn có câu chốt cực mặn cuối cảnh"
    },
    "behavior": {
      "defaultExpression": "Mặt bất cần",
      "signaturePoses": ["Khoanh tay dựa tường", "Làm dấu quote air"],
      "movementStyle": "Chậm, thong thả"
    },
    "aiPrompt": {
      "positive": "stick figure woman with hand on hip, side-eye smirk, sarcastic attitude, simple cartoon, white background",
      "negative": "realistic, 3d, detailed"
    }
  },
  {
    "id": "char_021",
    "name": "Phản Diện Nhưng Yếu Vô Đối",
    "type": "Con người",
    "role": "Phản diện",
    "gender": "Nam",
    "ageRange": "20-35",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Đậm",
      "accentColor": "Đen",
      "props": ["Áo choàng đen"],
      "iconicSilhouette": "Đứng khoanh tay nhưng run"
    },
    "personality": {
      "coreTraits": ["Nổ", "Nhát", "Lố"],
      "runningGag": "Dọa ghê nhưng bị đánh 1 cái ngã"
    },
    "behavior": {
      "defaultExpression": "Cố tỏ ra nguy hiểm",
      "signaturePoses": ["Chỉ tay đe dọa", "Trốn sau tay sai"],
      "movementStyle": "Run rẩy, lùi lại"
    },
    "aiPrompt": {
      "positive": "stick figure villain boasting but shaking in fear, tiny muscles, comic evil face, simple black lines, white background",
      "negative": "realistic, 3d, detailed armor"
    }
  },
  {
    "id": "char_022",
    "name": "Phù Thủy Quên Bùa",
    "type": "Con người",
    "role": "Phản diện",
    "gender": "Nữ",
    "ageRange": "25-40",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Đậm",
      "accentColor": "Tím đậm",
      "props": ["Sách phép cầm ngược"],
      "iconicSilhouette": "Cầm sách phép ngược chiều"
    },
    "personality": {
      "coreTraits": ["Lơ đãng", "Khoái ác", "Ngố"],
      "runningGag": "Quên lời chú đúng lúc quan trọng"
    },
    "behavior": {
      "defaultExpression": "Mặt bối rối",
      "signaturePoses": ["Lật sách hốt hoảng", "Gãi đầu bằng đũa phép"],
      "movementStyle": "Vội vàng, luống cuống"
    },
    "aiPrompt": {
      "positive": "stick figure witch villain holding spellbook upside down, confused face, simple cartoon, white background",
      "negative": "realistic, 3d, detailed witch outfit"
    }
  },
  {
    "id": "char_023",
    "name": "Trùm Cuối Nghiện Selfie",
    "type": "Con người",
    "role": "Phản diện",
    "gender": "Nam",
    "ageRange": "20-40",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Đậm",
      "accentColor": "Đỏ đậm",
      "props": ["Điện thoại"],
      "iconicSilhouette": "Trùm cuối giơ điện thoại selfie"
    },
    "personality": {
      "coreTraits": ["Tự luyến", "Hư vinh", "Lầy"],
      "runningGag": "Đang đánh vẫn dừng lại selfie"
    },
    "behavior": {
      "defaultExpression": "Cười tự mãn",
      "signaturePoses": ["Giơ điện thoại tạo dáng", "Giơ hai ngón V"],
      "movementStyle": "Đứng pose nhiều hơn đánh"
    },
    "aiPrompt": {
      "positive": "stick figure villain boss taking selfie during battle, cocky grin, simple cartoon, white background",
      "negative": "realistic, 3d, detailed battlefield"
    }
  },
  {
    "id": "char_024",
    "name": "Ninja Ác Nhưng Vấp Chân",
    "type": "Con người",
    "role": "Phản diện",
    "gender": "Nam",
    "ageRange": "18-30",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Đậm",
      "accentColor": "Đen",
      "props": ["Khăn che mặt"],
      "iconicSilhouette": "Ninja ngã sấp mặt"
    },
    "personality": {
      "coreTraits": ["Hung hăng", "Vụng về", "Nóng tính"],
      "runningGag": "Dọa xong té úp mặt"
    },
    "behavior": {
      "defaultExpression": "Mặt dữ tợn",
      "signaturePoses": ["Nhảy tấn công rồi trượt", "Ngồi xoa đầu"],
      "movementStyle": "Nhanh nhưng hay vấp"
    },
    "aiPrompt": {
      "positive": "stick figure evil ninja tripping dramatically, embarrassed angry face, simple outline, white background",
      "negative": "realistic, 3d, detailed suit"
    }
  },
  {
    "id": "char_025",
    "name": "Nữ Hoàng Độc Ác Dị Ứng Lông Mèo",
    "type": "Con người",
    "role": "Phản diện",
    "gender": "Nữ",
    "ageRange": "25-40",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Đậm",
      "accentColor": "Tím",
      "props": ["Mèo đen"],
      "iconicSilhouette": "Ôm mèo nhưng đang hắt hơi"
    },
    "personality": {
      "coreTraits": ["Kiêu kỳ", "Độc ác", "Xui xẻo"],
      "runningGag": "Hắt xì đúng lúc cần tạo hình ngầu"
    },
    "behavior": {
      "defaultExpression": "Mặt lạnh lùng",
      "signaturePoses": ["Vuốt mèo rồi hắt hơi", "Che mũi khó chịu"],
      "movementStyle": "Chậm rãi, sang chảnh"
    },
    "aiPrompt": {
      "positive": "stick figure evil queen sneezing while holding black cat, irritated face, simple cartoon, white background",
      "negative": "realistic, 3d, detailed dress"
    }
  },
  {
    "id": "char_026",
    "name": "Phản Diện Tập Sự",
    "type": "Con người",
    "role": "Phản diện",
    "gender": "Nam",
    "ageRange": "16-25",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Vừa",
      "accentColor": "Đen nhạt",
      "props": ["Sổ ghi kế hoạch"],
      "iconicSilhouette": "Đứng cầm sổ, dáng lóng ngóng"
    },
    "personality": {
      "coreTraits": ["Học việc", "Ngố", "Ham ác"],
      "runningGag": "Làm hỏng mọi kế hoạch trùm giao"
    },
    "behavior": {
      "defaultExpression": "Mặt cố tỏ ra nguy hiểm",
      "signaturePoses": ["Chỉ sai hướng", "Cầm sổ run"],
      "movementStyle": "Lúng túng, thiếu tự tin"
    },
    "aiPrompt": {
      "positive": "stick figure rookie villain messing up evil plan, goofy smile, simple cartoon, white background",
      "negative": "realistic, 3d, detailed lair"
    }
  },
  {
    "id": "char_027",
    "name": "Ác Nhân Làm Quá Đà",
    "type": "Con người",
    "role": "Phản diện",
    "gender": "Nam",
    "ageRange": "20-40",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Đậm",
      "accentColor": "Đỏ",
      "props": [],
      "iconicSilhouette": "Tay vung loạn, pose kịch"
    },
    "personality": {
      "coreTraits": ["Kịch", "Lố", "Thích diễn"],
      "runningGag": "Đe dọa nhỏ mà diễn như phá thế giới"
    },
    "behavior": {
      "defaultExpression": "Mặt trợn, miệng cười ác",
      "signaturePoses": ["Dang tay cười lớn", "Chỉ xuống dân chúng tưởng tượng"],
      "movementStyle": "Động tác lớn, overacting"
    },
    "aiPrompt": {
      "positive": "stick figure villain overacting dramatically, exaggerated evil pose, simple lines, white background",
      "negative": "realistic, 3d, detailed"
    }
  },
  {
    "id": "char_028",
    "name": "Nữ Sát Thủ Đau Bụng",
    "type": "Con người",
    "role": "Phản diện",
    "gender": "Nữ",
    "ageRange": "18-30",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Vừa",
      "accentColor": "Đen",
      "props": ["Dao nhỏ"],
      "iconicSilhouette": "Một tay ôm bụng, một tay cầm dao"
    },
    "personality": {
      "coreTraits": ["Lạnh", "Chuyên nghiệp", "Đen đủi"],
      "runningGag": "Chuẩn bị tấn công thì ôm bụng"
    },
    "behavior": {
      "defaultExpression": "Mặt nghiêm",
      "signaturePoses": ["Cúi người ôm bụng", "Ngồi thụp mặt nhăn"],
      "movementStyle": "Nhanh nhưng hay dừng vì đau"
    },
    "aiPrompt": {
      "positive": "stick figure female assassin holding dagger while clutching stomach, frustrated face, simple cartoon, white background",
      "negative": "realistic, 3d, detailed outfit"
    }
  },
  {
    "id": "char_029",
    "name": "Tay Sai Hậu Đậu",
    "type": "Con người",
    "role": "Phản diện",
    "gender": "Nam",
    "ageRange": "18-35",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Vừa",
      "accentColor": "Xám",
      "props": ["Vũ khí rơi khỏi tay"],
      "iconicSilhouette": "Đang đánh rơi đồ"
    },
    "personality": {
      "coreTraits": ["Ngốc", "Tốt bụng thầm kín", "Hậu đậu"],
      "runningGag": "Làm hỏng việc của trùm"
    },
    "behavior": {
      "defaultExpression": "Hoảng hốt",
      "signaturePoses": ["Nhặt đồ dưới đất", "Quay lại nhìn trùm sợ sệt"],
      "movementStyle": "Lóng ngóng, vấp váp"
    },
    "aiPrompt": {
      "positive": "stick figure clumsy minion dropping weapons, panicked face, simple cartoon, white background",
      "negative": "realistic, 3d, detailed armor"
    }
  },
  {
    "id": "char_030",
    "name": "Phản Diện Mê Ăn",
    "type": "Con người",
    "role": "Phản diện",
    "gender": "Nam",
    "ageRange": "20-40",
    "visual": {
      "bodyType": "Stick cơ bản",
      "lineStyle": "Vừa",
      "accentColor": "Nâu",
      "props": ["Đùi gà rán"],
      "iconicSilhouette": "Vừa ăn vừa chỉ bản đồ âm mưu"
    },
    "personality": {
      "coreTraits": ["Tham ăn", "Lười", "Thích ác nhưng hờ hững"],
      "runningGag": "Âm mưu dở dang vì mải ăn"
    },
    "behavior": {
      "defaultExpression": "Vừa nhai vừa nói",
      "signaturePoses": ["Chỉ vào bản vẽ kế hoạch bằng đùi gà", "Chôm đồ ăn người khác"],
      "movementStyle": "Chậm, uể oải"
    },
    "aiPrompt": {
      "positive": "stick figure villain eating fried chicken while planning, distracted goofy face, simple cartoon, white background",
      "negative": "realistic, 3d, detailed food"
    }
  },
  {
    "id": "char_031",
    "name": "Chibi Bé Hạt Tiêu",
    "type": "Con người",
    "role": "Phụ",
    "gender": "Không rõ",
    "ageRange": "10-15",
    "visual": {
      "bodyType": "Chibi-stick",
      "lineStyle": "Mảnh",
      "accentColor": "Vàng nhạt",
      "props": ["Gấu bông"],
      "iconicSilhouette": "Thân cực nhỏ, ôm gấu"
    },
    "personality": {
      "coreTraits": ["Nhút nhát", "Dễ thương", "Ngây thơ"],
      "runningGag": "Nhỏ nhưng xuất hiện đúng lúc gánh team"
    },
    "behavior": {
      "defaultExpression": "Mắt to long lanh",
      "signaturePoses": ["Ôm gấu bông", "Giơ tay rụt rè"],
      "movementStyle": "Nhỏ nhẹ, bước ngắn"
    },
    "aiPrompt": {
      "positive": "chibi stick figure tiny character hugging plush toy, big cute eyes, simple kawaii style, white background",
      "negative": "realistic, 3d, detailed"
    }
  },
  {
    "id": "char_032",
    "name": "Chibi Cô Bé Mắt Long Lanh",
    "type": "Con người",
    "role": "Phụ",
    "gender": "Nữ",
    "ageRange": "10-16",
    "visual": {
      "bodyType": "Chibi-stick",
      "lineStyle": "Mảnh",
      "accentColor": "Hồng nhạt",
      "props": [],
      "iconicSilhouette": "Đầu to, mắt long lanh"
    },
    "personality": {
      "coreTraits": ["Dịu dàng", "Mơ mộng", "Dễ xúc động"],
      "runningGag": "Chỉ cần nhìn là ai cũng mềm lòng"
    },
    "behavior": {
      "defaultExpression": "Mắt sáng, cười nhẹ",
      "signaturePoses": ["Chắp tay trước ngực", "Nghiêng đầu tò mò"],
      "movementStyle": "Chậm, uyển chuyển"
    },
    "aiPrompt": {
      "positive": "chibi stick figure girl with sparkling big eyes, shy smile, simple cute style, white background",
      "negative": "realistic, 3d, detailed anime"
    }
  },
  {
    "id": "char_033",
    "name": "Chibi Samurai Nhí",
    "type": "Con người",
    "role": "Anh hùng",
    "gender": "Nam",
    "ageRange": "10-15",
    "visual": {
      "bodyType": "Chibi-stick",
      "lineStyle": "Mảnh",
      "accentColor": "Đỏ",
      "props": ["Kiếm gỗ"],
      "iconicSilhouette": "Cầm kiếm gỗ to hơn người"
    },
    "personality": {
      "coreTraits": ["Nghiêm túc", "Cố chấp", "Dễ thương"],
      "runningGag": "Muốn làm ngầu nhưng lại thành cute"
    },
    "behavior": {
      "defaultExpression": "Cau mày tập trung",
      "signaturePoses": ["Rút kiếm", "Đứng tấn"],
      "movementStyle": "Nhanh nhẹn"
    },
    "aiPrompt": {
      "positive": "chibi stick figure samurai with wooden sword, determined face, simple cute style, white background",
      "negative": "realistic, 3d, detailed armor"
    }
  }
];

export const CHARACTER_UNIVERSE: Character[] = RAW_CHARACTERS.map(mapToCharacter);
