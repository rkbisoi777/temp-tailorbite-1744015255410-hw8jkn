export interface BarBase {
  id: string;
  name: string;
  description: string;
  image: string;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
    calories: number;
  };
  flavorIntensity: number;
}

export interface PowerIngredient {
  id: string;
  name: string;
  image: string;
  maxAmount: number;
  currentAmount: number;
  nutrition: {
    protein: number;
    carbs: number;
    fats: number;
    calories: number;
  };
}

export interface Sweetener {
  id: string;
  name: string;
  image: string;
  sugarContent: number;
  glycemicIndex: number;
}

export interface CustomBar {
  base: BarBase | null;
  ingredients: PowerIngredient[];
  sweeteners: Sweetener[];
  name: string;
  totalNutrition: {
    protein: number;
    carbs: number;
    fats: number;
    calories: number;
  };
}