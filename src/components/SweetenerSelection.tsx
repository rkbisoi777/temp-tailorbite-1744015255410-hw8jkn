import React from 'react';
import { CustomBar, Sweetener } from '../types';
import { AlertTriangle } from 'lucide-react';

interface SweetenerSelectionProps {
  customBar: CustomBar;
  setCustomBar: React.Dispatch<React.SetStateAction<CustomBar>>;
}

const sweeteners: Sweetener[] = [
  {
    id: 'honey',
    name: 'Honey',
    image: 'https://images.unsplash.com/photo-1625600243103-1dc6824c6c8a?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    sugarContent: 17,
    glycemicIndex: 58,
  },
  {
    id: 'dates',
    name: 'Dates',
    image: 'https://images.unsplash.com/photo-1649335889120-4084d7456c7c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    sugarContent: 14,
    glycemicIndex: 42,
  },
  {
    id: 'maple',
    name: 'Maple Syrup',
    image: 'https://images.unsplash.com/photo-1552587210-5cc4cd7d13c3?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    sugarContent: 13,
    glycemicIndex: 54,
  },
  {
    id: 'stevia',
    name: 'Stevia',
    image: 'https://plus.unsplash.com/premium_photo-1722859274330-9efff42e84c8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    sugarContent: 0,
    glycemicIndex: 0,
  },
];

const SweetenerSelection: React.FC<SweetenerSelectionProps> = ({
  customBar,
  setCustomBar,
}) => {
  const toggleSweetener = (sweetener: Sweetener) => {
    setCustomBar((prev) => {
      const isSelected = prev.sweeteners.some((s) => s.id === sweetener.id);
      if (isSelected) {
        return {
          ...prev,
          sweeteners: prev.sweeteners.filter((s) => s.id !== sweetener.id),
        };
      } else {
        return {
          ...prev,
          sweeteners: [...prev.sweeteners, sweetener],
        };
      }
    });
  };

  const totalSugarContent = customBar.sweeteners.reduce(
    (sum, s) => sum + s.sugarContent,
    0
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Choose Your Sweeteners
        </h2>
        <p className="text-gray-600">Select up to 2 sweeteners for your bar</p>
      </div>

      {totalSugarContent > 20 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
            <p className="text-sm text-yellow-700">
              High sugar content detected. Consider using stevia or dates for a healthier option.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sweeteners.map((sweetener) => {
          const isSelected = customBar.sweeteners.some(
            (s) => s.id === sweetener.id
          );
          const isDisabled =
            !isSelected && customBar.sweeteners.length >= 2;

          return (
            <div
              key={sweetener.id}
              onClick={() => !isDisabled && toggleSweetener(sweetener)}
              className={`relative cursor-pointer rounded-xl overflow-hidden shadow-lg transition-all ${
                isSelected
                  ? 'ring-4 ring-primary-500'
                  : isDisabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:shadow-xl'
              }`}
            >
              <div className="relative h-40">
                <img
                  src={sweetener.image}
                  alt={sweetener.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{sweetener.name}</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-500">Sugar Content:</span>
                    <div className="h-2 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-full bg-primary-500 rounded-full"
                        style={{
                          width: `${(sweetener.sugarContent / 20) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">
                      Glycemic Index:
                    </span>
                    <div className="h-2 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-full bg-primary-500 rounded-full"
                        style={{
                          width: `${(sweetener.glycemicIndex / 100) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-sm text-gray-500 text-center">
        {customBar.sweeteners.length}/2 sweeteners selected
      </div>
    </div>
  );
};

export default SweetenerSelection;