$(document).ready(inializeApp);

function inializeApp() {
  $(".cardContainer").on("click", ".card", handleCardClick);
  $(".foundCardContainer").on("click", ".foundCard", toggleMusicTrack);
  randomizeCardsAndAddFoundCards();
  $(".startGame").on("click", startGame);
}

//Creating variables to hold clicked card values and check if they match
var firstCardClicked = null;
var secondCardClicked = null;
var matches = 0;
var maxMatches = 9;
var attempts = 0;
var gamesPlayed = 0;
var firstCardImage = null;
var secondCardImage = null;

function randomizeCardsAndAddFoundCards() {
  //Array with 9 seperate css class names in it
  var cardFrontOrder = ["hi-hats", "piano", "bass", "kick", "snare", "sample", "clap", "synth", "noise"];
  //Adding the array to itself in order to make pairs
  var finalCardOrder = cardFrontOrder.concat(cardFrontOrder);
  //Randomizing the order of the array for each game. Returns random full array
  for (var index = finalCardOrder.length - 1; index > 0; index--) {
    var randomNumber = Math.floor(Math.random() * index);
    var temp = finalCardOrder[index];
    finalCardOrder[index] = finalCardOrder[randomNumber];
    finalCardOrder[randomNumber] = temp;
  }
  //Dynamically creating cards from above array and adding it to the DOM.
    for (var index = 0; index < finalCardOrder.length; index++) {
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
    //Dynamically creating the found cards
    for (var foundIndex = 0; foundIndex < cardFrontOrder.length; foundIndex++) {
      //Card front with images in order
      var foundCardFront = $("<div>");
      foundCardFront.addClass("front card-image " + cardFrontOrder[foundIndex] + " hidden");
      //Card wrapper for found cards
      var foundCard = $("<div>");
      foundCard.addClass("foundCard");
      foundCard.append(foundCardFront);
      //Appending cards to correct location
      $(".foundCardContainer").append(foundCard);
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
      $(".select")[0].play();
      showBeats(firstCardImage);
      firstCardClicked.addClass("hidden");
      secondCardClicked.addClass("hidden");
      firstCardClicked = null;
      secondCardClicked = null;
      firstCardImage = null;
      secondCardImage = null;
      //Open win modal if all are matched
      if (matches === maxMatches) {
        handleModal();
        gamesPlayed++;
        updateStats();
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
      }, 750)
    }
  }
}

function toggleMusicTrack(event) {
  debugger;
  var $foundCard = $(".foundCard");
  var cardToggled = $(event.currentTarget).find(".front").css("background-image");
  //Hide cards off board and show on side while unmuting audio based on card found
  if (cardToggled.indexOf("hi-hats") > -1) {
    $foundCard.find(".hi-hats").addClass("toggleMusic");
    $(".hi-hatsAudio").prop("muted", false);
  } else if (cardToggled.indexOf("piano") > -1) {
    $foundCard.find(".piano").addClass("toggleMusic");
    $(".pianoAudio").prop("muted", false);
  } else if (cardToggled.indexOf("bass") > -1) {
    $foundCard.find(".bass").addClass("toggleMusic");
    //No bass sound file (not able to think of more tracks to add to audio)
  } else if (cardToggled.indexOf("kick") > -1) {
    $foundCard.find(".kick").addClass("toggleMusic");
    $(".kickAudio").prop("muted", false);
  } else if (cardToggled.indexOf("snare") > -1) {
    $foundCard.find(".snare").addClass("toggleMusic");
    $(".snareAudio").prop("muted", false);
  } else if (cardToggled.indexOf("sample") > -1) {
    $foundCard.find(".sample").addClass("toggleMusic");
    $(".sampleAudio").prop("muted", false);
  } else if (cardToggled.indexOf("clap") > -1) {
    $foundCard.find(".clap").addClass("toggleMusic");
    $(".clapsAudio").prop("muted", false);
  } else if (cardToggled.indexOf("synth") > -1) {
    $foundCard.find(".synth").addClass("toggleMusic");
    //No bass sound file (not able to think of more tracks to add to audio)
  } else if (cardToggled.indexOf("noise") > -1) {
    $foundCard.find(".noise").addClass("toggleMusic");
    $(".noiseAudio").prop("muted", false);
  }
}

function calculateAccuracy() {
  //Make accuracy always display 0% for the first click
  if (attempts === 0) {
    return "0%";
  } else {
  //Round to 2 decimal places for the accuracy
    var trueAccuracy = ((matches / attempts) * 100).toFixed();
    return trueAccuracy + "%";
  }
}

function updateStats() {
  //Displaying stats for game just played
  $(".gamesPlayed span").text(gamesPlayed);
  $(".attempts span").text(attempts);
  $(".accuracy span").text(calculateAccuracy());
}

function handleModal() {
  //Defining modal and closeButton for later
  var modal = $(".modal");

  //Show modal if win condition is reached
  modal.removeClass("hidden");

  $(".playAgain").on("click", resetGame);
}

function resetGame() {
  //Hiding modal
  $(".modal").addClass("hidden");

  //Removing old gameboard
  $(".cardContainer").empty();
  $(".foundCardContainer").empty();

  //Reset stats and display for new game
  matches = 0;
  attempts = 0;

  //Create a new gameboard
  randomizeCardsAndAddFoundCards();

  //Mute audio again
  $(".hi-hatsAudio").prop("muted", true);
  $(".pianoAudio").prop("muted", true);
  $(".kickAudio").prop("muted", true);
  $(".snareAudio").prop("muted", true);
  $(".sampleAudio").prop("muted", true);
  $(".clapsAudio").prop("muted", true);
  $(".noiseAudio").prop("muted", true);
}

function startGame() {
  //Remove Start Screen and show the game
  $(".startScreen").addClass("hidden");
  $(".mainPage").removeClass("hidden");

  //Starting audio when button is clicked

  //Play audio in background but muted
  $(".hi-hatsAudio")[0].play();
  $(".pianoAudio")[0].play();
  $(".kickAudio")[0].play();
  $(".snareAudio")[0].play();
  $(".sampleAudio")[0].play();
  $(".clapsAudio")[0].play();
  $(".noiseAudio")[0].play();
}

function showBeats(cardFound) {
  var $foundCard = $(".foundCard");
  console.log(cardFound);
  //Hide cards off board and show on side while unmuting audio based on card found
  if (cardFound.indexOf("hi-hats") > -1) {
    $foundCard.find(".hi-hats").removeClass("hidden");
    $(".hi-hatsAudio").prop("muted", false);
  } else if (cardFound.indexOf("piano") > -1) {
    $foundCard.find(".piano").removeClass("hidden");
    $(".pianoAudio").prop("muted", false);
  } else if (cardFound.indexOf("bass") > -1) {
    $foundCard.find(".bass").removeClass("hidden");
    //No bass sound file (not able to think of more tracks to add to audio)
  } else if (cardFound.indexOf("kick") > -1) {
    $foundCard.find(".kick").removeClass("hidden");
    $(".kickAudio").prop("muted", false);
  } else if (cardFound.indexOf("snare") > -1) {
    $foundCard.find(".snare").removeClass("hidden");
    $(".snareAudio").prop("muted", false);
  } else if (cardFound.indexOf("sample") > -1) {
    $foundCard.find(".sample").removeClass("hidden");
    $(".sampleAudio").prop("muted", false);
  } else if (cardFound.indexOf("clap") > -1) {
    $foundCard.find(".clap").removeClass("hidden");
    $(".clapsAudio").prop("muted", false);
  } else if (cardFound.indexOf("synth") > -1) {
    $foundCard.find(".synth").removeClass("hidden");
    //No bass sound file (not able to think of more tracks to add to audio)
  } else if (cardFound.indexOf("noise") > -1) {
    $foundCard.find(".noise").removeClass("hidden");
    $(".noiseAudio").prop("muted", false);
  }
}
