import { useState } from 'react';

function QuizResults({ questions, answers, config, onRestart }) {
  const [filter, setFilter] = useState('all'); // all, correct, incorrect

  const correctCount = answers.filter((a) => a.isCorrect).length;
  const incorrectCount = answers.filter((a) => !a.isCorrect && a.userAnswer).length;
  const unansweredCount = answers.filter((a) => !a.userAnswer).length;
  const totalQuestions = answers.length;
  const percentage = ((correctCount / totalQuestions) * 100).toFixed(1);

  const filteredAnswers = answers.filter((answer) => {
    if (filter === 'correct') return answer.isCorrect;
    if (filter === 'incorrect') return !answer.isCorrect && answer.userAnswer;
    return true;
  });

  const getResultColor = () => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getResultMessage = () => {
    if (percentage >= 80) return 'Ajoyib natija! 🎉';
    if (percentage >= 60) return 'Yaxshi natija! 👍';
    if (percentage >= 40) return 'Yaxshi harakat! 💪';
    return 'Ko\'proq mashq qiling! 📚';
  };

  return (
    <div className="max-w-4xl mx-auto fade-in">
      {/* Results Summary */}
      <div className="card mb-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">Test Natijalari</h2>
          <p className="text-gray-600">{getResultMessage()}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600 mb-1">Jami</p>
            <p className="text-3xl font-bold text-blue-600">{totalQuestions}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600 mb-1">To'g'ri</p>
            <p className="text-3xl font-bold text-green-600">{correctCount}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600 mb-1">Noto'g'ri</p>
            <p className="text-3xl font-bold text-red-600">{incorrectCount}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600 mb-1">Javob berilmagan</p>
            <p className="text-3xl font-bold text-gray-600">{unansweredCount}</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 text-white text-center">
          <p className="text-sm mb-2">Umumiy natija</p>
          <p className="text-5xl font-bold">{percentage}%</p>
        </div>

        <div className="mt-6 flex gap-4">
          <button onClick={onRestart} className="btn-primary flex-1">
            Qaytadan Boshlash
          </button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="card mb-6">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Hammasi ({totalQuestions})
          </button>
          <button
            onClick={() => setFilter('correct')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'correct'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            To'g'ri ({correctCount})
          </button>
          <button
            onClick={() => setFilter('incorrect')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'incorrect'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Noto'g'ri ({incorrectCount})
          </button>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="space-y-4">
        {filteredAnswers.map((answer, index) => (
          <div
            key={index}
            className={`card ${
              answer.isCorrect
                ? 'border-l-4 border-green-500'
                : answer.userAnswer
                ? 'border-l-4 border-red-500'
                : 'border-l-4 border-gray-400'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-lg flex-1">
                {answer.question.id}. {answer.question.question}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  answer.isCorrect
                    ? 'bg-green-100 text-green-700'
                    : answer.userAnswer
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {answer.isCorrect
                  ? '✓ To\'g\'ri'
                  : answer.userAnswer
                  ? '✗ Noto\'g\'ri'
                  : '○ Javob berilmagan'}
              </span>
            </div>

            <div className="space-y-2">
              {answer.userAnswer && !answer.isCorrect && (
                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600">Sizning javobingiz:</p>
                  <p className="font-medium text-red-700">{answer.userAnswer}</p>
                </div>
              )}

              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">To'g'ri javob:</p>
                <p className="font-medium text-green-700">{answer.correctAnswer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* History Note */}
      <div className="card mt-6 bg-blue-50 border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Eslatma:</strong> Bu natijalar faqat joriy sessiya uchun ko'rsatiladi. 
          Sahifani yangilasangiz yoki chiqsangiz, natijalar yo'qoladi.
        </p>
      </div>
    </div>
  );
}

export default QuizResults;
