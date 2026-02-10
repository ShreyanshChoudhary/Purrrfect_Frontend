import React, { useState, useRef, useEffect } from "react";
import Lottie from "react-lottie";
import dogAnimation from "./dog-barking.json";
import "./Chatbot.css";

const Chatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Woof! How can I help you today? 🐾", isBot: true }
  ]);
  const [inputText, setInputText] = useState("");
  const [showDog, setShowDog] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const BASE_URL = "http://localhost:8081"; // Your Spring Boot backend

  const dogOptions = {
    loop: true,
    autoplay: true,
    animationData: dogAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (chatOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [chatOpen]);

  const toggleChat = (e) => {
    e.preventDefault();
    setChatOpen(!chatOpen);
  };

  const handleDogClick = () => {
    setShowDog(true);
    setTimeout(() => setShowDog(false), 3000);
  };

  // Call Spring Boot backend for raw responses
  const getBotResponse = async (userMessage) => {
    try {
      const response = await fetch(`${BASE_URL}/api/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error calling chatbot API:', error);
      return "Woof! I'm having trouble connecting right now. Please try again later! 🐾";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = inputText.trim();
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInputText("");
    setIsTyping(true);

    try {
      // Get response from backend
      const botResponse = await getBotResponse(userMessage);
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
      handleDogClick();
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "Sorry, I encountered an error. Please try again.", 
        isBot: true 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage(e);
    }
  };

  const quickReplies = [
    "What pets are available?",
    "How much does adoption cost?",
    "What's the adoption process?",
    "Tell me about dogs"
  ];

  const handleQuickReply = async (reply) => {
    setInputText(reply);
    
    // Add user message
    setMessages(prev => [...prev, { text: reply, isBot: false }]);
    setInputText("");
    setIsTyping(true);

    try {
      // Get response from backend
      const botResponse = await getBotResponse(reply);
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
      handleDogClick();
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "Sorry, I encountered an error. Please try again.", 
        isBot: true 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-button" onClick={toggleChat}>
        <Lottie options={dogOptions} height={60} width={60} />
        <span className="chatbot-pulse"></span>
      </button>

      {chatOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <h3>BOLT</h3>
              <span className="status-indicator">Online</span>
            </div>
            <button className="close-btn" onClick={toggleChat} aria-label="Close chat">
              ×
            </button>
          </div>
          
          <div className="chatbot-body">
            {/* Messages container */}
            <div className="messages-container">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.isBot ? 'bot' : 'user'}`}
                >
                  {message.text}
                  {message.isBot && (
                    <div className="message-time">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="message bot typing">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies for new users */}
            {messages.length <= 1 && (
              <div className="quick-replies">
                <p>Quick questions:</p>
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    className="quick-reply-btn"
                    onClick={() => handleQuickReply(reply)}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Dog animation overlay */}
            {showDog && (
              <div className="animation-overlay">
                <Lottie options={dogOptions} height={150} width={150} />
              </div>
            )}

            {/* Chat input form */}
            <form onSubmit={handleSendMessage} className="chat-input-form">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="chat-input"
              />
              <button 
                type="submit" 
                className="send-button"
                disabled={!inputText.trim() || isTyping}
              >
                {isTyping ? "..." : "➤"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;