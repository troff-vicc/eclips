import React from 'react';
import './Admission.css';

const Admission = () => {

    const advantages = [
    {
      id: 1,
      title: "Информация о приеме на программы бакалавриата, специалитета, магистратуры",
      image: "./p1.png"
    },
    {
      id: 2,
      title: "Информация о приеме в аспирантуру",
      image: "./p2.png"
    },
    {
      id: 3,
      title: "Информация о приеме в ординатуру",
      image: "./p3.png"
    },
    {
      id: 4,
      title: "Подготовка к поступлению",
      image: "./p4.png"
    },
    {
      id: 5,
      title: "Сведения о зачислении",
      image: "./p5.png"
    },
    {
      id: 6,
      title: "Контакты",
      image: "./p6.png"
    }
  ];

  return (
    <div className="admission-container">
    <header className="header">
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
      {/* Первое фото во весь экран с текстом поверх */}
      <section className="fullscreen-photo">
        <img
          src="./2.png"
          alt="Main banner"
          className="fullscreen-image"
        />
        <div className="text-overlay">
          <div className="event-title">День открытых дверей</div>
            <div className="day-number"><p>25</p></div>
            <div className="month-name">ЯНВАРЯ</div>
        </div>
      </section>

      {/* Второе фото */}
      <section className="second-photo">
        <img
          src="./3.png"
          alt="Secondary content"
          className="second-image"
        />
        <div className="blocks-overlay">
          {/* Левый блок - Расчет шансов */}
          <div className="chance-block">
            <h3 className="chance-title">Рассчитай свои шансы на поступление</h3>
            <p className="chance-description">
              введи баллы ЕГЭ и посмотри, на какие факультеты ты можешь потупить
            </p>
            <a href="/calculator"><button className="calculate-btn">
              РАССЧИТАТЬ
            </button></a>
          </div>

          {/* Правый блок - ИИ-помощник */}
          <div className="ai-block">
            <h3 className="ai-title">ИИ-помощник</h3>
            <p className="ai-description">
              проконсультирует по поступлению и поможет на каждом этапе поступления: от выбора вуза до подачи документов
            </p>
            <a href="/chat"><div className="desktop-badge">
              НАПИСАТЬ
            </div></a>
          </div>
        </div>
      </section>

      <section className="advantages-section">
        <div className="advantages-container">
          {advantages.map((advantage) => (
            <div key={advantage.id} className="advantage-card">
              <img
                src={advantage.image}
                alt={advantage.title}
                className="advantage-image"
              />
              <div className="advantage-overlay">
                <h3 className="advantage-title">{advantage.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Admission;