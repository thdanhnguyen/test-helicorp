const OpenAI = require('openai');

let openai;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
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

const handleChat = async (req, res) => {
  const { message } = req.body;

  console.log(`[Chatbot] User: "${message}"`);

  if (!openai) {
    console.log('[Chatbot] Using fallback mock logic (No OPENAI_API_KEY)');
    const msgLower = message.toLowerCase();
    let botReply = "I'm sorry, I don't understand that. Could you ask something else?";

    if (msgLower.includes('hello') || msgLower.includes('hi')) botReply = "Hello! I am Phantom Assistant. How can I help you today?";
    else if (msgLower.includes('price') || msgLower.includes('cost')) botReply = "The PHANTOM starts at $1,099 for all color variants.";
    else if (msgLower.includes('color')) botReply = "The PHANTOM comes in Phantom Black, Arctic Silver, Navy, and Rose Gold.";
    
    return setTimeout(() => res.status(200).json({ reply: botReply }), 1000);
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const botReply = completion.choices[0].message.content;
    console.log(`[Chatbot] OpenAI Bot: "${botReply}"`);
    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error('[Chatbot] OpenAI API Error:', error.message);
    res.status(500).json({ reply: "Sorry, I am having trouble connecting to my brain. Please try again later." });
  }
};

module.exports = {
  handleChat,
};
