import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './pages/HomePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AboutPage } from './pages/AboutPage';
import { Meal } from './types';

function App() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [favoriteMeals, setFavoriteMeals] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState<'home' | 'favorites' | 'about'>('home');

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteMeals');
    if (savedFavorites) {
      setFavoriteMeals(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

    // Fetch meals from backend
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/meals');
        setMeals(response.data);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();
  }, []);

  const toggleFavorite = (mealId: number | null) => {
    if (mealId) {
      setFavoriteMeals(prev => {
        const newSet = new Set(prev);
        if (newSet.has(mealId)) {
          newSet.delete(mealId);
        } else {
          newSet.add(mealId);
        }
        // Save to localStorage
        localStorage.setItem('favoriteMeals', JSON.stringify(Array.from(newSet)));
        return newSet;
      });
    }
  };

  const handleMealClick = (mealId: number) => {
    setCurrentPage('home');
    // Note: This will work when we add state management to track selected meal in App
  };

  return (
    <div className="app">
      <div className="app-layout">
        {/* Sidebar Navigation */}
        <Sidebar 
          currentPage={currentPage} 
          favoriteCount={favoriteMeals.size}
          onPageChange={setCurrentPage}
        />

        {/* Main Content */}
        <div className="main-content">
          <div className="container">
            {currentPage === 'home' ? (
              <HomePage 
                meals={meals}
                favoriteMeals={favoriteMeals}
                onToggleFavorite={toggleFavorite}
              />
            ) : currentPage === 'favorites' ? (
              <FavoritesPage 
                meals={meals}
                favoriteMeals={favoriteMeals}
                onMealClick={handleMealClick}
                onToggleFavorite={toggleFavorite}
              />
            ) : (
              <AboutPage />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
