let firstTime = true;
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

$("body").keypress(function (e) {
  if (firstTime) {
    firstTime = false;
    main();
  }
});

for (let i = 0; i < buttonColours.length; i++) {
  $("#" + buttonColours[i]).on("click", function () {
    let userChosenColour = buttonColours[i];
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    console.log(userClickedPattern);

    playSound(userChosenColour);
  });
}

function main() {
  nextSequence();
}

function nextSequence() {
  ++level;
  $("h1").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);

  let randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function checkAnswer(last) {
  console.log(userClickedPattern);
  console.log(gamePattern);
  if (userClickedPattern[last] === gamePattern[last]) {
    console.log("success");

    if (userClickedPattern.length < gamePattern.length) {
      // continue taking input
    } else {
      userClickedPattern = [];
      setTimeout(nextSequence, 1000);
    }
  } else {
    startOver();

    let audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
  }
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  firstTime = true;
}
