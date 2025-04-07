import React from 'react';
import { motion } from 'framer-motion';
import { CustomBar, BarBase } from '../types';

const bases: BarBase[] = [
  {
    id: 'chocolate',
    name: 'Dark Chocolate',
    description: 'Rich, smooth dark chocolate base with 70% cocoa',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80&w=400',
    macros: {
      protein: 2,
      carbs: 15,
      fats: 9,
      calories: 150,
    },
    flavorIntensity: 8,
  },
  {
    id: 'nutty',
    name: 'Nutty Base',
    description: 'Blend of crushed almonds and cashews',
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=400',
    macros: {
      protein: 6,
      carbs: 8,
      fats: 14,
      calories: 180,
    },
    flavorIntensity: 6,
  },
  {
    id: 'oat',
    name: 'Oat Foundation',
    description: 'Hearty rolled oats with a touch of vanilla',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400',
    macros: {
      protein: 4,
      carbs: 22,
      fats: 3,
      calories: 130,
    },
    flavorIntensity: 4,
  },
  {
    id: 'protein',
    name: 'Protein Blend',
    description: 'Whey and pea protein mix for maximum gains',
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=400',
    macros: {
      protein: 15,
      carbs: 5,
      fats: 2,
      calories: 100,
    },
    flavorIntensity: 3,
  },
];

interface BaseSelectionProps {
  customBar: CustomBar;
  setCustomBar: React.Dispatch<React.SetStateAction<CustomBar>>;
}

const BaseSelection: React.FC<BaseSelectionProps> = ({
  customBar,
  setCustomBar,
}) => {
  const handleBaseSelect = (base: BarBase) => {
    setCustomBar({
      ...customBar,
      base,
      totalNutrition: { ...base.macros },
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {bases.map((base) => (
        <motion.div
          key={base.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`relative cursor-pointer rounded-xl overflow-hidden shadow-lg ${
            customBar.base?.id === base.id
              ? 'ring-4 ring-primary-500'
              : 'hover:shadow-xl'
          }`}
          onClick={() => handleBaseSelect(base)}
        >
          <div className="relative h-48">
            <img
              src={base.image}
              alt={base.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{base.name}</h3>
            <p className="text-secondary-600 mb-4">{base.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-secondary-500 mb-1">
                  Flavor Intensity
                </h4>
                <div className="h-2 bg-secondary-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500"
                    style={{ width: `${(base.flavorIntensity / 10) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-secondary-500 mb-1">
                  Protein
                </h4>
                <span className="text-lg font-semibold text-secondary-700">
                  {base.macros.protein}g
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BaseSelection;