export enum Role {
  USER = 'user',
  ASSISTANT = 'model'
}

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface Suggestion {
  id: string;
  text: string;
  category: string;
}