"use client";

import React, { useState, useEffect } from "react";

const PortfolioAssistant: React.FC = () => {
  const [threadId, setThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<
    Array<{ role: string; content: string }>
  >([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Create a thread when the component mounts
    createThread();
  }, []);

  const createThread = async () => {
    const response = await fetch("/api/portfolio-assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "create_thread" }),
    });
    const data = await response.json();
    setThreadId(data.thread_id);
  };

  const sendMessage = async () => {
    if (!threadId || !input) return;

    setMessages([...messages, { role: "user", content: input }]);
    setInput("");

    const response = await fetch("/api/portfolio-assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "send_message",
        threadId,
        message: input,
      }),
    });
    const data = await response.json();
    setMessages([
      ...messages,
      { role: "user", content: input },
      { role: "assistant", content: data.response },
    ]);
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about my portfolio..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default PortfolioAssistant;
