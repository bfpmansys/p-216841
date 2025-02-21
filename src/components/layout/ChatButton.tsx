
import { FC } from "react";

export const ChatButton: FC = () => {
  return (
    <button
      className="fixed cursor-pointer left-10 bottom-10 max-sm:left-5 max-sm:bottom-5"
      aria-label="Open FAQ chatbot"
      title="Click to open FAQ support chatbot"
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/333bd47f53f2acdb67a6ed003fa71c18e881c70e"
        alt="FAQ Chatbot"
        className="w-[60px] h-[60px] max-sm:w-10 max-sm:h-10"
        loading="lazy"
      />
    </button>
  );
};
