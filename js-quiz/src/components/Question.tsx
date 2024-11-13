import React from 'react';
import { Question as QuestionType } from '../utils/questions';

interface QuestionProps {
  question: QuestionType;
  selectedOption: string | null;
  onOptionChange: (option: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, selectedOption, onOptionChange }) => {
  return (
    <div>
      <div className="question">{question.question}</div>
      <div>
        {question.options.map((option) => (
          <div key={option} className="option">
            <label>
              <input
                type="radio"
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={() => onOptionChange(option)}
              />
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;