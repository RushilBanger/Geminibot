// components/ChatAI.jsx
"use client"
import { useState, useRef, useEffect } from "react";

export default function ChatAI() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! Create your itinerary here." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contents: input }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [...prev, { sender: "ai", text: data.result }]);
      } else {
        setMessages((prev) => [...prev, { sender: "ai", text: "Error: " + data.error }]);
      }
    } catch {
      setMessages((prev) => [...prev, { sender: "ai", text: "Network error." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[70vh] w-[80vw] mx-auto border border-gray-300 rounded shadow-md overflow-hidden">
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex mb-4 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-orange-600 text-white"
                  : "bg-orange-300 text-gray-900 border border-gray-300"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="p-4 bg-white border-t border-gray-300">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex"
        >
          <textarea
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            rows="1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="ml-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:bg-orange-400"
            disabled={loading}
          >
            {loading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
