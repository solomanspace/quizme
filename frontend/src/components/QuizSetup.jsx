import { useState } from 'react';

function QuizSetup({ totalQuestions, onSetup, onBack }) {
  const [numQuestions, setNumQuestions] = useState(Math.min(10, totalQuestions));
  const [timeLimit, setTimeLimit] = useState(15);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSetup({
      numQuestions: parseInt(numQuestions),
      timeLimit: parseInt(timeLimit),
    });
  };

  return (
    <div className="max-w-2xl mx-auto fade-in">
      <div className="card">
        <h2 className="text-2xl font-semibold mb-6 text-center">Test Sozlamalari</h2>
        
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">
            <span className="font-medium">Jami savollar soni:</span> {totalQuestions} ta
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nechta savol ishlaysiz?
            </label>
            <input
              type="number"
              min="1"
              max={totalQuestions}
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
              className="input-field"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              1 dan {totalQuestions} tagacha
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vaqt (daqiqalarda)
            </label>
            <input
              type="number"
              min="1"
              max="180"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
              className="input-field"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              1 dan 180 daqiqagacha
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onBack}
              className="btn-secondary flex-1"
            >
              Orqaga
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              Testni Boshlash
            </button>
          </div>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Eslatma:</h3>
          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li>Savollar tasodifiy tartibda beriladi</li>
            <li>Variantlar ham tasodifiy tartibda joylashadi</li>
            <li>Istalgan vaqtda testni tugatishingiz mumkin</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default QuizSetup;
