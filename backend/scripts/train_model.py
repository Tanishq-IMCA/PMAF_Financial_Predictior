import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import pickle
import os
import json

def train_and_save_models():
    data_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'training_data.csv')
    model_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'models')
    
    if not os.path.exists(data_path):
        print(f"Error: Training data not found at {data_path}. Run data_generator.py first.")
        return

    print("Loading training data...")
    df = pd.read_csv(data_path)
    
    # Feature Engineering
    df['Date'] = pd.to_datetime(df['Date'])
    df['Year'] = df['Date'].dt.year
    df['Month'] = df['Date'].dt.month
    df['Day'] = df['Date'].dt.day
    df['DayOfWeek'] = df['Date'].dt.dayofweek
    df['IsWeekend'] = df['DayOfWeek'].apply(lambda x: 1 if x >= 5 else 0)
    
    # One-hot encoding for categories
    df = pd.get_dummies(df, columns=['Category'], drop_first=True)
    
    # We want to predict the next Amount (spending) based on current state
    features = [col for col in df.columns if col not in ['Date', 'Amount', 'Balance', 'Target_Amount']] # Exclude target from features
    features.append('Balance') # Use current balance to predict next transaction amount
    
    # Create target variable (Shift Amount up by 1 to predict next transaction)
    df['Target_Amount'] = df['Amount'].shift(-1)
    df = df.dropna()
    
    X = df[features]
    y = df['Target_Amount']

    # Save the list of feature columns for app.py to use
    with open(os.path.join(model_dir, 'training_columns.json'), 'w') as f:
        json.dump({'columns': features}, f, indent=4)
    print(f"Training columns saved to {os.path.join(model_dir, 'training_columns.json')}")
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Ensure model directory exists
    os.makedirs(model_dir, exist_ok=True)

    models = {
        'RandomForest': RandomForestRegressor(n_estimators=100, random_state=42),
        'LinearRegression': LinearRegression(),
        'GradientBoosting': GradientBoostingRegressor(n_estimators=100, random_state=42)
    }

    model_performance = {}
    best_model_name = None
    best_rmse = float('inf')

    for name, model in models.items():
        print(f"Training {name} Model...")
        model.fit(X_train, y_train)
        predictions = model.predict(X_test)
        
        rmse = np.sqrt(mean_squared_error(y_test, predictions))
        r2 = r2_score(y_test, predictions)
        
        model_performance[name] = {
            'rmse': round(rmse, 2),
            'r2_score': round(r2, 2)
        }
        print(f"{name} - RMSE: {rmse:.2f}, R2: {r2:.2f}")

        if rmse < best_rmse:
            best_rmse = rmse
            best_model_name = name
            
        # Save each trained model
        with open(os.path.join(model_dir, f'{name.lower()}_model.pkl'), 'wb') as f:
            pickle.dump(model, f)
            
    print(f"\nBest Model: {best_model_name} with RMSE: {best_rmse:.2f}")

    # Save the best model to the generic model.pkl path for app.py to use
    with open(os.path.join(model_dir, 'best_model.pkl'), 'wb') as f:
        pickle.dump(models[best_model_name], f)
    print(f"Best model '{best_model_name}' saved to {os.path.join(model_dir, 'best_model.pkl')}")

    # Save model comparison data
    comparison_data = {
        'best_model': best_model_name,
        'performance': model_performance
    }
    with open(os.path.join(model_dir, 'model_comparison.json'), 'w') as f:
        json.dump(comparison_data, f, indent=4)
    print(f"Model comparison data saved to {os.path.join(model_dir, 'model_comparison.json')}")


if __name__ == "__main__":
    train_and_save_models()
