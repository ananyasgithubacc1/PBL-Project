const ML_MODEL_URL = 'YOUR_ML_MODEL_ENDPOINT_HERE';  // Replace with your ML model endpoint

// Class to handle the mental health assessment
class MentalHealthAssessment {
    constructor() {
        this.questions = [
            { id: 1, text: "What is your gender?", options: ["Male", "Female", "Others"] },
            { id: 2, text: "What is your age?", options: ["17-25", "26-35", "36-45", "46-55"] },
            { id: 3, text: "Which city do you live in?", options: ["Visakhapatnam", "Bangalore", "Srinagar", "Varanasi", "Jaipur", "Pune", "Thane", "Chennai", "Nagpur", "Nashik", "Vadodara", "Kalyan", "Rajkot", "Ahmedabad", "Kolkata", "Mumbai", "Lucknow", "Indore", "Surat", "Ludhiana", "Bhopal", "Meerut", "Agra", "Ghaziabad", "Hyderabad", "Vasai-Virar", "Kanpur", "Patna", "Faridabad", "Delhi"] },
            { id: 4, text: "What is your profession?", options: ["Student", "UI/UX Designer", "Digital Marketer", "Civil Engineer", "Content Writer", "Architect", "Educational Consultant", "Teacher", "Manager", "Computer Engineering", "Mechanical Engineering", "Chemical Engineering", "Entrepreneur", "Pharmacist", "Police"] },
            { id: 5, text: "Academic pressure on a scale of 0-5?", options: ["0", "1", "2", "3", "4", "5"] },
            { id: 6, text: "Work pressure on a scale of 0-5?", options: ["0", "1", "2", "3", "4", "5"] },
            { id: 7, text: "CGPA? (0 to 10)", type: "decimalinput" },
            { id: 8, text: "Study Satisfaction", options: ["0", "1", "2", "3", "4", "5"] },
            { id: 9, text: "Sleep duration", options: ["less than 5 hrs", "5-6 hrs", "7-8 hrs", "more than 8"] },
            { id: 10, text: "Dietary habits", options: ["healthy", "moderate", "unhealthy"] },
            { id: 11, text: "Degree", options: ["M/B.Pharm", "BSc", "MSc", "BA", "BCA", "MA", "MCA", "B.TECH", "M.TECH", "PhD", "Class 12", "B.Ed", "M.Ed", "LLB", "BE", "ME", "BHM", "B.Com", "MD", "MBBS", "B.Arch", "LLM", "BBA", "M.Com"] },
            { id: 12, text: "Have you ever had suicidal thoughts?", options: ["Yes", "No"] },
            { id: 13, text: "Work/study hours?", type: "integerInput" },
            { id: 14, text: "Financial stress", options: ["0", "1", "2", "3", "4", "5"] },
            { id: 15, text: "Family history of mental illness?", options: ["Yes", "No"] },
        ];
        this.answers = {};
    }

    saveAnswer(questionId, answer) {
        this.answers[questionId] = answer;
    }

    isAssessmentComplete() {
        return Object.keys(this.answers).length === this.questions.length;
    }

    async submitAssessment() {
        try {
            const response = await fetch(ML_MODEL_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.answers)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}

class UIHandler {
    constructor() {
        this.assessment = new MentalHealthAssessment();
        this.currentQuestionIndex = 0;
    }

    initializeAssessment() {
        const container = document.getElementById('assessment-container');
        if (!container) return;
        this.renderQuestion(this.currentQuestionIndex);
    }

    renderQuestion(index) {
        const question = this.assessment.questions[index];
        const container = document.getElementById('assessment-container');
        let optionsHtml = "";
        
        if (question.options) {
            optionsHtml = question.options.map(option => `
                <button class="option-button" onclick="uiHandler.selectAnswer(${question.id}, '${option}')">${option}</button>
            `).join('');
        } else {
            optionsHtml = `<input type="number" id="input-${question.id}" placeholder="Enter value" onblur="uiHandler.saveInputAnswer(${question.id})">`;
        }
        
        container.innerHTML = `
            <div class="question-card">
                <h3>Question ${index + 1}</h3>
                <p>${question.text}</p>
                <div class="options">${optionsHtml}</div>
            </div>
        `;
    }

    saveInputAnswer(questionId) {
        const input = document.getElementById(`input-${questionId}`);
        if (input) {
            this.assessment.saveAnswer(questionId, input.value);
        }
    }

    selectAnswer(questionId, answer) {
        this.assessment.saveAnswer(questionId, answer);
        if (this.currentQuestionIndex < this.assessment.questions.length - 1) {
            this.currentQuestionIndex++;
            this.renderQuestion(this.currentQuestionIndex);
        } else {
            this.showSubmitButton();
        }
    }

    showSubmitButton() {
        document.getElementById('assessment-container').innerHTML += `
            <button class="submit-button" onclick="uiHandler.submitAssessment()">Get Results</button>
        `;
    }
}

let uiHandler;
document.addEventListener('DOMContentLoaded', () => {
    uiHandler = new UIHandler();
    uiHandler.initializeAssessment();
});