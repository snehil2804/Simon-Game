// Define an array of button colors
var buttonColours = ["blue", "green", "red", "yellow"];

// Initialize an empty array for the game pattern
var gamePattern = [];

// Initialize an empty array for the user's clicked pattern
var userClickedPattern = [];

// Flag to check if the game has startedd
var started = false;

// Flag to track the current level
var level = 0;

// Function to handle keypress event
$(document).keypress(function() {
  if (!started) {
    // Start the game by calling nextSequence() and setting started flag
    nextSequence();
    started = true;
  }
});
// Function to handle touchstart event for mobile users
$(document).on("touchstart", function(event) {
  if (!started) {
    // Start the game by calling nextSequence() and setting started flag
    nextSequence();
    started = true;
  }
});

// Add a check to see if the clicked element is a button, if not, trigger touchstart event on the body
$("body").on("touchstart", function(event) {
  if (event.target.tagName !== "BUTTON") {
    $(this).trigger("touchstart");
  }
});

// Function to handle button click event
$(".btn").click(function() {
  // Get the ID (color) of the clicked button
  var userChosenColour = $(this).attr("id");

  // Add the user's chosen color to the user's clicked pattern
  userClickedPattern.push(userChosenColour);

  // Play the sound of the clicked button
  playSound(userChosenColour);

  // Animate the pressed button
  animatePress(userChosenColour);

  // Check the answer based on the current level
  checkAnswer(userClickedPattern.length-1);
});

// Function to check the answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      // If the user's clicked pattern matches the game pattern, move to the next level after 1 second
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // If the user's clicked pattern does not match the game pattern, play the wrong sound, display game over, and restart
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

// Function to move to the next sequence
function nextSequence() {
  // Reset the user's clicked pattern
  userClickedPattern = [];

  // Increment the level
  level++;

  // Update the level title
  $("#level-title").text("Level " + level);

  // Generate a random number for a random color
  var randomNumber = Math.floor(Math.random() * 4);

  // Get a random color based on the random number
  var randomChosenColour = buttonColours[randomNumber];

  // Add the random color to the game pattern
  gamePattern.push(randomChosenColour);

  // Animate the button with the random color
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // Play the sound of the random color
  playSound(randomChosenColour);
}

// Function to animate the pressed button
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  // Remove the pressed class after 100ms
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 50);
}

// Function to play the sound of a given color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to reset the game to the initial state
function startOver() {
  // Reset level, game pattern, started flag, and user clicked pattern
  level = 0;
  gamePattern = [];
  started = false;
  userClickedPattern = [];

  // Update the level title to prompt the user to start
  $("#level-title").text("Press A Key to Start");
}