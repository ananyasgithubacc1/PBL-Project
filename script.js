const ML_MODEL_URL = 'YOUR_ML_MODEL_ENDPOINT_HERE'; // Replace with your ML model endpoint

// Class to handle the mental health assessment
class MentalHealthAssessment {
    constructor() {
        this.questions = [
            { id: 1, text: "What is your gender?", options: ["Male", "Female", "Others"] },
            { id: 2, text: "What is your age?", options: ["17-25", "26-35", "36-45", "46-55"] },
            { id: 3, text: "Academic pressure on a scale of 0-5?", options: ["0", "1", "2", "3", "4", "5"] },
            { id: 4, text: "Study Satisfaction (1-10)", type: "scale" },
            { id: 5, text: "Sleep duration", options: ["less than 5 hrs", "5-6 hrs", "7-8 hrs", "more than 8"] },
            { id: 6, text: "Dietary habits", options: ["healthy", "moderate", "unhealthy"] },
            { id: 7, text: "Have you ever had suicidal thoughts?", options: ["Yes", "No"] },
            { id: 8, text: "Work/study hours?", type: "integerInput" },
            { id: 9, text: "Financial stress (1-10)", type: "scale" },
            { id: 10, text: "Family history of mental illness?", options: ["Yes", "No"] },
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
        let nextButtonHtml = "";

        if (question.options) {
            optionsHtml = question.options.map(option => `
                <button class="option-button" onclick="uiHandler.selectAnswer(${question.id}, '${option}')">${option}</button>
            `).join('');
        } else if (question.type === "integerInput") {
            optionsHtml = `
                <input type="number" id="input-${question.id}" placeholder="Enter value" min="0" max="24">
            `;
            nextButtonHtml = `<button class="next-button" onclick="uiHandler.saveInputAndNext(${question.id})">Next</button>`;
        } else if (question.type === "scale") {
            optionsHtml = `
                <input type="range" id="input-${question.id}" min="1" max="10" step="1" value="5" 
                    oninput="document.getElementById('scale-value-${question.id}').innerText = this.value">
                <span id="scale-value-${question.id}">5</span>
            `;
            nextButtonHtml = `<button class="next-button" onclick="uiHandler.saveInputAndNext(${question.id})">Next</button>`;
        }

        container.innerHTML = `
            <div class="question-card">
                <h3>Question ${index + 1}</h3>
                <p>${question.text}</p>
                <div class="options">${optionsHtml}</div>
                ${nextButtonHtml}
            </div>
        `;
    }

    saveInputAndNext(questionId) {
        const input = document.getElementById(`input-${questionId}`);
        if (input) {
            this.assessment.saveAnswer(questionId, input.value);
            this.goToNextQuestion();
        }
    }

    selectAnswer(questionId, answer) {
        this.assessment.saveAnswer(questionId, answer);
        this.goToNextQuestion();
    }

    goToNextQuestion() {
        if (this.currentQuestionIndex < this.assessment.questions.length - 1) {
            this.currentQuestionIndex++;
            this.renderQuestion(this.currentQuestionIndex);
        } else {
            this.showSubmitButton();
        }
    }

    showSubmitButton() {
        document.getElementById('assessment-container').innerHTML = `
            <div class="question-card">
                <h3>All questions answered!</h3>
                <p>Click below to submit your responses.</p>
                <button class="submit-button" onclick="uiHandler.submitAssessment()">Submit</button>
            </div>
        `;
    }
}

let uiHandler;
document.addEventListener('DOMContentLoaded', () => {
    uiHandler = new UIHandler();
    uiHandler.initializeAssessment();
});
