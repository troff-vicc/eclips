import React, { useState, useRef, useEffect } from 'react';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  // Авто-скролл к последнему сообщению
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Начальное приветственное сообщение
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: 'Здравствуйте! Я виртуальный помощник Воронежского государственного университета. Чем могу помочь?',
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}chat/send-message/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка сети');
      }

      const result = await response.json();

      if (result.success) {
        const botMessage = {
          id: Date.now() + 1,
          text: result.response,
          isUser: false,
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(result.error || 'Неизвестная ошибка');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.');

      // Добавляем сообщение об ошибке
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Извините, произошла ошибка. Пожалуйста, попробуйте позже.',
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: 'Здравствуйте! Я виртуальный помощник Воронежского государственного университета. Чем могу помочь?',
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
    setError('');
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
      <section className="main" id='disk'>
      <div className="chat-header">
        <h3>Чат-бот ВГУ</h3>
        <button onClick={clearChat} className="clear-btn">
          Очистить чат
        </button>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.isUser ? 'user-message' : 'bot-message'} ${
              message.isError ? 'error-message' : ''
            }`}
          >
            <div className="message-content">
              <p>{message.text}</p>
              <span className="timestamp">{message.timestamp}</span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message bot-message">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="error-alert">
          {error}
        </div>
      )}

      <form onSubmit={sendMessage} className="message-form">
        <div className="input-container">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Введите ваш вопрос..."
            disabled={isLoading}
            className="message-input"
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="send-button"
          >
            {isLoading ? 'Отправка...' : 'Отправить'}
          </button>
        </div>
      </form>
      </section>
    </div>
  );
};

export default Chat;