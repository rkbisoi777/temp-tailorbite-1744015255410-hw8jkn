import React from 'react';
import { CustomBar } from '../types';
import { Dumbbell, Flame, Heart, Brain } from 'lucide-react';

interface NutritionInsightProps {
  customBar: CustomBar;
}

const NutritionInsight: React.FC<NutritionInsightProps> = ({ customBar }) => {
  const getTasteProfile = () => {
    const hasChocolate = customBar.base?.id === 'chocolate';
    const hasNuts = customBar.ingredients.some((i) =>
      ['almonds', 'peanuts'].includes(i.id)
    );
    const hasSeeds = customBar.ingredients.some((i) =>
      ['chia', 'pumpkin'].includes(i.id)
    );
    const hasProtein = customBar.ingredients.some((i) =>
      ['whey', 'pea'].includes(i.id)
    );

    const profile = [];
    if (hasChocolate) profile.push('chocolatey');
    if (hasNuts) profile.push('nutty');
    if (hasSeeds) profile.push('seedy');
    if (hasProtein) profile.push('protein-rich');

    return profile.join(', ');
  };

  const getHealthBadges = () => {
    const badges = [];
    if (customBar.totalNutrition.protein >= 15)
      badges.push({ icon: Dumbbell, text: 'High Protein' });
    if (
      customBar.sweeteners.every((s) => s.glycemicIndex < 50) &&
      customBar.totalNutrition.carbs < 20
    )
      badges.push({ icon: Heart, text: 'Low Glycemic' });
    if (customBar.ingredients.some((i) => ['chia', 'pumpkin'].includes(i.id)))
      badges.push({ icon: Brain, text: 'Brain Booster' });
    if (customBar.totalNutrition.calories < 200)
      badges.push({ icon: Flame, text: 'Low Calorie' });

    return badges;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Nutrition Insights
        </h2>
        <p className="text-gray-600">
          Here's what makes your bar special
        </p>
      </div>

      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Taste Profile</h3>
        <p className="text-gray-700 text-lg">
          Your bar is {getTasteProfile() || 'waiting for ingredients'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Macronutrients</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Protein</span>
                <span className="font-medium">
                  {customBar.totalNutrition.protein}g
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{
                    width: `${(customBar.totalNutrition.protein / 30) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Carbs</span>
                <span className="font-medium">
                  {customBar.totalNutrition.carbs}g
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{
                    width: `${(customBar.totalNutrition.carbs / 30) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Fats</span>
                <span className="font-medium">
                  {customBar.totalNutrition.fats}g
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-yellow-500 rounded-full"
                  style={{
                    width: `${(customBar.totalNutrition.fats / 30) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Health Badges</h3>
          <div className="grid sm:grid-rows-2 md:sm:grid-cols-2 gap-3">
            {getHealthBadges().map((badge, index) => (
              <div
                key={index}
                className="flex items-center p-2 bg-primary-50 rounded-lg"
              >
                <badge.icon className="w-5 h-5 text-primary-600 mr-2" />
                <span className="text-sm font-medium text-primary-700">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Calories</h3>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900">
            {customBar.totalNutrition.calories}
          </span>
          <span className="text-gray-500">calories per bar</span>
        </div>
      </div>
    </div>
  );
};

export default NutritionInsight;