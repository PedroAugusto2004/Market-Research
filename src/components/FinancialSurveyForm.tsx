import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, DollarSign, TrendingUp, Award, Users, Rocket, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  age: string;
  gender: string;
  location: string;
  interests: string[];
  hasUsedApps: string;
  platformsUsed: string;
  platformFeatures: string[];
  experienceRating: string;
  platformFeedback: string;
  monthlyInvestment: string;
  interestLevel: string;
  usageFrequency: string;
  usefulness: string;
  wouldRecommend: string;
}

const FinancialSurveyForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: '',
    gender: '',
    location: '',
    interests: [],
    hasUsedApps: '',
    platformsUsed: '',
    platformFeatures: [],
    experienceRating: '',
    platformFeedback: '',
    monthlyInvestment: '',
    interestLevel: '',
    usageFrequency: '',
    usefulness: '',
    wouldRecommend: ''
  });
  const [stepAnimationKey, setStepAnimationKey] = useState(0);

  const { toast } = useToast();

  const totalSteps = 8;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return true; // Welcome page, no validation needed
      case 1:
        return formData.name.trim() !== '' && formData.email.trim() !== '' && isValidEmail(formData.email);
      case 2:
        return formData.age !== '';
      case 3:
        return formData.gender !== '' && formData.location.trim() !== '';
      case 4:
        return formData.interests.length > 0;
      case 5:
        return formData.hasUsedApps !== '' && (formData.hasUsedApps === 'no' || formData.platformsUsed.trim() !== '');
      case 6:
        if (formData.hasUsedApps === 'yes') {
          return formData.platformFeatures.length > 0 && formData.experienceRating !== '' && formData.monthlyInvestment !== '';
        }
        return formData.monthlyInvestment !== '';
      case 7:
        return formData.interestLevel !== '' && formData.usageFrequency !== '' && formData.usefulness !== '' && formData.wouldRecommend !== '';
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < totalSteps - 1) {
      setStepAnimationKey(prev => prev + 1); // force remount for animation
      setCurrentStep(prev => prev + 1);
    } else if (!validateCurrentStep()) {
      let errorMessage = "Fill in all the required information before proceeding.";
      if (currentStep === 1 && formData.email.trim() !== '' && !isValidEmail(formData.email)) {
        errorMessage = "Please enter a valid email address.";
      }
      toast({
        title: "Please complete all required fields",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setStepAnimationKey(prev => prev + 1); // force remount for animation
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (validateCurrentStep()) {
      try {
        await fetch('https://market-research-m7vk.onrender.com/api/survey', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: { 'Content-Type': 'application/json' }
        });
        toast({
          title: "Survey Submitted! 🎉",
          description: "Thank you for helping us improve financial education!",
        });
      } catch (error) {
        toast({
          title: "Submission failed",
          description: "There was an error submitting your survey. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const ageOptions = [
    'Under 18 years old',
    '18 to 24 years old',
    '25 to 34 years old',
    '35 to 44 years old',
    '45 to 54 years old',
    '55 years old or older'
  ];

  const genderOptions = [
    'Male',
    'Female',
    'Prefer not to say'
  ];

  const interestOptions = [
    'Stocks (equities)',
    'Investment Funds (mutual funds, hedge funds, bond funds, etc.)',
    'Fixed Income (government bonds, corporate bonds, savings accounts, certificates of deposit)',
    'Financial Planning & Budgeting',
    'Retirement Plans (401(k), IRAs, pension schemes)',
    'Cryptocurrencies & Digital Assets',
    'International Investments (foreign stocks, ETFs, ADRs)'
  ];

  const platformFeatureOptions = [
    'Practical lessons',
    'Short videos',
    'Quick tips',
    'Simple language',
    'Simulations',
    'Interaction with instructors',
    'Fast market updates',
    'Education and investment tools'
  ];

  const monthlyInvestmentOptions = [
    'Nothing, I would only use it if it were free',
    'Up to $10.00 per month',
    'Between $10.00 and $19.99 per month',
    'Between $19.99 and $29.99 per month',
    '$30.00 or more'
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8 animate-fadein-smooth text-center">
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-3 mb-8">
                <TrendingUp className="h-10 w-10 text-fine-green-500" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-fine-green-500 to-fine-yellow-500 bg-clip-text text-transparent">
                  FinE Market Research
                </h1>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Hello! We are <span className="font-semibold text-fine-green-400">FinE</span>, a startup focused on transforming the way people learn about finance.
                We're developing an innovative digital solution designed to make financial learning more accessible and practical.
              </p>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                To help us with that, we're conducting a quick survey to better understand people's habits and needs on this topic.
              </p>
              <div className="bg-fine-green-900/20 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-white font-medium text-lg flex items-center justify-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Takes less than 2 minutes to complete</span>
                </p>
              </div>
              <p className="text-2xl font-medium text-white">Can we count on you?</p>
            </div>
            
            <div className="pt-8">
              <Button
                onClick={nextStep}
                className="group relative overflow-hidden bg-gradient-to-r from-fine-green-500 to-fine-green-600 hover:from-fine-green-600 hover:to-fine-green-700 text-white font-semibold text-base sm:text-lg px-6 py-3 sm:px-12 sm:py-6 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-fine-green-500/25"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <Rocket className="h-6 w-6 transition-transform group-hover:rotate-12" />
                  <span>Get Started</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-fine-yellow-400 to-fine-green-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Button>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6 bg-transparent animate-fadein-smooth">
            <div className="space-y-4">
              <Label htmlFor="name" className="text-lg font-medium text-gray-200">
                What's your name? *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                className="h-12 text-lg border-2 border-gray-600 bg-transparent text-white focus:border-gray-600 focus:ring-0 focus:outline-none focus-visible:border-gray-600 focus-visible:ring-0 focus-visible:outline-none transition-none"
                style={{ boxShadow: 'none', borderColor: '#475569', outline: 'none' }}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="email" className="text-lg font-medium text-gray-200">
                E-mail *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className={`h-12 text-lg border-2 bg-transparent text-white focus:border-gray-600 focus:ring-0 focus:outline-none focus-visible:border-gray-600 focus-visible:ring-0 focus-visible:outline-none transition-none ${
                  formData.email && !isValidEmail(formData.email) ? 'border-red-500' : 'border-gray-600'
                }`}
                style={{ boxShadow: 'none', borderColor: formData.email && !isValidEmail(formData.email) ? '#ef4444' : '#475569', outline: 'none' }}
                placeholder="Enter your email address"
              />
              {formData.email && !isValidEmail(formData.email) && (
                <p className="text-red-400 text-sm">Please enter a valid email address</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fadein-smooth">
            <Label className="text-lg font-medium text-gray-200">What is your age range? *</Label>
            <RadioGroup
              value={formData.age}
              onValueChange={(value) => updateFormData('age', value)}
              className="space-y-3"
            >
              {ageOptions.map((option) => (
                <div key={option} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                  <RadioGroupItem value={option} id={option} className="border-2 border-fine-green-500 text-fine-green-500" />
                  <Label htmlFor={option} className="text-base cursor-pointer text-gray-300">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fadein-smooth">
            <div className="space-y-4">
              <Label className="text-lg font-medium text-gray-200">What is your gender? *</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => updateFormData('gender', value)}
                className="space-y-3"
              >
                {genderOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                    <RadioGroupItem value={option} id={option} className="border-2 border-fine-green-500 text-fine-green-500" />
                    <Label htmlFor={option} className="text-base cursor-pointer text-gray-300">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-4">
              <Label htmlFor="location" className="text-lg font-medium text-gray-200">
                Where do you live? (Country, city and State/Province) *
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
                className="h-12 text-lg border-2 border-gray-600 bg-gray-800 text-white focus:border-gray-600 focus:ring-0 focus:outline-none focus-visible:border-gray-600 focus-visible:ring-0 focus-visible:outline-none transition-none"
                style={{ boxShadow: 'none', borderColor: '#475569', outline: 'none' }}
                placeholder="e.g., United States, New York, NY"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fadein-smooth">
            <Label className="text-lg font-medium text-gray-200">
              Which financial education topics interest you the most right now? *
              <br />
              <span className="text-sm text-gray-400 font-normal">Select all that apply.</span>
            </Label>
            <div className="space-y-3">
              {interestOptions.map((option) => (
                <div key={option} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                  <Checkbox
                    id={option}
                    checked={formData.interests.includes(option)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateFormData('interests', [...formData.interests, option]);
                      } else {
                        updateFormData('interests', formData.interests.filter(i => i !== option));
                      }
                    }}
                    className="border-2 border-fine-green-500 data-[state=checked]:bg-fine-green-500"
                  />
                  <Label htmlFor={option} className="text-base cursor-pointer leading-relaxed text-gray-300">{option}</Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 animate-fadein-smooth">
            <Label className="text-lg font-medium text-gray-200">
              Have you ever used or are you currently using any app or platform to learn about personal finance? *
            </Label>
            <RadioGroup
              value={formData.hasUsedApps}
              onValueChange={(value) => updateFormData('hasUsedApps', value)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                <RadioGroupItem value="yes" id="yes" className="border-2 border-fine-green-500 text-fine-green-500" />
                <Label htmlFor="yes" className="text-base cursor-pointer text-gray-300">Yes</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                <RadioGroupItem value="no" id="no" className="border-2 border-fine-green-500 text-fine-green-500" />
                <Label htmlFor="no" className="text-base cursor-pointer text-gray-300">No</Label>
              </div>
            </RadioGroup>

            {formData.hasUsedApps === 'yes' && (
              <div className="space-y-4 animate-fade-in-up">
                <Label htmlFor="platforms" className="text-lg font-medium text-gray-200">
                  If yes, which one(s)? *
                </Label>
                <Input
                  id="platforms"
                  value={formData.platformsUsed}
                  onChange={(e) => updateFormData('platformsUsed', e.target.value)}
                  className="h-12 text-lg border-2 border-gray-600 bg-gray-800 text-white focus:border-gray-600 focus:ring-0 focus:outline-none focus-visible:border-gray-600 focus-visible:ring-0 focus-visible:outline-none transition-none"
                  style={{ boxShadow: 'none', borderColor: '#475569', outline: 'none' }}
                  placeholder="e.g., Mint, YNAB, Robinhood, etc."
                />
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6 animate-fadein-smooth">
            {formData.hasUsedApps === 'yes' && (
              <>
                <div className="space-y-4">
                  <Label className="text-lg font-medium text-gray-200">
                    What do you like most about these platforms? *
                    <br />
                    <span className="text-sm text-gray-400 font-normal">Select all that apply.</span>
                  </Label>
                  <div className="space-y-3">
                    {platformFeatureOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                        <Checkbox
                          id={option}
                          checked={formData.platformFeatures.includes(option)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateFormData('platformFeatures', [...formData.platformFeatures, option]);
                            } else {
                              updateFormData('platformFeatures', formData.platformFeatures.filter(f => f !== option));
                            }
                          }}
                          className="border-2 border-fine-green-500 data-[state=checked]:bg-fine-green-500"
                        />
                        <Label htmlFor={option} className="text-base cursor-pointer text-gray-300">{option}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg font-medium text-gray-200">
                    If you have used any platform or app to learn about finance, how would you rate your experience? *
                    <br />
                    <span className="text-sm text-gray-400 font-normal">From 1 to 5, where 1 = Very dissatisfied and 5 = Very satisfied</span>
                  </Label>
                  <RadioGroup
                    value={formData.experienceRating}
                    onValueChange={(value) => updateFormData('experienceRating', value)}
                    className="space-y-3"
                  >
                    {[
                      '1 – Very dissatisfied',
                      '2 – Dissatisfied',
                      '3 – Neutral',
                      '4 – Satisfied',
                      '5 – Very satisfied'
                    ].map((option) => (
                      <div key={option} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                        <RadioGroupItem value={option} id={option} className="border-2 border-fine-green-500 text-fine-green-500" />
                        <Label htmlFor={option} className="text-base cursor-pointer text-gray-300">{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </>
            )}

            <div className="space-y-4">
              <Label className="text-lg font-medium text-gray-200">
                How much would you be willing to invest monthly in a complete financial education platform? *
              </Label>
              <RadioGroup
                value={formData.monthlyInvestment}
                onValueChange={(value) => updateFormData('monthlyInvestment', value)}
                className="space-y-3"
              >
                {monthlyInvestmentOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                    <RadioGroupItem value={option} id={option} className="border-2 border-fine-green-500 text-fine-green-500" />
                    <Label htmlFor={option} className="text-base cursor-pointer text-gray-300">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6 animate-fadein-smooth">
            <div className="space-y-4">
              <Label className="text-lg font-medium text-gray-200">
                If there were a free app that taught you personal finance in a practical and fun way, with rewards for progress (like certificates, benefits, or prizes), how interested would you be? *
              </Label>
              <RadioGroup
                value={formData.interestLevel}
                onValueChange={(value) => updateFormData('interestLevel', value)}
                className="space-y-3"
              >
                {[
                  'Not interested',
                  'Slightly interested',
                  'Neutral',
                  'Interested',
                  'Very interested'
                ].map((option) => (
                  <div key={option} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                    <RadioGroupItem value={option} id={option} className="border-2 border-fine-green-500 text-fine-green-500" />
                    <Label htmlFor={option} className="text-base cursor-pointer text-gray-300">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-medium text-gray-200">
                How often do you think you would use an app like this? *
              </Label>
              <RadioGroup
                value={formData.usageFrequency}
                onValueChange={(value) => updateFormData('usageFrequency', value)}
                className="space-y-3"
              >
                {[
                  'Once a month or less',
                  'A few times a month',
                  'Weekly',
                  '2 to 3 times a week',
                  'Daily'
                ].map((option) => (
                  <div key={option} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                    <RadioGroupItem value={option} id={option} className="border-2 border-fine-green-500 text-fine-green-500" />
                    <Label htmlFor={option} className="text-base cursor-pointer text-gray-300">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-medium text-gray-200">
                In your opinion, how useful would a free financial education app be for your life today? *
              </Label>
              <RadioGroup
                value={formData.usefulness}
                onValueChange={(value) => updateFormData('usefulness', value)}
                className="space-y-3"
              >
                {[
                  'Not useful at all',
                  'Slightly useful',
                  'Moderately useful',
                  'Very useful',
                  'Essential'
                ].map((option) => (
                  <div key={option} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                    <RadioGroupItem value={option} id={option} className="border-2 border-fine-green-500 text-fine-green-500" />
                    <Label htmlFor={option} className="text-base cursor-pointer text-gray-300">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-medium text-gray-200">
                Would you recommend this app to friends or family? *
              </Label>
              <RadioGroup
                value={formData.wouldRecommend}
                onValueChange={(value) => updateFormData('wouldRecommend', value)}
                className="space-y-3"
              >
                {['Yes', 'No', 'Maybe'].map((option) => (
                  <div key={option} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                    <RadioGroupItem value={option} id={option} className="border-2 border-fine-green-500 text-fine-green-500" />
                    <Label htmlFor={option} className="text-base cursor-pointer text-gray-300">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center p-2 sm:p-4 overflow-hidden">
      {/* Minimalistic animated background - responsive for mobile */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-40%] left-[-40%] w-[120vw] h-[120vw] sm:top-[-20%] sm:left-[-10%] sm:w-[60vw] sm:h-[60vw] bg-gradient-to-br from-fine-green-500/30 to-fine-yellow-500/20 rounded-full blur-3xl animate-bg-float" />
        <div className="absolute bottom-[-40%] right-[-40%] w-[110vw] h-[110vw] sm:bottom-[-15%] sm:right-[-10%] sm:w-[50vw] sm:h-[50vw] bg-gradient-to-tr from-fine-yellow-500/20 to-fine-green-500/10 rounded-full blur-2xl animate-bg-float2" />
      </div>
      <div className="relative z-10 w-full">
        {/* Render the form content directly, no Card or container */}
        {currentStep > 0 && (
          <div className="pb-4 sm:pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-4 gap-2 sm:gap-0">
              <div className="flex items-center space-x-2">
                {/* Always use DollarSign icon for all steps */}
                <DollarSign className="h-6 w-6 text-fine-yellow-500" />
                <span className="text-xs sm:text-sm font-medium text-gray-400">
                  Step {currentStep + 1} of {totalSteps}
                </span>
              </div>
            </div>
            <Progress 
              value={progress} 
              className="h-2 sm:h-3 bg-black rounded-full overflow-hidden shadow-inner border border-gray-700 [&>div]:bg-green-500 [&>div]:transition-all [&>div]:duration-700 [&>div]:ease-in-out"
              style={{ boxShadow: '0 2px 8px 0 rgba(34,197,94,0.15)', border: '1.5px solid #475569' }}
            />
            <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2">
              <span>Getting started</span>
              <span>Almost done!</span>
            </div>
          </div>
        )}
        <div className="px-1 sm:px-8 pb-8">
          <div key={stepAnimationKey} className="min-h-[300px] sm:min-h-[400px]">
            {renderStep()}
          </div>
          {currentStep > 0 && (
            <div className="flex flex-row justify-between mt-8 pt-6 gap-3">
              <Button
                variant="outline"
                onClick={prevStep}
                className="flex items-center space-x-2 px-4 py-2 sm:px-6 sm:py-3 border-2 border-gray-600 bg-black text-gray-300 text-base sm:text-lg transition-none hover:bg-black hover:text-gray-300 focus:bg-black focus:text-gray-300 active:bg-black active:text-gray-300 min-w-[110px] sm:min-w-[140px]"
                style={{ pointerEvents: 'auto' }}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hover:text-gray-300 focus:text-gray-300 active:text-gray-300">Previous</span>
              </Button>
              {currentStep === totalSteps - 1 ? (
                <Button
                  onClick={handleSubmit}
                  className="flex items-center space-x-2 px-5 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-fine-green-500 to-fine-green-600 text-white font-medium text-base sm:text-lg min-w-[110px] sm:min-w-[140px]"
                >
                  <Award className="h-4 w-4" />
                  <span>Submit Survey</span>
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  className="flex items-center space-x-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-fine-green-500 to-fine-green-600 text-white font-medium text-base sm:text-lg min-w-[110px] sm:min-w-[140px]"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialSurveyForm;

/*
Add this to your global CSS (e.g., index.css or App.css) if not already present:

@keyframes fadein-smooth {
  0% {
    opacity: 0;
    transform: translateY(32px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.animate-fadein-smooth {
  animation: fadein-smooth 0.7s cubic-bezier(0.33,1,0.68,1) both;
}

@keyframes bg-float {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-8px) scale(1.02);
  }
}
.animate-bg-float {
  animation: bg-float 6s ease-in-out infinite;
}

@keyframes bg-float2 {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(8px) scale(1.02);
  }
}
.animate-bg-float2 {
  animation: bg-float2 6s ease-in-out infinite;
}
*/

