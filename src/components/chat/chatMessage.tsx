
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { format } from "date-fns";

type ChatMessageProps = {
  message: Message;
  isCurrentUser: boolean;
};

export const ChatMessage = ({ message, isCurrentUser }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full gap-2 mb-4",
        isCurrentUser ? "justify-end" : "justify-start"
      )}
    >
      {!isCurrentUser && (
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/27712aea7f56dd97fdf23865e7511675d8ab9bf9"
          className="w-10 h-10 rounded-full"
          alt="User avatar"
        />
      )}
      <div
        className={cn(
          "max-w-[70%] rounded-lg p-3",
          isCurrentUser ? "bg-[#FE623F] text-white" : "bg-[#FFF5EE]"
        )}
      >
        <p className="text-sm">{message.content}</p>
        <span className="text-xs opacity-70 block text-right">
          {format(new Date(message.created_at), "p")}
        </span>
      </div>
    </div>
  );
};