// Creating Variables
var startButton = document.getElementById("startBtn")
var nextButton = document.getElementById("nextBtn")
var questionContainerEl = document.getElementById("questionContainer")
var randomQuestions
var currentQuestion
var questionEl = document.getElementById("question")
var answerButtonsEl = document.getElementById("answerButtons")
var timer = document.getElementById("timer")
var timeLeft = 5;
var time = timeLeft * 60;

// Creating Questions
var questions = [
    {
        question : "Inside which HTML element do we put the JavaScript?",
        answers: [
            { text:"<script>", correct: true},
            { text:"<js>", correct: false},
            { text:"<javascript>", correct: false},
            { text:"<scripting>", correct: false}
        ]
    },
    {
        question : "How does a FOR loop start?",
        answers: [
            { text:"for i = 1 to 5  ", correct: false},
            { text:"for (i <= 5; i++)", correct: false},
            { text:"for (i = 0; i <= 5)", correct: false},
            { text:"for (i = 0; i <= 5; i++)  ", correct: true}
        ]
    },
    {
        question : "How can you add a comment in a JavaScript?",
        answers: [
            { text:"'This is a comment", correct: false},
            { text:"<!--This is a comment-->", correct: false},
            { text:"//This is a comment  ", correct: true},
            { text:"<This is a comment>", correct: false}
        ]
    },
    {
        question : "What is the correct way to write a JavaScript array?",
        answers: [
            { text:"var colors = ['red', 'green', 'blue'] ", correct: true},
            { text:"var colors = (1:'red', 2:'green', 3:'blue')", correct: false},
            { text:"var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')", correct: false},
            { text:"var colors = 'red', 'green', 'blue'", correct: false}
        ]
    },
    {
        question : "Which event occurs when the user clicks on an HTML element?",
        answers: [
            { text:"onmouseclick", correct: false},
            { text:"onmouseover", correct: false},
            { text:"onchange", correct: false},
            { text:"onclick ", correct: true}
        ]
    },
    {
        question : "Which operator is used to assign a value to a variable?",
        answers: [
            { text:"*", correct: false},
            { text:"=", correct: true},
            { text:"x", correct: false},
            { text:"-", correct: false}
        ]
    },
    {
        question : "What will the following code return: Boolean(10 > 9)",
        answers: [
            { text:"NaN", correct: false},
            { text:"true", correct: true},
            { text:"false", correct: false},
            { text:"undefined", correct: false}
        ]
    },
    {
        question : "JavaScript is the same as Java.",
        answers: [
            { text:"True", correct: false},
            { text:"False", correct: true}
        ]
    },
    {
        question : "How do you call a function named 'myFunction'?",
        answers: [
            { text:"call myFunction()", correct: false},
            { text:"call function myFunction()", correct: false},
            { text:"myFunction()  ", correct: true}
        ]
    },
    {
        question : "The external JavaScript file must contain the <script> tag.",
        answers: [
            { text:"True", correct: false},
            { text:"False", correct: true}
        ]
    }
]

// Starting the game
startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestion++
    nextQuestion()
})

// creating the Functions
function startGame() {
    startButton.classList.add("hide");
    randomQuestions = questions.sort(() => Math.random() - .5);
    currentQuestion = 0;
    questionContainerEl.classList.remove("hide");
    startTimer()
    nextQuestion()
}

function startTimer() {
    var timerInterval = setInterval(function(){
        timer.innerHTML = time;
        time--; 
        
    if (time < 0){
        clearInterval(timerInterval);
    }
    }, 1000);
}

function nextQuestion() {
    resetState()
    showQuestions(randomQuestions[currentQuestion])
}

function showQuestions(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn-primary", "btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsEl.appendChild(button)
        
    })
}

function resetState() {
    nextButton.classList.add("hide")
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}
function selectAnswer(e) {
    var selectedBtn = e.target
    var correct = selectedBtn.dataset.correct
    if (!correct){
        console.log("youre wrong")
        time-=10;
    }
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (randomQuestions.length > currentQuestion + 1){
       nextButton.classList.remove("hide") 
    } else {
        startButton.innerText = "restart"
        startButton.classList.remove("hide")
    }
    
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element){
    element.classList.remove("correct")
    element.classList.remove("wrong")
}