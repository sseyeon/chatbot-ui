import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Footer from "./components/Footer";
import { ShareIcon } from "./constants";

function App() {
  const [messages, setMessages] = useState([]);
  const [sources, setSources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const addSources = (newSources) => {
    setSources((prevSources) => [...prevSources, newSources]);
  };
  useEffect(() => {}, [sources]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <div className="w-full flex justify-end h-12 p-2">
          <button className=" p-2 rounded-md  border top-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-200">
            <ShareIcon />
          </button>
        </div>
        <Feed
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          messages={messages}
          onAddMessage={addMessage}
          sources={sources}
          onAddSources={addSources}
        />
        <Footer
          setIsLoading={setIsLoading}
          messages={messages}
          onAddMessage={addMessage}
          onAddSources={addSources}
        />
      </div>
    </div>
  );
}

export default App;
