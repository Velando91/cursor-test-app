import '../App.css';

export function AboutPage() {
  return (
    <div className="about-page">
      <h2>About Meal Planner</h2>
      
      <div className="about-section">
        <p>
          Meal Planner is a simple and intuitive app designed to help you manage your cooking journey.
          Browse through a collection of delicious meals, discover what ingredients you need, and keep
          track of your favorites.
        </p>
      </div>

      <div className="about-section">
        <h3>✨ Features</h3>
        <ul className="features-list">
          <li>
            <strong>Browse Meals:</strong> Select from a variety of delicious recipes and see their ingredients
          </li>
          <li>
            <strong>Track Ingredients:</strong> Check off ingredients as you gather them while shopping
          </li>
          <li>
            <strong>Favorites:</strong> Star your favorite meals for quick access later
          </li>
          <li>
            <strong>Easy Navigation:</strong> Switch between your meal library and favorites with ease
          </li>
        </ul>
      </div>

      <div className="about-section">
        <h3>📋 How to Use</h3>
        <ol className="how-to-list">
          <li>Start by selecting a meal from the Home page</li>
          <li>View the ingredients needed to cook the meal</li>
          <li>Click on ingredients to mark them as you collect them</li>
          <li>Star meals you love to save them to your Favorites</li>
          <li>Visit Favorites anytime to quickly access your preferred meals</li>
        </ol>
      </div>

      <div className="about-section">
        <p className="about-footer">
          Enjoy cooking! 🍳
        </p>
      </div>
    </div>
  );
}

