# Database Setup Guide

This project uses **PostgreSQL** for data storage.

## Quick Setup Options

### Option 1: Docker (Recommended - Easiest)

1. Install Docker Desktop from https://www.docker.com/products/docker-desktop

2. Run PostgreSQL container:
```bash
docker run --name meal-planner-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=meal_planner -p 5432:5432 -d postgres
```

3. Create a `.env` file in the `backend` folder:
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/meal_planner
```

4. That's it! The database will be created automatically when you start the server.

### Option 2: Local PostgreSQL Installation

1. Install PostgreSQL from https://www.postgresql.org/download/

2. Create a database:
```bash
createdb meal_planner
```

3. Create a `.env` file in the `backend` folder:
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/meal_planner
```

### Option 3: Cloud PostgreSQL (for deployment)

Use a free PostgreSQL database from:
- **Supabase** (https://supabase.com) - Free tier available
- **Railway** (https://railway.app) - Free tier available
- **Render** (https://render.com) - Free PostgreSQL included

They'll provide the `DATABASE_URL` automatically.

## Running the Server

Once PostgreSQL is set up and `.env` is configured:

```bash
cd backend
npm start
```

The server will:
1. Connect to PostgreSQL
2. Create tables automatically
3. Seed sample data if the database is empty

## Troubleshooting

**"Database connection error"**
- Make sure PostgreSQL is running
- Check your `.env` file has the correct DATABASE_URL
- Verify the database exists

**"relation does not exist"**
- The tables will be created automatically on first run
- Just restart the server

**Port 5432 already in use**
- Another PostgreSQL instance might be running
- Change the port in docker run or use a different port

