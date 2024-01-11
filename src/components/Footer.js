import React, { useState } from "react";
import { PlaneIcon, UserIcon } from "../constants";

function Footer({ onAddMessage }) {
  const [inputMessage, setInputMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== "") {
      onAddMessage(inputMessage);
      setInputMessage(""); // 입력 필드 초기화
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="text-center p-3">
      <form className="flex justify-center items-center pt-4 lg:mx-auto lg:max-w-3xl">
        <div className="relative flex h-full flex-1 md:flex-col">
          <div className="ml-1 mt-1.5 md:w-full md:m-auto md:flex md:mb-2 gap-2 justify-center">
            <div className="text-gray-100 p-1 md:hidden">
              <UserIcon />
            </div>
          </div>
          {/* Input */}
          <div className="flex flex-col w-full py-2 pl-3 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 rounded-md bg-[rgba(64,65,79,var(--tw-bg-opacity))]">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="ESGenie에게 무엇이든 물어보세요!"
              className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent outline-none overflow-y-hidden h-[23px]"
            ></textarea>
            <button
              type="submit"
              className="absolute p-2 rounded-md text-white bg-blue-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-blue-700"
            >
              <PlaneIcon />
            </button>
          </div>
        </div>
      </form>
      <div className="px-3 pt-2 text-center text-xs text-gray">
        ESGenie Bot &copy; Created by{" "}
        <a
          className="underline"
          href="https://bigleader.net"
          target="_blank"
          rel="noreferrer noopener"
        >
          BIGLEADER
        </a>
      </div>
    </div>
  );
}

export default Footer;
