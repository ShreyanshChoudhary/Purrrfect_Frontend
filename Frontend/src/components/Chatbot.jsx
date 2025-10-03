import React, { useState } from "react";
import Lottie from "react-lottie";
import dogAnimation from "./dog-barking.json";
import "./Chatbot.css";

const Chatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Woof! How can I help you today?", isBot: true }
  ]);
  const [inputText, setInputText] = useState("");
  const [showDog, setShowDog] = useState(false);

  const dogOptions = {
    loop: true,
    autoplay: true,
    animationData: dogAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const toggleChat = (e) => {
    e.preventDefault();
    setChatOpen(!chatOpen);
  };

  const handleDogClick = () => {
    setShowDog(true);
    setTimeout(() => setShowDog(false), 3000); // Hide animation after 3 seconds
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    setMessages([...messages, { text: inputText, isBot: false }]);

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "Woof! I'd love to help with that! 🐾",
        isBot: true
      }]);
      handleDogClick(); // Show dog animation when bot responds
    }, 1000);

    setInputText("");
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-button" onClick={toggleChat}>
        <Lottie options={dogOptions} height={60} width={60} />
      </button>

      {chatOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Pet Chatbot</h3>
            <button className="close-btn" onClick={toggleChat}>X</button>
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
                </div>
              ))}
            </div>

            {/* Dog animation overlay */}
            {showDog && (
              <div className="animation-overlay">
                <Lottie options={dogOptions} height={150} width={150} />
              </div>
            )}

            {/* Chat input form */}
            <form onSubmit={handleSendMessage} className="chat-input-form">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="chat-input"
              />
              <button type="submit" className="send-button">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;