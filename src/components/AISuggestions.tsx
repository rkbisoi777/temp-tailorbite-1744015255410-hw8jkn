import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, RefreshCw, ArrowLeft } from 'lucide-react';
import { getBarSuggestions } from '../lib/gemini';
import { CustomBar } from '../types';
import AnimatedLogo from './AnimatedLogo';

interface AISuggestionsProps {
  customBar: CustomBar;
  setCustomBar: React.Dispatch<React.SetStateAction<CustomBar>>;
  setCurrentStep?: (step: number) => void;
}

const AISuggestions: React.FC<AISuggestionsProps> = ({
  customBar,
  setCustomBar,
  setCurrentStep
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any>(null);
  const [preferences, setPreferences] = useState({
    dietary: [] as string[],
    goals: [] as string[],
    flavors: [] as string[],
  });

  const dietaryOptions = ['Vegan', 'Gluten-Free', 'Keto', 'Low-Sugar'];
  const goalOptions = ['Muscle Gain', 'Weight Loss', 'Energy Boost', 'Recovery'];
  const flavorOptions = ['Chocolate', 'Fruity', 'Nutty', 'Vanilla'];

  const togglePreference = (category: keyof typeof preferences, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value],
    }));
  };

  const getSuggestions = async () => {
    setLoading(true);
    setSuggestions(null);
    try {
      const result = await getBarSuggestions(preferences);
      setSuggestions(result);
      setShowRecommendations(true);
    } catch (error) {
      console.error('Error getting suggestions:', error);
    }
    setLoading(false);
  };

  const applySuggestions = () => {
    if (suggestions) {
      setCustomBar(prev => {
        const updatedBar = { ...prev };

        if (suggestions.base) {
          updatedBar.base = {
            id: suggestions.base.toLowerCase().replace(/\s+/g, '-'),
            name: suggestions.base,
            description: `AI recommended ${suggestions.base}`,
            image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80&w=400',
            macros: {
              protein: 15,
              carbs: 20,
              fats: 10,
              calories: 230
            },
            flavorIntensity: 7
          };
        }

        if (suggestions.ingredients && Array.isArray(suggestions.ingredients)) {
          updatedBar.ingredients = suggestions.ingredients.map((ingredient: string) => ({
            id: ingredient.toLowerCase().replace(/\s+/g, '-'),
            name: ingredient,
            image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=400',
            maxAmount: 100,
            currentAmount: 50,
            nutrition: {
              protein: 5,
              carbs: 3,
              fats: 2,
              calories: 50
            }
          }));
        }

        if (suggestions.sweeteners && Array.isArray(suggestions.sweeteners)) {
          updatedBar.sweeteners = suggestions.sweeteners.map((sweetener: string) => ({
            id: sweetener.toLowerCase().replace(/\s+/g, '-'),
            name: sweetener,
            image: 'https://images.unsplash.com/photo-1625600243103-1dc6824c6c8a?auto=format&fit=crop&q=80&w=300',
            sugarContent: sweetener.toLowerCase().includes('stevia') ? 0 : 10,
            glycemicIndex: sweetener.toLowerCase().includes('stevia') ? 0 : 45
          }));
        }

        const totalNutrition = {
          protein: updatedBar.base?.macros.protein || 0,
          carbs: updatedBar.base?.macros.carbs || 0,
          fats: updatedBar.base?.macros.fats || 0,
          calories: updatedBar.base?.macros.calories || 0
        };

        updatedBar.ingredients.forEach(ingredient => {
          totalNutrition.protein += ingredient.nutrition.protein;
          totalNutrition.carbs += ingredient.nutrition.carbs;
          totalNutrition.fats += ingredient.nutrition.fats;
          totalNutrition.calories += ingredient.nutrition.calories;
        });

        updatedBar.totalNutrition = totalNutrition;

        return updatedBar;
      });

      setIsOpen(false);
      setShowRecommendations(false);
      if (setCurrentStep) {
        setCurrentStep(3);
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowRecommendations(false);
    setSuggestions(null);
  };

  const backToPreferences = () => {
    setShowRecommendations(false);
  };

  return (
    <>
      <div className="flex justify-center pb-2">
        <button
          onClick={() => setIsOpen(true)}
          className="absolute left-1/2 mb-4 transform -translate-x-1/2 translate bottom-0 text-white bg-primary-600 p-4 rounded-full border-4 shadow-md border-gray-100 hover:bg-primary-700 transition-colors "
        >
          <AnimatedLogo />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) handleClose();
            }}
          >
            <AnimatePresence mode="wait">
              {!showRecommendations ? (
                <motion.div
                  key="preferences"
                  className="bg-white rounded-2xl w-full max-w-2xl max-h-[68vh] overflow-y-auto scrollbar-hide"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  <div className="p-6 space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Sparkles className="w-6 h-6 text-primary-500 mr-2" />
                        AI Bar Designer
                      </h2>
                      <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Close"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Dietary Preferences</h3>
                        <div className="flex flex-wrap gap-2">
                          {dietaryOptions.map(option => (
                            <button
                              key={option}
                              onClick={() => togglePreference('dietary', option)}
                              className={`px-4 py-2 rounded-full text-sm ${preferences.dietary.includes(option)
                                ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
                                : 'bg-gray-100 text-gray-700 border-2 border-transparent'
                                }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Fitness Goals</h3>
                        <div className="flex flex-wrap gap-2">
                          {goalOptions.map(option => (
                            <button
                              key={option}
                              onClick={() => togglePreference('goals', option)}
                              className={`px-4 py-2 rounded-full text-sm ${preferences.goals.includes(option)
                                ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
                                : 'bg-gray-100 text-gray-700 border-2 border-transparent'
                                }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Flavor Preferences</h3>
                        <div className="flex flex-wrap gap-2">
                          {flavorOptions.map(option => (
                            <button
                              key={option}
                              onClick={() => togglePreference('flavors', option)}
                              className={`px-4 py-2 rounded-full text-sm ${preferences.flavors.includes(option)
                                ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
                                : 'bg-gray-100 text-gray-700 border-2 border-transparent'
                                }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={getSuggestions}
                      disabled={loading}
                      className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-300 flex items-center justify-center"
                    >
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="mr-2"
                          >
                            <RefreshCw className="w-5 h-5" />
                          </motion.div>
                          Getting AI Suggestions...
                        </>
                      ) : (
                        'Get AI Suggestions'
                      )}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="recommendations"
                  className="bg-white rounded-2xl w-full max-w-2xl max-h-[68vh] overflow-y-auto scrollbar-hide"
                  initial={{ scale: 0.9, opacity: 0, x: 20 }}
                  animate={{ scale: 1, opacity: 1, x: 0 }}
                  exit={{ scale: 0.9, opacity: 0, x: -20 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  <div className="p-6 space-y-6">
                    <div className="flex justify-between items-center">
                      <button
                        onClick={backToPreferences}
                        className="text-primary-600 hover:text-primary-700 flex items-center"
                      >
                        <ArrowLeft className="w-5 h-5 mr-1" />
                        Back
                      </button>
                      <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Close"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                          <Sparkles className="w-6 h-6 text-primary-500 mr-2" />
                          AI Recommendations
                        </h2>

                      </div>

                      <div className="space-y-3">
                        <div>
                          <span className="font-medium">Recommended Base:</span>
                          <p className="text-gray-700">{suggestions?.base}</p>
                        </div>
                        <div>
                          <span className="font-medium">Power Ingredients:</span>
                          <ul className="list-disc list-inside text-gray-700">
                            {suggestions?.ingredients.map((ingredient: string, index: number) => (
                              <li key={`ingredient-${index}`}>{ingredient}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="font-medium">Sweeteners:</span>
                          <ul className="list-disc list-inside text-gray-700">
                            {suggestions?.sweeteners.map((sweetener: string, index: number) => (
                              <li key={`sweetener-${index}`}>{sweetener}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="font-medium">Expected Benefits:</span>
                          <p className="text-gray-700">{suggestions?.benefits}</p>
                        </div>
                        <div>
                          <span className="font-medium">Flavor Rating:</span>
                          <p className="text-gray-700">{suggestions?.flavorRating}/10</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
                      <button
                        onClick={getSuggestions}
                        className="w-full py-3 px-4 text-primary-600 border border-primary-600 rounded-lg hover:text-primary-700 transition-colors"
                      >
                        Regenerate
                      </button>
                      <button
                        onClick={applySuggestions}
                        className="w-full py-3 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Apply These Suggestions
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AISuggestions;