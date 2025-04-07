// // import { GoogleGenerativeAI } from '@google/generative-ai';

// // const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// // export async function getBarSuggestions(preferences: {
// //   dietary?: string[];
// //   goals?: string[];
// //   flavors?: string[];
// // }) {
// //   const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

// //   const prompt = `As a nutrition expert and flavor specialist, help design a protein/energy bar with these preferences:
// //     ${preferences.dietary ? `Dietary restrictions: ${preferences.dietary.join(', ')}` : ''}
// //     ${preferences.goals ? `Fitness goals: ${preferences.goals.join(', ')}` : ''}
// //     ${preferences.flavors ? `Preferred flavors: ${preferences.flavors.join(', ')}` : ''}
    
// //     Please provide recommendations for:
// //     1. Base selection
// //     2. Power ingredients (up to 3)
// //     3. Sweetener choices (up to 2)
// //     4. Expected nutritional benefits
// //     5. Flavor combination rating (1-10)
    
// //     Format the response as JSON with these keys: base, ingredients, sweeteners, benefits, flavorRating`;

// //   try {
// //     const result = await model.generateContent(prompt);
// //     const response = await result.response;
// //     const text = response.text();
// //     return JSON.parse(text);
// //   } catch (error) {
// //     console.error('Error getting AI suggestions:', error);
// //     return null;
// //   }
// // }


// import { GoogleGenerativeAI } from '@google/generative-ai';

// // Initialize the Google Generative AI client with API key
// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// /**
//  * Gets protein/energy bar suggestions based on user preferences using Gemini API
//  * 
//  * @param preferences Object containing dietary restrictions, fitness goals, and flavor preferences
//  * @returns JSON object with bar recommendations
//  */
// export async function getBarSuggestions(preferences: {
//   dietary?: string[];
//   goals?: string[];
//   flavors?: string[];
// }) {
//   // Get the Gemini model
//   const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
  
//   // Construct the prompt for the AI
//   const prompt = `As a nutrition expert and flavor specialist, help design a protein/energy bar with these preferences:
//     ${preferences.dietary?.length ? `Dietary restrictions: ${preferences.dietary.join(', ')}` : ''}
//     ${preferences.goals?.length ? `Fitness goals: ${preferences.goals.join(', ')}` : ''}
//     ${preferences.flavors?.length ? `Preferred flavors: ${preferences.flavors.join(', ')}` : ''}
   
//     Please provide recommendations for:
//     1. Base selection
//     2. Power ingredients (up to 3)
//     3. Sweetener choices (up to 2)
//     4. Expected nutritional benefits
//     5. Flavor combination rating (1-10)
   
//     Format the response as JSON with these keys: base, ingredients, sweeteners, benefits, flavorRating`;
  
//   try {
//     // Generate content using the Gemini API
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
    
//     // Parse the JSON response
//     return JSON.parse(text);
//   } catch (error) {
//     console.error('Error getting AI suggestions:', error);
//     return null;
//   }
// }

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI client with API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

/**
 * Gets protein/energy bar suggestions based on user preferences using Gemini API
 * 
 * @param preferences Object containing dietary restrictions, fitness goals, and flavor preferences
 * @returns JSON object with bar recommendations
 */
export async function getBarSuggestions(preferences: {
  dietary?: string[];
  goals?: string[];
  flavors?: string[];
}) {
  // Get the Gemini model
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
  
  // Construct the prompt for the AI
  const prompt = `As a nutrition expert and flavor specialist, help design a protein/energy bar with these preferences:
    ${preferences.dietary?.length ? `Dietary restrictions: ${preferences.dietary.join(', ')}` : ''}
    ${preferences.goals?.length ? `Fitness goals: ${preferences.goals.join(', ')}` : ''}
    ${preferences.flavors?.length ? `Preferred flavors: ${preferences.flavors.join(', ')}` : ''}
   
    Please provide recommendations for:
    1. Base selection
    2. Power ingredients (up to 3)
    3. Sweetener choices (up to 2)
    4. Expected nutritional benefits
    5. Flavor combination rating (1-10)
   
    Format the response as JSON with these keys: base, ingredients, sweeteners, benefits, flavorRating
    
    IMPORTANT: Return ONLY the raw JSON with no additional text, markdown formatting, or code blocks.`;
  
  try {
    // Generate content using the Gemini API
    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    
    // Clean the response to extract just the JSON part
    // Remove markdown code blocks if present
    // if (text.includes('```json')) {
    //   text = text.replace(/```json\s*/, '').replace(/\s*```\s*$/, '');
    // } else if (text.includes('```')) {
    //   text = text.replace(/```\s*/, '').replace(/\s*```\s*$/, '');
    // }
    
    // // Try to find JSON within the text if it's still not clean
    // let jsonMatch = text.match(/{[\s\S]*}/);
    // if (jsonMatch) {
    //   text = jsonMatch[0];
    // }
    
    // Parse the JSON response
    return JSON.parse(text);
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    // console.log('Raw response:', response?.text());
    
    // Fallback default response if parsing fails
    return {
      base: "Oat and rice protein blend",
      ingredients: ["Chia seeds", "Hemp hearts", "Maca powder"],
      sweeteners: ["Honey", "Stevia"],
      benefits: "Good source of protein and essential fatty acids",
      flavorRating: 7
    };
  }
};