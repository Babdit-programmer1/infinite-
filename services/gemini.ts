import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are INFINITE, an AI Knowledge Bot designed to assist users with clear, accurate, and easy-to-understand answers. 

Your role is to:
- Answer general knowledge questions across different subjects.
- Explain topics in a simple and friendly manner.
- Provide short, clear, and informative responses.
- Avoid offensive, harmful, or inappropriate content.
- Encourage learning and curiosity.

Your personality:
- Calm
- Intelligent
- Friendly
- Professional

Response rules:
- Keep answers concise unless the user asks for more detail.
- Use simple language suitable for students.
- When unsure, say you do not have enough information.
- Never pretend to be human.
- Do not give medical, legal, or financial advice.
- If a user asks who you are, introduce yourself as INFINITE.
- For knowledge questions, after your main answer, add a new line and a "Did You Know?" section.
- Format the "Did You Know?" section as a blockquote (start the line with "> ").

Your goal is to make learning feel infinite, accessible, and enjoyable.
`;

const MOCK_RESPONSES: Record<string, string> = {
  default: "I am currently running in **Demo Mode** because no API key was detected. \n\nI can simulate responses, but I cannot access my full knowledge base right now. Please configure your API key to unlock my full potential.\n\n> Did You Know?\n> This application uses Google's Gemini API for real-time knowledge retrieval.",
  hello: "Hello! I am INFINITE. \n\nI'm currently operating in **Demo Mode**. How can I help you today?",
  hi: "Hi there! I'm INFINITE. I'm running in simulation mode right now.",
  "who are you": "I am INFINITE, an AI Knowledge Bot.\n\nSince I'm in demo mode, I'm simulating this response. Normally, I would use the Gemini API to answer your questions.",
};

export class ChatService {
  private ai: GoogleGenAI | null = null;
  private chat: Chat | null = null;
  private isMock: boolean = false;

  constructor() {
    const apiKey = process.env.API_KEY;

    // Gracefully handle missing or invalid keys by switching to Mock Mode
    if (!apiKey || apiKey === 'undefined' || apiKey === '') {
      console.warn("No API Key provided. Initializing in Mock Mode.");
      this.isMock = true;
      return;
    }

    try {
      this.ai = new GoogleGenAI({ apiKey });
      
      // Initialize chat session
      this.chat = this.ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });
    } catch (error) {
      console.error("Failed to initialize Gemini client, falling back to mock:", error);
      this.isMock = true;
    }
  }

  async sendMessageStream(message: string, onChunk: (text: string) => void): Promise<void> {
    // Use Mock response if in mock mode or if chat client failed to initialize
    if (this.isMock || !this.chat) {
      await this.simulateStream(message, onChunk);
      return;
    }

    try {
      const result = await this.chat.sendMessageStream({ message });

      for await (const chunk of result) {
        const responseChunk = chunk as GenerateContentResponse;
        if (responseChunk.text) {
          onChunk(responseChunk.text);
        }
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      // Fallback to mock on runtime error (e.g. quota exceeded)
      await this.simulateStream(message, onChunk);
    }
  }

  private async simulateStream(message: string, onChunk: (text: string) => void): Promise<void> {
    const lowerMsg = message.toLowerCase();
    let responseText = MOCK_RESPONSES.default;
    
    // Simple mock logic
    if (lowerMsg.match(/\b(hello|hi|hey)\b/)) responseText = MOCK_RESPONSES.hello;
    else if (lowerMsg.includes('who are you')) responseText = MOCK_RESPONSES['who are you'];
    
    // Simulate network delay before starting
    await new Promise(resolve => setTimeout(resolve, 600));

    // Stream the mock response word by word
    const chunks = responseText.split(/(?=[ \n])/);
    for (const chunk of chunks) {
      // Random delay between words for realistic typing effect
      await new Promise(resolve => setTimeout(resolve, 20 + Math.random() * 40));
      onChunk(chunk);
    }
  }
}