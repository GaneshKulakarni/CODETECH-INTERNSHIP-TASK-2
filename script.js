const questions =[
    {
        question : "Who holds the record for the highest individual score in a One-Day International (ODI) match?",
        answers :[
            {text:" Sachin Tendulkar",correct:"false"},
            {text:" Virender Sehwag",correct:"false"},
            {text:"Rohit Sharma",correct:"true"},   
            {text:"  Martin Guptill",correct:"false"}
        ]
    },
    {
        question : "Which country has won the most ICC Cricket World Cups (ODI)",
        answers :[
            {text:" Australia",correct:"true"},
            {text:"  India",correct:"false"},
            {text:" West Indies",correct:"false"},   
            {text:"  England",correct:"false"}
        ]
    },
    {
        question : `Which cricketer is known as "The Wall" of Indian cricket?`,
        answers :[
            {text:" Rahul Dravid",correct:"true"},
            {text:"Sunil Gavaskar",correct:"false"},
            {text:" Sourav Ganguly",correct:"false"},   
            {text:" VVS Laxman",correct:"false"}
        ]
    },
    {
        question : "What is the maximum number of overs allowed per bowler in a T20 International match?",
        answers :[
            {text:"  2 overs",correct:"false"},
            {text:" 4 overs",correct:"true"},   
            {text:" 3 overs",correct:"false"},
            {text:" 5 overs",correct:"false"}
        ]
    },
    {
        question : "Where was the first-ever Test match played in cricket history?",
        answers :[
            {text:" Lord's, England",correct:"false"},
            {text:" Melbourne Cricket Ground, Australia",correct:"true"},
            {text:"Eden Gardens, India",correct:"false"},   
            {text:" Old Trafford, England",correct:"false"}
        ]
    },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("nxt-btn");


let currentQuestionIndex=0;
let score=0;


function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion =questions[currentQuestionIndex];
    let questionNo =currentQuestionIndex+1;
    questionElement.innerHTML=questionNo +"."+currentQuestion.question;

    currentQuestion.answers.forEach(answers=>{
        const button =document.createElement("button");
        button.innerHTML=answers.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answers.correct){
            button.dataset.correct=answers.correct;

        }
        button.addEventListener("click",selectAnswer);

    });
    
}
function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild );
    }
}
function selectAnswer(e){
    const selectBtn=e.target;
    const isCorrect =selectBtn.dataset.correct=="true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else{
        selectBtn.classList.add("incorrect") ;
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function showScore(){
      resetState();
      questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
      nextButton.innerHTML= "Play Again";
      nextButton.style.display="block"; 
}
function handelNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
       
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handelNextButton();
    }
    else{
        startQuiz();
    }
});
startQuiz();