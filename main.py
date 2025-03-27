from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, conint
from typing import Literal, Optional
import pickle
import pandas as pd
import logging
import re

# Set up logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# Load the trained machine learning model
with open("dep_model.pkl", "rb") as model_file:
    model = pickle.load(model_file)

# Initialize FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for input validation
class StudentData(BaseModel):
    Gender: Literal["Male", "Female"]
    Age: conint(ge=10, le=100)
    Academic_Pressure: conint(ge=0, le=5)
    Study_Satisfaction: conint(ge=0, le=5)
    Sleep_Duration: Literal["less than 5 hours", "5-6 hours", "7-8 hours", "more than 8 hours"]
    Dietary_Habits: Literal["Healthy", "Moderate", "Unhealthy"]
    Suicidal_Thoughts: Literal["Yes", "No"]
    Study_Hours: conint(ge=0, le=24)
    Financial_Stress: conint(ge=0, le=5)
    Family_History_Mental_Illness: Literal["Yes", "No"]

# Preprocess input data to match the model's expected format
def preprocess_input(data: StudentData):
    mapping = {
        "Gender": {"Male": 0, "Female": 1},
        "Sleep_Duration": {"less than 5 hours": 0, "5-6 hours": 1, "7-8 hours": 2, "more than 8 hours": 3},
        "Dietary_Habits": {"Healthy": 2, "Moderate": 1, "Unhealthy": 0},
        "Suicidal_Thoughts": {"No": 0, "Yes": 1},
        "Family_History_Mental_Illness": {"No": 0, "Yes": 1}
    }
    
    input_dict = data.dict()
    for key, value in input_dict.items():
        if key in mapping:
            input_dict[key] = mapping[key][value]
    
    return pd.DataFrame([input_dict])

# Function to standardize feature names
def standardize_feature_names(df):
    column_mapping = {
        "Academic_Pressure": "Academic Pressure",
        "Dietary_Habits": "Dietary Habits",
        "Family_History_Mental_Illness": "Family History of Mental Illness",
        "Financial_Stress": "Financial Stress",
        "Suicidal_Thoughts": "Have you ever had suicidal thoughts ?",  # Fixed: Ensure space before "?"
        "Sleep_Duration": "Sleep Duration",
        "Study_Satisfaction": "Study Satisfaction",
        "Study_Hours": "Study Hours",
        "Gender": "Gender",
        "Age": "Age"
    }
    
    df.rename(columns=column_mapping, inplace=True)

    # Fix any spacing inconsistencies before `?`
    df.columns = [col.replace("?", " ?") for col in df.columns]
    
    return df

@app.get("/")
def read_root():
    return {"message": "Mental Health Assessment API"}

@app.post("/predict")
async def predict_depression(data: StudentData):
    try:
        logging.info(f"Received request data: {data}")
        input_data = preprocess_input(data)
        
        # Standardize feature names before passing to model
        input_data = standardize_feature_names(input_data)

        logging.info(f"Processed input data: {input_data}")
        
        prediction = model.predict(input_data)[0]
        
        logging.info(f"Prediction result: {prediction}")
        risk_score = min(prediction, 5)
        risk_level = get_risk_level(risk_score)
        recommendations = get_recommendations(risk_score)
        
        return {
            "risk_level": risk_level,
            "risk_score": risk_score,
            "recommendations": recommendations
        }
    
    except Exception as e:
        logging.error(f"Prediction failed: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Prediction failed: {str(e)}")

def get_risk_level(score: float) -> str:
    if score <= 1:
        return "Low Risk"
    elif score <= 3:
        return "Moderate Risk"
    else:
        return "High Risk"

def get_recommendations(score: float) -> list:
    base_recommendations = [
        "Maintain a regular sleep schedule",
        "Practice stress-management techniques",
        "Maintain a balanced diet",
        "Exercise regularly"
    ]
    
    if score > 3:
        base_recommendations.extend([
            "Seek professional help immediately",
            "Talk to a trusted friend or family member",
            "Contact mental health helpline"
        ])
    elif score > 1:
        base_recommendations.extend([
            "Consider talking to a counselor",
            "Join support groups"
        ])
    
    return base_recommendations

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)