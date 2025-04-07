import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface StepProgressProps {
  steps: string[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

const StepProgress: React.FC<StepProgressProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="flex justify-between items-center w-full max-w-4xl mx-auto">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center relative group">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onStepClick(index)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isCompleted
                    ? 'bg-primary-600'
                    : isCurrent
                    ? 'bg-primary-500'
                    : 'bg-secondary-200'
                } transition-colors duration-200`}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6 text-white" />
                ) : (
                  <span
                    className={`${
                      isCurrent ? 'text-white' : 'text-secondary-600'
                    }`}
                  >
                    {index + 1}
                  </span>
                )}
              </motion.button>
              <span
                className={`mt-2 text-sm ${
                  isCurrent ? 'text-primary-600 font-medium' : 'text-secondary-500'
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 ${
                  index < currentStep ? 'bg-primary-500' : 'bg-secondary-200'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepProgress;