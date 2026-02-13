import { useState, useEffect } from 'react';

function QuizTaking({ questions, config, onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(config.timeLimit * 60); // convert to seconds
  const [showWarning, setShowWarning] = useState(false);

  // Shuffle questions and options
  const [quizQuestions] = useState(() => {
    const shuffledQuestions = [...questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, config.numQuestions)
      .map((q, index) => {
        const options = [
          q.variant1,
          q.variant2,
          q.variant3,
          q.variant4,
        ];
        const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
        
        return {
          ...q,
          id: index + 1,
          options: shuffledOptions,
        };
      });
    return shuffledQuestions;
  });

  // Timer countdown
  useEffect(() => {
    if (timeRemaining <= 0) {
      handleFinish();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answer) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleFinish = () => {
    const unanswered = quizQuestions.length - Object.keys(userAnswers).length;
    
    if (unanswered > 0 && timeRemaining > 0) {
      setShowWarning(true);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    const results = quizQuestions.map((q, index) => ({
      question: q,
      userAnswer: userAnswers[index] || null,
      correctAnswer: q.correctAnswer,
      isCorrect: userAnswers[index] === q.correctAnswer,
    }));
    onComplete(results);
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const answeredCount = Object.keys(userAnswers).length;
  const progress = (answeredCount / quizQuestions.length) * 100;

  return (
    <div className="max-w-6xl mx-auto fade-in">
      {/* Header with Timer */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className={`text-2xl font-bold ${timeRemaining < 60 ? 'text-red-600' : 'text-primary'}`}>
            {formatTime(timeRemaining)}
          </div>
          {timeRemaining < 60 && (
            <span className="text-sm text-red-600">Vaqt tugayapti!</span>
          )}
        </div>

        <div className="text-sm text-gray-600">
          Javob berildi: {answeredCount} / {quizQuestions.length}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question Navigation */}
        <div className="lg:col-span-1">
          <div className="card sticky top-4">
            <h3 className="font-semibold mb-4 text-center">Savollar</h3>
            <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
              {quizQuestions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(index)}
                  className={`question-number ${
                    userAnswers[index]
                      ? 'question-answered'
                      : 'question-unanswered'
                  } ${
                    index === currentQuestionIndex
                      ? 'ring-2 ring-offset-2 ring-primary'
                      : ''
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-2 text-center">
                {Math.round(progress)}% bajarildi
              </p>
            </div>

            <button
              onClick={handleFinish}
              className="w-full mt-4 btn-primary"
            >
              Testni Tugatish
            </button>
          </div>
        </div>

        {/* Current Question */}
        <div className="lg:col-span-3">
          <div className="card slide-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-500">
                Savol {currentQuestionIndex + 1} / {quizQuestions.length}
              </h3>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-medium text-primary mb-6">
                {currentQuestion.question}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className={`quiz-option ${
                      userAnswers[currentQuestionIndex] === option
                        ? 'quiz-option-selected'
                        : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center mr-3 font-medium">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-left">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Oldingi
              </button>

              <button
                onClick={handleNext}
                disabled={currentQuestionIndex === quizQuestions.length - 1}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Keyingi →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4 shadow-2xl">
            <h3 className="text-xl font-semibold mb-4">Ogohlantirish</h3>
            <p className="text-gray-700 mb-6">
              {quizQuestions.length - answeredCount} ta savolga javob bermagansiz. 
              Rostdan ham tugatmoqchimisiz?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowWarning(false)}
                className="btn-secondary flex-1"
              >
                Bekor qilish
              </button>
              <button
                onClick={completeQuiz}
                className="btn-primary flex-1"
              >
                Ha, tugatish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizTaking;
