"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, Download } from "lucide-react";

export interface AssistantProps {
  threadId: string | null;
  createThread: () => Promise<void>;
}

interface ResumeSection {
  section_name: string;
  content: Record<string, any> | Array<Record<string, any>>;
}

interface AssistantResponse {
  main_response: string;
  relevant_sections: ResumeSection[];
  follow_up_questions: string[];
}

interface Message {
  role: string;
  content: string | AssistantResponse;
}

const ResumeAssistant: React.FC = () => {
  const [threadId, setThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    createThread();
  }, []);

  useEffect(() => {}, [messages]);

  const createThread = async () => {
    const response = await fetch("/api/portfolio-assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "create_thread" }),
    });
    const data = await response.json();
    setThreadId(data.thread_id);
  };

  const sendMessage = async (messageText: string) => {
    if (!threadId || !messageText) return;

    setIsLoading(true);
    setMessages([...messages, { role: "user", content: messageText }]);
    setInput("");

    try {
      const response = await fetch("/api/portfolio-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "send_message",
          threadId,
          message: messageText,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      console.log("Raw response from backend:", responseText);

      if (!responseText) {
        throw new Error("Empty response from server");
      }

      let data: AssistantResponse;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        throw new Error("Invalid JSON response from server");
      }

      console.log("Parsed data from backend:", data);

      if (!data.main_response) {
        throw new Error("Missing 'main_response' field in server response");
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: data },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderContent = (content: any): React.ReactNode => {
    if (typeof content === "string") {
      return <p className="mb-2">{content}</p>;
    } else if (Array.isArray(content)) {
      return (
        <ul className="list-disc list-inside space-y-4">
          {content.map((item, index) => (
            <li key={index} className="mb-4">
              {typeof item === "object" ? (
                <div className="ml-4 space-y-2">
                  {Object.entries(item).map(([key, value], i) => (
                    <div key={i} className="mb-2">
                      <span className="font-medium text-gray-300">
                        {capitalizeFirstLetter(key)}:{" "}
                      </span>
                      {renderContent(value)}
                    </div>
                  ))}
                </div>
              ) : (
                renderContent(item)
              )}
            </li>
          ))}
        </ul>
      );
    } else if (typeof content === "object" && content !== null) {
      return (
        <div className="space-y-4">
          {Object.entries(content).map(([key, value], index) => (
            <div key={index} className="mb-4">
              <h4 className="font-semibold text-gray-200 mb-2">
                {capitalizeFirstLetter(key)}
              </h4>
              <div className="ml-4">{renderContent(value)}</div>
            </div>
          ))}
        </div>
      );
    }
    return <p className="mb-2">{String(content)}</p>;
  };

  const renderAssistantResponse = (content: string | AssistantResponse) => {
    if (typeof content === "string") {
      return <p>{content}</p>;
    }

    return (
      <div className="space-y-4">
        <div>{content.main_response}</div>
        {content.relevant_sections && content.relevant_sections.length > 0 && (
          <div className="mt-4 text-sm text-gray-400">
            <h3 className="font-semibold text-gray-200 mb-2">
              Relevant Sections:
            </h3>
            {content.relevant_sections.map((section, index) => (
              <div key={index} className="mb-6 bg-gray-800 p-4 rounded-lg">
                <h4 className="font-medium text-gray-200 mb-2">
                  {section.section_name}
                </h4>
                <div className="ml-4">{renderContent(section.content)}</div>
              </div>
            ))}
          </div>
        )}
        {content.follow_up_questions &&
          content.follow_up_questions.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {content.follow_up_questions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(question)}
                  className="text-xs bg-gray-700 text-gray-200 px-3 py-1 rounded-full hover:bg-gray-600 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          )}
      </div>
    );
  };

  const handleDownloadResume = () => {
    const resumeUrl = "/Arek_Halpern_Resume_2024.pdf";
    window.open(resumeUrl, "_blank");
  };

  return (
    <div className="flex flex-col h-[calc(80vh-2rem)] bg-gray-950 text-gray-200 border border-gray-800 rounded-lg">
      <div className="flex items-center justify-between p-3 border-b border-gray-800">
        <div className="flex items-center flex-grow">
          <Bot className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">Resume Assistant</span>
        </div>
        <button
          onClick={handleDownloadResume}
          className="flex items-center text-xs bg-gray-700 text-gray-200 px-3 py-1 rounded-full hover:bg-gray-600 transition-colors ml-2"
        >
          <Download className="w-4 h-4 mr-1" />
          Download Resume
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-gray-800 text-gray-200"
                  : "bg-gray-900 text-gray-200"
              }`}
            >
              {typeof msg.content === "string" ? (
                <p>{msg.content}</p>
              ) : (
                renderAssistantResponse(msg.content)
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="p-3 border-t border-gray-800"
      >
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about my portfolio..."
            className="flex-1 p-2 bg-gray-900 text-gray-200 border border-gray-800 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gray-700"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="border border-gray-600 text-gray-200 p-2 rounded-r-md hover:bg-gray-700 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-200"></div>
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumeAssistant;
