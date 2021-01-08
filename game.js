
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$("body").keydown (function() {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started=true;
  }
});

$(".btn").on("click", function() {

  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswers(userClickedPattern.length-1);
});


function checkAnswers(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else {
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    var gameOver = new Audio("sounds/wrong.mp3");
    gameOver.play();
    startOver();
  }
}


function nextSequence() {
  userClickedPattern =[];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut().fadeIn();
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  var x = $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    x.removeClass("pressed");
  }, 100);
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
