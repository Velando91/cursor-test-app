# Meal Planner App

A simple React app to select meals and view their ingredients.

## Features

- Browse a list of meals from a dropdown
- View ingredients needed for each selected meal
- Mark ingredients as completed when shopping
- Star favorite meals for quick access
- Clean and modern UI with sidebar navigation
- Backend API with PostgreSQL database

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express
- **Database**: PostgreSQL (with pg)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm
- PostgreSQL (see setup options below)

### Database Setup

**Option 1: Docker (Recommended)**
```bash
docker run --name meal-planner-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=meal_planner -p 5432:5432 -d postgres
```

**Option 2: Install PostgreSQL locally**
Download from https://www.postgresql.org/download/

**Option 3: Use a cloud provider**
- Supabase (free tier)
- Railway (free tier)
- Render (free tier)

See `backend/DATABASE_SETUP.md` for detailed instructions.

### Installation

1. Clone or download this repository

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Create `.env` file in the `backend` directory:
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/meal_planner
```

### Running the Application

#### Option 1: Run both servers together (recommended)

From the root directory:
```bash
npm run dev
```

This will start both the backend and frontend servers simultaneously.

#### Option 2: Run servers separately

1. Set up the database (see Database Setup above)

2. Start the backend server (in the `backend` directory):
```bash
cd backend
npm start
```

The backend will run on http://localhost:3001 and automatically create tables and seed data.

2. In a new terminal, start the frontend (in the `frontend` directory):
```bash
cd frontend
npm run dev
```

The frontend will run on http://localhost:5173

3. Open your browser and navigate to http://localhost:5173

## Sample Data

The app comes pre-loaded with 5 meals:
- Spaghetti Carbonara
- Chicken Stir Fry
- Chocolate Chip Cookies
- Caesar Salad
- Grilled Salmon

## Project Structure

```
ReactProj/
├── frontend/              # React app
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── types.ts      # TypeScript types
│   │   └── App.tsx       # Main component
│   └── package.json
├── backend/               # Express server
│   ├── server.js         # Main server file
│   ├── DATABASE_SETUP.md # Database setup guide
│   └── package.json
└── README.md
```

## API Endpoints

- `GET /api/meals` - Get all meals
- `GET /api/meals/:id/ingredients` - Get ingredients for a specific meal
- `GET /api/health` - Health check

## Adding New Meals

You can add more meals to the database by modifying the `initDatabase()` function in `backend/server.js`. The data is stored in PostgreSQL.

## Future Enhancements

- Add meal search functionality
- Add cooking instructions
- Implement user authentication
- Add shopping list export feature
- Add meal images

