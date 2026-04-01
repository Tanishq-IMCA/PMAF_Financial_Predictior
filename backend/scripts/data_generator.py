import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta
import os

def generate_financial_data(num_entries, start_date_str, filename, initial_balance=5000):
    start_date = datetime.strptime(start_date_str, "%Y-%m-%d")
    
    categories = ['Housing', 'Transportation', 'Groceries', 'Utilities', 'Healthcare', 'Insurance', 'Personal/Entertainment']
    
    data = []
    
    # --- Logic: Generate transactions first, then calculate balance ---
    
    # Create a pool of dates to draw from
    date_pool = []
    current_date = start_date
    while len(date_pool) < num_entries * 2: # Create a large pool of potential days
        if random.random() < 0.70:
            num_transactions = random.randint(1, 4)
            for _ in range(num_transactions):
                date_pool.append(current_date)
        current_date += timedelta(days=1)

    random.shuffle(date_pool)

    # Generate salary deposits for the first of each month
    all_dates = sorted(list(set(date_pool)))
    first_of_months = sorted(list(set([d.replace(day=1) for d in all_dates])))

    for d in first_of_months:
        # INCREASED SALARY to ensure positive cash flow
        salary = random.uniform(7000, 9500)
        data.append({
            'Date': d,
            'Category': 'Income',
            'Amount': round(salary, 2)
        })

    # Generate expense transactions
    for i in range(num_entries):
        entry_date = date_pool[i]
        month = entry_date.month
        
        cat_weights = [0.1, 0.15, 0.25, 0.1, 0.05, 0.05, 0.3] # Default
        if month in [11, 12]:
            cat_weights = [0.05, 0.15, 0.2, 0.05, 0.05, 0.05, 0.45] # Holidays
        
        category = random.choices(categories, weights=cat_weights, k=1)[0]
        
        # REDUCED EXPENSE AMOUNTS for realism
        if category == 'Housing': amount = random.uniform(1000, 2000)
        elif category == 'Utilities': amount = random.uniform(100, 300)
        elif category == 'Groceries': amount = random.uniform(40, 150)
        elif category == 'Transportation': amount = random.uniform(20, 80)
        elif category == 'Healthcare': amount = random.uniform(50, 400)
        elif category == 'Insurance': amount = random.uniform(150, 300)
        else: amount = random.uniform(20, 300) # Personal/Entertainment
            
        data.append({
            'Date': entry_date,
            'Category': category,
            'Amount': -round(amount, 2)
        })

    # --- Create DataFrame and Calculate Balance Cumulatively ---
    df = pd.DataFrame(data)
    df['Date'] = pd.to_datetime(df['Date'])
    df = df.sort_values(by='Date').reset_index(drop=True)
    
    # Calculate balance using cumulative sum
    df['Balance'] = initial_balance + df['Amount'].cumsum()
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    
    df['Date'] = df['Date'].dt.strftime('%Y-%m-%d')
    df = df[['Date', 'Category', 'Amount', 'Balance']] # Reorder columns
    
    df.to_csv(filename, index=False)
    print(f"Generated {len(df)} records in {filename} with re-balanced logic.")

if __name__ == "__main__":
    data_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')
    
    generate_financial_data(
        num_entries=1500, 
        start_date_str="2020-01-01", 
        filename=os.path.join(data_dir, 'training_data.csv')
    )
    
    generate_financial_data(
        num_entries=500, 
        start_date_str="2023-01-01",
        filename=os.path.join(data_dir, 'user_history.csv')
    )
