
import { FrameRatio, Character } from './types';

export const FRAME_RATIO_OPTIONS = [
  { value: FrameRatio.SIXTEEN_NINE, label: '16:9', description: 'Ngang – Video dài (YouTube, Cinematic)' },
  { value: FrameRatio.NINE_SIXTEEN, label: '9:16', description: 'Dọc – Video ngắn (TikTok, Shorts)' },
  { value: FrameRatio.ONE_ONE, label: '1:1', description: 'Vuông – Hình ảnh (Thumbnail, Avatar)' },
  { value: FrameRatio.FOUR_FIVE, label: '4:5', description: 'Dọc nhẹ – Bài viết mạng xã hội' },
];

export const CHARACTER_TYPES = ['Con người', 'Quái vật', 'Thần', 'Ma', 'Robot', 'Động vật', 'Khác'];
export const CHARACTER_ROLES = ['Anh hùng', 'Phản anh hùng', 'Phản diện', 'Comic relief', 'NPC', 'Dẫn chuyện'];
export const BODY_TYPES = ['Stick cơ bản', 'Chibi-stick', 'Cao gầy', 'Lùn mũm mĩm', 'Cơ bắp', 'Biến dị'];

export const PRESET_CHARACTERS = {
  stick_hero: {
    name: "Anh hùng xui xẻo",
    type: "Con người",
    role: "Anh hùng",
    gender: "Nam",
    ageRange: "18–25",
    visual: {
      bodyType: "Stick cơ bản",
      mainShape: "Đầu tròn, thân thẳng, tay chân mảnh",
      lineStyle: "Nét đen, dày vừa, đơn giản",
      colorScheme: {
        base: "Đen trắng",
        accentColor: "Đỏ",
        background: "Trắng"
      },
      eyesType: "Hai chấm tròn to, dễ đổi cảm xúc",
      mouthType: "Miệng đơn một nét, dễ kéo cong lên/xuống",
      props: ["Áo choàng", "Thanh kiếm nhỏ"],
      iconicSilhouette: "Áo choàng bay phía sau, đầu tròn, tay cầm kiếm"
    },
    personality: {
      coreTraits: ["Tốt bụng", "Hơi nhát", "Xui xẻo"],
      strengths: ["Không bỏ cuộc dù rất sợ"],
      flaws: ["Sợ máu", "Dễ hoảng loạn"],
      motivation: "Muốn trở thành anh hùng thật sự dù rất sợ nguy hiểm",
      runningGag: "Mỗi lần chuẩn bị ra đòn ngầu thì lại vấp té"
    },
    behavior: {
      defaultExpression: "Mặt bình thường nhưng hơi lo lắng",
      expressionRange: [
        "Hoảng hốt cực độ",
        "Ngại ngùng",
        "Cố tỏ ra ngầu nhưng thất bại"
      ],
      signaturePoses: [
        "Tay run run cầm kiếm phía trước",
        "Ngã chúi về phía trước với hai tay vung loạn"
      ],
      movementStyle: "Di chuyển nhanh nhưng vụng về, dễ vấp",
      timingNotes: "Thường có 1 beat im lặng rồi mới xảy ra tai nạn (tạo nhịp hài)"
    },
    voice: {
      tone: "Nam trẻ, hơi run",
      speechStyle: "Nói nhanh, hay lắp bắp khi căng thẳng",
      catchphrases: [
        "Khoan đã, cho tôi chuẩn bị tinh thần cái đã!",
        "Ơ… từ từ đã!"
      ]
    },
    aiPrompt: {
      positive: "simple stick figure hero, round head, thin black body, medium black outlines, small sword, red cape, nervous expression, white background, minimal cartoon style",
      negative: "realistic, 3d, detailed anatomy, complex shading, background clutter"
    },
    productionNotes: {
      usedInSeries: ["Season 1", "Arc: Anh hùng xui xẻo"],
      animationTips: "Giữ chuyển động tay chân đơn giản, tập trung vào timing té ngã để tạo hài.",
      compatibility: "Dùng tốt trong video short 30–60s kể chuyện hài / tình huống xui xẻo."
    }
  } as Omit<Character, 'id'>
};

export const IMAGE_STYLES = [
  { group: 'Animation / Cartoon', name: 'Stick Figure Basic', prompt: 'simple stick figure style, black lines on white background, minimal detail, focus on expression and pose, 2D flat' },
  { group: 'Animation / Cartoon', name: 'Stick Figure Hand-drawn', prompt: 'hand-drawn stickman style, sketch lines, pencil texture, rough edges, notebook paper background, doodle aesthetic' },
  { group: 'Animation / Cartoon', name: 'Modern Flat Vector', prompt: 'modern flat vector art, clean geometry, bold solid colors, no outlines, corporate art style' },
  { group: 'Animation / Cartoon', name: 'Chibi Cute', prompt: 'chibi anime style, big head small body, expressive eyes, soft pastel colors, cute and wholesome atmosphere' },
  
  // Nhóm tranh vẽ / Painting
  { group: 'Tranh vẽ / Painting', name: 'Tranh sơn dầu (Oil Painting)', prompt: 'classic oil painting style, thick textured brushstrokes, warm and saturated colors, soft lighting, slightly blurred background, realistic proportions, elegant fine art look' },
  { group: 'Tranh vẽ / Painting', name: 'Tranh màu nước (Watercolor)', prompt: 'watercolor painting style, soft bleeding colors, lots of white space, low saturation, delicate outlines, airy and dreamy mood' },
  { group: 'Tranh vẽ / Painting', name: 'Anime / Manga', prompt: 'Japanese anime manga style, big expressive eyes, clean lineart, bright flat colors, simple cel-shading, background like an anime scene' },
  { group: 'Tranh vẽ / Painting', name: 'Pixel Art', prompt: '16-bit pixel art style, low resolution blocky pixels, limited color palette, hard edges, classic retro video game look' },
  
  // Nhóm ảnh chụp / Photography
  { group: 'Ảnh chụp / Photography', name: 'Ảnh hiện đại / Digital Modern', prompt: 'modern digital photography style, high sharpness, accurate neutral colors, natural lighting, medium contrast, highly detailed image' },
  { group: 'Ảnh chụp / Photography', name: 'Cinematic', prompt: 'cinematic movie still style, wide aspect ratio, teal and orange or moody color grading, dramatic lighting, high contrast, film-like atmosphere' },
];
