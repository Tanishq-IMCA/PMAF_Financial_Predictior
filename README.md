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

---

## Features

### Dashboard
-   **Interactive Balance Forecast**: A line graph showing historical and predicted balance with weekly/monthly filters.
-   **"Danger Zone" Transition**: The predictive line dynamically changes color to red as the projected balance approaches zero.
-   **Metrics Panel**: Displays current balance, projected zero balance date, monthly spend, and average transaction amount.
-   **AI Insights & Predictions**: Text-based warnings and AI-driven insights into spending behavior.
-   **Model Performance**: A comparison table of different ML models (RMSE, R²).

### Reports Page
-   **Spending Breakdown**: A detailed analysis of spending habits.
-   **Donut Chart**: Visualizes spending percentages by category.
-   **Top 2 Category Comparison**: A multi-line chart comparing spending trends of the top two expense categories over time.
-   **Time-based Filtering**: Both the Dashboard and Reports pages feature weekly and monthly data filters.

---

## Project Roadmap

### Core Features
- [x] **Backend API**: Flask API to serve historical data, predictions, and model metrics.
- [x] **Machine Learning Pipeline**: Scripts to generate realistic data and train multiple regression models.
- [x] **Dynamic Model Selection**: Automatically uses the best-performing model for predictions.
- [x] **Multi-Page Frontend**: React application with a floating navigation bar.
- [x] **Dashboard Layout**: A refined, responsive layout for all primary data panels.
- [x] **Spending Breakdown Reports**: A dedicated page for detailed spending analysis with multiple charts.
- [x] **Time-based Filtering**: Implemented weekly and monthly filters for all relevant charts.

### Future Enhancements
- [ ] Integrate a concise bar chart into `MetricsPanel.jsx` to show "Yesterday's Spend," "Today's Spend," and "Tomorrow's Predicted Spend".
- [ ] Add user authentication and the ability to upload personal financial data.
- [ ] Enhance the "AI Insights" to be dynamically generated based on user data.

---

## Setup Instructions

### Prerequisites
-   Python 3.x
-   Node.js and npm

### 1. Backend Setup
```bash
cd backend
py -m pip install -r requirements.txt
py scripts/data_generator.py
py scripts/train_model.py
py app.py
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```

---

## Contributing

As this is a personal project, direct contributions are not sought. However, feel free to draw inspiration from the code for your own projects, respecting the proprietary nature of the work.
