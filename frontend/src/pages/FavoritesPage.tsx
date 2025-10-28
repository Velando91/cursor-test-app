import { Meal } from '../types';
import '../App.css';

interface FavoritesPageProps {
  favoriteMeals: Set<number>;
  meals: Meal[];
  onMealClick: (mealId: number) => void;
  onToggleFavorite: (mealId: number | null) => void;
}

export function FavoritesPage({ favoriteMeals, meals, onMealClick, onToggleFavorite }: FavoritesPageProps) {
  const favoriteMealsList = meals.filter(meal => favoriteMeals.has(meal.id));

  return (
    <div className="favorites-page">
      {favoriteMealsList.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">⭐</p>
          <h2>No favorites yet</h2>
          <p>Star a meal from the Home page to see it here!</p>
        </div>
      ) : (
        <>
          <h2>Your Favorite Meals</h2>
          <div className="favorites-list">
            {favoriteMealsList.map(meal => (
              <div 
                key={meal.id} 
                className="favorite-meal-card"
                onClick={() => onMealClick(meal.id)}
              >
                <div className="meal-info">
                  <h3>{meal.name}</h3>
                  <p>{meal.description}</p>
                </div>
                <button 
                  className="star-button starred"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(meal.id);
                  }}
                  title="Remove from favorites"
                >
                  ⭐
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

