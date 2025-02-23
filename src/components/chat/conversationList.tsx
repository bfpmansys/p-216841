
import { Conversation } from "@/types/chat";
import { format } from "date-fns";

type ConversationListProps = {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (id: string) => void;
};

export const ConversationList = ({
  conversations,
  selectedId,
  onSelect,
}: ConversationListProps) => {
  return (
    <div className="space-y-4">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          onClick={() => onSelect(conversation.id)}
          className={`bg-[#FFF5EE] p-4 rounded-lg flex items-start gap-4 cursor-pointer transition-colors ${
            selectedId === conversation.id ? "ring-2 ring-[#FE623F]" : ""
          }`}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/27712aea7f56dd97fdf23865e7511675d8ab9bf9"
            className="w-10 h-10 rounded-full"
            alt="User avatar"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">Inspector James</h3>
              <span className="text-sm text-gray-500">
                {format(new Date(conversation.last_message_at), "MM/dd/yy")}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {conversation.last_message?.content || "No messages yet"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};