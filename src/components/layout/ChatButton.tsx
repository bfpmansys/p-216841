import { FC } from "react";

export const ChatButton: FC = () => {
  return (
    <button
      className="fixed cursor-pointer right-10 bottom-10 max-sm:right-5 max-sm:bottom-5"
      aria-label="Open chat"
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/333bd47f53f2acdb67a6ed003fa71c18e881c70e"
        alt="Chat"
        className="w-[60px] h-[60px] max-sm:w-10 max-sm:h-10"
        loading="lazy"
      />
    </button>
  );
};
