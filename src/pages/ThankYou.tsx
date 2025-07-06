import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import '../components/FinancialSurveyForm.css';

const ThankYou = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    // Set a flag to prevent resubmission
    sessionStorage.setItem('surveySubmitted', 'true');
    navigate('/', { replace: true, state: { goToIntro: true } });
  };

  // Bubble configs for animated background
  const bubbleConfigs = React.useMemo(() =>
    Array.from({ length: 14 }).map((_, i) => {
      const size = 30 + Math.random() * 90;
      const left = Math.random() * 100;
      const color = [
        'bubble-yellow',
        'bubble-lightyellow',
        'bubble-verylightyellow',
        'bubble-white'
      ][i % 4];
      const opacity = 0.3 + Math.random() * 0.5;
      const duration = 8 + Math.random() * 6; // 8-14s
      const delay = -(Math.random() * duration);
      return { left, size, color, opacity, duration, delay, i };
    }),
  []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 py-12 relative overflow-hidden">
      {/* Animated bubbles background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {bubbleConfigs.map(bubble => (
          <div
            key={bubble.i}
            className={`bubble absolute rounded-full ${bubble.color}`}
            style={{
              left: `${bubble.left}%`,
              width: bubble.size,
              height: bubble.size,
              opacity: bubble.opacity,
              bottom: 0,
              animationDuration: `${bubble.duration}s`,
              animationDelay: `${bubble.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        <svg width="56" height="56" fill="none" viewBox="0 0 56 56" className="mb-6">
          <circle cx="28" cy="28" r="28" fill="#22c55e" fillOpacity="0.12" />
          <path d="M18 29.5l7 7 13-13" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-fine-green-400 to-fine-yellow-400 bg-clip-text text-transparent text-center">Thank You!</h1>
        <p className="text-base sm:text-lg mb-8 text-gray-300 text-center font-light">
          Your responses have been submitted.<br />
          <span className="text-fine-green-300">We appreciate your time and feedback!</span>
        </p>
        <Button
          onClick={handleReturn}
          className="bg-fine-green-600 hover:bg-fine-green-500 text-white font-medium text-base px-8 py-3 rounded-full shadow-none border border-fine-green-700 transition-all duration-200"
        >
          Return
        </Button>
      </div>
      <div className="absolute bottom-4 text-center w-full z-20 pointer-events-none">
        <p className="text-sm text-gray-500 pointer-events-auto">
          Made by <a href="https://pedrodev.website/" target="_blank" rel="noopener noreferrer" className="font-semibold text-fine-green-400 hover:text-fine-green-300 transition-colors">Pedro Developments</a>
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
