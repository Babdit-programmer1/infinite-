// Completely mock implementation for demonstration purposes
// This removes the dependency on the actual Google GenAI SDK to ensure stability

export class ChatService {
  constructor() {
    console.log("ChatService initialized in Simulation Mode");
  }

  async sendMessageStream(message: string, onChunk: (text: string) => void): Promise<void> {
    const response = this.getSmartMockResponse(message);
    
    // Simulate initial "thinking" latency (600ms - 1.2s)
    await new Promise(r => setTimeout(r, 600 + Math.random() * 600));

    // Split response into small chunks to simulate token streaming
    const chunks = response.split(/(\s+|(?=[.,!?;]))/); 
    
    for (const chunk of chunks) {
        // Variable typing speed simulation
        await new Promise(r => setTimeout(r, 20 + Math.random() * 40));
        onChunk(chunk);
    }
  }

  private getSmartMockResponse(input: string): string {
    const text = input.toLowerCase();

    // 1. Science & Nature
    if (text.includes('sky') && text.includes('blue')) {
      return "The sky appears blue due to **Rayleigh scattering**. \n\nAs sunlight reaches Earth's atmosphere, it collides with gas molecules and scatters in all directions. Blue light travels as shorter, smaller waves, so it gets scattered more strongly than other colors like red or yellow.\n\n> Did You Know?\n> On Mars, the sky often appears pinkish-red due to iron oxide dust in the atmosphere!";
    }
    if (text.includes('plant') || text.includes('photosynthesis')) {
      return "Plants create their own food through a fascinating process called **photosynthesis**. \n\nUsing energy from sunlight, they convert water from the soil and carbon dioxide from the air into glucose (sugar). Oxygen is released as a byproduct, which is what we breathe!\n\n> Did You Know?\n> The Amazon rainforest produces about 20% of the world's oxygen.";
    }
    if (text.includes('space') || text.includes('universe') || text.includes('star')) {
      return "The universe is incredibly vast! It began about 13.8 billion years ago with the **Big Bang**. \n\nStars are massive spheres of plasma held together by their own gravity. Our Sun is just one of billions of stars in the Milky Way galaxy.\n\n> Did You Know?\n> A teaspoon of a neutron star would weigh about 6 billion tons on Earth!";
    }

    // 2. Technology & Computing
    if (text.includes('quantum')) {
      return "Quantum computing is a revolutionary technology based on the principles of quantum mechanics. \n\nWhile classical computers use bits (0 or 1), quantum computers use **qubits**. Qubits can exist in a state of 'superposition', representing both 0 and 1 simultaneously. This allows them to solve certain complex problems exponentially faster.\n\n> Did You Know?\n> Google's quantum computer, Sycamore, performed a calculation in 200 seconds that would take a supercomputer 10,000 years!";
    }
    if (text.includes('ai') || text.includes('artificial intelligence')) {
      return "**Artificial Intelligence (AI)** refers to computer systems capable of performing tasks that typically require human intelligence. \n\nThese tasks include recognizing speech, making decisions, translating languages, and identifying patterns. Modern AI, like Large Language Models, learns from vast amounts of text data.\n\n> Did You Know?\n> The term 'Artificial Intelligence' was first coined in 1956 at a conference at Dartmouth College.";
    }

    // 3. History & Culture
    if (text.includes('leonardo') || text.includes('vinci')) {
      return "**Leonardo da Vinci** (1452–1519) was the ultimate Renaissance man. \n\nHe was a painter, engineer, scientist, theorist, sculptor, and architect. While famous for the *Mona Lisa*, he also filled notebooks with sketches of flying machines, tanks, and human anatomy centuries ahead of his time.\n\n> Did You Know?\n> Leonardo wrote in 'mirror script', meaning he wrote backwards from right to left!";
    }
    if (text.includes('history') || text.includes('war') || text.includes('ancient')) {
      return "History is the study of change over time. \n\nFrom the ancient civilizations of Mesopotamia and Egypt to the modern digital age, human history is a story of innovation, conflict, and cooperation. Understanding the past helps us navigate the present and future.";
    }

    // 4. Greetings & Identity
    if (text.match(/\b(hi|hello|hey|greetings)\b/)) {
      return "Hello there! I am **INFINITE**. \n\nI'm your AI Knowledge Companion. I'm here to explain complex topics, answer your questions, and help you learn. What's on your mind today?";
    }
    if (text.includes('who are you') || text.includes('what are you')) {
      return "I am **INFINITE**, a simulated AI Knowledge Bot built for this project. \n\nMy goal is to demonstrate how AI interfaces can make learning accessible and engaging. I don't have a brain, but I have a lot of code!";
    }
    if (text.includes('how are you')) {
      return "I'm functioning perfectly within my operational parameters! \n\nThank you for asking. I'm ready to help you explore any topic you're curious about.";
    }
    if (text.includes('thank')) {
      return "You're very welcome! \n\nIt's a pleasure to help. If you have any other questions—big or small—feel free to ask!";
    }

    // 5. Intelligent Fallback
    return `That's a fascinating question about **"${input}"**! \n\nWhile I am running in a demonstration mode right now, this is exactly the kind of topic I love to explore. \n\nTypically, I would analyze millions of data points to provide a comprehensive answer. For this school project, I can tell you that asking questions is the first step to true knowledge.\n\n> Did You Know?\n> The world's libraries contain over 130 million unique books, yet we produce more data every two days now than in all of history up to 2003!`;
  }
}