import React, { useState } from "react";
import { PlaneIcon } from "../constants";

function Footer({ messages, onAddMessage, onAddSources, setIsLoading }) {
  const [inputMessage, setInputMessage] = useState("");

  const handleSubmit = async (e) => {
    onAddMessage(inputMessage);
    setInputMessage(""); // 입력 필드 초기화

    e.preventDefault();
    if (inputMessage.trim() !== "") {
      const dataToSend = {
        query: inputMessage,
        history: {
          user: messages.length > 0 ? messages[messages.length - 2] : "",
          bot: messages.length > 0 ? messages[messages.length - 1] : "",
          source: [],
        },
      };
      setIsLoading(true); // Start loading
      try {
        // Send the POST request
        const response = await fetch(
          "http://esg-chat.bigleader.net/chatbot/main",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          }
        );

        // Handle the response
        if (response.ok) {
          const responseData = await response.json();
          onAddMessage(responseData.history[0].bot);
          onAddSources(responseData.history[0].sources);
          // Here, you can do something with the response
        } else {
          console.error("Failed to send message:", response.statusText);
        }
      } catch (error) {
        console.error("Error while sending message:", error);
      } finally {
        setIsLoading(false); // Stop loading regardless of result
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing) {
      return;
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="text-center p-3">
      <form className="flex justify-center items-center pt-4 lg:mx-auto lg:max-w-3xl">
        <div className="relative flex h-full flex-1 md:flex-col">
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
              onClick={handleSubmit}
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
