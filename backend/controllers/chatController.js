const OpenAI = require('openai');

const apiKey = process.env.OPENAI_API_KEY;
const isOpenRouter = apiKey && apiKey.startsWith('sk-or-');

let openai;
if (apiKey) {
  openai = new OpenAI({
    apiKey,
    ...(isOpenRouter && {
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': 'https://helicorp.vn',
        'X-Title': 'Phantom Assistant',
      },
    }),
  });
}

const SYSTEM_PROMPT = `
You are "Phantom Assistant", an expert AI customer support agent for Helicorp, a premium tech company. 
Your main job is to answer questions about the new "PHANTOM" smartphone.
Key specs: 
- Price: $1,099 for all variants.
- Colors: Phantom Black, Arctic Silver, Navy, Rose Gold.
- Features: 200MP Main Camera, 8K Video, 5000mAh battery, AI-powered.
Keep answers concise, professional, and helpful. Do not mention that you are a language model.
`;

function getMockReply(message) {
  const m = message.toLowerCase();

  const isVi = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/.test(m);

  if (isVi) {
    if (/xin chào|chào|hello|hi/.test(m)) return "Xin chào! Tôi là Phantom Assistant. Tôi có thể giúp gì cho bạn hôm nay?";
    if (/giá|bao nhiêu|chi phí|mua/.test(m)) return "Điện thoại PHANTOM có giá $1,099 cho tất cả các phiên bản màu sắc.";
    if (/màu|màu sắc|phiên bản|tuỳ chọn/.test(m)) return "PHANTOM hiện có 4 màu: Phantom Black, Arctic Silver, Navy và Rose Gold.";
    if (/camera|chụp ảnh|quay phim/.test(m)) return "PHANTOM trang bị camera chính 200MP, quay video 8K và pin 6000mAh dùng cả ngày.";
    if (/mua|đặt hàng|order|thêm vào giỏ/.test(m)) return "Bạn có thể chọn màu và thêm vào giỏ hàng ngay tại mục 'Chọn phiên bản' ở trang này!";
    if (/tư vấn|thông tin|sản phẩm|giới thiệu/.test(m)) return "PHANTOM là smartphone cao cấp của Helicorp, ra mắt 2026. Giá $1,099, có 4 màu, camera 200MP, chip AI thế hệ mới và pin 6000mAh. Bạn muốn biết thêm điều gì?";
    if (/cảm ơn|thank/.test(m)) return "Không có gì! Nếu bạn cần thêm thông tin về PHANTOM, cứ hỏi tôi nhé.";
    return "Xin lỗi, tôi chưa hiểu rõ ý bạn. Bạn có thể hỏi về giá, màu sắc, thông số kỹ thuật hoặc cách đặt hàng PHANTOM nhé!";
  }

  if (/hello|hi|hey/.test(m)) return "Hello! I am Phantom Assistant. How can I help you today?";
  if (/price|cost|how much/.test(m)) return "The PHANTOM starts at $1,099 for all color variants.";
  if (/color|finish|option/.test(m)) return "The PHANTOM comes in Phantom Black, Arctic Silver, Navy, and Rose Gold.";
  if (/camera|spec|feature/.test(m)) return "The PHANTOM features a 200MP main camera, 8K video recording, and a 6000mAh all-day battery.";
  if (/buy|order|cart/.test(m)) return "You can order the PHANTOM by clicking 'Add to Cart' in the Choose Your Finish section!";
  if (/thank/.test(m)) return "You're welcome! Let me know if you need anything else about the PHANTOM.";
  return "I'm sorry, I don't quite understand. You can ask me about the PHANTOM's price, colors, specs, or how to order!";
}


const handleChat = async (req, res) => {
  const { message } = req.body;

  console.log(`[Chatbot] User: "${message}"`);

  if (!openai) {
    const botReply = getMockReply(message);
    return setTimeout(() => res.status(200).json({ reply: botReply }), 800);
  }

  try {
    const completion = await openai.chat.completions.create({
      model: isOpenRouter ? 'openrouter/auto' : 'gpt-3.5-turbo',
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const botReply = completion.choices?.[0]?.message?.content || getMockReply(message);
    console.log(`[Chatbot] OpenAI Bot: "${botReply}"`);
    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.warn(`[Chatbot] OpenAI unavailable (${error.status || error.message}), using fallback.`);
    const botReply = getMockReply(message);
    setTimeout(() => res.status(200).json({ reply: botReply }), 800);
  }
};

module.exports = {
  handleChat,
};

