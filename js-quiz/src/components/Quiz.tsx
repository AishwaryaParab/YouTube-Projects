import React, { useState } from 'react';
import { questions, Question as QuestionType } from '../utils/questions';
import Question from './Question';
import Timer from './Timer';

const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const currentQuestion: QuestionType = questions[currentQuestionIndex];

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === currentQuestion.answer) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedOption(null);
      setTimeLeft(60);
    } else {
      setShowScore(true);
    }
  };

  const handleTimeUp = () => {
    handleNextQuestion();
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowScore(false);
    setTimeLeft(60);
  };

  return (
    <div className="container">
      {showScore ? (
        <div>
          <div className="score">Your Score: {score} / {questions.length}</div>
          <button onClick={handleRestart}>Restart Quiz</button>
        </div>
      ) : (
        <div>
          <Question
            question={currentQuestion}
            selectedOption={selectedOption}
            onOptionChange={handleOptionChange}
          />
          <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} onTimeUp={handleTimeUp} />
          <button onClick={handleNextQuestion} disabled={!selectedOption}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;