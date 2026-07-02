import { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const INITIAL_MESSAGE = {
  id: 'msg-0',
  sender: 'bot',
  text: 'Hello! I am Phantom Assistant. How can I help you today?',
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleToggle = () => {
    if (!isOpen && !hasOpened) {
      setHasOpened(true);
      setIsLoading(true);
      setMessages([]);
      setTimeout(() => {
        setIsLoading(false);
        setMessages([INITIAL_MESSAGE]);
      }, 1200);
    }
    setIsOpen((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    const newUserMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      
      const newBotMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'bot',
        text: data.reply || 'I received your message, but the response was empty.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages((prev) => [...prev, newBotMsg]);
    } catch (error) {
      const errorMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'bot',
        text: 'Sorry, I am having trouble connecting to the server right now. Please make sure the backend is running.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-wrapper">
      {/* Floating Action Button */}
      <button 
        className={`chatbot-fab ${isOpen ? 'chatbot-fab--hidden' : ''}`} 
        onClick={handleToggle}
        aria-label="Open chat assistant"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'chatbot-window--open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-header__info">
            <div className="chatbot-header__avatar">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                <circle cx="12" cy="5" r="2"></circle>
                <path d="M12 7v4"></path>
                <line x1="8" y1="16" x2="8" y2="16"></line>
                <line x1="16" y1="16" x2="16" y2="16"></line>
              </svg>
            </div>
            <div>
              <h3 className="chatbot-header__title">Phantom Assistant</h3>
              <span className="chatbot-header__status">Online</span>
            </div>
          </div>
          <button className="chatbot-header__close" onClick={handleToggle} aria-label="Close chat">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="chatbot-messages">
          {isLoading ? (
            <div className="chatbot-skeleton">
              <div className="chatbot-skeleton__row chatbot-skeleton__row--bot">
                <div className="chatbot-skeleton__bubble" style={{ width: '72%' }} />
              </div>
              <div className="chatbot-skeleton__row chatbot-skeleton__row--bot">
                <div className="chatbot-skeleton__bubble" style={{ width: '48%' }} />
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`chat-bubble-wrapper ${msg.sender === 'user' ? 'chat-bubble-wrapper--user' : 'chat-bubble-wrapper--bot'}`}>
                <div className={`chat-bubble ${msg.sender === 'user' ? 'chat-bubble--user' : 'chat-bubble--bot'}`}>
                  {msg.text}
                </div>
                <span className="chat-timestamp">{msg.timestamp}</span>
              </div>
            ))
          )}
          
          {isTyping && (
            <div className="chat-bubble-wrapper chat-bubble-wrapper--bot">
              <div className="chat-bubble chat-bubble--bot chat-bubble--typing">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chatbot-input-area" onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="chatbot-input" 
            placeholder="Ask anything..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button 
            type="submit" 
            className="chatbot-send-btn" 
            disabled={!inputValue.trim() || isTyping}
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
