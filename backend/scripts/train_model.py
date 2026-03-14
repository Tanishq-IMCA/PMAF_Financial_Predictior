import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import pickle
import os

def train_and_save_model():
    data_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'training_data.csv')
    model_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'models')
    model_path = os.path.join(model_dir, 'random_forest_model.pkl')
    
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
    
    # We want to predict the next Balance or Amount
    # Let's say we predict the amount spent based on the date and current balance
    features = [col for col in df.columns if col not in ['Date', 'Amount', 'Balance']]
    features.append('Balance') # Use current balance to predict next transaction amount
    
    # Create target variable (Shift Amount up by 1 to predict next transaction)
    df['Target_Amount'] = df['Amount'].shift(-1)
    df = df.dropna()
    
    X = df[features]
    y = df['Target_Amount']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training Random Forest Model...")
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    predictions = model.predict(X_test)
    mse = mean_squared_error(y_test, predictions)
    print(f"Model trained. Mean Squared Error: {mse:.2f}")
    
    os.makedirs(model_dir, exist_ok=True)
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)
    print(f"Model saved to {model_path}")

if __name__ == "__main__":
    train_and_save_model()
