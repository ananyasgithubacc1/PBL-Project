from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
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
        prediction = model.predict(Processed_Data)
        print("Prediction:", int(prediction[0]))
        return jsonify({
            "prediction": int(prediction[0]),
            "depression_level": get_depression_level(int(prediction[0]))
        })
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500

def get_depression_level(prediction):
    levels = {
        0: "No Depression",
        1: "Depression Detected"
    }
    return levels.get(prediction, "Unknown")

def preprocess_data(raw_data):
    processed = {}
    
    # Gender (1=Female, 0=Male)
    processed['Gender'] = 1 if raw_data.get('gender', '').lower() == 'female' else 0
    
    # Age (direct input)
    try:
        processed['Age'] = float(raw_data['age'])
    except (ValueError, TypeError, KeyError):
        processed['Age'] = 25.0  # Default age
    
    # Academic Pressure (0-5 scale)
    processed['Academic Pressure'] = min(max(float(raw_data.get('academic_pressure', 0)), 0), 5)
    
    # Study Satisfaction (0-5 scale)
    processed['Study Satisfaction'] = min(max(float(raw_data.get('study_satisfaction', 0)), 0), 5)
    
    # Sleep Duration (handle both formats)
    sleep_value = raw_data.get('sleep_duration', '7-8 hours').lower()
    sleep_mapping = {
        'less than 5 hours': 4.5,
        'less than 5 hrs': 4.5,
        '5-6 hours': 5.5,
        '5-6 hrs': 5.5,
        '7-8 hours': 7.5,
        '7-8 hrs': 7.5,
        'more than 8 hours': 9,
        'more than 8': 9
    }
    processed['Sleep Duration'] = sleep_mapping.get(sleep_value, 7.5)
    
    # Dietary Habits
    diet_value = raw_data.get('dietary_habits', 'moderate').lower()
    diet_mapping = {
        'healthy': 2,
        'moderate': 1,
        'unhealthy': 0
    }
    processed['Dietary Habits'] = diet_mapping.get(diet_value, 1)
    
    # Suicidal Thoughts
    processed['Have you ever had suicidal thoughts ?'] = 1 if str(raw_data.get('suicidal_thoughts', '')).lower() == 'yes' else 0
    
    # Work/Study Hours
    processed['Study Hours'] = min(max(float(raw_data.get('work_study_hours', 8)), 0), 24)
    
    # Financial Stress (0-5 scale)
    processed['Financial Stress'] = min(max(float(raw_data.get('financial_stress', 0)), 0), 5)
    
    # Family Mental History
    processed['Family History of Mental Illness'] = 1 if str(raw_data.get('family_mental_history', '')).lower() == 'yes' else 0
    
    # Create DataFrame with correct column order
    feature_order = [
        'Gender', 'Age', 'Academic Pressure', 'Study Satisfaction',
        'Sleep Duration', 'Dietary Habits', 'Have you ever had suicidal thoughts ?',
        'Study Hours', 'Financial Stress', 'Family History of Mental Illness'
    ]
    
    return pd.DataFrame([processed], columns=feature_order)

if __name__ == '__main__':
    app.run(debug=True)