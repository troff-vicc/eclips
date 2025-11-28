import React from 'react';
import './Admission.css';

const Admission = () => {
  return (
    <div className="admission-container">
      {/* Первое фото во весь экран */}
      <section className="fullscreen-photo">
        <img
          src="./2.png"
          alt="Main banner"
          className="fullscreen-image"
        />
      </section>

      {/* Второе фото */}
      <section className="second-photo">
        <img
          src="./3.png"
          alt="Secondary content"
          className="second-image"
        />
      </section>
    </div>
  );
};

export default Admission;