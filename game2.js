const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is the most consumed fruit in the world?',
        choice1: 'Apples',
        choice2: 'Bannanas',
        choice3: 'Tomatoes',
        choice4: 'Jack Fruit',
        answer: 3,
    },
    {
        question:
            "Which is the tallest city in the world?",
        choice1: "Burj Khalifa",
        choice2: "Sky finger",
        choice3: "Sky Fly",
        choice4: "Signature Tower",
        answer: 1,
    },
    {
        question: "How long does it take for the light to reach earth from the Sun?",
        choice1: "10 Minutes",
        choice2: "11 - 13 Minutes",
        choice3: "1 Hour",
        choice4: "8 - 9 Minutes",
        answer: 4,
    },
    {
        question: "Who has the highest average in Cricket history?",
        choice1: "Sachin Tendulkar",
        choice2: "Steve Smith",
        choice3: "Don Bradman",
        choice4: "Virat Kohli",
        answer: 3,
    },
    {
        question: "Who has the most runs in ODI cricket?",
        choice1: "Rohit Sharma",
        choice2: "Sachin Tendulkar",
        choice3: "Steve Smith",
        choice4: "Virat Kohli",
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()