from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.ensemble import RandomForestClassifier  # or whatever model you're using
import joblib
import os
app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
MODEL_PATH = './dep_model.pkl'
if os.path.exists(MODEL_PATH):
    model = joblib.load(MODEL_PATH)
else:
    model = None
@app.route('/check', methods=['POST'])
def check_depression():
    data = request.json
  
    if not data:
       return jsonify({"error": "No JSON data received"}), 400
    
    try:
        Processed_Data = preprocess_data(data)
        # Remove the extra [] since Processed_Data is already a DataFrame
        prediction = model.predict(Processed_Data)
        return jsonify({"prediction": int(prediction[0])})  # assuming prediction is numerical
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def preprocess_data(raw_data):
    """Convert the incoming data to match the model's training format"""
    processed = {}
    
    # Gender
    processed['Gender'] = 1 if raw_data['gender'] == 'Female' else 0
    
    # Age (convert range to midpoint)
    age_mapping = {
        '18-25': 21.5,
        '26-35': 30.5,
        '36-45': 40.5,
        '46-55': 50.5,
        '56+': 60
    }
    processed['Age'] = age_mapping.get(raw_data['age'], 30.5)
    
    # Academic Pressure
    processed['Academic Pressure'] = float(raw_data['academic_pressure'])
    
    # Study Satisfaction
    processed['Study Satisfaction'] = float(raw_data['study_satisfaction'])
    
    # Sleep Duration
    sleep_mapping = {
        'Less than 5 hrs': 4.5,
        '5-6 hrs': 5.5,
        '7-8 hrs': 7.5,
        'More than 8 hrs': 9
    }
    processed['Sleep Duration'] = sleep_mapping.get(raw_data['sleep_duration'], 7.5)
    
    # Dietary Habits
    diet_mapping = {
        'Healthy': 2,
        'Moderate': 1,
        'Unhealthy': 0
    }
    processed['Dietary Habits'] = diet_mapping.get(raw_data['dietary_habits'], 1)
    
    # Suicidal Thoughts
    processed['Have you ever had suicidal thoughts ?'] = 1 if raw_data['suicidal_thoughts'] == 'Yes' else 0
    
    # Work/Study Hours
    processed['Study Hours'] = float(raw_data['work_study_hours'])
    
    # Financial Stress
    processed['Financial Stress'] = float(raw_data['financial_stress'])
    
    # Family Mental History
    processed['Family History of Mental Illness'] = 1 if raw_data['family_mental_history'] == 'Yes' else 0
    
    # Create a DataFrame with the correct column order
    feature_order = [
        'Gender', 'Age', 'Academic Pressure', 'Study Satisfaction', 
        'Sleep Duration', 'Dietary Habits', 'Have you ever had suicidal thoughts ?',
        'Study Hours', 'Financial Stress', 'Family History of Mental Illness'
    ]
    
    return pd.DataFrame([processed], columns=feature_order)


if __name__ == '__main__':
    app.run(debug=True)