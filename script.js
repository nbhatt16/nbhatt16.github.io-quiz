$('#start').on('click', function(){
    $('#start').remove();
  game.loadQuestion();

})


$(document).on('click','.answer-button',function(e){
    game.clicked(e);
})

$(document).on('click','#reset',function(){
    game.reset();
})

var questions = [{
    question: "What year did The Simpsons first air?",
    answers: ["1999", "1989", "1986", "1994"],
    correctAnswer: "1989",
    incorrectAnswer: ["1999","1986","1994"],
}, {
    question: "How old is Bart Simpson?",
    answers: ["14", "9", "10", "11"],
    correctAnswer: "10",
    incorrectAnswer: ["14","9","11"],
}, {
    question: "What is the bartenders name?",
    answers: ["Joe", "Curly", "Lenny", "Moe"],
    correctAnswer: "Moe",
    incorrectAnswer: ["Joe", "Curly", "Lenny"],
},{
    question: "What was Maggies first word?",
    answers: ["Daddy", "Mommy", "Gun", "Hasn't spoken"],
    correctAnswer: "Daddy",
    incorrectAnswer:  ["Mommy", "Gun", "Hasn't spoken"],
},
{
    question: "Who is Arnie Pie?",
    answers: ["Teacher", "Bartender", "Marges love interest", "Traffic reporter"],
    correctAnswer: "Traffic reporter",
    incorrectAnswer: ["Teacher", "Bartender", "Marges love interest"],
}
];

// var sec = 400;
// var time = setInterval(myTimer, 1000);

// function myTimer() {
//     document.getElementById('timer').innerHTML = sec + "sec left";
//     sec--;
//     if (sec == -1) {
//         clearInterval(time);
//         alert("Time out!! :(");
//     }
// };

var game = {
    questions:questions,
    currentQuestion:0, 
    counter:15, 
    correct:0,
    incorrect:0,
    unanswered:0,
    
    countdown: function(){
        game.counter --;
        $('#counter').html(game.counter); 
        if(game.counter<=0){
            console.log("TIME UP!")
            game.timeUp();
        }
    },
    loadQuestion: function (){
        timer = setInterval(game.countdown,1000);
        $('#subwrapper').html("<h2> Time to Guess: <span id ='counter'>15</span> Seconds</h2>");
        $('#subwrapper').append('<h2>'+questions[game.currentQuestion].question+'</h2>');
        for(var i=0;i<questions[game.currentQuestion].answers.length;i++){
            $('#subwrapper').append('<button class="answer-button id="button- '+i+'" data-name="'+questions[game.currentQuestion].answers[i]+'">'+questions[game.currentQuestion].answers[i]+'</button>');
        }
    },
    nextQuestion: function(){
        game.counter = 15;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();

    },
    timeUp: function(){
        clearInterval(timer);
        game.unanswered++;
        $('#subwrapper').html('<h2>Out of time!<h2>');
        $('#subwrapper').append('<h3>The correct answer was: '+questions[game.currentQuestion].correctAnswer+'</h3>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        } else{
            setTimeout(game.nextQuestion,3*100);
        }

    },
    results: function(){
        clearInterval(timer);
        $('#subwrapper').html('<h2>Complete!</h2>')
        $('#subwrapper').append(" Correct: " +game.correct + '<br/>');
        $('#subwrapper').append(" Incorrect: " +game.incorrect + '<br/>');
        $('#subwrapper').append(" Unanswered: " +game.unanswered + '<br/>');
        $('#subwrapper').append("<button id= reset>Try again?</button>")


    },
    clicked: function(e){
        clearInterval(timer);
        if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
            game.answeredCorrectly();
    } else {
        game.answeredIncorrectly();
    }

    },
    answeredCorrectly: function(){
        console.log("right!")
        clearInterval(timer);
        game.correct++;
        $('#subwrapper').html('<h2> CORRECT!</h2>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,2*1000);
        } else{
            setTimeout(game.nextQuestion,2*1000);
        }

    },
    answeredIncorrectly: function(){
        console.log("wrong")
        clearInterval(timer);
        game.incorrect++;
        $('#subwrapper').html('<h2> Wrong!</h2>');
        $('#subwrapper').append('<h3>The correct answer was: '+questions[game.currentQuestion].correctAnswer+'</h3>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        } else{
            setTimeout(game.nextQuestion,3*1000);
        }if(game.currentQuestion!==this.answeredCorrectly){
            this.countdown(game.countdown, -2)
        }

    },
    reset: function(){
        game.currentQuestion = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();

    }

}