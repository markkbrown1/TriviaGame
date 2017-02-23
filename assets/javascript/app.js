// create variables

var gotRight = 0;
var gotWrong = 0;
var noAnswer = 0;
var startScreen;
var resultHTML;
var counter = 20;
var questionArray = ["What city is the capital of England?", "What is the capital of Venezuela?", "What is the capital of Latvia?", "What is the capital of Costa Rica?", "What is the capital of Pakistan?", "What is the capital of Turkey?", "What is the capital of Colombia?", "What is the capital of New Zealand?"];
var answerArray = [["London", "Birmingham", "Liverpool", "Belfast"], ["San Jose","Caracas","Tuzon","Santiago"], ["Pinki", "Daugavpils", "Riga", "Talinn"], ["Manzanillo","La Cruz","San Jose","Limon"], ["Karachi", "Multan", "Lahore", "Islamabad"], ["Ankara","Istanbul","Antalya","Bursa"], ["Medellin", "Bogota", "Cartagena", "Cali"], ["Hamilton","Auckland","Christchurch","Wellington"]];
var correctAnswers = ["A. London", "B. Caracas", "C. Riga", "C. San Jose", "D. Islamabad", "A. Ankara", "B. Bogota", "D. Wellington"];
var questionCount = 0;
var selectAnswer;
var gameClock;

$(document).ready(function() {

	function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

//Create a function, generateHTML(), that is begun by the start button.

$("body").on("click", ".start-button", function(event){

	generateHTML();

	timeWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCount]) {
		//alert("correct");

		clearInterval(gameClock);
		addWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(gameClock);
		addLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
	
	resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function addLossForTimeOut() {
	noAnswer++;
	resultHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCount] + "</p>" ;
	$(".mainArea").html(resultHTML);
	setTimeout(wait, 3000);  
}

function addWin() {
	gotRight++;
	resultHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCount] + "</p>";
	$(".mainArea").html(resultHTML);
	setTimeout(wait, 3000); 
}

function addLoss() {
	gotWrong++;
	resultHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCount] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(resultHTML);
	setTimeout(wait, 3000); 
}

function generateHTML() {
	resultHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + questionArray[questionCount] + "</p><p class='first-answer answer'>A. " + answerArray[questionCount][0] + "</p><p class='answer'>B. "+answerArray[questionCount][1]+"</p><p class='answer'>C. "+answerArray[questionCount][2]+"</p><p class='answer'>D. "+answerArray[questionCount][3]+"</p>";
	$(".mainArea").html(resultHTML);
}

function wait() {
	if (questionCount < 7) {
	questionCount++;
	generateHTML();
	counter = 20;
	timeWrapper();
	}
	else {
		finalScreen();
	}
}

function timeWrapper() {
	gameClock = setInterval(twentySeconds, 1000);
	function twentySeconds() {
		if (counter === 0) {
			clearInterval(gameClock);
			addLossForTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	resultHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + gotRight + "</p>" + "<p>Wrong Answers: " + gotWrong + "</p>" + "<p>Unanswered: " + noAnswer + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(resultHTML);
}

function resetGame() {
	questionCount = 0;
	gotRight = 0;
	gotWrong = 0;
	noAnswer = 0;
	counter = 20;
	generateHTML();
	timeWrapper();
}



















