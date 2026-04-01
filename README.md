# PMAF Financial Predictor

A machine learning-powered financial dashboard featuring realistic data generation, predictive forecasting using a Random Forest algorithm, and a modern "glassmorphism" React UI.

## Features

- **Realistic Data Generation**: Simulates human financial behavior, including multi-transaction days, skipped days, fixed vs. variable costs, and holiday seasonality.
- **Machine Learning**: Uses a Random Forest Regressor to learn spending patterns and predict future account balances.
- **Predictive Analytics**: Calculates the "Day of Reckoning" (when the balance is projected to hit $0) and provides actionable insights.
- **Glassmorphism UI**: A sleek, modern dashboard built with React and Chart.js, featuring a dynamic chart where the predictive line transitions to red as it enters the "Danger Zone" (low balance).

## Project Structure

- `backend/`: Python backend with Flask, Scikit-learn, and data generation scripts.
  - `scripts/data_generator.py`: Generates chaotic, realistic financial CSV data.
  - `scripts/train_model.py`: Trains the Random Forest model.
  - `app.py`: Flask API to serve data to the frontend.
- `frontend/`: React frontend with Chart.js for data visualization.

## Setup Instructions

### Prerequisites
- Python 3.x
- Node.js and npm

### 1. Backend Setup

Open a terminal and navigate to the `backend` directory:

```bash
cd backend

# Install Python dependencies
py -m pip install -r requirements.txt

# Generate the realistic data CSVs
py scripts/data_generator.py

# Train the Random Forest model
py scripts/train_model.py

# Start the Flask API server
py app.py
```
*(The server will start on `http://localhost:5000`)*

### 2. Frontend Setup

Open a new, separate terminal and navigate to the `frontend` directory:

```bash
cd frontend

# Install Node dependencies
npm install

# Start the React development server
npm start
```
*(The application will automatically open in your browser at `http://localhost:3000`)*
