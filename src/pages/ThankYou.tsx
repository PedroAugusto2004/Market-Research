import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    // Set a flag to prevent resubmission
    sessionStorage.setItem('surveySubmitted', 'true');
    navigate('/', { replace: true, state: { goToIntro: true } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 py-12 relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-30%] left-[-30%] w-[80vw] h-[80vw] bg-gradient-to-br from-fine-green-500/20 to-fine-yellow-500/10 rounded-full blur-3xl animate-bg-float" />
        <div className="absolute bottom-[-30%] right-[-30%] w-[70vw] h-[70vw] bg-gradient-to-tr from-fine-yellow-500/10 to-fine-green-500/5 rounded-full blur-2xl animate-bg-float2" />
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
    </div>
  );
};

export default ThankYou;
