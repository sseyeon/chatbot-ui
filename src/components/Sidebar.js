import React from "react";
import {
  DiscordIcon,
  ExternalLinkIcon,
  LogOutIcon,
  SunIcon,
} from "../constants";
import BigleaderLogo from "../assets/images/logon_bl.png";
import Genie from "../assets/images/genie.png";

function Sidebar({ show = true }) {
  const navItems = [
    { icon: <ExternalLinkIcon />, text: "Updates & FAQ" },
    { icon: <LogOutIcon />, text: "Log out" },
  ];
  return (
    <div
      className={`${
        show ? "flex flex-col" : "hidden"
      } w-64 h-screen bg-black text-white p-5`}
    >
      {/* Sidebar content goes here */}
      <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
        <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
          <a className="inline-flex text-2xl text-white items-center">
            <img
              src={Genie}
              alt="Bigleader Logo"
              className="p-2 h-full w-10 bg-white rounded-full"
            />
            <span className="text-2xl font-bold ml-4">ESGenie</span>
          </a>
          <div className="flex-col flex-1 overflow-y-auto border-b border-white/20">
            <div className="flex flex-col gap-2 text-gray-100 text-sm">
              {/* 여기에 채팅 목록 등 추가 가능 */}
            </div>
          </div>
          {navItems.map((item, index) => (
            <a
              className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
              key={index}
            >
              {item.icon}
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
