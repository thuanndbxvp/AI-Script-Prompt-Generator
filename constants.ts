import { FrameRatio, CharacterType, HumanCharacter, AnimalCharacter } from './types';

export const FRAME_RATIO_OPTIONS = [
  { value: FrameRatio.SIXTEEN_NINE, label: '16:9', description: 'Ngang – Video dài (YouTube, Cinematic)' },
  { value: FrameRatio.NINE_SIXTEEN, label: '9:16', description: 'Dọc – Video ngắn (TikTok, Shorts)' },
  { value: FrameRatio.ONE_ONE, label: '1:1', description: 'Vuông – Hình ảnh (Thumbnail, Avatar)' },
  { value: FrameRatio.FOUR_FIVE, label: '4:5', description: 'Dọc nhẹ – Bài viết mạng xã hội' },
];

export const HUMAN_OPTIONS = {
  gender: ['Nam', 'Nữ'],
  age: ['18–25', '25–35', '35–45', '45+'],
  height: ['160cm', '165cm', '170cm', '175cm', '180cm'],
  skinColor: ['Sáng', 'Ngăm', 'Tối'],
  hairStyle: ['Ngắn', 'Dài', 'Uốn', 'Buộc', 'Xõa'],
  hairColor: ['Đen', 'Nâu', 'Vàng', 'Bạch kim'],
  outfit: ['Casual', 'Công sở', 'Sang trọng', 'Thể thao', 'Truyền thống'],
  face: ['Mắt to', 'Mắt một mí', 'Mũi cao', 'Cười tươi', 'Nghiêm nghị'],
  expression: ['Vui', 'Buồn', 'Tự nhiên', 'Nghiêm túc', 'Dịu dàng'],
  style: ['Cổ điển', 'Hiện đại', 'Trẻ trung', 'Tối giản', 'Thanh lịch'],
};

export const ANIMAL_OPTIONS = {
  species: ['Mèo', 'Chó', 'Thỏ', 'Gấu'],
  furColor: ['Trắng', 'Đen', 'Nâu', 'Vàng', 'Xám'],
  furLength: ['Ngắn', 'Dài', 'Xoăn', 'Mượt'],
  accessories: ['Nơ cổ', 'Mũ', 'Vòng cổ', 'Kính'],
  clothing: ['Áo sơ mi', 'Áo khoác', 'Váy nhỏ', 'Tạp dề'],
  eyes: ['Nâu', 'Xanh', 'Đen', 'Tròn', 'Híp'],
  ears: ['Dài', 'Ngắn', 'Cụp', 'Dựng'],
  stance: ['Hai chân', 'Bốn chân', 'Ngồi', 'Nằm'],
  size: ['Bé', 'Trung bình', 'Lớn'],
  personality: ['Vui nhộn', 'Trầm tính', 'Lanh lợi', 'Dễ thương', 'Ngủ nhiều'],
};

export const PRESET_CHARACTERS = {
  human_male: {
    type: CharacterType.HUMAN,
    gender: 'Nam',
    age: '28 tuổi',
    height: '175cm',
    skinColor: 'Da sáng',
    hairStyle: 'Tóc ngắn',
    hairColor: 'Nâu',
    outfit: 'Áo sơ mi trắng',
    face: 'Khuôn mặt thân thiện',
    expression: 'Thân thiện',
    style: 'Trẻ trung',
  } as Omit<HumanCharacter, 'id'>,
  human_female: {
    type: CharacterType.HUMAN,
    gender: 'Nữ',
    age: '26 tuổi',
    height: '165cm',
    skinColor: 'Da trắng',
    hairStyle: 'Tóc dài',
    hairColor: 'Đen',
    outfit: 'Váy pastel',
    face: 'Mắt to, nụ cười nhẹ',
    expression: 'Dịu dàng',
    style: 'Thanh lịch',
  } as Omit<HumanCharacter, 'id'>,
  animal_cat: {
    type: CharacterType.ANIMAL,
    species: 'Mèo',
    furColor: 'Trắng tinh',
    furLength: 'Lông mềm mịn',
    accessories: 'Không',
    clothing: 'Đeo tạp dề nhỏ',
    eyes: 'Mắt xanh',
    ears: 'Tai nhỏ',
    stance: 'Đứng 2 chân',
    size: 'Bé',
    personality: 'Dáng baby dễ thương',
  } as Omit<AnimalCharacter, 'id'>,
};

export const IMAGE_STYLES = [
  // Nhóm tranh vẽ / Painting
  { group: 'Tranh vẽ / Painting', name: 'Tranh sơn dầu (Oil Painting)', prompt: 'classic oil painting style, thick textured brushstrokes, warm and saturated colors, soft lighting, slightly blurred background, realistic proportions, elegant fine art look' },
  { group: 'Tranh vẽ / Painting', name: 'Tranh màu nước (Watercolor)', prompt: 'watercolor painting style, soft bleeding colors, lots of white space, low saturation, delicate outlines, airy and dreamy mood' },
  { group: 'Tranh vẽ / Painting', name: 'Acrylic', prompt: 'modern acrylic painting style, vivid highly saturated colors, clear color blocks, clean brushstrokes, simple background' },
  { group: 'Tranh vẽ / Painting', name: 'Cổ điển / Renaissance', prompt: 'Renaissance classical painting style, strong chiaroscuro lighting, deep rich colors, realistic anatomy, dark elegant background, museum fine art look' },
  { group: 'Tranh vẽ / Painting', name: 'Ấn tượng (Impressionism)', prompt: 'impressionist painting style, loose visible brushstrokes, low fine detail, bright lively colors, strong sense of light, slightly blurry edges, dreamy atmosphere' },
  { group: 'Tranh vẽ / Painting', name: 'Trừu tượng (Abstract)', prompt: 'abstract painting style, focus on geometric shapes and color blocks, non-representational, bold composition, high contrast, modern conceptual art look' },
  { group: 'Tranh vẽ / Painting', name: 'Pop Art', prompt: 'Pop Art style, bright neon flat colors, thick black outlines, comic book and advertising inspired, playful mood, 1960s pop culture aesthetic' },
  { group: 'Tranh vẽ / Painting', name: 'Tranh mực / Ink Sketch', prompt: 'black ink sketch style, varied line weight, heavy hatching and cross-hatching, minimal or no color, traditional hand-drawn illustration look' },
  { group: 'Tranh vẽ / Painting', name: 'Anime / Manga', prompt: 'Japanese anime manga style, big expressive eyes, clean lineart, bright flat colors, simple cel-shading, background like an anime scene' },
  { group: 'Tranh vẽ / Painting', name: 'Pixel Art', prompt: '16-bit pixel art style, low resolution blocky pixels, limited color palette, hard edges, classic retro video game look' },
  
  // Nhóm ảnh chụp / Photography
  { group: 'Ảnh chụp / Photography', name: 'Ảnh hiện đại / Digital Modern', prompt: 'modern digital photography style, high sharpness, accurate neutral colors, natural lighting, medium contrast, highly detailed image' },
  { group: 'Ảnh chụp / Photography', name: 'Ảnh phim (Film / Analog)', prompt: '35mm film photography style, visible grain, slight yellow-green tint, soft contrast, gentle highlight bloom, nostalgic analog look' },
  { group: 'Ảnh chụp / Photography', name: 'Vintage / Retro', prompt: 'vintage retro photo style, slightly faded warm colors, subtle dark vignette, optional scratches and dust, 1980s–1990s old snapshot look' },
  { group: 'Ảnh chụp / Photography', name: 'Minimalist', prompt: 'minimalist photography style, lots of negative space, very few visual elements, clean background, simple color palette, balanced composition' },
  { group: 'Ảnh chụp / Photography', name: 'Cinematic', prompt: 'cinematic movie still style, wide aspect ratio, teal and orange or moody color grading, dramatic lighting, high contrast, film-like atmosphere' },
  { group: 'Ảnh chụp / Photography', name: 'High Fashion / Editorial', prompt: 'high fashion editorial photography style, sharp studio lighting, glossy finish, bold colors, dramatic posing, luxury magazine layout feel' },
  { group: 'Ảnh chụp / Photography', name: 'Street Photography', prompt: 'street photography style, candid everyday moments, natural available light, occasional motion blur or grain, raw and lively urban feeling' },
  { group: 'Ảnh chụp / Photography', name: 'Documentary / Reportage', prompt: 'documentary reportage style, unstaged scenes, focus on truth and context, full environment visible, neutral colors, minimal post-processing' },
  { group: 'Ảnh chụp / Photography', name: 'Macro', prompt: 'macro photography style, extreme close-up, tiny details ultra sharp, very shallow depth of field, strong creamy bokeh background, emphasis on texture' },
  { group: 'Ảnh chụp / Photography', name: 'Long Exposure / Light Trail', prompt: 'long exposure photography style, motion stretched into smooth trails, water rendered silky, light sources streaked, dreamy ethereal mood' },
  
  // Minh hoạ & Thiết kế số / Illustration & Design
  { group: 'Minh hoạ & Thiết kế số / Illustration & Design', name: 'Flat Illustration', prompt: 'flat illustration style, simple flat shapes, minimal or no shading, clean outlines, bright solid colors, modern vector look for apps and websites' },
  { group: 'Minh hoạ & Thiết kế số / Illustration & Design', name: 'Gradient / Neon', prompt: 'neon gradient style, smooth color transitions, purple cyan and pink tones, glowing light effects, futuristic cyberpunk aesthetic' },
  { group: 'Minh hoạ & Thiết kế số / Illustration & Design', name: '3D Clay / 3D Cartoon', prompt: '3D clay cartoon style, rounded shapes, soft clay-like material, slightly matte surface, gentle studio lighting, cute and friendly look' },
  { group: 'Minh hoạ & Thiết kế số / Illustration & Design', name: 'Isometric', prompt: 'isometric illustration style, 3/4 45-degree view, objects as boxy forms, parallel lines, clean layout, map-like game or infographic look' },
  { group: 'Minh hoạ & Thiết kế số / Illustration & Design', name: 'Line Art / Outline', prompt: 'minimalist line art style, thin even outlines, low detail, empty background, very little or no fill color, elegant clean aesthetic' },
  { group: 'Minh hoạ & Thiết kế số / Illustration & Design', name: 'Doodle / Sketchy', prompt: 'doodle sketch style, loose spontaneous lines, slightly wobbly strokes, playful small details, notebook hand-drawn feeling' },
];
