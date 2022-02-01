const pageContent = document.getElementById("page-content");
const startBtn = document.getElementById("start-btn");

function clearMain() {
  pageContent.innerHTML = "";
  displayFeltView();
}

function renderCard(hand, index) {
  const card = document.createElement("div");
  card.classList = "card col s4 m3 center-align";
  card.id = index;
  const cardImage = document.createElement("div");
  cardImage.classList = "card-image";
  cardImage.innerHTML = `<img src="./assets/images/placeholder.png"/>`;
  card.appendChild(cardImage);

  const cardAction = document.createElement("div");
  if (hand.id === "player-hand") {
    const cardContent = document.createElement("div");
    cardContent.classList = "card-content";
    cardContent.innerHTML = `<p>Card Attributes</p>`;
    card.appendChild(cardContent);
    cardAction.classList = "card-action";
    cardAction.innerHTML = `<a href="#">This is your card</a>`;
  }

  card.appendChild(cardAction);
  hand.appendChild(card);
}

function displayFeltView() {
  pageContent.innerHTML = `<section id="felt-view"></section>`;
  const feltView = document.getElementById("felt-view");
  const gameContainer = document.createElement("div");
  gameContainer.classList = "container";

  const enemyHand = document.createElement("div");
  enemyHand.classList = "row col s12 m12";
  enemyHand.id = "enemy-hand";
  enemyHand.setAttribute("style", "display:flex;");

  const playerHand = document.createElement("div");
  playerHand.classList = "row col s12 m12";
  playerHand.id = "player-hand";
  playerHand.setAttribute("style", "display:flex;");

  for (let i = 0; i < 6; i++) {
    if (i < 3) {
      renderCard(enemyHand, i);
    } else {
      renderCard(playerHand, i);
    }
  }

  const battlefield = document.createElement("div");
  battlefield.id = "battlefield";

  gameContainer.appendChild(enemyHand);
  gameContainer.appendChild(battlefield);
  gameContainer.appendChild(playerHand);

  feltView.appendChild(gameContainer);
}

startBtn.addEventListener("click", clearMain);
