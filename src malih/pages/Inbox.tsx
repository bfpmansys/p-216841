
import { ChatMessage } from "@/components/chat/chatMessage";
import { ConversationList } from "@/components/chat/conversationList";
import { Conversation, Message } from "@/types/chat";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";

const Inbox = () => {
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string>();
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const { data, error } = await supabase
          .from("conversations")
          .select(`
            *,
            participants:conversation_participants(user_id, created_at),
            messages!messages_conversation_id_fkey(
              id,
              content,
              sender_id,
              created_at,
              status
            )
          `)
          .order('last_message_at', { ascending: false });

        if (error) throw error;

        const formattedData = data?.map((conv) => ({
          ...conv,
          last_message: conv.messages && conv.messages.length > 0
            ? conv.messages[conv.messages.length - 1]
            : undefined
        }));

        setConversations(formattedData || []);
        if (formattedData?.[0]) {
          setSelectedConversation(formattedData[0].id);
        }
      } catch (error: any) {
        toast({
          title: "Error fetching conversations",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();

    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload: { new: Message }) => {
          if (payload.new.conversation_id === selectedConversation) {
            setMessages((prev) => [...prev, payload.new]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  useEffect(() => {
    if (!selectedConversation) return;

    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .eq("conversation_id", selectedConversation)
          .order("created_at", { ascending: true });

        if (error) throw error;
        setMessages(data || []);
      } catch (error: any) {
        toast({
          title: "Error fetching messages",
          description: error.message,
          variant: "destructive",
        });
      }
    };

    fetchMessages();
  }, [selectedConversation, toast]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation || sendingMessage) return;

    setSendingMessage(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      const { error } = await supabase
        .from("messages")
        .insert({
          content: newMessage.trim(),
          conversation_id: selectedConversation,
          sender_id: user.id,
          status: 'sent'
        });

      if (error) throw error;
      setNewMessage("");
    } catch (error: any) {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSendingMessage(false);
    }
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.last_message?.content
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-['Poppins']">
      <DashboardNavbar/>
      
      <div className="mx-[41px] my-[39px] max-sm:mx-3 max-sm:my-5">
        <div className="bg-[#FE623F] px-6 py-4 rounded-t-2xl flex items-center">
          <button 
            onClick={() => navigate("/dashboard")}
            className="text-white mr-4"
          >
            <img
              src="./images/assets/back.png"
              className="w-6 h-6"
              alt="Back"
            />
          </button>
          <h1 className="text-white text-2xl font-bold">INBOX</h1>
        </div>

        <div className="bg-[#FFECDB] p-6 rounded-b-2xl">
          <div className="bg-white rounded-lg p-4">
            <div className="flex justify-between mb-4">
              <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[200px] border border-gray-300 rounded-lg px-4 py-2"
              />
              {/* <button className="text-white bg-[#FE623F] px-4 py-2 rounded-lg">
                All Messages
              </button> */}
            </div>

            {loading ? (
              <div className="flex justify-center p-4">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <ConversationList
                    conversations={filteredConversations}
                    selectedId={selectedConversation}
                    onSelect={setSelectedConversation}
                  />
                </div>

                <div className="md:col-span-2 bg-white rounded-lg p-4">
                  <div className="h-[500px] flex flex-col">
                    <div className="flex-1 overflow-y-auto mb-4">
                      {messages.map((message) => (
                        <ChatMessage
                          key={message.id}
                          message={message}
                          isCurrentUser={false} // TODO: Update with actual user check
                        />
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                      />
                      <button
                        type="submit"
                        disabled={sendingMessage}
                        className="bg-[#FE623F] text-white px-6 py-2 rounded-lg disabled:opacity-50"
                      >
                        {sendingMessage ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          "Send"
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
