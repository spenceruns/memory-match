$(document).ready(inializeApp);

function inializeApp() {
  $(".cardContainer").on("click", "div.card", handleCardClick);
  randomizeCards();
}

//Creating variables to hold clicked card values and check if they match
var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
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
      card.append(cardFront);
      $(".cardContainer").append(card);
    }
}

function handleCardClick(event) {
  //Locating the element with class "back" within the clicked element
  // $(event.currentTarget).find(".back").addClass("hidden");

  //Storing clicked elements to be checked when two cards are clicked
  if (firstCardClicked === null) {
    firstCardClicked = $(event.currentTarget).find(".front");
    firstCardImage = firstCardClicked.css("background-image");
  } else {
    secondCardClicked = $(event.currentTarget).find(".front");
    secondCardImage = secondCardClicked.css("background-image");

    //Checking above stored elements
    if (firstCardImage === secondCardImage) {
      console.log("nicccccce");
    } else {
      console.log("too bad");
    }
  }
}
