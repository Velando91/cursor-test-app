const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize PostgreSQL database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize the database with sample data
async function initDatabase() {
  try {
    // Create meals table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS meals (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT
      );

      CREATE TABLE IF NOT EXISTS ingredients (
        id SERIAL PRIMARY KEY,
        meal_id INTEGER NOT NULL,
        name VARCHAR(255) NOT NULL,
        quantity VARCHAR(255),
        FOREIGN KEY (meal_id) REFERENCES meals(id) ON DELETE CASCADE
      );
    `);

    // Check if data already exists
    const countResult = await pool.query('SELECT COUNT(*) FROM meals');
    const mealCount = parseInt(countResult.rows[0].count);
    
    if (mealCount === 0) {
      // Insert sample data
      const meals = [
        { name: 'Spaghetti Carbonara', description: 'Classic Italian pasta dish' },
        { name: 'Chicken Stir Fry', description: 'Quick and healthy stir fry' },
        { name: 'Chocolate Chip Cookies', description: 'Delicious homemade cookies' },
        { name: 'Caesar Salad', description: 'Fresh and crisp salad' },
        { name: 'Grilled Salmon', description: 'Healthy and flavorful fish' }
      ];

      for (const meal of meals) {
        const mealResult = await pool.query(
          'INSERT INTO meals (name, description) VALUES ($1, $2) RETURNING id',
          [meal.name, meal.description]
        );
        const mealId = mealResult.rows[0].id;

        const ingredientsMap = {
          'Spaghetti Carbonara': [
            { name: 'Spaghetti', quantity: '400g' },
            { name: 'Bacon', quantity: '200g' },
            { name: 'Eggs', quantity: '4' },
            { name: 'Parmesan cheese', quantity: '100g' },
            { name: 'Black pepper', quantity: 'to taste' }
          ],
          'Chicken Stir Fry': [
            { name: 'Chicken breast', quantity: '500g' },
            { name: 'Bell peppers', quantity: '2' },
            { name: 'Broccoli', quantity: '300g' },
            { name: 'Soy sauce', quantity: '3 tbsp' },
            { name: 'Ginger', quantity: '1 tbsp' }
          ],
          'Chocolate Chip Cookies': [
            { name: 'Flour', quantity: '2 cups' },
            { name: 'Butter', quantity: '1 cup' },
            { name: 'Sugar', quantity: '1 cup' },
            { name: 'Chocolate chips', quantity: '1 cup' },
            { name: 'Vanilla extract', quantity: '1 tsp' }
          ],
          'Caesar Salad': [
            { name: 'Romaine lettuce', quantity: '1 head' },
            { name: 'Caesar dressing', quantity: '1/2 cup' },
            { name: 'Parmesan cheese', quantity: '50g' },
            { name: 'Croutons', quantity: '1 cup' }
          ],
          'Grilled Salmon': [
            { name: 'Salmon fillets', quantity: '4' },
            { name: 'Lemon', quantity: '2' },
            { name: 'Olive oil', quantity: '2 tbsp' },
            { name: 'Dill', quantity: '2 tbsp' },
            { name: 'Salt and pepper', quantity: 'to taste' }
          ]
        };

        const ingredients = ingredientsMap[meal.name] || [];
        for (const ingredient of ingredients) {
          await pool.query(
            'INSERT INTO ingredients (meal_id, name, quantity) VALUES ($1, $2, $3)',
            [mealId, ingredient.name, ingredient.quantity]
          );
        }
      }
      console.log('Sample data inserted successfully');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Initialize database on startup
initDatabase();

// Routes

// Get all meals
app.get('/api/meals', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM meals ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get ingredients for a specific meal
app.get('/api/meals/:id/ingredients', async (req, res) => {
  try {
    const mealId = req.params.id;
    const result = await pool.query(
      'SELECT name, quantity FROM ingredients WHERE meal_id = $1',
      [mealId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'connected' });
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Connected to PostgreSQL database');
});
