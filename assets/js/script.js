const deck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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

function hover(event) {
  event.target.style.transform = "scale(1.3)";
}

function unhover(event) {
  event.target.style.transform = "scale(1)";
}
const feltView = document.getElementById("felt-view");

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

function enemyPlayCard() {
  setTimeout(function () {
    enemyCard2.style.transform = null;
    enemyField.appendChild(enemyCard2);
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
  endPlayerTurn();
}

function drawCard() {
  const randomCardFromDeck = Math.floor(Math.random() * deck.length);
  return randomCardFromDeck;
}

function displayFelt() {
  feltView.classList.remove("is-hidden");
  playerCard1.addEventListener("click", playCard);
  playerCard1.setAttribute("data-state", "in-hand");
  playerCard1.setAttribute("data-power", drawCard());

  playerCard2.addEventListener("click", playCard);
  playerCard2.setAttribute("data-state", "in-hand");
  playerCard2.setAttribute("data-power", drawCard());

  playerCard3.addEventListener("click", playCard);
  playerCard3.setAttribute("data-state", "in-hand");
  playerCard3.setAttribute("data-power", drawCard());

  playerCard4.addEventListener("click", playCard);
  playerCard4.setAttribute("data-state", "in-hand");
  playerCard4.setAttribute("data-power", drawCard());
}

function chooseCard(event) {
  const chosenCard = event.target;
  console.log(chosenCard);
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
  modal.classList.remove("is-active");
  // Prevents cancel from returning felt view
  heroEl.style.backgroundImage = "url(./assets/images/red-felt.jpeg)";
  landingMsg.classList.add("is-hidden");
  heroFoot.classList.add("is-hidden");
  footer.classList.add("is-hidden");
  displayChoice();
}

const formEl = document.getElementById("form-el");
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

formEl.addEventListener("submit", startGame);
