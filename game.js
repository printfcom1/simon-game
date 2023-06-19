const gamePattern = [];
const userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;

function nextSequence() {
  level++;
  $("#level-title").text(`Level ${level}`);
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  console.log(randomNumber);
  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  userClickedPattern.splice(0);
}

$(".btn").click(function (e) {
  const colorButton = $(this).attr("id");
  playSound(colorButton);
  animatePress(colorButton);
  userClickedPattern.push(colorButton);
  if (level !== 0) checkAnswer();
  e.preventDefault();
});

function playSound(color) {
  const audio = new Audio(`./sounds/${color}.mp3`);
  audio.play();
}

function animatePress(currentColour) {
  $(`.${currentColour}`).addClass("pressed");
  setTimeout(() => {
    $(`.${currentColour}`).removeClass("pressed");
  }, 100);
}

$(document).keypress(function (e) {
  if (e.key === "a") {
    $("#level-title").text("Level 0");
    $(".button-74").css("display", "none");
    nextSequence();
  }
});

function checkAnswer() {
  const lenUser = userClickedPattern.length;
  const lenGame = gamePattern.length;
  if (userClickedPattern[lenUser - 1] === gamePattern[lenUser - 1]) {
    console.log("pass");
    if (lenUser === lenGame) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    } else {
      console.log("continus");
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("#level-title").text(`Game Over Level ${level}, Press A Key to Restart`);
    userClickedPattern.splice(0);
    gamePattern.splice(0);
    level = 0;
    $("body").addClass("game-over");
    $(".button-74").css("display", "inline-block");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
  }
}

$(".button-74").click(function (e) {
  $("#level-title").text("Level 0");
  $(".button-74").css("display", "none");
  nextSequence();
  e.preventDefault();
});
