
import { FC } from "react";

export const ChatButton: FC = () => {
  return (
    <button
      className="fixed cursor-pointer right-10 bottom-10 max-sm:left-5 max-sm:bottom-5"
      aria-label="Open FAQ chatbot"
      title="Click to open FAQ support chatbot"
    >
      <img
        src="/images/chatbot.png"
        alt="FAQ Chatbot"
        className="w-[60px] h-[60px] max-sm:w-10 max-sm:h-10"
        loading="lazy"
      />
    </button>
  );
};
