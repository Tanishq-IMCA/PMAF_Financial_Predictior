from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import os
import pickle
from datetime import timedelta

app = Flask(__name__)
CORS(app) # Allow React frontend to access

DATA_PATH = os.path.join(os.path.dirname(__file__), 'data', 'user_history.csv')
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'models', 'random_forest_model.pkl')

@app.route('/api/historical_data', methods=['GET'])
def get_historical_data():
    if not os.path.exists(DATA_PATH):
        return jsonify({"error": "Data file not found"}), 404
        
    df = pd.read_csv(DATA_PATH)
    # Convert to list of dicts for JSON
    data = df.to_dict(orient='records')
    return jsonify(data)

@app.route('/api/predictions', methods=['GET'])
def get_predictions():
    if not os.path.exists(DATA_PATH) or not os.path.exists(MODEL_PATH):
        return jsonify({"error": "Data or Model not found"}), 404
        
    df = pd.read_csv(DATA_PATH)
    with open(MODEL_PATH, 'rb') as f:
        model = pickle.load(f)
        
    # Mocking prediction logic for the dashboard line
    # In a real scenario, you'd use the model iteratively to predict future days
    
    last_date = pd.to_datetime(df['Date'].iloc[-1])
    last_balance = df['Balance'].iloc[-1]
    
    predictions = []
    current_date = last_date
    current_balance = last_balance
    
    # Simulate predicting next 30 days
    for _ in range(30):
        current_date += timedelta(days=1)
        # Simplified prediction for demonstration: slightly random downward trend
        predicted_spend = abs(np.random.normal(loc=50, scale=20)) if np.random.random() > 0.3 else 0
        current_balance -= predicted_spend
        
        predictions.append({
            'Date': current_date.strftime("%Y-%m-%d"),
            'Predicted_Balance': round(current_balance, 2),
            'Danger_Zone': current_balance < 1000 # Flag for UI to turn red
        })
        
        if current_balance <= 0:
            break # Reached $0
            
    return jsonify({
        "predictions": predictions,
        "day_of_reckoning": current_date.strftime("%Y-%m-%d") if current_balance <= 0 else None,
        "insights": [
            "You are projected to overspend on Transportation by 20% this month.",
            "Based on last year, expect a 30% spike in expenses next month due to holiday seasonality."
        ]
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
