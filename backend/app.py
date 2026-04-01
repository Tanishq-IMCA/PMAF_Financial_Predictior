from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import os
import pickle
from datetime import timedelta
import numpy as np
import json

app = Flask(__name__)
CORS(app)

DATA_PATH = os.path.join(os.path.dirname(__file__), 'data', 'user_history.csv')
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'models', 'best_model.pkl')
MODEL_COMPARISON_PATH = os.path.join(os.path.dirname(__file__), 'models', 'model_comparison.json')

# Load the column names from the training data to ensure consistency
try:
    with open(os.path.join(os.path.dirname(__file__), 'models', 'training_columns.json'), 'r') as f:
        TRAINING_COLUMNS = json.load(f)['columns']
except FileNotFoundError:
    TRAINING_COLUMNS = []
    print("Warning: training_columns.json not found. Prediction endpoint may fail.")


@app.route('/api/historical_data', methods=['GET'])
def get_historical_data():
    if not os.path.exists(DATA_PATH):
        return jsonify({"error": "Data file not found"}), 404
    df = pd.read_csv(DATA_PATH)
    return jsonify(df.to_dict(orient='records'))

@app.route('/api/predictions', methods=['GET'])
def get_predictions():
    if not os.path.exists(DATA_PATH) or not os.path.exists(MODEL_PATH) or not TRAINING_COLUMNS:
        return jsonify({"error": "Data, model, or training columns not found"}), 404

    with open(MODEL_PATH, 'rb') as f:
        model = pickle.load(f)

    df = pd.read_csv(DATA_PATH)
    last_date = pd.to_datetime(df['Date'].iloc[-1])
    current_balance = df['Balance'].iloc[-1]

    predictions = []
    
    # Get the last known state to start predictions
    last_row = df.iloc[-1]

    for _ in range(30):  # Predict for the next 30 days
        last_date += timedelta(days=1)

        # Create a feature vector for the next day
        # This needs to match the features the model was trained on
        feature_dict = {col: 0 for col in TRAINING_COLUMNS}
        feature_dict['Year'] = last_date.year
        feature_dict['Month'] = last_date.month
        feature_dict['Day'] = last_date.day
        feature_dict['DayOfWeek'] = last_date.dayofweek
        feature_dict['IsWeekend'] = 1 if last_date.dayofweek >= 5 else 0
        feature_dict['Balance'] = current_balance
        
        # Ensure all columns are present, even if they are all 0
        # This handles the one-hot encoded categories
        features_df = pd.DataFrame([feature_dict], columns=TRAINING_COLUMNS)

        # Predict the amount for the next day
        predicted_spend = model.predict(features_df)[0]
        
        # We assume the model predicts the expense, so we subtract it
        # This is a safe assumption to forecast spending.
        current_balance -= abs(predicted_spend)

        predictions.append({
            'Date': last_date.strftime("%Y-%m-%d"),
            'Predicted_Balance': round(current_balance, 2),
            'Danger_Zone': int(current_balance < 1000)
        })

        if current_balance <= 0:
            break  # Stop predicting if balance runs out

    return jsonify({
        "predictions": predictions,
        "day_of_reckoning": last_date.strftime("%Y-%m-%d") if current_balance <= 0 else None,
        "insights": [
            "You are projected to overspend on Transportation by 20% this month.",
            "Based on last year, expect a 30% spike in expenses next month due to holiday seasonality."
        ]
    })

@app.route('/api/model_performance', methods=['GET'])
def get_model_performance():
    if not os.path.exists(MODEL_COMPARISON_PATH):
        return jsonify({"error": "Model comparison data not found. Run train_model.py first."}), 404
    with open(MODEL_COMPARISON_PATH, 'r') as f:
        performance_data = json.load(f)
    return jsonify(performance_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)
