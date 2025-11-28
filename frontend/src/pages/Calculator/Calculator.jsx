import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
    const [scores, setScores] = useState({
        russion: '',
        math: '',
        prof_math: '',
        phys: '',
        inf: '',
        chem: '',
        bio: '',
        hist: '',
        soc: '',
        lit: '',
        eng: '',
        extra_points: 0
    });

    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const subjects = [
        { key: 'russion', label: 'Русский язык' },
        { key: 'math', label: 'Математика' },
        { key: 'prof_math', label: 'Профильная математика' },
        { key: 'phys', label: 'Физика' },
        { key: 'inf', label: 'Информатика' },
        { key: 'chem', label: 'Химия' },
        { key: 'bio', label: 'Биология' },
        { key: 'hist', label: 'История' },
        { key: 'soc', label: 'Обществознание' },
        { key: 'lit', label: 'Литература' },
        { key: 'eng', label: 'Английский язык' }
    ];

    const handleScoreChange = (subject, value) => {
        setScores(prev => ({
            ...prev,
            [subject]: value === '' ? '' : parseInt(value) || 0
        }));
    };

    const calculateTotal = () => {
        let total = 0;
        subjects.forEach(subject => {
            if (scores[subject.key] !== '') {
                total += parseInt(scores[subject.key]) || 0;
            }
        });
        total += parseInt(scores.extra_points) || 0;
        return total;
    };

    const checkEligibleDirections = async () => {
        setLoading(true);

        try {
            // Подготавливаем данные для отправки
            const requestData = { ...scores };
            subjects.forEach(subject => {
                if (requestData[subject.key] === '') {
                    requestData[subject.key] = 0;
                }
            });

            const response = await fetch(`${import.meta.env.VITE_API_URL}calc/calculate/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setResults(result);

        } catch (error) {
            console.error('Error checking eligible directions:', error);
            alert('Произошла ошибка при расчете направлений');
        } finally {
            setLoading(false);
        }
    };

    const getSubjectName = (key) => {
        const subjectMap = {
            'russion': 'Русский язык',
            'math': 'Математика',
            'prof_math': 'Профильная математика',
            'phys': 'Физика',
            'inf': 'Информатика',
            'chem': 'Химия',
            'bio': 'Биология',
            'hist': 'История',
            'soc': 'Обществознание',
            'lit': 'Литература',
            'eng': 'Английский язык'
        };
        return subjectMap[key] || key;
    };

    return (
        <div className="calculator">
            <h2>Калькулятор поступления ВГУ</h2>

            <div className="scores-input">
                {subjects.map(subject => (
                    <div key={subject.key} className="score-field">
                        <label>{subject.label}:</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={scores[subject.key]}
                            onChange={(e) => handleScoreChange(subject.key, e.target.value)}
                            placeholder="0-100"
                        />
                    </div>
                ))}

                <div className="score-field">
                    <label>Дополнительные баллы (до 10):</label>
                    <input
                        type="number"
                        min="0"
                        max="10"
                        value={scores.extra_points}
                        onChange={(e) => handleScoreChange('extra_points', e.target.value)}
                    />
                </div>
            </div>

            <div className="total-section">
                <h3>Общая сумма баллов: {calculateTotal()}</h3>
                <button
                    onClick={checkEligibleDirections}
                    disabled={loading}
                    className="find-button"
                >
                    {loading ? 'Поиск...' : 'Найти направления'}
                </button>
            </div>

            {results && (
                <div className="results">
                    <h3>Найдено направлений: {results.total_found}</h3>
                    <p>Ваш общий балл: <strong>{results.user_total_score}</strong></p>

                    {results.possible_ways.length > 0 ? (
                        <div className="ways-list">
                            {results.possible_ways.map(way => (
                                <div key={way.id} className="way-card">
                                    <h4>{way.title}</h4>
                                    <p><strong>Проходной балл:</strong> {way.required_total_score}</p>

                                    <div className="required-subjects">
                                        <h5>Требуемые предметы:</h5>
                                        {way.required_subjects && way.required_subjects.length > 0 ? (
                                            <ul>
                                                {way.required_subjects.map((subject, index) => (
                                                    <li key={index}>
                                                        {getSubjectName(subject.subject)}:
                                                        требуется {subject.required},
                                                        у вас {subject.user_score}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>Нет специальных требований по предметам</p>
                                        )}
                                    </div>

                                    <p className="way-description">{way.body}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>К сожалению, по вашим баллам не найдено подходящих направлений</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Calculator;