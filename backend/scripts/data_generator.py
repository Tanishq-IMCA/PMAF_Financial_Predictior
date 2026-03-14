import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta
import os

def generate_financial_data(num_entries, start_date_str, filename, initial_balance=5000):
    start_date = datetime.strptime(start_date_str, "%Y-%m-%d")
    current_date = start_date
    
    categories = ['Housing', 'Transportation', 'Groceries', 'Utilities', 'Healthcare', 'Insurance', 'Personal/Entertainment']
    
    data = []
    current_balance = initial_balance
    entries_created = 0
    
    while entries_created < num_entries:
        # Determine if we skip the day (stay at home) - 30% chance to skip
        if random.random() < 0.30:
            current_date += timedelta(days=1)
            continue
            
        # Determine number of transactions for the day (1 to 4)
        num_transactions = random.randint(1, 4)
        
        for _ in range(num_transactions):
            if entries_created >= num_entries:
                break
                
            # Seasonality: higher chance of Personal/Entertainment in Nov/Dec
            month = current_date.month
            
            cat_weights = [0.1, 0.15, 0.25, 0.1, 0.05, 0.05, 0.3] # Default weights
            
            if month in [11, 12]:
                cat_weights = [0.05, 0.15, 0.2, 0.05, 0.05, 0.05, 0.45] # Holidays!
            
            category = random.choices(categories, weights=cat_weights, k=1)[0]
            
            # Amount based on category
            if category == 'Housing':
                amount = random.uniform(800, 2000)
            elif category == 'Utilities':
                amount = random.uniform(50, 300)
            elif category == 'Groceries':
                amount = random.uniform(20, 150)
            elif category == 'Transportation':
                amount = random.uniform(10, 80)
            elif category == 'Healthcare':
                amount = random.uniform(50, 500)
            elif category == 'Insurance':
                amount = random.uniform(100, 300)
            else: # Personal
                amount = random.uniform(10, 400)
                
            amount = round(amount, 2)
            current_balance -= amount
            
            # Once a month, get paid (simplification)
            if current_date.day == 1 and _ == 0:
                salary = random.uniform(3000, 6000)
                current_balance += salary
                data.append({
                    'Date': current_date.strftime("%Y-%m-%d"),
                    'Category': 'Income',
                    'Amount': round(salary, 2),
                    'Balance': round(current_balance, 2)
                })
                entries_created += 1
                if entries_created >= num_entries:
                    break
            
            data.append({
                'Date': current_date.strftime("%Y-%m-%d"),
                'Category': category,
                'Amount': -amount,
                'Balance': round(current_balance, 2)
            })
            entries_created += 1
            
        current_date += timedelta(days=1)
        
    df = pd.DataFrame(data)
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    
    df.to_csv(filename, index=False)
    print(f"Generated {entries_created} records in {filename}")

if __name__ == "__main__":
    # Module 1: Generates the chaotic, realistic CSVs
    data_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')
    
    # 1. Training Data (~1500 entries)
    generate_financial_data(
        num_entries=1500, 
        start_date_str="2018-01-01", 
        filename=os.path.join(data_dir, 'training_data.csv')
    )
    
    # 2. User History Data (Recent data for dashboard)
    generate_financial_data(
        num_entries=500, 
        start_date_str="2022-01-01", 
        filename=os.path.join(data_dir, 'user_history.csv')
    )
