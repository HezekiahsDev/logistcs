"use client";
import React, { useState } from "react";
import {
  Search,
  User,
  Bell,
  UserCircle,
  Folder,
  Building,
  Briefcase,
} from "lucide-react";
import Image from "next/image";

const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { text: string; isUser: boolean }[]
  >([{ text: "Hello! How can I help you today?", isUser: false }]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchQuery);
    setSearchQuery("");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      // Add user message
      setChatMessages([...chatMessages, { text: chatMessage, isUser: true }]);

      // Simulate response (in a real app, this would come from an API)
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            text: "Thanks for your message. Our team will get back to you shortly.",
            isUser: false,
          },
        ]);
      }, 1000);

      setChatMessage("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="w-full md:w-2/3">
          <div className="flex items-center gap-4 mb-6">
            {/* <div className="bg-gray-300 rounded-full px-4 py-2">
              <span className="text-2xl">?</span>
            </div> */}
            <Image src="/Vector.svg" alt="Vector" width={40} height={40} />
            <h1 className="text-5xl font-bold text-[#000000]">Help Center</h1>
          </div>

          <div className="mb-8">
            <p className="mb-2 text-[#64707D]">
              Welcome to our help center; here, you&apos;ll get your answers to
              your issues
            </p>
            <p className="mb-4 text-[#0A0B0A]">
              Our team are working hard on our products to ensure seamless use
              of our product, so feel free to give us your feedback, as your
              feedback will make us perform better, and move forward.
            </p>
          </div>

          <div className="relative mb-10">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search here"
                  className="w-full p-3 pl-4 pr-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-8 rounded-lg shadow flex flex-col items-center">
              <User size={28} className="mb-4" />
              <div className="w-full bg-gray-400 h-8 rounded mt-2"></div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow flex flex-col items-center">
              <Bell size={28} className="mb-4" />
              <div className="w-full bg-gray-400 h-8 rounded mt-2"></div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow flex flex-col items-center">
              <UserCircle size={28} className="mb-4" />
              <div className="w-full bg-gray-400 h-8 rounded mt-2"></div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow flex flex-col items-center">
              <Folder size={28} className="mb-4" />
              <div className="w-full bg-gray-400 h-8 rounded mt-2"></div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow flex flex-col items-center">
              <Building size={28} className="mb-4" />
              <div className="w-full bg-gray-400 h-8 rounded mt-2"></div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow flex flex-col items-center">
              <Briefcase size={28} className="mb-4" />
              <div className="w-full bg-gray-400 h-8 rounded mt-2"></div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-md font-semibold mb-4 text-[#000000]">
              Where to begin?
            </h2>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[#64707D] underline">
                  Getting started
                </a>
              </li>
              <li>
                <a href="#" className="text-[#64707D] underline">
                  Account
                </a>
              </li>
              <li>
                <a href="#" className="text-[#64707D] underline">
                  Wallet
                </a>
              </li>
              <li>
                <a href="#" className="text-[#64707D] underline">
                  Frequently asked Questions
                </a>
              </li>
              <li>
                <a href="#" className="text-[#64707D] underline">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-[#64707D] underline">
                  Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-md font-semibold mb-4 text-[#64707D]">
              Chat with us
            </h2>
            <div className="h-48 overflow-y-auto mb-4 p-2 border rounded-lg">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded-lg max-w-3/4 ${
                    msg.isUser
                      ? "ml-auto bg-green-100 text-right text-white"
                      : "mr-auto bg-[#A5C4D4] text-white"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex">
              <input
                type="text"
                placeholder="Type here..."
                className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#A5C4D4]"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#A5C4D4] text-white px-4 py-2 rounded-r-md"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
