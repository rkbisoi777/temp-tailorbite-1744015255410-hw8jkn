// src/stepsConfig.ts
import BaseSelection from './components/BaseSelection';
import PowerIngredients from './components/PowerIngredients';
import SweetenerSelection from './components/SweetenerSelection';
import NutritionInsight from './components/NutritionInsight';
import Packaging from './components/Packaging';
import { CustomBar } from './types';
import React from 'react';

export type StepRenderer = (
  customBar: CustomBar,
  setCustomBar: React.Dispatch<React.SetStateAction<CustomBar>>
) => JSX.Element;

type StepConfig = {
  name: string;
  render: StepRenderer;
};

export const stepsConfig: StepConfig[] = [
  {
    name: 'Base',
    render: (customBar, setCustomBar) => (
      <BaseSelection customBar={customBar} setCustomBar={setCustomBar} />
    ),
  },
  {
    name: 'Ingredients',
    render: (customBar, setCustomBar) => (
      <PowerIngredients customBar={customBar} setCustomBar={setCustomBar} />
    ),
  },
  {
    name: 'Sweeteners',
    render: (customBar, setCustomBar) => (
      <SweetenerSelection customBar={customBar} setCustomBar={setCustomBar} />
    ),
  },
  {
    name: 'Nutrition',
    render: (customBar) => <NutritionInsight customBar={customBar} />,
  },
  {
    name: 'Package',
    render: (customBar, setCustomBar) => (
      <Packaging customBar={customBar} setCustomBar={setCustomBar} />
    ),
  },
];
