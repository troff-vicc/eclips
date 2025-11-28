import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [newsData, setNewsData] = useState({
    mainNews: {},
    sideNews: [
    ]
  });

  useEffect(()=>{
    async function fetchData(){
      console.log(import.meta.env.VITE_API_URL)
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}news/`)
        if(!response.ok){
          throw new error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);

        if (result.length > 0) {
        setNewsData({
          mainNews: result[0],
          sideNews: result.slice(1)
        });
      }
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    }
    fetchData();

  },[]);

  console.log(data[0]);
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };


  // Данные для блоков с фото
  const featureBlocks = [
    {
      id: 1,
      image: './f1.png',
      text: 'text1',
      title: 'Качественное образование'
    },
    {
      id: 2,
      image: './f2.png',
      text: 'text2',
      title: 'Современные лаборатории'
    },
    {
      id: 3,
      image: './f3.png',
      text: 'text3',
      title: 'Международное сотрудничество'
    },
    {
      id: 4,
      image: './f4.png',
      text: 'text4',
      title: 'Научные достижения'
    }
  ];



  return (
    <div className="home">
      <header className="header">
        <div className="header-container">
          <img src="./logo.png" alt="Логотип" className="logo" />
          <nav className="nav">
            <a className="but_header" href="/university">Университет</a>
            <a className="but_header" href="/education">Образование</a>
            <a className="but_header" href="/science">Наука</a>
            <a className="but_header" href="/library">Библиотека</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>ВГУ</h1>
            <a href="/admission" className="admission-btn">Поступающим</a>
          </div>
        </div>
      </section>

      {/* Новый раздел с блоками */}
      <section className="features">
        <div className="features-container">
          <h2 className="features-title">Наши преимущества</h2>
          <div className="features-grid">
            {featureBlocks.map(feature => (
              <div key={feature.id} className="feature-card">
                <div className="feature-image">
                  <img src={feature.image} alt={feature.title} />
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-text">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="news">
        <div className="news-container">
          <h2 className="news-title">Новости</h2>
          <div className="news-grid">
            <div className="main-news">
              <div className="news-image">
                <img src={newsData.mainNews.img_path} alt={newsData.mainNews.title} />
              </div>
              <div className="news-content">
                <h3 className="news-headline">{newsData.mainNews.title}</h3>
                <span className="news-date">{newsData.mainNews.body}</span>
              </div>
            </div>

            <div className="side-news">
              {newsData.sideNews.map(news => (
                <div key={news.id} className="side-news-item">
                  <span className="side-news-date">{news.body}</span>
                  <h4 className="side-news-title">{news.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className={`chat-widget ${isChatOpen ? 'chat-open' : ''}`}>
        <button className="chat-toggle" onClick={toggleChat}>
          Чат
        </button>
        {isChatOpen && (
          <div className="chat-container1">
            <div className="chat-placeholder">
              <div className="chat-messages">
                <div id="msg">
                    <p>Добро пожаловать в чат ВГУ!</p>
                    <p>Задайте ваш вопрос...</p>
                </div>
              </div>
              <div className="chat-input">
                <input type="text" placeholder="Введите сообщение..." />
                <a href="/chat"><button>Отправить</button></a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;