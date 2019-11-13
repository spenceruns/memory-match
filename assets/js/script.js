$(document).ready(inializeApp);

function inializeApp() {
  $(".card").on("click", handleCardClick);
  randomizeCards();
}

function randomizeCards() {
  var randomNumber = Math.floor((Math.random() * 8) + 1);;

  var cardFront = ["css-logo", "docker-logo", "gitHub-logo", "html-logo", "js-logo", "mysql-logo", "node-logo", "php-logo", "react-logo"];
}

function handleCardClick(event) {
  $(event.currentTarget).find(".back").addClass("hidden");
}
