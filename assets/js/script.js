$(document).ready(inializeApp);

function inializeApp() {
  $(".cardContainer").on("click", ".card", handleCardClick);
  randomizeCardsAndAddFoundCards();
  $(".startGame").on("click", startGame);
}

let firstCardClicked = null;
let secondCardClicked = null;
let matches = 0;
const maxMatches = 9;
let attempts = 0;
let gamesPlayed = 0;
let firstCardImage = null;
let secondCardImage = null;

function randomizeCardsAndAddFoundCards() {
  let cardFrontOrder = ["hi-hats", "piano", "bass", "kick", "snare", "sample", "clap", "synth", "noise"];
  let finalCardOrder = cardFrontOrder.concat(cardFrontOrder);
  for (let index = finalCardOrder.length - 1; index > 0; index--) {
    let randomNumber = Math.floor(Math.random() * index);
    let temp = finalCardOrder[index];
    finalCardOrder[index] = finalCardOrder[randomNumber];
    finalCardOrder[randomNumber] = temp;
  }
    for (let index = 0; index < finalCardOrder.length; index++) {
      let cardFront = $("<div>");
      cardFront.addClass("front card-image " + finalCardOrder[index]);
      let cardBack = $("<div>");
      cardBack.addClass("back card-image");
      let card = $("<div>");
      card.addClass("card");
      card.append(cardFront, cardBack);
      $(".cardContainer").append(card);
    }
    for (let foundIndex = 0; foundIndex < cardFrontOrder.length; foundIndex++) {
      let foundCardFront = $("<div>");
      foundCardFront.addClass("front card-image " + cardFrontOrder[foundIndex] + " hidden");
      let foundCard = $("<div>");
      foundCard.addClass("foundCard");
      foundCard.append(foundCardFront);
      $(".foundCardContainer").append(foundCard);
    }
}

function handleCardClick(event) {
  if ($(event.currentTarget).find(".back").hasClass("hidden")) {
    return;
  }
  $(event.currentTarget).find(".back").addClass("hidden");
  if (firstCardClicked === null) {
    firstCardClicked = $(event.currentTarget);
    firstCardImage = firstCardClicked.find(".front").css("background-image");
  } else {
    secondCardClicked = $(event.currentTarget);
    secondCardImage = secondCardClicked.find(".front").css("background-image");
    if (firstCardImage === secondCardImage) {
      matches++;
      attempts++;
      showBeats(firstCardImage);
      toggleMusicTrack(event);
      firstCardClicked.addClass("hideCard");
      secondCardClicked.addClass("hideCard");
      firstCardClicked = null;
      secondCardClicked = null;
      firstCardImage = null;
      secondCardImage = null;
      if (matches === maxMatches) {
        handleModal();
        gamesPlayed++;
        updateStats();
      }
    } else {
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
  let $foundCard = $(".foundCard");
  let cardToggled = $(event.currentTarget).find(".front").css("background-image");
  if (cardToggled.indexOf("hi-hats") > -1) {
    $foundCard.find(".hi-hats");
    $(".hi-hatsAudio").prop("muted", false);
  } else if (cardToggled.indexOf("piano") > -1) {
    $foundCard.find(".piano");
    $(".pianoAudio").prop("muted", false);
  } else if (cardToggled.indexOf("bass") > -1) {
    $foundCard.find(".bass");
    //No bass sound file (not able to think of more tracks to add to audio)
  } else if (cardToggled.indexOf("kick") > -1) {
    $foundCard.find(".kick");
    $(".kickAudio").prop("muted", false);
  } else if (cardToggled.indexOf("snare") > -1) {
    $foundCard.find(".snare");
    $(".snareAudio").prop("muted", false);
  } else if (cardToggled.indexOf("sample") > -1) {
    $foundCard.find(".sample");
    $(".sampleAudio").prop("muted", false);
  } else if (cardToggled.indexOf("clap") > -1) {
    $foundCard.find(".clap");
    $(".clapsAudio").prop("muted", false);
  } else if (cardToggled.indexOf("synth") > -1) {
    $foundCard.find(".synth");
    //No synth sound file (not able to think of more tracks to add to audio)
  } else if (cardToggled.indexOf("noise") > -1) {
    $foundCard.find(".noise");
    $(".noiseAudio").prop("muted", false);
  }
}

function calculateAccuracy() {
  if (attempts === 0) {
    return "0%";
  } else {
    let trueAccuracy = Math.round(10000 * matches/attempts) / 100;
    return trueAccuracy + "%";
  }
}

function updateStats() {
  $(".gamesPlayed span").text(gamesPlayed);
  $(".attempts span").text(attempts);
  $(".accuracy span").text(calculateAccuracy());
}

function handleModal() {
  let modal = $(".modal");
  modal.removeClass("hidden");
  $(".playAgain").on("click", resetGame);
}

function resetGame() {
  $(".modal").addClass("hidden");
  $(".cardContainer").empty();
  $(".foundCardContainer").empty();
  matches = 0;
  attempts = 0;
  randomizeCardsAndAddFoundCards();
  $(".hi-hatsAudio")[0].play();
  $(".pianoAudio")[0].play();
  $(".kickAudio")[0].play();
  $(".snareAudio")[0].play();
  $(".sampleAudio")[0].play();
  $(".clapsAudio")[0].play();
  $(".noiseAudio")[0].play();
  $(".hi-hatsAudio").prop("muted", true);
  $(".pianoAudio").prop("muted", true);
  $(".kickAudio").prop("muted", true);
  $(".snareAudio").prop("muted", true);
  $(".sampleAudio").prop("muted", true);
  $(".clapsAudio").prop("muted", true);
  $(".noiseAudio").prop("muted", true);
}

function startGame() {
  $(".startScreen").addClass("hidden");
  $(".gameBoard").removeClass("hidden");
  $("body").css("background-color", "#9eabbd");
  $(".hi-hatsAudio")[0].play();
  $(".pianoAudio")[0].play();
  $(".kickAudio")[0].play();
  $(".snareAudio")[0].play();
  $(".sampleAudio")[0].play();
  $(".clapsAudio")[0].play();
  $(".noiseAudio")[0].play();
}

function showBeats(cardFound) {
  let $foundCard = $(".foundCard");
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
    //No synth sound file (not able to think of more tracks to add to audio)
  } else if (cardFound.indexOf("noise") > -1) {
    $foundCard.find(".noise").removeClass("hidden");
    $(".noiseAudio").prop("muted", false);
  }
}
