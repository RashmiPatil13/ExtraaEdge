import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";
import "./Chatbot.css";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! How can I assist you today?",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY || "",
      });

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: inputValue,
      });

      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: response.text || "I couldn't understand that.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      const errorResponse = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, something went wrong.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-container">
      {isOpen && (
        <div className="chat-box">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-title">
              <MessageCircle size={20} />
              <span>AI Chatbot</span>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="chat-body">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.sender === "user" ? "user" : "bot"}`}
              >
                {msg.sender === "bot" && (
                  <div className="bot-icon">
                    <Bot size={18} />
                  </div>
                )}

                <div className="message-content">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                  <div className="timestamp">{msg.timestamp}</div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message bot">
                <div className="bot-icon">
                  <Bot size={18} />
                </div>
                <div className="typing">Typing...</div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <form onSubmit={handleSendMessage} className="chat-footer">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Write your message..."
            />
            <button type="submit">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button className="chat-launcher" onClick={() => setIsOpen(true)}>
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
}
