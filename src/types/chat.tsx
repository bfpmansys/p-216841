
export type Message = {
    id: string;
    content: string;
    sender_id: string;
    created_at: string;
    status: 'sent' | 'delivered' | 'read';
    conversation_id?: string;
    updated_at?: string;
  };
  
  export type Conversation = {
    id: string;
    created_at: string;
    updated_at: string;
    last_message_at: string;
    participants: Array<{
      user_id: string;
      created_at: string;
    }>;
    last_message?: Message;
  };