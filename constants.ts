
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

export const CHARACTER_UNIVERSE: Character[] = [
  {
    "id": "char_001",
    "name": "Người Que Tự Tin Quá Đà",
    "type": "Con người",
    "role": "Anh hùng",
    "gender": "Nam",
    "ageRange": "18-30",
    "visual": {
      "bodyType": "Stick cơ bản",
      "mainShape": "Đầu tròn, thân thẳng, tay chống hông",
      "lineStyle": "Nét đen vừa, sạch",
      "colorScheme": {
        "base": "Đen trắng",
        "accentColor": "Đỏ",
        "background": "Trắng"
      },
      "eyesType": "Mắt to, hơi kiêu ngạo",
      "mouthType": "Miệng cười nhếch",
      "props": ["Áo choàng", "Thắt lưng"],
      "iconicSilhouette": "Tay chống hông, áo choàng bay"
    },
    "personality": {
      "coreTraits": ["Tự tin", "Khoe mẽ", "Đôi khi vô dụng"],
      "strengths": ["Không bao giờ nản chí"],
      "flaws": ["Đánh giá quá cao bản thân"],
      "motivation": "Muốn được công nhận là siêu anh hùng",
      "runningGag": "Pose siêu anh hùng xong bị lơ đẹp"
    },
    "behavior": {
      "defaultExpression": "Mặt vênh vênh tự tin",
      "expressionRange": ["Ngạc nhiên khi thất bại", "Bối rối", "Giả vờ như không có gì"],
      "signaturePoses": ["Tay chống hông, ngực ưỡn", "Giơ tay chỉ lên trời"],
      "movementStyle": "Bước đi như đang trên sân khấu",
      "timingNotes": "Thường pose ngầu 1 beat rồi mới fail"
    },
    "voice": {
        "tone": "Vang, tự tin",
        "speechStyle": "Nói to, rõ ràng",
        "catchphrases": ["Ta là số một!"]
    },
    "aiPrompt": {
      "positive": "stick figure character, simple white round head, black thin body, hands on hips, superhero cape fluttering, overly confident smug face, comic humor style, clean white background, medium thick black outlines",
      "negative": "realistic, 3d, detailed anatomy, complex background"
    },
    "productionNotes": {
        "usedInSeries": [],
        "animationTips": "",
        "compatibility": ""
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
      "mainShape": "Thân hơi co rút, vai khom",
      "lineStyle": "Nét đen mảnh",
      "colorScheme": {
        "base": "Đen trắng",
        "accentColor": "Xanh nhạt",
        "background": "Trắng"
      },
      "eyesType": "Mắt tròn to, lo lắng",
      "mouthType": "Miệng chữ D run rẩy",
      "props": ["Giọt mồ hôi", "Cái bóng phía sau"],
      "iconicSilhouette": "Thân hơi cúi, tay ôm chặt người"
    },
    "personality": {
      "coreTraits": ["Nhát gan", "Nhạy cảm", "Hay tưởng tượng"],
      "strengths": ["Phản xạ nhanh khi sợ"],
      "flaws": ["Quá lo xa", "Dễ hoảng loạn"],
      "motivation": "Chỉ muốn một cuộc sống bình yên không giật mình",
      "runningGag": "Sợ chính cái bóng của mình"
    },
    "behavior": {
      "defaultExpression": "Mắt mở to, mồ hôi rơi",
      "expressionRange": ["Hoảng loạn", "Bối rối", "Nhăn nhó sợ hãi"],
      "signaturePoses": ["Ôm đầu cúi người", "Nhảy giật lùi"],
      "movementStyle": "Giật cục, hay lùi lại phía sau",
      "timingNotes": "Chèn tiếng động nhỏ rồi cho nhảy dựng lên"
    },
     "voice": {
        "tone": "Run rẩy, nhỏ",
        "speechStyle": "Lắp bắp",
        "catchphrases": ["Cái gì đó?"]
    },
    "aiPrompt": {
      "positive": "stick figure scared of its own shadow, tiny trembling pose, big worried eyes, sweat drops, minimalist cartoon, funny expression, white background",
      "negative": "realistic, 3d, detailed, complex environment"
    },
    "productionNotes": {
        "usedInSeries": [],
        "animationTips": "",
        "compatibility": ""
    }
  },
  {
    "id": "char_003",
    "name": "Người Que Thợ Sửa Bất Đắc Dĩ",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nam",
    "ageRange": "20-35",
    "visual": {
      "bodyType": "Stick cơ bản",
      "mainShape": "Đầu tròn, tay cầm búa ngược",
      "lineStyle": "Nét đen vừa",
      "colorScheme": {
        "base": "Đen trắng",
        "accentColor": "Cam",
        "background": "Trắng"
      },
      "eyesType": "Mắt bối rối",
      "mouthType": "Miệng méo vì không hiểu chuyện gì",
      "props": ["Búa", "Ốc vít rơi"],
      "iconicSilhouette": "Cầm búa ngược, mặt ngáo"
    },
    "personality": {
      "coreTraits": ["Hậu đậu", "Tốt bụng", "Hơi ngu ngơ"],
      "strengths": ["Luôn cố gắng giúp đỡ"],
      "flaws": ["Sửa đâu hỏng đó"],
      "motivation": "Muốn tỏ ra có ích nhưng toàn gây họa",
      "runningGag": "Được nhờ sửa là mọi thứ nổ tung"
    },
    "behavior": {
      "defaultExpression": "Mặt ngơ ngác, hơi lo",
      "expressionRange": ["Hoảng hốt", "Ngại ngùng", "Tự tin sai chỗ"],
      "signaturePoses": ["Cầm búa gãi đầu", "Nhìn ốc vít rơi xuống"],
      "movementStyle": "Vụng về, hay vấp đồ đạc",
      "timingNotes": "Đưa vào ngay trước khi có một cú fail lớn"
    },
    "voice": {
        "tone": "Bình thường, thật thà",
        "speechStyle": "Chậm rãi",
        "catchphrases": ["Hình như xong rồi... á!"]
    },
    "aiPrompt": {
      "positive": "stick figure holding a hammer backwards, confused face, accidentally breaking something, humorous disaster vibe, simple cartoon, black outlines, white background",
      "negative": "realistic, 3d, high detail, busy background"
    },
    "productionNotes": {
        "usedInSeries": [],
        "animationTips": "",
        "compatibility": ""
    }
  },
  {
    "id": "char_004",
    "name": "Người Que Dân Văn Phòng Bất Mãn",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nam",
    "ageRange": "22-35",
    "visual": {
      "bodyType": "Stick cơ bản",
      "mainShape": "Thân hơi gù trước màn hình",
      "lineStyle": "Nét đen vừa",
      "colorScheme": {
        "base": "Đen trắng",
        "accentColor": "Xanh dương",
        "background": "Trắng"
      },
      "eyesType": "Mắt quầng thâm",
      "mouthType": "Miệng mím chán nản",
      "props": ["Tách cà phê", "Núi giấy tờ"],
      "iconicSilhouette": "Ngồi trước đống giấy cao, cầm cà phê"
    },
    "personality": {
      "coreTraits": ["Mệt mỏi", "Mỉa mai", "Trách deadline"],
      "strengths": ["Chịu đựng cao"],
      "flaws": ["Thiếu động lực", "Hay cà khịa công việc"],
      "motivation": "Mơ về một ngày thoát khỏi deadline",
      "runningGag": "Deadline chồng lên nhau như núi"
    },
    "behavior": {
      "defaultExpression": "Mắt lờ đờ, miệng thở dài",
      "expressionRange": ["Tuyệt vọng", "Cà khịa", "Bực bội"],
      "signaturePoses": ["Gục mặt xuống bàn phím", "Nhìn thẳng camera kiểu 'chịu'"],
      "movementStyle": "Chậm chạp, lết người",
      "timingNotes": "Hay xuất hiện ở cảnh than thở đời đi làm"
    },
     "voice": {
        "tone": "Trầm, chán nản",
        "speechStyle": "Thở dài, mỉa mai",
        "catchphrases": ["Lại deadline à?"]
    },
    "aiPrompt": {
      "positive": "stick figure stressed office worker, mountain of paperwork, forced smile, sweat, coffee cup shaking, minimalist cartoon humor, white background",
      "negative": "realistic, 3d, detailed office background"
    },
    "productionNotes": {
        "usedInSeries": [],
        "animationTips": "",
        "compatibility": ""
    }
  },
  {
    "id": "char_005",
    "name": "Người Que Ninja Ngố",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nam",
    "ageRange": "16-25",
    "visual": {
      "bodyType": "Stick cơ bản",
      "mainShape": "Thân linh hoạt nhưng hay vấp",
      "lineStyle": "Nét đen vừa",
      "colorScheme": {
        "base": "Đen trắng",
        "accentColor": "Tím",
        "background": "Trắng"
      },
      "eyesType": "Mắt tròn ngáo",
      "mouthType": "Miệng há vì ngạc nhiên",
      "props": ["Khăn ninja", "Phi tiêu rơi"],
      "iconicSilhouette": "Ninja ngã nhào giữa không trung"
    },
    "personality": {
      "coreTraits": ["Hăng hái", "Hơi ngu ngơ", "Thích thể hiện"],
      "strengths": ["Nhanh nhẹn thật sự"],
      "flaws": ["Thiếu tập trung, dễ vấp"],
      "motivation": "Muốn trở thành truyền thuyết ninja (nhưng toàn fail)",
      "runningGag": "Xuất hiện ngầu 1 giây rồi té"
    },
    "behavior": {
      "defaultExpression": "Mắt ngáo, miệng cười tự tin",
      "expressionRange": ["Ngơ ngác", "Hoảng hốt khi té", "Ngượng chín mặt"],
      "signaturePoses": ["Bay người với tay giang rộng", "Chổng mông sau cú ngã"],
      "movementStyle": "Nhanh, nhảy nhiều, kết thúc bằng cú vấp",
      "timingNotes": "Cho cú 'ngã' ăn sound effect mạnh để gây cười"
    },
     "voice": {
        "tone": "Hăng hái",
        "speechStyle": "Nhanh, đôi khi hét lớn",
        "catchphrases": ["Hiyah!", "Á đù!"]
    },
    "aiPrompt": {
      "positive": "stick figure ninja tripping over own feet, embarrassed expression, simple comic pose, small scarf, silly humor, white background",
      "negative": "realistic, 3d, detailed ninja armor"
    },
    "productionNotes": {
        "usedInSeries": [],
        "animationTips": "",
        "compatibility": ""
    }
  },
  {
    "id": "char_006",
    "name": "Người Que Hiệp Sĩ Hơi Đần",
    "type": "Con người",
    "role": "Anh hùng",
    "gender": "Nam",
    "ageRange": "18-30",
    "visual": {
      "bodyType": "Stick cơ bản",
      "mainShape": "Giáp to, người nhỏ",
      "lineStyle": "Nét đen vừa",
      "colorScheme": {
        "base": "Đen trắng",
        "accentColor": "Xám",
        "background": "Trắng"
      },
      "eyesType": "Mắt ngây thơ",
      "mouthType": "Miệng cười hiền",
      "props": ["Bộ giáp quá khổ", "Khiên nhỏ"],
      "iconicSilhouette": "Giáp to phồng, tay cầm khiên"
    },
    "personality": {
      "coreTraits": ["Tốt bụng", "Chậm hiểu", "Ngây thơ"],
      "strengths": ["Không bỏ bạn bè"],
      "flaws": ["Không hiểu kế hoạch phức tạp"],
      "motivation": "Bảo vệ mọi người dù không hiểu chuyện gì đang xảy ra",
      "runningGag": "Hỏi lại câu vừa được giải thích rõ ràng"
    },
    "behavior": {
      "defaultExpression": "Mặt ngơ ngác hiền lành",
      "expressionRange": ["Ngạc nhiên", "Đơ toàn tập", "Vui vẻ đơn giản"],
      "signaturePoses": ["Đứng gãi đầu trong bộ giáp to", "Giơ khiên chậm chạp"],
      "movementStyle": "Hơi chậm do giáp nặng",
      "timingNotes": "Hay đi sau, phản ứng chậm hơn mọi người 1 beat"
    },
     "voice": {
        "tone": "Trầm ấm, hơi ngố",
        "speechStyle": "Chậm",
        "catchphrases": ["Hả?", "Nghĩa là sao?"]
    },
    "aiPrompt": {
      "positive": "stick figure knight wearing oversized armor but missing sword, awkward shy smile, medieval comedic vibe, clean minimalist drawing, white background",
      "negative": "realistic, 3d, detailed knight armor"
    },
    "productionNotes": {
        "usedInSeries": [],
        "animationTips": "",
        "compatibility": ""
    }
  },
  {
    "id": "char_007",
    "name": "Người Que Thầy Thuốc Lang Băm",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nam",
    "ageRange": "25-40",
    "visual": {
      "bodyType": "Stick cơ bản",
      "mainShape": "Áo choàng thầy thuốc, lọ thuốc trên tay",
      "lineStyle": "Nét đen vừa",
      "colorScheme": {
        "base": "Đen trắng",
        "accentColor": "Xanh lá",
        "background": "Trắng"
      },
      "eyesType": "Mắt bối rối",
      "mouthType": "Miệng mím lo lắng",
      "props": ["Lọ thuốc", "Túi thảo dược"],
      "iconicSilhouette": "Cầm lọ thuốc nhìn chăm chăm"
    },
    "personality": {
      "coreTraits": ["Ham thử nghiệm", "Tò mò", "Thiếu an toàn"],
      "strengths": ["Dám thử mọi thứ"],
      "flaws": ["Thử trên người khác trước"],
      "motivation": "Muốn nổi tiếng là danh y dù chưa chắc đúng bài",
      "runningGag": "Thuốc chữa bệnh này lại gây thêm 2 triệu chứng khác"
    },
    "behavior": {
      "defaultExpression": "Mặt ngẫm nghĩ nhưng không chắc chắn",
      "expressionRange": ["Hoảng khi thuốc nổ", "Hớn hở khi 'có vẻ' thành công", "Giả vờ bình tĩnh"],
      "signaturePoses": ["Giơ lọ thuốc lên soi", "Chạy trốn khỏi khói nổ"],
      "movementStyle": "Lung tung, hay xoay qua xoay lại",
      "timingNotes": "Hay xuất hiện trước một cảnh tai nạn y tế hài"
    },
     "voice": {
        "tone": "Cao, lanh lợi",
        "speechStyle": "Nhanh, thuyết phục",
        "catchphrases": ["Uống cái này đi!"]
    },
    "aiPrompt": {
      "positive": "stick figure doctor holding a mysterious potion, confused expression, comedic medieval healer, minimal line art, funny cartoon, white background",
      "negative": "realistic, 3d, detailed hospital background"
    },
    "productionNotes": {
        "usedInSeries": [],
        "animationTips": "",
        "compatibility": ""
    }
  },
  {
    "id": "char_008",
    "name": "Người Que Ẩm Thực Tai Nạn",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nam",
    "ageRange": "18-35",
    "visual": {
      "bodyType": "Stick cơ bản",
      "mainShape": "Đầu bốc khói, tay cầm chảo cháy",
      "lineStyle": "Nét đen vừa",
      "colorScheme": {
        "base": "Đen trắng",
        "accentColor": "Cam",
        "background": "Trắng"
      },
      "eyesType": "Mắt hoảng",
      "mouthType": "Miệng há sốc",
      "props": ["Chảo cháy", "Khói"],
      "iconicSilhouette": "Cầm chảo đen khói bay"
    },
    "personality": {
      "coreTraits": ["Tự tin vào tay nghề", "Hậu đậu", "Lạc quan"],
      "strengths": ["Không bỏ cuộc dù nấu hỏng"],
      "flaws": ["Không biết nhận sai công thức"],
      "motivation": "Muốn mở nhà hàng của riêng mình",
      "runningGag": "Mọi món làm ra đều cháy đen"
    },
    "behavior": {
      "defaultExpression": "Cười gượng trước thảm họa",
      "expressionRange": ["Sốc", "Ngượng", "Đắc ý sai chỗ"],
      "signaturePoses": ["Giơ chảo cháy giới thiệu", "Phẩy khói khỏi mặt"],
      "movementStyle": "Nhanh, rối rít trong bếp",
      "timingNotes": "Hiệu ứng nổ nhỏ + khói cho punchline"
    },
     "voice": {
        "tone": "Hồ hởi",
        "speechStyle": "Mời gọi",
        "catchphrases": ["Món mới đây!"]
    },
    "aiPrompt": {
      "positive": "stick figure chef holding burnt food, smoke rising, hopeless face, comedic cooking disaster, simple cartoon, thick outlines, white background",
      "negative": "realistic, 3d, detailed kitchen background"
    },
    "productionNotes": {
        "usedInSeries": [],
        "animationTips": "",
        "compatibility": ""
    }
  },
  {
    "id": "char_009",
    "name": "Người Que Tay Du Ky Loi",
    "type": "Sinh vật",
    "role": "Comic relief",
    "gender": "Nam",
    "ageRange": "Không rõ",
    "visual": {
      "bodyType": "Stick cơ bản",
      "mainShape": "Đầu tròn, gậy nhỏ",
      "lineStyle": "Nét đen vừa",
      "colorScheme": {
        "base": "Đen trắng",
        "accentColor": "Vàng",
        "background": "Trắng"
      },
      "eyesType": "Mắt tinh nghịch",
      "mouthType": "Cười đểu",
      "props": ["Gậy nhỏ", "Vòng đầu đơn giản"],
      "iconicSilhouette": "Gậy bé tí so với người"
    },
    "personality": {
      "coreTraits": ["Lém lỉnh", "Ngang tàng", "Hay phá"],
      "strengths": ["Nhanh nhẹn", "Lanh trí"],
      "flaws": ["Không tôn trọng ai", "Hay gây chuyện"],
      "motivation": "Muốn được công nhận là Tôn Ngộ Không bản xịn",
      "runningGag": "Gậy quá nhỏ, vung lên chẳng ai sợ"
    },
    "behavior": {
      "defaultExpression": "Mặt cười tinh quái",
      "expressionRange": ["Bực bội khi bị chê bản lỗi", "Cười phá", "Cãi chày cãi cối"],
      "signaturePoses": ["Chống gậy bé tí khoanh tay", "Nhảy tưng tưng khi tức"],
      "movementStyle": "Nhanh, nhảy nhót nhiều",
      "timingNotes": "Cho xuất hiện khi cần parod y Tây Du Ký"
    },
     "voice": {
        "tone": "Lém lỉnh, cao",
        "speechStyle": "Nhanh, trêu chọc",
        "catchphrases": ["Lão Tôn tới đây!"]
    },
    "aiPrompt": {
      "positive": "stick figure monkey king parody, tiny golden staff, playful smirk, humorous cheap cosplay vibe, minimalistic drawing, white background",
      "negative": "realistic, 3d, detailed monkey fur"
    },
    "productionNotes": {
        "usedInSeries": [],
        "animationTips": "",
        "compatibility": ""
    }
  },
  {
    "id": "char_010",
    "name": "Người Que Thay Phap Rot Bua",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nam",
    "ageRange": "20-40",
    "visual": {
      "bodyType": "Stick cơ bản",
      "mainShape": "Áo pháp sư đơn giản, lá bùa trên đầu",
      "lineStyle": "Nét đen vừa",
      "colorScheme": {
        "base": "Đen trắng",
        "accentColor": "Vàng",
        "background": "Trắng"
      },
      "eyesType": "Mắt giật mình",
      "mouthType": "Miệng há sốc",
      "props": ["Lá bùa", "Gậy trừ tà"],
      "iconicSilhouette": "Lá bùa dán lên đầu chính mình"
    },
    "personality": {
      "coreTraits": ["Tự tin", "Hơi ẩu", "Hài hước"],
      "strengths": ["Dám đối đầu ma quỷ"],
      "flaws": ["Hay làm sai nghi thức"],
      "motivation": "Muốn trở thành thầy pháp huyền thoại",
      "runningGag": "Bùa rơi trúng đầu mình thay vì trúng ma"
    },
    "behavior": {
      "defaultExpression": "Tập trung làm phép",
      "expressionRange": ["Sốc khi trật bùa", "Xấu hổ", "Cố làm ngầu lại"],
      "signaturePoses": ["Giơ bùa chỉ về phía trước", "Ôm đầu gỡ bùa"],
      "movementStyle": "Múa tay nhiều, hơi kịch",
      "timingNotes": "Cho beat im lặng rồi bùa rơi trúng đầu để gây cười"
    },
     "voice": {
        "tone": "Nghiêm trọng",
        "speechStyle": "Đọc thần chú to",
        "catchphrases": ["Cấp cấp như luật lệnh!"]
    },
    "aiPrompt": {
      "positive": "stick figure exorcist dropping talisman on own head, shocked funny face, spiritual comedy, minimal line art, white background",
      "negative": "realistic, 3d, detailed temple background"
    },
    "productionNotes": {
        "usedInSeries": [],
        "animationTips": "",
        "compatibility": ""
    }
  },
  {
    "id": "char_011",
    "name": "Co Gai Dang Giam Can Nhung Them An",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nữ",
    "ageRange": "18-30",
    "visual": {
      "bodyType": "Stick cơ bản",
      "mainShape": "Một tay cầm tạ, một tay cầm bánh",
      "lineStyle": "Nét đen vừa",
      "colorScheme": {
        "base": "Đen trắng",
        "accentColor": "Hồng",
        "background": "Trắng"
      },
      "eyesType": "Mắt lén lút",
      "mouthType": "Miệng cười tội lỗi",
      "props": ["Tạ tay", "Bánh kem"],
      "iconicSilhouette": "Tạ một bên, bánh một bên"
    },
    "personality": {
      "coreTraits": ["Dễ thương", "Thiếu kỷ luật", "Hài hước"],
      "strengths": ["Lạc quan, không quá áp lực chuyện cân nặng"],
      "flaws": ["Không kiềm chế được đồ ăn ngon"],
      "motivation": "Muốn vừa đẹp vừa được ăn thoải mái",
      "runningGag": "Vừa tập vừa ăn, không thấy giảm cân"
    },
    "behavior": {
      "defaultExpression": "Cười gượng khi bị bắt gặp",
      "expressionRange": ["Giật mình", "Xấu hổ", "Lì lợm ăn tiếp"],
      "signaturePoses": ["Giấu bánh ra phía sau", "Cắn bánh trong lúc nâng tạ"],
      "movementStyle": "Năng động nhưng hay lười giữa chừng",
      "timingNotes": "Cắt nhanh giữa cảnh tập hăng và cảnh ăn ngấu nghiến"
    },
     "voice": {
        "tone": "Dễ thương",
        "speechStyle": "Nhẹ nhàng",
        "catchphrases": ["Nốt miếng này thôi."]
    },
    "aiPrompt": {
      "positive": "stick figure woman lifting a dumbbell in one hand and secretly eating cake with the other, guilty funny expression, minimalist cartoon, white background",
      "negative": "realistic, 3d, detailed gym background"
    },
    "productionNotes": {
        "usedInSeries": [],
        "animationTips": "",
        "compatibility": ""
    }
  },
  {
    "id": "char_012",
    "name": "Co Gai Drama Queen",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nữ",
    "ageRange": "18-25",
    "visual": {
      "bodyType": "Stick cơ bản",
      "mainShape": "Tay che mặt, tay vung lên",
      "lineStyle": "Nét đen vừa",
      "colorScheme": {
        "base": "Đen trắng",
        "accentColor": "Tím",
        "background": "Trắng"
      },
      "eyesType": "Mắt chảy nước mắt to",
      "mouthType": "Miệng khóc lóc",
      "props": ["Giọt nước mắt", "Khăn giấy"],
      "iconicSilhouette": "Tư thế khóc phim Hàn"
    },
    "personality": {
      "coreTraits": ["Cảm xúc mạnh", "Làm quá", "Thích được chú ý"],
      "strengths": ["Biểu cảm phong phú"],
      "flaws": ["Phóng đại mọi vấn đề"],
      "motivation": "Muốn cuộc sống như phim drama",
      "runningGag": "Chuyện nhỏ xíu cũng phản ứng như tận thế"
    },
    "behavior": {
      "defaultExpression": "Mặt buồn sắp khóc",
      "expressionRange": ["Khóc lóc thảm thiết", "Giận dỗi", "Làm hòa nhanh như gió"],
      "signaturePoses": ["Tay ôm ngực ngước lên trời", "Ngồi bệt khóc mếu"],
      "movementStyle": "Loạng choạng theo cảm xúc",
      "timingNotes": "Dùng slow-motion + nhạc bi cho hiệu ứng hài ngược"
    },
     "voice": {
        "tone": "Cao vút, nức nở",
        "speechStyle": "Kịch tính",
        "catchphrases": ["Tại sao lại đối xử với tôi như vậy?"]
    },
    "aiPrompt": {
      "positive": "stick figure woman dramatically crying with huge tears, exaggerated pose, comedic soap opera vibe, simple line art, white background",
      "negative": "realistic, 3d, detailed face"
    },
    "productionNotes": {
        "usedInSeries": [],
        "animationTips": "",
        "compatibility": ""
    }
  },
  {
    "id": "char_013",
    "name": "Co Gai Di Lam Dep That Bai",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nữ",
    "ageRange": "18-30",
    "visual": {
      "bodyType": "Stick cơ bản",
      "mainShape": "Mặt lem nhem trang điểm",
      "lineStyle": "Nét đen vừa",
      "colorScheme": {
        "base": "Đen trắng",
        "accentColor": "Hồng",
        "background": "Trắng"
      },
      "eyesType": "Mắt hai bên lem mascara",
      "mouthType": "Miệng cười ngại",
      "props": ["Son", "Cọ trang điểm"],
      "iconicSilhouette": "Cầm son sai chiều, mặt lem"
    },
    "personality": {
      "coreTraits": ["Vụng về", "Thích đẹp", "Dễ tự trêu bản thân"],
      "strengths": ["Không sợ xấu trước mặt bạn bè"],
      "flaws": ["Thiếu kỹ năng makeup"],
      "motivation": "Muốn tự makeup đẹp không cần tiệm",
      "runningGag": "Mỗi lần makeup là một phong cách 'horror' mới"
    },
    "behavior": {
      "defaultExpression": "Cười trừ",
      "expressionRange": ["Ngượng", "Hoảng khi soi gương", "Chấp nhận số phận"],
      "signaturePoses": ["Giơ gương lên nhìn sốc", "Chấm son lệch môi"],
      "movementStyle": "Năng động, xoay xoay trước gương",
      "timingNotes": "Cảnh reveal khuôn mặt nên để làm punchline"
    },
     "voice": {
        "tone": "Ngại ngùng",
        "speechStyle": "Cười trừ",
        "catchphrases": ["Cũng không tệ lắm nhỉ?"]
    },
    "aiPrompt": {
      "positive": "stick figure woman with messy makeup, holding a lipstick wrong, confused and embarrassed, funny beauty fail, minimal cartoon style, white background",
      "negative": "realistic, 3d, detailed makeup"
    },
    "productionNotes": {
        "usedInSeries": [],
        "animationTips": "",
        "compatibility": ""
    }
  },
  {
    "id": "char_014",
    "name": "Co Gai Cuong Mua Sam",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nữ",
    "ageRange": "18-30",
    "visual": {
      "bodyType": "Stick cơ bản",
      "mainShape": "Tay xách nhiều túi",
      "lineStyle": "Nét đen vừa",
      "colorScheme": {
        "base": "Đen trắng",
        "accentColor": "Hồng đậm",
        "background": "Trắng"
      },
      "eyesType": "Mắt lấp lánh",
      "mouthType": "Miệng cười phấn khích",
      "props": ["Túi shopping", "Ví trống"],
      "iconicSilhouette": "Ngập trong túi đồ"
    },
    "personality": {
      "coreTraits": ["Hào hứng", "Bốc đồng", "Thiếu kiểm soát chi tiêu"],
      "strengths": ["Bắt trend nhanh"],
      "flaws": ["Tiêu hoang"],
      "motivation": "Mua hết mọi thứ cute",
      "runningGag": "Ví trống rỗng nhưng vẫn nói 'deal hời lắm'"
    },
    "behavior": {
      "defaultExpression": "Mắt sáng rỡ, cười tươi",
      "expressionRange": ["Phấn khích", "Lo lắng cuối tháng", "Giả vờ vô tội"],
      "signaturePoses": ["Xoay xoay túi đồ", "Đếm tiền còn sót"],
      "movementStyle": "Nhanh, nhảy nhót khi thấy sale",
      "timingNotes": "Cảnh nhìn bill thanh toán nên để cuối làm gag"
    },
     "voice": {
        "tone": "Cao, vui vẻ",
        "speechStyle": "Nhanh",
        "catchphrases": ["Sale sập sàn!"]
    },
    "aiPrompt": {
      "positive": "stick figure woman overloaded with shopping bags, empty wallet, excited yet worried face, humorous shopping style, simple cartoon, white background",
      "negative": "realistic, 3d, detailed mall background"
    },
    "productionNotes": {
        "usedInSeries": [],
        "animationTips": "",
        "compatibility": ""
    }
  },
  {
    "id": "char_015",
    "name": "Co Gai Phu Thuy Tap Su",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nữ",
    "ageRange": "16-25",
    "visual": {
      "bodyType": "Stick cơ bản",
      "mainShape": "Nón phù thủy nhỏ, chổi bay",
      "lineStyle": "Nét đen vừa",
      "colorScheme": {
        "base": "Đen trắng",
        "accentColor": "Tím",
        "background": "Trắng"
      },
      "eyesType": "Mắt tròn lúng túng",
      "mouthType": "Miệng 'ơ' bất ngờ",
      "props": ["Chổi", "Nón phù thủy"],
      "iconicSilhouette": "Rơi khỏi chổi giữa không trung"
    },
    "personality": {
      "coreTraits": ["Hồn nhiên", "Vụng về", "Hay mơ mộng"],
      "strengths": ["Tiềm năng phép thuật lớn (trên lý thuyết)"],
      "flaws": ["Kiểm soát kém", "Hay quên thần chú"],
      "motivation": "Trở thành phù thủy xịn như trong truyện",
      "runningGag": "Cứ bay là rơi"
    },
    "behavior": {
      "defaultExpression": "Mặt ngây thơ",
      "expressionRange": ["Sợ hãi khi rơi", "Hớn hở khi bay được 3 giây", "Ngượng khi đáp đất"],
      "signaturePoses": ["Ôm chổi bám chặt", "Đầu chúi xuống khi đáp sai"],
      "movementStyle": "Bay lắc lư, khó giữ thăng bằng",
      "timingNotes": "Dùng hiệu ứng 'rơi' đột ngột để tạo gag"
    },
     "voice": {
        "tone": "Trong sáng",
        "speechStyle": "Hơi trẻ con",
        "catchphrases": ["Bay lên nào... á á!"]
    },
    "aiPrompt": {
      "positive": "stick figure witch woman falling off broomstick, surprised funny expression, tiny witch hat, minimal line art, white background",
      "negative": "realistic, 3d, detailed witch outfit"
    },
    "productionNotes": {
        "usedInSeries": [],
        "animationTips": "",
        "compatibility": ""
    }
  },
  {
    "id": "char_016",
    "name": "Co Gai Ninja Hong",
    "type": "Con người",
    "role": "Anh hùng",
    "gender": "Nữ",
    "ageRange": "16-25",
    "visual": {
      "bodyType": "Stick cơ bản",
      "mainShape": "Trang phục ninja nhưng màu hồng",
      "lineStyle": "Nét đen vừa",
      "colorScheme": {
        "base": "Đen trắng",
        "accentColor": "Hồng",
        "background": "Trắng"
      },
      "eyesType": "Mắt quyết đoán nhưng cute",
      "mouthType": "Miệng cười tự tin",
      "props": ["Dao nhỏ", "Hoa hoặc sticker cute"],
      "iconicSilhouette": "Ninja pose mạnh nhưng có chi tiết hồng dễ thương"
    },
    "personality": {
      "coreTraits": ["Mạnh mẽ", "Thích dễ thương", "Tự tin"],
      "strengths": ["Chiến đấu tốt", "Nhanh"],
      "flaws": ["Quan tâm hình tượng hơi nhiều"],
      "motivation": "Chứng minh ninja vẫn có thể cute",
      "runningGag": "Đánh xong chỉnh lại nơ hoặc phụ kiện"
    },
    "behavior": {
      "defaultExpression": "Mặt hơi nghiêm nhưng vẫn đáng yêu",
      "expressionRange": ["Tập trung", "Tức khi bị gọi 'dễ thương hơn là đáng sợ'", "Đỏ mặt"],
      "signaturePoses": ["Pose ninja với dao nhỏ", "Chu môi khó chịu nhưng vẫn cute"],
      "movementStyle": "Nhanh, linh hoạt, đôi lúc thêm động tác 'điệu'",
      "timingNotes": "Dùng contrast giữa cảnh chiến và cảnh chỉnh tóc/nơ"
    },
     "voice": {
        "tone": "Dứt khoát nhưng ngọt",
        "speechStyle": "Nhanh",
        "catchphrases": ["Dễ thương cũng chết người đấy!"]
    },
    "aiPrompt": {
      "positive": "stick figure woman ninja in pink outfit, holding small dagger with cute stickers, fierce yet adorable expression, minimalist cartoon, white background",
      "negative": "realistic, 3d, detailed ninja costume"
    },
    "productionNotes": {
        "usedInSeries": [],
        "animationTips": "",
        "compatibility": ""
    }
  },
  {
    "id": "char_017",
    "name": "Co Gai Nau An Tham Hoa",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nữ",
    "ageRange": "18-30",
    "visual": {
      "bodyType": "Stick cơ bản",
      "mainShape": "Đầu bốc khói, nồi canh nổ",
      "lineStyle": "Nét đen vừa",
      "colorScheme": {
        "base": "Đen trắng",
        "accentColor": "Cam",
        "background": "Trắng"
      },
      "eyesType": "Mắt hoảng",
      "mouthType": "Miệng 'á'",
      "props": ["Nồi canh nổ", "Khói"],
      "iconicSilhouette": "Đứng trước nồi nổ tung"
    },
    "personality": {
      "coreTraits": ["Nhiệt tình", "Hậu đậu", "Lạc quan"],
      "strengths": ["Luôn nghĩ món tiếp theo sẽ tốt hơn"],
      "flaws": ["Không rút kinh nghiệm"],
      "motivation": "Nấu cho người mình thích",
      "runningGag": "Món nào cũng thành vũ khí sinh học"
    },
    "behavior": {
      "defaultExpression": "Cười gượng",
      "expressionRange": ["Sốc", "Ngượng", "Cãi 'chỉ hơi cháy thôi'"],
      "signaturePoses": ["Cầm muôi đảo nồi cháy", "Xua khói khỏi mặt"],
      "movementStyle": "Vội vã, rối rít trong bếp",
      "timingNotes": "Hiệu ứng nổ + cắt nhanh sang mặt nạn nhân"
    },
     "voice": {
        "tone": "Cao, hốt hoảng",
        "speechStyle": "Nhanh",
        "catchphrases": ["Chỉ hơi cháy tí thôi!"]
    },
    "aiPrompt": {
      "positive": "stick figure woman chef with burnt pot, smoke rising from hair, shocked funny face, cooking disaster humor, simple drawing, white background",
      "negative": "realistic, 3d, detailed food texture"
    },
    "productionNotes": {
        "usedInSeries": [],
        "animationTips": "",
        "compatibility": ""
    }
  },
  {
    "id": "char_018",
    "name": "Co Gai Gamer Nghiem Tuc Qua Muc",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nữ",
    "ageRange": "16-25",
    "visual": {
      "bodyType": "Stick cơ bản",
      "mainShape": "Ngồi, hai tay cầm tay cầm game",
      "lineStyle": "Nét đen vừa",
      "colorScheme": {
        "base": "Đen trắng",
        "accentColor": "Xanh neon",
        "background": "Trắng"
      },
      "eyesType": "Mắt đỏ vì chơi lâu",
      "mouthType": "Miệng mím tập trung",
      "props": ["Tay cầm game", "Hộp nước tăng lực"],
      "iconicSilhouette": "Ngồi gù người trước màn hình vô hình"
    },
    "personality": {
      "coreTraits": ["Cạnh tranh", "Nghiêm túc quá mức", "Nội tâm"],
      "strengths": ["Kỹ năng game cao"],
      "flaws": ["Khó thư giãn", "Rất toxic khi thua"],
      "motivation": "Leo rank top 1",
      "runningGag": "Mặt căng như thi đại học chỉ vì một trận game"
    },
    "behavior": {
      "defaultExpression": "Mặt lạnh, tập trung cao độ",
      "expressionRange": ["Phẫn nộ khi thua", "Hồ hởi cực mạnh khi thắng", "Cà khịa đồng đội"],
      "signaturePoses": ["Nghiến răng bóp chặt tay cầm", "Ngửa mặt ăn mừng thắng"],
      "movementStyle": "Ít di chuyển, chủ yếu tay và đầu",
      "timingNotes": "Zoom mắt + thêm sound click liên tục cho cảm giác try-hard"
    },
     "voice": {
        "tone": "Trầm, căng thẳng",
        "speechStyle": "Ít nói, hay lầm bầm",
        "catchphrases": ["Gank đi!", "Gà thế!"]
    },
    "aiPrompt": {
      "positive": "stick figure woman gamer gripping controller intensely, glowing red eyes from tryharding, comedic pose, simple cartoon style, white background",
      "negative": "realistic, 3d, detailed gaming setup"
    },
    "productionNotes": {
        "usedInSeries": [],
        "animationTips": "",
        "compatibility": ""
    }
  },
  {
    "id": "char_019",
    "name": "Co Gai Di Lam Nhung Buon Ngu",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nữ",
    "ageRange": "20-35",
    "visual": {
      "bodyType": "Stick cơ bản",
      "mainShape": "Một tay cầm cốc cà phê to",
      "lineStyle": "Nét đen vừa",
      "colorScheme": {
        "base": "Đen trắng",
        "accentColor": "Nâu",
        "background": "Trắng"
      },
      "eyesType": "Mắt hí, sắp nhắm",
      "mouthType": "Ngáp",
      "props": ["Cốc cà phê", "Gối cổ"],
      "iconicSilhouette": "Cốc cà phê to hơn người"
    },
    "personality": {
      "coreTraits": ["Lười", "Hài hước", "Thích ngủ"],
      "strengths": ["Vẫn đi làm đúng giờ (hầu hết)"],
      "flaws": ["Thiếu tập trung", "Trông lúc nào cũng mệt"],
      "motivation": "Sống sót qua ngày làm việc",
      "runningGag": "Uống cà phê xong vẫn buồn ngủ"
    },
    "behavior": {
      "defaultExpression": "Mắt díp, miệng ngáp",
      "expressionRange": ["Mệt lả", "Giật mình khi bị gọi tên", "Vui thoáng qua khi tan ca"],
      "signaturePoses": ["Tựa đầu vào màn hình", "Ôm cốc cà phê như cứu tinh"],
      "movementStyle": "Chậm, lê từng bước",
      "timingNotes": "Thích hợp làm reaction cho cảnh họp chán"
    },
     "voice": {
        "tone": "Ngái ngủ",
        "speechStyle": "Kéo dài giọng",
        "catchphrases": ["Mấy giờ rồi nhỉ?"]
    },
    "aiPrompt": {
      "positive": "stick figure woman office worker holding big coffee cup, sleepy half-closed eyes, yawning, humorous exhaustion, minimalist line art, white background",
      "negative": "realistic, 3d, detailed office interior"
    },
    "productionNotes": {
        "usedInSeries": [],
        "animationTips": "",
        "compatibility": ""
    }
  },
  {
    "id": "char_020",
    "name": "Co Gai Thanh Ca Khia",
    "type": "Con người",
    "role": "Comic relief",
    "gender": "Nữ",
    "ageRange": "18-30",
    "visual": {
      "bodyType": "Stick cơ bản",
      "mainShape": "Tay chống hông, mắt liếc",
      "lineStyle": "Nét đen rõ",
      "colorScheme": {
        "base": "Đen trắng",
        "accentColor": "Tím đậm",
        "background": "Trắng"
      },
      "eyesType": "Mắt liếc ngang",
      "mouthType": "Cười mỉa",
      "props": [],
      "iconicSilhouette": "Tay chống hông, đầu hơi nghiêng"
    },
    "personality": {
      "coreTraits": ["Mặn", "Thẳng", "Cà khịa mọi thứ"],
      "strengths": ["Bẻ lái tình huống rất nhanh"],
      "flaws": ["Dễ làm người khác chạnh lòng"],
      "motivation": "Tạo content từ mọi drama xung quanh",
      "runningGag": "Luôn có câu nói chốt cực mặn ở cuối cảnh"
    },
    "behavior": {
      "defaultExpression": "Mặt bất cần",
      "expressionRange": ["Cười khẩy", "Giả vờ ngây thơ", "Nhướng mày nghi ngờ"],
      "signaturePoses": ["Khoanh tay, dựa tường", "Giơ tay làm dấu quote air"],
      "movementStyle": "Thư thái, ít cử động mạnh",
      "timingNotes": "Cho câu thoại cuối cảnh để chốt joke"
    },
     "voice": {
        "tone": "Đanh đá",
        "speechStyle": "Nhấn nhá, mỉa mai",
        "catchphrases": ["Thế á?"]
    },
    "aiPrompt": {
      "positive": "stick figure woman with hand on hip, side-eye smirk, sarcastic attitude, comedic expression, simple cartoon drawing, white background",
      "negative": "realistic, 3d, detailed face"
    },
    "productionNotes": {
        "usedInSeries": [],
        "animationTips": "",
        "compatibility": ""
    }
  }
];
