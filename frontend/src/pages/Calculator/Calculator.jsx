import React, { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Русский язык', score: '', maxScore: 100, isActive: true },
    { id: 2, name: 'Математика', score: '', maxScore: 100, isActive: true },
  ]);

  const [individualAchievements, setIndividualAchievements] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [activeSubjectsCount, setActiveSubjectsCount] = useState(2);
  const [eligibleDirections, setEligibleDirections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Функция для отправки запроса на сервер
  async function checkEligibleDirections(totalScore) {
    console.log(import.meta.env.VITE_API_URL);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}calc/check_eligible/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          body: totalScore
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);
      return result;

    } catch (error) {
      console.error('Error checking eligible directions:', error);
      throw error;
    }
  }

  // Обновление общего балла при изменении данных
  useEffect(() => {
    calculateTotalScore();
  }, [subjects, individualAchievements]);

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

  // Проверка доступных направлений
  const handleCheckDirections = async () => {
    if (totalScore === 0) {
      setError('Введите баллы по предметам');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await checkEligibleDirections(totalScore);
      setEligibleDirections(result.eligible_directions || []);
    } catch (err) {
      setError('Ошибка при получении данных с сервера');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

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

  // Сброс всех данных
  const handleReset = () => {
    setSubjects(prev => prev.map(subject => ({
      ...subject,
      score: '',
      isActive: subject.id <= 2
    })));
    setIndividualAchievements(0);
    setEligibleDirections([]);
    setError('');
  };

  return (
    <div className="calculator">
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
      <div className="calculator-header">
        <h1>Калькулятор баллов для поступающих в ВУЗ</h1>
        <p>Рассчитайте свой общий балл и узнайте доступные направления</p>
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
            <button
              className={`check-directions-btn ${loading ? 'loading' : ''}`}
              onClick={handleCheckDirections}
              disabled={loading || totalScore === 0}
            >
              {loading ? 'Загрузка...' : 'Проверить направления'}
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {eligibleDirections.length > 0 && (
          <div className="directions-section">
            <h2>Доступные направления ({eligibleDirections.length})</h2>
            <div className="directions-list">
              {eligibleDirections.map(direction => (
                <div key={direction.id} className="direction-card">
                  <h3 className="direction-title">{direction.title}</h3>
                  <div className="direction-scores">
                    <div className="direction-total">
                      Проходной балл: <strong>{direction.body}</strong>
                    </div>
                    <div className="subject-requirements">
                      {direction.russion > 0 && <span>Русский: {direction.russion}</span>}
                      {direction.math > 0 && <span>Математика: {direction.math}</span>}
                      {direction.phys > 0 && <span>Физика: {direction.phys}</span>}
                      {direction.inf > 0 && <span>Информатика: {direction.inf}</span>}
                      {direction.chem > 0 && <span>Химия: {direction.chem}</span>}
                      {direction.bio > 0 && <span>Биология: {direction.bio}</span>}
                      {direction.hist > 0 && <span>История: {direction.hist}</span>}
                      {direction.soc > 0 && <span>Обществознание: {direction.soc}</span>}
                      {direction.lit > 0 && <span>Литература: {direction.lit}</span>}
                      {direction.eng > 0 && <span>Английский: {direction.eng}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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