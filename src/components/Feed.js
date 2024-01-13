import React, { useEffect, useRef } from "react";
import { SunIcon, UserIcon } from "../constants";
import Genie from "../assets/images/genie.png";
import MagicLamp from "../assets/images/magic-lamp.png";
import ReactMarkdown from "react-markdown";

function Feed({
  messages,
  onAddMessage,
  sources,
  onAddSources,
  isLoading,
  setIsLoading,
}) {
  const messageEndRef = useRef(null);

  // 데이터 배열을 상수로 분리
  const data = [
    {
      icon: <SunIcon />,
      title: "FAQ",
      subTitle: [
        `ESG란 무엇인가요?`,
        `중소기업의 ESG 평가는 어떻게 이루어지나요?`,
        `ESG는 잠깐의 유행이었다가 사라지는 것 아닌가요?`,
        `ESG 평가가 좋은 기업은 돈을 잘 버는 기업인가요?`,
        `기업의 ESG 활동은 어떻게 시작할 수 있나요?`,
        `ESG 공개 의무화 계획은 어떻게 되고, 근거 규정은 무엇인가요?`,
        `평가기관간 ESG 등급의 차이는 어떻게 해석해야하나요?`,
        `ESG 정보공시 의무화가 중소기업에 어떤 영향을 미칠까요?`,
        `ESG 경영의 실천계획을 세우는 방법에는 어떤 것이 있나요?`,
      ],
      hover: true,
    },
  ];

  const handleSubTitleClick = async (subTitle) => {
    onAddMessage(subTitle);
    const dataToSend = {
      query: subTitle,
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
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <main className="relative h-full w-full transition-width flex flex-col overflow-y-auto max-h-[100vh] items-stretch flex-1">
      <div className="flex flex-col items-center text-sm h-full md:h-screen">
        <div className="text-gray-800 w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex px-6">
          {messages.length > 0 ? (
            <div className="pt-5 space-y-5 w-[100%] mx-auto relative">
              {" "}
              {messages.map((message, index) => (
                <div key={index} className="w-full">
                  {index % 2 === 0 ? (
                    <div className="flex items-center gap-x-2">
                      <div className="p-2 w-12 h-12 rounded-full">
                        <UserIcon />
                      </div>
                      <div className="rounded-lg p-3 w-full border text-sm leading-6">
                        {/* {message} */}
                        <ReactMarkdown>{message}</ReactMarkdown>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-x-2">
                      <div className=" p-2 w-12 h-12 rounded-full">
                        <img
                          src={Genie}
                          alt="Bigleader Logo"
                          className="w-full h-full"
                        />
                      </div>
                      <div className="rounded-lg p-3 w-full border border-blue-500 text-sm leading-6">
                        <ReactMarkdown>{message}</ReactMarkdown>
                        <div className="flex flex-row flex-wrap gap-2 mt-2">
                          {Array.isArray(sources[Math.floor(index / 2)]) &&
                            sources[Math.floor(index / 2)].map(
                              (source, srcIndex) => (
                                <span
                                  key={srcIndex}
                                  className="bg-[#E5ECF6] p-1 rounded-md text-xs"
                                >
                                  📚 {source}
                                </span>
                              )
                            )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="w-full">
                  <div className="flex items-center gap-x-2">
                    <div className=" p-2 w-12 h-12 rounded-full">
                      <img
                        src={MagicLamp}
                        alt="Bigleader Logo"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="rounded-lg p-3 w-full border border-yellow-500 fading-effect text-sm leading-6">
                      답변을 준비중입니다.
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h1 className="text-4xl text-gray-800 font-semibold text-center mt-12 ml-auto mr-auto mb-10">
                ESGenie Bot
              </h1>
              <h2 className="flex gap-3 text-gray-600 items-center m-auto text-lg font-normal md:flex-col md:gap-2 mb-8 mt-12">
                <SunIcon />
                FAQ
              </h2>
              {data.map((item, index) => (
                <ul
                  key={index}
                  className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg "
                >
                  {item.subTitle.map((subTitle, subTitleIndex) => (
                    <button
                      className={`w-full bg-gray-50 text-gray-600 bg-white/5 p-3 border rounded-md ${
                        item.hover
                          ? "hover:bg-gray-200 dark:hover:bg-gray-900 cursor-pointer"
                          : "cursor-text"
                      }`}
                      key={subTitleIndex}
                      onClick={() => handleSubTitleClick(subTitle)}
                    >
                      "{subTitle}"
                    </button>
                  ))}
                </ul>
              ))}
            </div>
          )}
        </div>
      </div>
      <div ref={messageEndRef} />
    </main>
  );
}

export default Feed;
