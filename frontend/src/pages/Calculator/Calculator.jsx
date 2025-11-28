import React, { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {
  // Состояния для хранения данных
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Русский язык', score: '', maxScore: 100, isActive: true },
    { id: 2, name: 'Математика', score: '', maxScore: 100, isActive: true },
  ]);

  const [individualAchievements, setIndividualAchievements] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [activeSubjectsCount, setActiveSubjectsCount] = useState(2);

  // Обновление общего балла при изменении данных
  useEffect(() => {
    calculateTotalScore();
  }, [subjects, individualAchievements]);

  // Обработчик изменения балла по предмету
  const handleScoreChange = (id, value) => {
    const newValue = value === '' ? '' : Math.min(Number(value), subjects.find(s => s.id === id).maxScore);

    setSubjects(prev => prev.map(subject =>
      subject.id === id ? { ...subject, score: newValue } : subject
    ));
  };

  // Обработчик активации/деактивации предмета
  const handleSubjectToggle = (id) => {
    setSubjects(prev => prev.map(subject => {
      if (subject.id === id) {
        const newActiveState = !subject.isActive;
        // Если деактивируем предмет, сбрасываем балл
        const newScore = newActiveState ? subject.score : '';
        return { ...subject, isActive: newActiveState, score: newScore };
      }
      return subject;
    }));
  };

  // Добавление пользовательского предмета
  const handleAddCustomSubject = () => {
    const newSubject = {
      id: Date.now(),
      name: 'Новый предмет',
      score: '',
      maxScore: 100,
      isActive: true,
      isCustom: true
    };
    setSubjects(prev => [...prev, newSubject]);
  };

  // Удаление пользовательского предмета
  const handleRemoveCustomSubject = (id) => {
    setSubjects(prev => prev.filter(subject => subject.id !== id));
  };

  // Изменение названия пользовательского предмета
  const handleCustomSubjectNameChange = (id, newName) => {
    setSubjects(prev => prev.map(subject =>
      subject.id === id ? { ...subject, name: newName } : subject
    ));
  };

  // Расчет общего балла
  const calculateTotalScore = () => {
    const activeSubjects = subjects.filter(subject => subject.isActive);
    const subjectsScore = activeSubjects.reduce((sum, subject) => {
      const score = subject.score === '' ? 0 : Number(subject.score);
      return sum + score;
    }, 0);

    const total = subjectsScore + Number(individualAchievements);
    setTotalScore(total);
    setActiveSubjectsCount(activeSubjects.length);
  };

  // Сброс всех данных
  const handleReset = () => {
    setSubjects(prev => prev.map(subject => ({
      ...subject,
      score: '',
      isActive: subject.id <= 2 // Оставляем активными только первые два предмета
    })));
    setIndividualAchievements(0);
  };

  return (
    <div className="calculator">
      <div className="calculator-header">
        <h1>Калькулятор баллов для поступающих в ВУЗ</h1>
        <p>Рассчитайте свой общий балл на основе результатов ЕГЭ и индивидуальных достижений</p>
      </div>

      <div className="calculator-content">
        <div className="subjects-section">
          <h2>Предметы ЕГЭ</h2>
          <div className="subjects-list">
            {subjects.map(subject => (
              <div key={subject.id} className={`subject-item ${subject.isActive ? 'active' : ''}`}>
                <div className="subject-header">
                  <label className="subject-checkbox">
                    <input
                      type="checkbox"
                      checked={subject.isActive}
                      onChange={() => handleSubjectToggle(subject.id)}
                    />
                    <span className="checkmark"></span>
                  </label>

                  {subject.isCustom ? (
                    <input
                      type="text"
                      className="custom-subject-name"
                      value={subject.name}
                      onChange={(e) => handleCustomSubjectNameChange(subject.id, e.target.value)}
                      placeholder="Название предмета"
                    />
                  ) : (
                    <span className="subject-name">{subject.name}</span>
                  )}

                  {subject.isCustom && (
                    <button
                      className="remove-subject-btn"
                      onClick={() => handleRemoveCustomSubject(subject.id)}
                      title="Удалить предмет"
                    >
                      ×
                    </button>
                  )}
                </div>

                {subject.isActive && (
                  <div className="score-input-container">
                    <input
                      type="number"
                      className="score-input"
                      value={subject.score}
                      onChange={(e) => handleScoreChange(subject.id, e.target.value)}
                      placeholder="0"
                      min="0"
                      max={subject.maxScore}
                    />
                    <span className="max-score">/ {subject.maxScore}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button className="add-subject-btn" onClick={handleAddCustomSubject}>
            + Добавить предмет
          </button>
        </div>

        <div className="achievements-section">
          <h2>Индивидуальные достижения</h2>
          <div className="achievement-input">
            <label>Дополнительные баллы (олимпиады, ГТО, волонтерство и т.д.)</label>
            <input
              type="number"
              value={individualAchievements}
              onChange={(e) => setIndividualAchievements(e.target.value)}
              min="0"
              max="10"
              placeholder="0"
            />
            <span className="hint">Максимум 10 баллов</span>
          </div>
        </div>

        <div className="results-section">
          <div className="total-score-card">
            <h3>Общий балл</h3>
            <div className="total-score">{totalScore}</div>
            <div className="score-details">
              <p>Предметы: {activeSubjectsCount}</p>
              <p>Индивидуальные достижения: {individualAchievements}</p>
            </div>
          </div>
        </div>

        <div className="actions-section">
          <button className="reset-btn" onClick={handleReset}>
            Сбросить все
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;