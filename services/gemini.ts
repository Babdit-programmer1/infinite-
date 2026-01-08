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

export class ChatService {
  private ai: GoogleGenAI;
  private chat: Chat;

  constructor() {
    // Initialize GoogleGenAI with the API key from environment variables
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    
    // Initialize chat session
    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
  }

  async sendMessageStream(message: string, onChunk: (text: string) => void): Promise<void> {
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
      throw error;
    }
  }
}