const feltView = document.getElementById("felt-view");
const formEl = document.getElementById("form-el");
const nameInput = document.getElementById("name-input");
const classSelect = document.getElementById("class-select");
const difficultyInput = document.getElementsByName("difficulty");
const profanityInput = document.getElementById("profanity-input");
const modal = document.querySelector(".modal");
const heroEl = document.querySelector(".hero");
const landingMsg = document.getElementById("landing-msg");
const heroHead = document.querySelector(".hero-head");
const heroBody = document.querySelector(".hero-body");
const heroFoot = document.querySelector(".hero-foot");
const footer = document.querySelector(".footer");

const enemyAvatar = document.getElementById("enemy-avatar");
const playerAvatar = document.getElementById("player-avatar");

const enemyDeck = document.querySelector("#enemy-deck");
const playerDeck = document.querySelector("#player-deck");

const enemyHand = document.getElementById("enemy-hand");
const playerHand = document.getElementById("player-hand");

const noMansLand = document.getElementById("no-mans-land");

const enemyField = document.getElementById("enemy-field");
const playerField = document.getElementById("player-field");

const playerCard1 = document.getElementById("player-card-1");
const playerCard2 = document.getElementById("player-card-2");
const playerCard3 = document.getElementById("player-card-3");
const playerCard4 = document.getElementById("player-card-4");

const enemyCard1 = document.getElementById("enemy-card-1");
const enemyCard2 = document.getElementById("enemy-card-2");
const enemyCard3 = document.getElementById("enemy-card-3");
const enemyCard4 = document.getElementById("enemy-card-4");

const endTurnBtn = document.getElementById("end-turn-btn");

$insetGoldGlow =
  "inset gold -15px -15px 10px, inset gold 15px -15px 10px, inset gold 15px 15px 10px, inset gold -15px 15px 10px";
$insetRedGlow =
  "inset red 15px 15px 10px, inset red 15px -15px 10px, inset red -15px -15px 10px, inset red -15px 15px 10px";

$redGlow =
  "red 15px 15px 10px, red 15px -15px 10px, red -15px -15px 10px, red -15px 15px 10px";
$blueGlow =
  "blue 15px 15px 10px, blue 15px -15px 10px, blue -15px -15px 10px, blue -15px 15px 10px";
$goldGlow =
  "gold -15px -15px 10px, gold 15px -15px 10px, gold 15px 15px 10px, gold -15px 15px 10px";


  // TEST CARD OBJECTS
  let angel = {
    name: "angel",
  cost: 1,
  atk: 1,
  def: 2,
};
let demon = {
  name: "demon",
  cost: 1,
  atk: 2,
  def: 1,
};
let knight = {
  name: "knight",
  cost: 2,
  atk: 2,
  def: 3,
};
let inferno = {
  name: "inferno",
  cost: 3,
  atk: 5,
  def: 0,
};
let warlock = {
  name: "warlock",
  cost: 6,
  atk: 7,
  def: 3,
};
let centurion = {
  name: "centurion",
  cost: 5,
  atk: 4,
  def: 6,
};
let dragon = {
  name: "dragon",
  cost: 8,
  atk: 10,
  def: 10,
};

let turnCounter = 0;
let starterDeck = [angel, demon, knight, inferno, warlock, centurion, dragon];

let player = {
  name: "",
  class: "",
  power: 0,
  health: 100,
  deck: starterDeck
};

let settings = {
  difficulty: 0,
  profanity: false
}


function hover(event) {
  event.target.style.transform = "scale(1.3)";
}

function unhover(event) {
  event.target.style.transform = "scale(1)";
}

function attackTargetHover(event) {
  event.target.style.boxShadow = $redGlow;
}
function attackTargetUnhover(event) {
  event.target.style.boxShadow = $goldGlow;
}

// Opponent Trash Talk Window
function notification(message) {
  const notification = document.createElement("div");
  notification.classList.add("notification", "is-warning");
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  notification.appendChild(deleteBtn);
  notification.textContent = message;
  enemyAvatar.appendChild(notification);
  setTimeout(function () {
    enemyAvatar.removeChild(notification);
  }, 2000);
}

// {Player's} card floats with red shadow
// *We use this to show which cards are in play on player's turn
function cardReady(cardEl) {
  cardEl.style.transition = "all 1200ms";
  cardEl.style.transform = "translateY(-15px)";
  cardEl.style.boxShadow = $redGlow;
  cardEl.style.animation = "3s ease 1200ms infinite alternate bounce";
}

// {Enemy's} card is highlighted by a gold shadow
// *Use this to show which enemy card the player is targeting for attack
function targetCard(cardEl) {
  cardEl.style.transition = "all 300ms";
  cardEl.style.boxShadow = $goldGlow;
  cardEl.addEventListener("mouseenter", attackTargetHover);
  cardEl.addEventListener("mouseleave", attackTargetUnhover);
  cardEl.addEventListener("click", attackTarget);
}


function attackTarget(event) {
  // The (parent) event (<--double-check this)
  const target = event.currentTarget;
  // Player's currently attacking card
  const readyToAttack = document.querySelector(".ready-to-attack");

  target.style.animation = "wobble 1s";
  readyToAttack.style.boxShadow = "none";
  readyToAttack.style.transform = "translateY(15px)";
  readyToAttack.dataset.state = "exhausted";
  readyToAttack.classList.add("card-inactive");
  readyToAttack.classList.remove("ready-to-attack");
  console.log(playerField.children[0]);
  for (let i = 0; i < playerField.children.length; i++) {
    if (playerField.children[i].dataset.state === "in-play") {
      cardReady(playerField.children[i]);
      playerField.children[i].addEventListener("click", AtkMsg);
    }
  }
}

function AtkMsg() {
  const attacker = this;
  for (let i = 0; i < playerField.children.length; i++) {
    if (playerField.children[i] !== attacker) {
      playerField.children[i].style.animation = null;
      playerField.children[i].style.boxShadow = "none";
    }
  }
  attacker.style.animation = null;
  attacker.style.boxShadow = $blueGlow;
  attacker.classList.remove("played-card");
  attacker.classList.add("ready-to-attack");
  console.log("What do you want to attack?");
  enemyAvatar.style.transition = "all 300ms";
  enemyAvatar.style.boxShadow = $goldGlow;
  enemyAvatar.addEventListener("mouseenter", attackTargetHover);
  enemyAvatar.addEventListener("mouseleave", attackTargetUnhover);
  enemyAvatar.addEventListener("click", attackTarget);
  if (enemyField.children) {
    for (let i = 0; i < enemyField.children.length; i++) {
      targetCard(enemyField.children[i]);
    }
  }
}

function startPlayerTurn() {
  if (playerField.children) {
    for (let i = 0; i < playerField.children.length; i++) {
      cardReady(playerField.children[i]);
      playerField.children[i].addEventListener("click", AtkMsg);
    }
  }
  if (deck) {
    // IF STILL CARDS IN DECK THEN DRAW CARD
    // AND ADD TO HAND
  }
}

function endEnemyTurn() {
  turnCounter++;
  startPlayerTurn();
}

function enemyPlayCard() {
  setTimeout(function () {
    enemyCard2.classList.add("played-enemy-card");
    enemyField.appendChild(enemyCard2);

    const placeholder = document.createElement("img");
    placeholder.src = "./assets/images/placeholder-card.png";
    placeholder.style.transform = "scale(1.2)";
    enemyCard2.appendChild(placeholder);
    setTimeout(card3down(), 1000);
    endEnemyTurn();
  }, 3000);
}

function card1up() {
  enemyCard1.style.transform = "translateY(5rem)";
}
function card1down() {
  enemyCard1.style.transform = "translateY(0rem)";
}

function card2up() {
  enemyCard2.style.transform = "translateY(5rem)";
}
function card2down() {
  enemyCard2.style.transform = "translateY(0rem)";
}

function card3up() {
  enemyCard3.style.transform = "translateY(5rem)";
}
function card3down() {
  enemyCard3.style.transform = "translateY(0rem)";
}

function card4up() {
  enemyCard4.style.transform = "translateY(5rem)";
}
function card4down() {
  enemyCard4.style.transform = "translateY(0rem)";
}

function enemyThinking() {
  setTimeout(card1up, 200);
  setTimeout(card1down, 400);
  setTimeout(card2up, 500);
  setTimeout(card2down, 700);
  setTimeout(card3up, 800);
  setTimeout(card3down, 1000);
  setTimeout(card2up, 1100);
  setTimeout(card2down, 1300);
  setTimeout(card3up, 1400);
  setTimeout(card3down, 1600);
  setTimeout(card4up, 1700);
  setTimeout(card4down, 1900);
  setTimeout(card3up, 2000);
  // This needs to wait
  setTimeout(enemyPlayCard(), 2000);
}

function enemyTurn() {
  enemyThinking();
}

function endPlayerTurn() {
  endTurnBtn.removeEventListener("click", endPlayerTurn);
  playerCard1.removeEventListener("click", playCard);
  playerCard2.removeEventListener("click", playCard);
  playerCard3.removeEventListener("click", playCard);
  playerCard4.removeEventListener("click", playCard);
  setTimeout(notification("That all you got?"), 1000);
  setTimeout(enemyTurn(), 2000);
}

function playCard(event) {
  const chosenCard = event.currentTarget;
  console.log(chosenCard);
  chosenCard.classList.remove("player-card");
  chosenCard.classList.add("played-card");
  chosenCard.setAttribute("data-state", "in-play");
  chosenCard.removeEventListener("click", playCard);
  playerField.appendChild(chosenCard);
}

function drawCard(deck) {
  const randomIndex = Math.floor(Math.random() * deck.length);
  return deck[randomIndex];
}

function setCardProps(cardEl) {
  const cardProps = Object.entries(drawCard(player.deck));
  for (let i = 0; i < cardProps.length; i++) {
    if (i === 0) {
      cardEl.setAttribute("data-name", cardProps[i][1]);
    } else if (i === 1) {
      cardEl.setAttribute("data-cost", cardProps[i][1]);
    } else if (i === 2) {
      cardEl.setAttribute("data-atk", cardProps[i][1]);
    } else {
      cardEl.setAttribute("data-def", cardProps[i][1]);
    }
  }
}

function displayFelt() {
  const card1 = document.getElementById("0");
  const card2 = document.getElementById("1");
  const card3 = document.getElementById("2");
  card1.classList.add("is-hidden");
  card2.classList.add("is-hidden");
  card3.classList.add("is-hidden");
  heroBody.style.width = "100%";
  heroBody.classList.add("p0");
  heroBody.style.flexDirection = "column";
  heroBody.style.justifyContent = "space-between";

  feltView.classList.remove("is-hidden");

  turnCounter++;
  player.power++;
  console.log(player);

  playerCard1.addEventListener("click", playCard);
  playerCard1.setAttribute("data-state", "in-hand");
  setCardProps(playerCard1);

  playerCard2.addEventListener("click", playCard);
  playerCard2.setAttribute("data-state", "in-hand");
  setCardProps(playerCard2);

  playerCard3.addEventListener("click", playCard);
  playerCard3.setAttribute("data-state", "in-hand");
  setCardProps(playerCard3);

  playerCard4.addEventListener("click", playCard);
  playerCard4.setAttribute("data-state", "in-hand");
  setCardProps(playerCard4);

  const cardData1 = playerCard1.dataset;
  const cardData2 = playerCard2.dataset;
  const cardData3 = playerCard3.dataset;
  const cardData4 = playerCard4.dataset;

  console.log(`Your hand: ${cardData1.name} cost=${cardData1.cost}, ${cardData2.name} cost=${cardData2.cost}, ${cardData3.name} cost=${cardData3.cost}, ${cardData4.name} cost=${cardData4.cost}`);

  endTurnBtn.addEventListener("click", endPlayerTurn);
}

function chooseCard(event) {
  const chosenCard = event.target;
  console.log(chosenCard);
  displayFelt();
}

function createCard(cardId) {
  const cardEl = document.createElement("img");
  cardEl.style.position = "relative";
  cardEl.src = "./assets/images/placeholder-card.png";
  cardEl.id = cardId;
  cardEl.style.borderRadius = "15px";
  cardEl.style.height = "auto";
  cardEl.style.width = "10rem";
  cardEl.addEventListener("mouseenter", hover);
  cardEl.addEventListener("mouseleave", unhover);
  return cardEl;
}

function displayChoice() {
  heroBody.style.width = "75%";
  heroBody.classList.add("is-align-self-center");
  for (let i = 0; i < 3; i++) {
    heroBody.appendChild(createCard(i));
    const card = document.getElementById(`${i}`);
    card.addEventListener("click", chooseCard);
    heroBody.style.justifyContent = "space-around";
  }
}

/**
 * It removes the is-active class from the modal and adds the is-hidden class to the landing message.
 * @param event - The event object that was triggered.
 */
function startGame(event) {
  event.preventDefault();
  player.name = nameInput.value.trim();
  player.class = classSelect.value;
  if (classSelect.value === "mage") {
    player.power = 2;
  }
  console.log(player);

  for (i = 0; i < difficultyInput.length; i++) {
    if (difficultyInput[i].checked) {
      settings.difficulty = difficultyInput[i].value;
    }
  }
  settings.profanity = profanityInput.checked;
  console.log(settings);

  modal.classList.remove("is-active");
  // Prevents cancel from returning felt view
  heroEl.style.backgroundImage = "url(./assets/images/black-felt.jpg)";
  landingMsg.classList.add("is-hidden");
  heroFoot.classList.add("is-hidden");
  footer.classList.add("is-hidden");
  displayChoice();
}

formEl.addEventListener("submit", startGame);

/* When a user clicks on a button, an element with the `.modal` class is opened. */
document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }

  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add("is-active");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) {
      // Escape key
      closeAllModals();
    }
  });

  /* For each element in the array returned by document.querySelectorAll('.notification .delete'), add a
  click event listener to the delete element that will remove the parent notification element from
  the DOM. */
  (document.querySelectorAll(".notification .delete") || []).forEach(
    ($delete) => {
      const $notification = $delete.parentNode;

      $delete.addEventListener("click", () => {
        $notification.parentNode.removeChild($notification);
      });
    }
  );
});
// END OF BULMA JS