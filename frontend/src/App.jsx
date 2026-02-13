import { useState } from 'react';
import FileUpload from './components/FileUpload';
import QuizSetup from './components/QuizSetup';
import QuizTaking from './components/QuizTaking';
import QuizResults from './components/QuizResults';

function App() {
  const [step, setStep] = useState('upload'); // upload, setup, quiz, results
  const [questions, setQuestions] = useState([]);
  const [quizConfig, setQuizConfig] = useState(null);
  const [answers, setAnswers] = useState({});

  const handleFileProcessed = (processedQuestions) => {
    setQuestions(processedQuestions);
    setStep('setup');
  };

  const handleQuizSetup = (config) => {
    setQuizConfig(config);
    setStep('quiz');
  };

  const handleQuizComplete = (userAnswers) => {
    setAnswers(userAnswers);
    setStep('results');
  };

  const handleRestart = () => {
    setStep('upload');
    setQuestions([]);
    setQuizConfig(null);
    setAnswers({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-primary">QuizMe</h1>
          <p className="text-sm text-gray-600 mt-1">O'z bilimingizni sinab ko'ring</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {step === 'upload' && <FileUpload onFileProcessed={handleFileProcessed} />}
        {step === 'setup' && (
          <QuizSetup
            totalQuestions={questions.length}
            onSetup={handleQuizSetup}
            onBack={() => setStep('upload')}
          />
        )}
        {step === 'quiz' && (
          <QuizTaking
            questions={questions}
            config={quizConfig}
            onComplete={handleQuizComplete}
          />
        )}
        {step === 'results' && (
          <QuizResults
            questions={questions}
            answers={answers}
            config={quizConfig}
            onRestart={handleRestart}
          />
        )}
      </main>

      <footer className="mt-16 py-6 border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>QuizMe &copy; 2026 - Barcha huquqlar himoyalangan</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
