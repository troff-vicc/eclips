import React, { useState, useRef, useEffect } from 'react';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Функция для ответа бота
  const handleBotResponse = () => {
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: "Здравствуйте, чем могу помочь?", isUser: false }
      ]);
    }, 1000); // Задержка 1 секунда для имитации "печатания" бота
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, isUser: true }]);
      setInputValue('');
      // Вызываем ответ бота после отправки сообщения пользователем
      handleBotResponse();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <header className="header1">
        <div className="header-container">
          <a href="/"><img src="./logo.png" alt="Логотип" className="logo" /></a>
          <nav className="nav">
            <a className="but_header" href="/university">Университет</a>
            <a className="but_header" href="/education">Образование</a>
            <a className="but_header" href="/science">Наука</a>
            <a className="but_header" href="/library">Библиотека</a>
          </nav>
        </div>
      </header>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Введите сообщение..."
          className="message-input"
        />
        <button onClick={handleSend} className="send-button">
          Отправить
        </button>
      </div>
    </div>
  );
};

export default Chat;