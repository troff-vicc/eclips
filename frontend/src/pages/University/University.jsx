import React, { useState, useEffect } from 'react';
import './University.css';

const University = () => {
  return (
    <div className="home">
      <header className="header">
        <div className="header-container">
          <a href="/"><img src="./logo.png" alt="Логотип" className="logo" /></a>
          <nav className="nav">
            <a className="but_header" href="/university" id='univerchek'>Университет</a>
            <a className="but_header" href="/education">Образование</a>
            <a className="but_header" href="/science">Наука</a>
            <a className="but_header" href="/library">Библиотека</a>
          </nav>
        </div>
      </header>

      <section className="hero1">
        <div className="hero-content">
          <div className="hero-text">
            <h1 id='mice'>Университет</h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default University;