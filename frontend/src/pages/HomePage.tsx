import { useState, useEffect } from 'react';
import axios from 'axios';
import { Meal, Ingredient } from '../types';
import '../App.css';

interface HomePageProps {
  meals: Meal[];
  favoriteMeals: Set<number>;
  onToggleFavorite: (mealId: number | null) => void;
}

export function HomePage({ meals, favoriteMeals, onToggleFavorite }: HomePageProps) {
  const [selectedMealId, setSelectedMealId] = useState<number | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [completedIngredients, setCompletedIngredients] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch ingredients when a meal is selected
    if (selectedMealId) {
      setLoading(true);
      setCompletedIngredients(new Set());
      const apiBase = (import.meta as any).env.VITE_API_URL;
      axios.get(`${apiBase}/api/meals/${selectedMealId}/ingredients`)
        .then(response => {
          setIngredients(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching ingredients:', error);
          setLoading(false);
        });
    } else {
      setIngredients([]);
      setCompletedIngredients(new Set());
    }
  }, [selectedMealId]);

  const toggleIngredient = (index: number) => {
    setCompletedIngredients(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleMealChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mealId = e.target.value ? parseInt(e.target.value) : null;
    setSelectedMealId(mealId);
  };

  return (
    <>
      <p className="subtitle">Select a meal to see what you'll need to cook</p>

      <div className="meal-selector">
        <label htmlFor="meal-select">Choose a meal:</label>
        <select
          id="meal-select"
          value={selectedMealId || ''}
          onChange={handleMealChange}
          className="select-box"
        >
          <option value="">-- Select a meal --</option>
          {meals.map(meal => (
            <option key={meal.id} value={meal.id}>
              {meal.name}
            </option>
          ))}
        </select>
      </div>

      {selectedMealId && (
        <div className="ingredients-container">
          <div className="ingredients-header">
            <h2>Ingredients needed:</h2>
            <button 
              onClick={() => onToggleFavorite(selectedMealId)}
              className={`star-button ${favoriteMeals.has(selectedMealId) ? 'starred' : ''}`}
              title={favoriteMeals.has(selectedMealId) ? 'Remove from favorites' : 'Add to favorites'}
            >
              ⭐
            </button>
          </div>
          {loading ? (
            <p>Loading ingredients...</p>
          ) : ingredients.length > 0 ? (
            <ul className="ingredients-list">
              {ingredients.map((ingredient, index) => {
                const isCompleted = completedIngredients.has(index);
                return (
                  <li 
                    key={index} 
                    onClick={() => toggleIngredient(index)}
                    className={`ingredient-item ${isCompleted ? 'completed' : ''}`}
                  >
                    <span className="ingredient-name">{ingredient.name}</span>
                    {ingredient.quantity && (
                      <span className="ingredient-quantity">{ingredient.quantity}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No ingredients found for this meal.</p>
          )}
        </div>
      )}
    </>
  );
}

