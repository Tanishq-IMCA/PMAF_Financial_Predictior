<div align="center">
  <h1>The Axiom</h1>
  <p>An AI-powered financial dashboard for predictive forecasting, built with a Python backend and a modern, glassmorphism React frontend.</p>
</div>

<br><br>

> [!CAUTION]
> **PROPRIETARY AND CONFIDENTIAL**
>
> This project, along with the associated codebase, constitutes the proprietary and strictly confidential intellectual property of the originating developer.
>
> **UNAUTHORIZED USE IS STRICTLY PROHIBITED.**
> You may not copy, distribute, transmit, reproduce, publish, modify, or create derivative works from this source material without the explicit, documented authorization of the chief developer. Any unauthorized replication, reverse engineering, or dissemination of these proprietary systems will be subject to immediate legal action and aggressive prosecution under applicable intellectual property laws.
>
> *This repository does NOT grant an open-source license. All rights are explicitly reserved.*

<br><br>

---

### Status & Tech
<!-- Status Badges -->
<p align="center">
  <a href="#"><img alt="Maintained" src="https://img.shields.io/badge/Maintained%3F-yes-brightgreen.svg?style=for-the-badge"></a>
  <a href="#"><img alt="License" src="https://img.shields.io/badge/License-Proprietary-red.svg?style=for-the-badge"></a>
</p>

<!-- Tech Stack Badges -->
<p align="center">
  <a href="#"><img alt="Python" src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white"></a>
  <a href="#"><img alt="Flask" src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white"></a>
  <a href="#"><img alt="Scikit-learn" src="https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white"></a>
  <a href="#"><img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"></a>
  <a href="#"><img alt="React" src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"></a>
  <a href="#"><img alt="Chart.js" src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white"></a>
  <a href="#"><img alt="React Icons" src="https://img.shields.io/badge/React_Icons-E91E63?style=for-the-badge&logo=react-icons&logoColor=white"></a>
  <a href="#"><img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"></a>
  <a href="#"><img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"></a>
</p>

---

## About This Project

The Axiom is a sophisticated financial prediction software designed to provide users with insightful forecasts into their spending habits and account balance trajectories. It leverages machine learning to analyze historical financial data and predict future trends, all presented through a modern, intuitive glassmorphism user interface.

The project is structured into three core modules:

1.  **Realistic Data Generation**: A Python module (`data_generator.py`) that creates highly realistic financial transaction data, mimicking human spending patterns, including multi-transaction days, skipped days, recurring costs, and seasonal spikes. This generates both training data for the ML model and historical data for the dashboard.
2.  **Machine Learning Model Training**: Utilizes a Python module (`train_model.py`) to train a Random Forest Regressor on the generated data. The model learns to identify patterns in spending based on categories, time, and current balance to predict future transaction amounts.
3.  **Predictive Analytics & API**: A Flask API (`app.py`) serves the historical and predicted data to the frontend. It calculates key metrics like the "Zero Balance Date" and provides AI-driven insights into spending behavior.

The frontend, built with React, features a sleek glassmorphism design, a custom font, and a multi-page layout with a floating, icon-only navigation bar for a premium user experience.

---

## Dashboard Features

The Axiom dashboard provides a comprehensive and interactive overview of your financial health.

### Main Balance Forecast Chart
-   **Interactive Line Graph**: Displays your account balance over time.
-   **Historical Data**: Shown as a solid line, reflecting actual past spending.
-   **Predictive Data**: Extends into the future as a dotted line, forecasting your balance.
-   **"Danger Zone" Transition**: The predictive line dynamically changes color, transitioning to red as your projected balance approaches zero, providing an early warning.

### Metrics Panel
-   **Current Balance**: Your real-time account balance.
-   **Zero Balance Date**: The predicted date your account balance will hit $0 based on current spending velocity.
-   **Monthly Spend**: An overview of your spending for the current month (mock data for now).
-   **Avg. Transaction**: Your average transaction amount (mock data for now).

### Predictions Panel
-   **AI Insights**: Text-based predictions and warnings, such as projected overspending in categories or seasonal expense spikes.

### Navigation Bar
-   **Floating Glass Capsule**: A minimalist, icon-only navigation bar on the left side of the screen, styled with a glassmorphism effect.
-   **Pages**: Easily navigate between the Dashboard, Reports, and Settings.

### Reports & Settings Pages
-   Currently display a professional "Under Construction" message, ready for future expansion.

---

## Future Enhancements (TODO List)

This project is continuously evolving. Here are the planned next steps:

### Backend Enhancements
-   **Multiple Model Training**: Implement and train additional machine learning models (e.g., Linear Regression, Gradient Boosting) in `backend/scripts/train_model.py` alongside the existing Random Forest.
-   **Model Performance Comparison**: Calculate and compare Root Mean Squared Error (RMSE) and R-squared (R²) for all trained models to identify the "best" performing model.
-   **Dynamic Model Selection**: Automatically select the best-performing model for generating predictions on the dashboard.
-   **New API Endpoint**: Create a new API endpoint (`/api/model_performance`) in `backend/app.py` to expose model comparison metrics to the frontend.

### Frontend Enhancements
-   **Model Performance Panel**: Develop a new React component (`ModelPerformancePanel.jsx`) to display a clean, interactive table of all trained models' performance metrics (RMSE, R²), highlighting the best model.
-   **Spending Breakdown Donut Chart**: Create a `SpendingBreakdown.jsx` component featuring an interactive donut chart to visualize spending percentages per category. Hovering over a segment will reveal detailed amounts.
-   **Top Category Comparison Chart**: Implement a smaller multi-line chart within `SpendingBreakdown.jsx` to compare spending trends between the top two expense categories over a recent period.
-   **Daily Spend Bar Chart**: Integrate a concise bar chart into `MetricsPanel.jsx` to show "Yesterday's Spend," "Today's Spend," and "Tomorrow's Predicted Spend" for quick daily context.
-   **Integrate New Components**: Seamlessly integrate all new panels and charts into the `Dashboard.jsx` layout, maintaining the glassmorphism design.

---

## Setup Instructions

### Prerequisites
-   Python 3.x
-   Node.js and npm

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
*(The server will run on `http://0.0.0.0:5000`)*

### 2. Frontend Setup

Open a new, separate terminal and navigate to the `frontend` directory:

```bash
cd frontend

# Install Node dependencies (this will take a moment)
npm install

# Start the React development server
npm start
```
*(The application will automatically open in your browser at `http://localhost:3000`)*

---

## Contributing

As this is a personal project, direct contributions are not sought. However, feel free to draw inspiration from the code for your own projects, respecting the proprietary nature of the work.
