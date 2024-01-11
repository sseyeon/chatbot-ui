import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Footer from "./components/Footer";
import { ShareIcon } from "./constants";

function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <div className="w-full flex justify-end h-12 p-2">
          <button className=" p-2 rounded-md  border top-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-200">
            <ShareIcon />
          </button>
        </div>
        <Feed messages={messages} onAddMessage={addMessage} />
        <Footer onAddMessage={addMessage} />
      </div>
    </div>
  );
}

export default App;
