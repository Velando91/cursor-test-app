import '../App.css';

interface SidebarProps {
  currentPage: 'home' | 'favorites' | 'about';
  favoriteCount: number;
  onPageChange: (page: 'home' | 'favorites' | 'about') => void;
}

export function Sidebar({ currentPage, favoriteCount, onPageChange }: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>🥘 Meal Planner</h1>
      </div>
      <nav className="sidebar-nav">
        <button 
          className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => onPageChange('home')}
        >
          🏠 Home
        </button>
        <button 
          className={`nav-item ${currentPage === 'favorites' ? 'active' : ''}`}
          onClick={() => onPageChange('favorites')}
        >
          ⭐ Favorites {favoriteCount > 0 && `(${favoriteCount})`}
        </button>
        <button 
          className={`nav-item ${currentPage === 'about' ? 'active' : ''}`}
          onClick={() => onPageChange('about')}
        >
          ℹ️ About
        </button>
      </nav>
    </div>
  );
}

