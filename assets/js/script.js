$(document).ready(inializeApp);

function inializeApp() {
  $(".cardContainer").on("click", ".card", handleCardClick);
  randomizeCards();
}

//Creating variables to hold clicked card values and check if they match
var firstCardClicked = null;
var secondCardClicked = null;
var matches = 0;
var maxMatches = 1;
var attempts = 0;
var gamesPlayed = 0;
var firstCardImage = null;
var secondCardImage = null;

function randomizeCards() {
  //Array with 9 seperate css class names in it
  var cardFront = ["css-logo", "docker-logo", "gitHub-logo", "html-logo", "js-logo", "mysql-logo", "node-logo", "php-logo", "react-logo"];
  //Adding the array to itself in order to make pairs
  var finalCardOrder = cardFront.concat(cardFront);
  //Randomizing the order of the array for each game. Returns random full array
  for (var index = finalCardOrder.length - 1; index > 0; index--) {
    var randomNumber = Math.floor(Math.random() * index);
    var temp = finalCardOrder[index];
    finalCardOrder[index] = finalCardOrder[randomNumber];
    finalCardOrder[randomNumber] = temp;
  }
  //Dynamically creating cards from above array and adding it to the DOM.
    for(var index = 0; index < finalCardOrder.length; index++) {
      //Card front with random image
      var cardFront = $("<div>");
      cardFront.addClass("front card-image " + finalCardOrder[index]);

      //Card back with default image
      var cardBack = $("<div>");
      cardBack.addClass("back card-image");

      //Creating container for above two created divs
      var card = $("<div>");
      card.addClass("card");

      //Appending created elements to correct location
      card.append(cardFront, cardBack);
      $(".cardContainer").append(card);
    }
}

function handleCardClick(event) {
  //Disable multiple clicks on the same card
  if ($(event.currentTarget).find(".back").hasClass("hidden")) {
    return;
  }

  //Locating the element with class "back" within the clicked element
  $(event.currentTarget).find(".back").addClass("hidden");

  //Storing clicked elements to be checked when two cards are clicked
  if (firstCardClicked === null) {
    firstCardClicked = $(event.currentTarget);
    firstCardImage = firstCardClicked.find(".front").css("background-image");
  } else {
    secondCardClicked = $(event.currentTarget);
    secondCardImage = secondCardClicked.find(".front").css("background-image");

    //Checking above stored elements
    if (firstCardImage === secondCardImage) {
      //if correct, increases matches variable and sets clicked elements back to null
      matches++;
      firstCardClicked = null;
      secondCardClicked = null;
      //Open win modal if all are matched
      if (matches === maxMatches) {
        handleModal();
        gamesPlayed++;
      }
    } else {
      //if incorrect, disables clicking and removes the "hidden" class after 1.5sec, sets elemets back to null
      attempts++;
      $(".card").css("pointer-events", "none");
      setTimeout(function() {
        firstCardClicked.find(".back").removeClass("hidden");
        secondCardClicked.find(".back").removeClass("hidden");
        $(".card").css("pointer-events", "auto");
        firstCardClicked = null;
        secondCardClicked = null;
      }, 500)
    }
  }
  //Display updated stats
  displayStats();
}

function calculateAccuracy() {
  //Make accuracy always display 0% for the first click
  if (attempts === 0) {
    return "0%";
  } else {
  //Round to 2 decimal places for the accuracy
    var trueAccuracy = ((matches / attempts) * 100).toFixed(0);
    return trueAccuracy + "%";
  }
}

function displayStats() {
  //Update gamesPlayed and Attemps displays with current stats
  $("#gamesPlayed").text(gamesPlayed);
  $("#attemps").text(attempts);

  //Calculate current accuracy and update the display
  var accuracyStat = calculateAccuracy();
  $("#accuracy").text(accuracyStat);
}

function handleModal() {
  //Defining modal and closeButton for later
  var modal = $(".modal");
  var closeButton = $(".close");

  //Show modal if win condition is reached
  modal.removeClass("hidden");

  //Allow clickButton to close the modal
  closeButton.on("click", function () {
    modal.addClass("hidden");
  })

  //Allow anything outside of the modal to close it
  $(".shadow").on("click", function () {
    modal.addClass("hidden");
  })

  $(".playAgain").on("click", resetGame);
}

function resetGame() {
  //Hiding modal
  $(".modal").addClass("hidden");

  //Removing old gameboard
  $(".cardContainer").find(".card").remove();

  //Reset stats and display for new game
  matches = 0;
  attempts = 0;

  displayStats();

  //Create a new gameboard
  randomizeCards();
}
