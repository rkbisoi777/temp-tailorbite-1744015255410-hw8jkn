// src/App.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CustomBar } from './types';
import StepProgress from './components/StepProgress';
import AISuggestions from './components/AISuggestions';
import { stepsConfig } from './stepsConfig';
import Header from './components/Header';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [customBar, setCustomBar] = useState<CustomBar>({
    base: null,
    ingredients: [],
    sweeteners: [],
    name: '',
    totalNutrition: { protein: 0, carbs: 0, fats: 0, calories: 0 },
  });

  const nextStep = () => {
    if (currentStep < stepsConfig.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const CurrentComponent = stepsConfig[currentStep].render;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 pb-8 pt-36">
        <StepProgress
          steps={stepsConfig.map(step => step.name)}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />

        <div className="mt-8 relative pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 md:p-8"
            >
              {CurrentComponent(customBar, setCustomBar)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-row justify-between mt-8 fixed bottom-0 w-full p-4">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`flex items-center px-3 py-3 text-white rounded-full mt-4 transition-all ${
            currentStep === 0
              ? 'bg-secondary-300 cursor-not-allowed'
              : 'bg-secondary-600 hover:bg-secondary-700'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <AISuggestions 
            customBar={customBar} 
            setCustomBar={setCustomBar} 
            setCurrentStep={setCurrentStep}
          />
        </div>
        <button
          onClick={nextStep}
          disabled={currentStep === stepsConfig.length - 1}
          className={`flex items-center px-3 py-3 text-white rounded-full mt-4 transition-all ${
            currentStep === stepsConfig.length - 1
              ? 'bg-secondary-300 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default App;