
export interface Message {
  id: string;
  conversation_id: string;
  content: string;
  sender_id: string;
  created_at: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: string;
  created_at: string;
  updated_at: string;
  last_message_at: string;
  last_message?: Message;
  participants?: ConversationParticipant[];
}

export interface ConversationParticipant {
  id: string;
  conversation_id: string;
  user_id: string;
  created_at: string;
}
