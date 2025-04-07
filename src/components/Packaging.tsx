import React, { useState } from 'react';
import { CustomBar } from '../types';
import { motion } from 'framer-motion';
import { Share2, Download, Check } from 'lucide-react';

interface PackagingProps {
  customBar: CustomBar;
  setCustomBar: React.Dispatch<React.SetStateAction<CustomBar>>;
}

const Packaging: React.FC<PackagingProps> = ({ customBar, setCustomBar }) => {
  const [copied, setCopied] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomBar((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const shareUrl = `https://tailorbite.com/share/${encodeURIComponent(
    customBar.name
  )}`;

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Name Your Creation
        </h2>
        <p className="text-gray-600">
          Give your custom bar a unique name and preview the packaging
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <label
          htmlFor="barName"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Bar Name
        </label>
        <input
          type="text"
          id="barName"
          value={customBar.name}
          onChange={handleNameChange}
          placeholder="e.g., Nutty Protein Blast"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div className="relative">
        <motion.div
          className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white shadow-xl"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">
              {customBar.name || 'Your Custom Bar'}
            </h3>
            <div className="space-y-2 text-primary-100">
              <p>Base: {customBar.base?.name}</p>
              <p>
                Ingredients:{' '}
                {customBar.ingredients.map((i) => i.name).join(', ')}
              </p>
              <p>
                Sweeteners:{' '}
                {customBar.sweeteners.map((s) => s.name).join(', ')}
              </p>
            </div>
            <div className="mt-6 flex items-center space-x-2">
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                {customBar.totalNutrition.protein}g protein
              </span>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                {customBar.totalNutrition.calories} calories
              </span>
            </div>
          </div>
          <div className="absolute inset-0 bg-white/5 rounded-2xl backdrop-blur-sm" />
        </motion.div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={copyShareLink}
          className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          {copied ? (
            <Check className="w-5 h-5 mr-2" />
          ) : (
            <Share2 className="w-5 h-5 mr-2" />
          )}
          {copied ? 'Copied!' : 'Share'}
        </button>
        <button className="flex items-center px-6 py-3 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors">
          <Download className="w-5 h-5 mr-2" />
          Download
        </button>
      </div>
    </div>
  );
};

export default Packaging;