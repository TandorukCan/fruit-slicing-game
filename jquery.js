var playing = false;
var score;
var trialsLeft;
var step;
var action; //used for the set interval
var fruits = [
  "apple",
  "apricot",
  "fig",
  "kiwi",
  "lemon",
  "plum",
  "pomegranate",
  "strawberry",
  "watermelon",
];
$(() => {
  // click on start reset button
  $("#startreset").click(() => {
    //we are playing
    if (playing == true) {
      //reload the page
      location.reload();
    } else {
      //we are not playing
      playing = true; //game initiated

      //set score to 0
      score = 0;
      $("#scorevalue").html(score);

      //show trials left
      $("#trialsLeft").show();
      trialsLeft = 3;
      addHearts();
      $("#gameOver").hide();
      //change button text to reset game
      $("#startreset").text("Reset Game");

      //start sending fruits
      startAction();
    }
  });

  $("#fruit1").mouseover(() => {
    score++;
    $("#scorevalue").html(score); //update score
    // document.getElementById("slicesound").play();
    $("#slicesound")[0].play(); //play sound

    //stop fruit
    clearInterval(action);

    //hide fruit
    $("#fruit1").hide("explode", { pieces: 3 }, 500);

    //send new fruit
    setTimeout(startAction, 500);
  });
  // slice a fruit
  //     play sound
  //     explode fruit

  const addHearts = () => {
    for (i = 0; i < trialsLeft; i++) {
      $("#trialsLeft").append("<img src='./images/heart.svg' class='life'/>");
    }
  };

  const startAction = () => {
    $("#fruit1").show();
    chooseFruit(); //choose a random fruit
    $("#fruit1").css({ left: Math.floor(Math.random() * 550), top: -50 });
    //generate a random step
    step = 1 + Math.floor(Math.random() * 5);
    // move fruit down one step everu 10sec
    action = setInterval(() => {
      $("#fruit1").css("top", $("#fruit1").position().top + step);
      // check if the fruit is too low
      if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
        // check if any trials left
        if (trialsLeft > 1) {
          //generate new fruit
          chooseFruit(); //choose a random fruit
          $("#fruit1").css({ left: Math.floor(Math.random() * 550), top: -50 });
          //generate a random step
          step = 1 + Math.floor(Math.random() * 5);
          // move fruit down one step everu 10sec

          //delete a heart
          trialsLeft--;
          $("#trialsLeft").empty();
          addHearts();
        } else {
          //game over
          playing = false;
          //button text back to start game
          $("#startreset").text("Start Game");
          $("#trialsLeft").empty();
          //game over message
          $("#gameOver").show();
          $("#gameOver").html(
            `<p>GAME OVER!</p><p>YOUR SCORE IS: ${score} </p>`
          );
          $("#trialsLeft").hide();
          stopAction();
        }
      }
    }, 10);
  };

  //generate a random fruit
  const chooseFruit = () => {
    $("#fruit1").attr(
      "src",
      `./images/${fruits[Math.floor(Math.random() * 9)]}.jpeg`
    );
  };

  const stopAction = () => {
    clearInterval(action);
    $("#fruit1").hide();
  };
});
