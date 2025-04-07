import React from 'react';
import { CustomBar } from '../types';

interface PowerIngredientsProps {
  customBar: CustomBar;
  setCustomBar: React.Dispatch<React.SetStateAction<CustomBar>>;
}

const PowerIngredients: React.FC<PowerIngredientsProps> = ({ customBar, setCustomBar }) => {
  const ingredients = [
    { id: 'almonds', name: 'Almonds', protein: 6, carbs: 6, fats: 14, calories: 170 },
    { id: 'peanuts', name: 'Peanuts', protein: 7, carbs: 5, fats: 14, calories: 170 },
    { id: 'chia', name: 'Chia Seeds', protein: 4, carbs: 8, fats: 9, calories: 130 },
    { id: 'pumpkin', name: 'Pumpkin Seeds', protein: 7, carbs: 3, fats: 13, calories: 155 },
    { id: 'whey', name: 'Whey Protein', protein: 24, carbs: 3, fats: 2, calories: 120 },
    { id: 'pea', name: 'Pea Protein', protein: 21, carbs: 4, fats: 2, calories: 110 },
  ];

  const toggleIngredient = (ingredient: typeof ingredients[0]) => {
    setCustomBar(prev => {
      const isSelected = prev.ingredients.some(i => i.id === ingredient.id);
      
      if (isSelected) {
        return {
          ...prev,
          ingredients: prev.ingredients.filter(i => i.id !== ingredient.id),
          totalNutrition: {
            protein: prev.totalNutrition.protein - ingredient.protein,
            carbs: prev.totalNutrition.carbs - ingredient.carbs,
            fats: prev.totalNutrition.fats - ingredient.fats,
            calories: prev.totalNutrition.calories - ingredient.calories,
          },
        };
      } else {
        return {
          ...prev,
          ingredients: [...prev.ingredients, ingredient],
          totalNutrition: {
            protein: prev.totalNutrition.protein + ingredient.protein,
            carbs: prev.totalNutrition.carbs + ingredient.carbs,
            fats: prev.totalNutrition.fats + ingredient.fats,
            calories: prev.totalNutrition.calories + ingredient.calories,
          },
        };
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Power Ingredients</h2>
        <p className="text-gray-600">Select up to 3 power ingredients for your bar</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ingredients.map((ingredient) => {
          const isSelected = customBar.ingredients.some(i => i.id === ingredient.id);
          const isDisabled = !isSelected && customBar.ingredients.length >= 3;

          return (
            <button
              key={ingredient.id}
              onClick={() => toggleIngredient(ingredient)}
              disabled={isDisabled && !isSelected}
              className={`p-4 rounded-lg transition-all ${
                isSelected
                  ? 'bg-primary-100 border-2 border-primary-500'
                  : isDisabled
                  ? 'bg-gray-100 cursor-not-allowed opacity-50'
                  : 'bg-white border-2 border-gray-200 hover:border-primary-500'
              }`}
            >
              <h3 className="font-semibold text-gray-900">{ingredient.name}</h3>
              <div className="mt-2 text-sm text-gray-600 space-y-1">
                <p>Protein: {ingredient.protein}g</p>
                <p>Carbs: {ingredient.carbs}g</p>
                <p>Fats: {ingredient.fats}g</p>
                <p>Calories: {ingredient.calories}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-sm text-gray-500 text-center">
        {customBar.ingredients.length}/3 ingredients selected
      </div>
    </div>
  );
};

export default PowerIngredients;