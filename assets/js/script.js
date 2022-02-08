const pantryID = "e7259b55-e424-4352-b9d4-af473fc7431a";
const apiurl = "https://getpantry.cloud/apiv1/pantry/e7259b55-e424-4352-b9d4-af473fc7431a/basket/dragons-wrath";

const accountEl = document.getElementById("account-el");
const navBarBrand = document.querySelector(".navbar-brand");
const navBarMenu = document.querySelector(".navbar-menu");
const modal = document.querySelector(".modal");
const landingMsg = document.getElementById("landing-msg");

const accountForm = document.getElementById("account-form");
const usernameInput = document.getElementById("username-input");
const startingDeck = document.getElementById("deck-select");
const experienceLevel = document.getElementsByName("experience");

const newGameForm = document.getElementById("new-game-form");
const nameInput = document.getElementById("name-input");
const classSelect = document.getElementById("class-select");
const difficultyInput = document.getElementsByName("difficulty");
const profanityInput = document.getElementById("profanity-input");

const feltView = document.getElementById("felt-view");
const heroEl = document.querySelector(".hero");
const heroHead = document.querySelector(".hero-head");
const heroBody = document.querySelector(".hero-body");
const heroFoot = document.querySelector(".hero-foot");
const footer = document.querySelector(".footer");

const gameOver = document.getElementById("game-over");

const enemyAvatar = document.getElementById("enemy-avatar");
const playerAvatar = document.getElementById("player-avatar");

// const enemyDeck = document.querySelector("#enemy-deck");
// const playerDeck = document.querySelector("#player-deck");

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

const enemyHealth = document.getElementById("enemy-health");
const enemyPower = document.getElementById("enemy-power");
const playerHealth = document.getElementById("player-health");
const playerPower = document.getElementById("player-power");

const newGameBtn = document.getElementById("new-game-btn");

const youWon = document.getElementById("you-won");
const youLost = document.getElementById("you-lost");

const loadingBar = document.createElement("progress");
const msg = document.createElement("img");

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
let colossalDragon = {
  name: "Colossal Dragon",
  cost: 10,
  atk: 10,
  def: 8,
};
let elderWizard = {
  name: "Elder Wizard",
  cost: 9,
  atk: 9,
  def: 7,
};
let sorceress = {
  name: "Sorceress",
  cost: 7,
  atk: 6,
  def: 3,
};
let dragonSorcerer = {
  name: "Dragon Sorcerer",
  cost: 7,
  atk: 7,
  def: 5,
};
let demonPriest = {
  name: "Demon Priest",
  cost: 5,
  atk: 8,
  def: 6,
};
let elvenSorcerer = {
  name: "Elven Sorcerer",
  cost: 2,
  atk: 3,
  def: 1,
};
let shamanicArcher = {
  name: "Shamanic Archer",
  cost: 7,
  atk: 7,
  def: 6,
};
let undeadDragon = {
  name: "Undead Dragon",
  cost: 5,
  atk: 4,
  def: 4,
};
let aquatarion = {
  name: "Aquatarion",
  cost: 5,
  atk: 4,
  def: 4,
};
let dragula = {
  name: "Dragula",
  cost: 4,
  atk: 4,
  def: 5,
};
let empressOfTheDeep = {
  name: "Empress of the Deep",
  cost: 4,
  atk: 5,
  def: 3,
};
let griffin = {
  name: "Griffin",
  cost: 2,
  atk: 3,
  def: 1,
};
let darkElf = {
  name: "Dark Elf",
  cost: 6,
  atk: 4,
  def: 7,
};
let bullDemon = {
  name: "Bull Demon",
  cost: 6,
  atk: 4,
  def: 7,
};
let blazingDragon = {
  name: "Blazing Dragon",
  cost: 5,
  atk: 7,
  def: 3,
};
let forestDragon = {
  name: "Forest Dragon",
  cost: 3,
  atk: 3,
  def: 7,
};
let ladyOfTheForest = {
  name: "Lady of the Forest",
  cost: 6,
  atk: 3,
  def: 8,
};
let magmaSnail = {
  name: "Magma Snail",
  cost: 6,
  atk: 2,
  def: 9,
};
let cloudDragon = {
  name: "Cloud Dragon",
  cost: 3,
  atk: 3,
  def: 7,
};
let darkWitch = {
  name: "Dark Witch",
  cost: 5,
  atk: 6,
  def: 4,
};
let giantKing = {
  name: "Giant King",
  cost: 3,
  atk: 1,
  def: 6,
};
let angelicWarrior = {
  name: "Angelic Warrior",
  cost: 5,
  atk: 6,
  def: 4,
};
let sabbaticGoat = {
  name: "Sabbatic Goat",
  cost: 5,
  atk: 4,
  def: 6,
};
let stoneGiant = {
  name: "Stone Giant",
  cost: 4,
  atk: 3,
  def: 6,
};
let enchantress = {
  name: "Enchantress",
  cost: 4,
  atk: 4,
  def: 5,
};
let clawface = {
  name: "Clawface",
  cost: 4,
  atk: 6,
  def: 3,
};
let tigerDragon = {
  name: "Tiger Dragon",
  cost: 3,
  atk: 3,
  def: 3,
};
let elvenArcher = {
  name: "Elven Archer",
  cost: 4,
  atk: 6,
  def: 3,
};
let swampGiant = {
  name: "Swamp Giant",
  cost: 2,
  atk: 2,
  def: 4,
};
let stalkers = {
  name: "Stalkers",
  cost: 3,
  atk: 4,
  def: 4,
};
let hauntedTree = {
  name: "Haunted Tree",
  cost: 2,
  atk: 4,
  def: 2,
};
let hauntedStallion = {
  name: "Haunted Stallion",
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

let wildwoodUser = {
  username: "",
  experience: "",
  startingDeck: "",
};

function getDeck(deck) {
  const apiUrl =
    "https://getpantry.cloud/apiv1/pantry/e7259b55-e424-4352-b9d4-af473fc7431a/basket/" +
    deck;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        return data.cards;
      });
    }
  });
}

console.log(getDeck("dragons-wrath"));

let starterDeck = [
  colossalDragon,
  elderWizard,
  sorceress,
  dragonSorcerer,
  demonPriest,
  elvenSorcerer,
  shamanicArcher,
  undeadDragon,
  aquatarion,
  dragula,
  empressOfTheDeep,
  griffin,
  darkElf,
  bullDemon,
  blazingDragon,
  forestDragon,
  ladyOfTheForest,
  magmaSnail,
  cloudDragon,
  darkWitch,
  giantKing,
  angelicWarrior,
  sabbaticGoat,
  stoneGiant,
  enchantress,
  clawface,
  tigerDragon,
  elvenArcher,
  swampGiant,
  stalkers,
  hauntedTree,
  hauntedStallion,
];

let enemyDeck = [
  colossalDragon,
  elderWizard,
  sorceress,
  dragonSorcerer,
  demonPriest,
  elvenSorcerer,
  shamanicArcher,
  undeadDragon,
  aquatarion,
  dragula,
  empressOfTheDeep,
  griffin,
  darkElf,
  bullDemon,
  blazingDragon,
  forestDragon,
  ladyOfTheForest,
  magmaSnail,
  cloudDragon,
  darkWitch,
  giantKing,
  angelicWarrior,
  sabbaticGoat,
  stoneGiant,
  enchantress,
  clawface,
  tigerDragon,
  elvenArcher,
  swampGiant,
  stalkers,
  hauntedTree,
  hauntedStallion,
];

let player = {
  name: "",
  class: "",
  power: 0,
  health: 30,
  deck: starterDeck,
  hand: [],
};

let settings = {
  difficulty: 0,
  profanity: false,
};

let enemy = {
  name: "testBot",
  power: 0,
  health: 30,
  deck: enemyDeck,
  hand: [],
};

let discardPile = [];

let thinkingInterval;

let playerCards = playerField.children;
let enemyCards = enemyField.children;

const imgTop = document.querySelector(".img-top");

function buttonPressed(event) {
  event.target.src = "./assets/images/buttonPressed.png";
  event.target.style.top = "0";
}

function buttonReleased(event) {
  event.target.src = "./assets/images/buttonHighLight.png";
  event.target.style.top = "-3px";
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
  }, 3000);
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
function removeTarget(cardEl) {
  cardEl.style.boxShadow = "none";
  cardEl.removeEventListener("mouseenter", attackTargetHover);
  cardEl.removeEventListener("mouseleave", attackTargetUnhover);
  cardEl.removeEventListener("click", attackTarget);
}

function endGame() {
  feltView.classList.add("is-hidden");
  gameOver.classList.remove("is-hidden");
  if (enemy.health <= 0) {
    youWon.classList.remove("is-hidden");
  } else {
    youLost.classList.remove("is-hidden");
  }
  return;
}

function attackTarget(event) {
  const readyToAttack = document.querySelector(".ready-to-attack");
  for (let i = 0; i < playerCards.length; i++) {
    playerCards[i].removeEventListener("click", AtkMsg);
  }
  const target = event.currentTarget;

  // If the player attacks the enemy directly
  if (target.id === "enemy-avatar") {
    enemy.health -= readyToAttack.dataset.atk;
    enemyHealth.value = enemy.health;
    if (enemy.health <= 0) {
      console.log("Game Over. You Win!");
      endGame();
    }
  }
  // If the player attacks an enemy card
  else if (target.dataset.state === "in-play") {
    console.log(
      `Your ${readyToAttack.dataset.name} card attacked the enemy's ${target.dataset.name} card with ${readyToAttack.dataset.atk} atk!`
    );
    console.log(
      `The enemy's ${target.dataset.name} card had ${target.dataset.def} def.`
    );
    // Subtract the player card's atk score from the enemy card's def score
    target.dataset.def -= readyToAttack.dataset.atk;

    // If the enemy card survives the attack
    if (target.dataset.def > 0) {
      console.log(
        `The enemy's ${target.dataset.name} card now has ${target.dataset.def} def left`
      );
    }
    // If the enemy card loses the battle
    else {
      console.log(
        `The enemy's ${target.dataset.name} card did not survive the attack`
      );
      discardPile.push(target);
      target.remove();
    }
    console.log(
      `Your ${readyToAttack.dataset.name} card had ${readyToAttack.dataset.def} def points`
    );
    readyToAttack.dataset.def -= target.dataset.atk;
    if (readyToAttack.dataset.def > 0) {
      console.log(
        `Your ${readyToAttack.dataset.name} card now has ${readyToAttack.dataset.def} def points`
      );
    } else {
      console.log(
        `Your ${readyToAttack.dataset.name} card did not survive the battle.`
      );
      discardPile.push(readyToAttack);
      readyToAttack.remove();
    }
  }

  target.style.animation = "wobble 1s";
  enemyAvatar.style.boxShadow = "none";
  enemyAvatar.removeEventListener("mouseenter", attackTargetHover);
  enemyAvatar.removeEventListener("mouseleave", attackTargetUnhover);
  enemyAvatar.removeEventListener("click", attackTarget);

  if (enemyCards) {
    for (let i = 0; i < enemyCards.length; i++) {
      removeTarget(enemyCards[i]);
    }
  }

  readyToAttack.style.boxShadow = "none";
  readyToAttack.style.transform = "translateY(15px)";
  readyToAttack.dataset.state = "exhausted";
  readyToAttack.classList.add("card-inactive");
  readyToAttack.classList.remove("ready-to-attack");
  for (let i = 0; i < playerCards.length; i++) {
    if (playerCards[i].dataset.state === "on-guard") {
      cardReady(playerCards[i]);
      playerCards[i].addEventListener("click", AtkMsg);
    }
  }
}

function removeAtkMsg() {
  // debugger;
  const readyToAttack = document.querySelector(".ready-to-attack");
  readyToAttack.style.boxShadow = "none";
  readyToAttack.style.transform = "translateY(15px)";
  readyToAttack.classList.add("played-card");
  for (let i = 0; i < playerCards.length; i++) {
    if (
      playerCards[i].dataset.state !== "exhausted" &&
      playerCards[i].dataset.state !== "in-play"
    ) {
      cardReady(playerCards[i]);
      playerCards[i].dataset.state = "on-guard";
      playerCards[i].addEventListener("click", AtkMsg);
    }
  }
  readyToAttack.classList.remove("ready-to-attack");

  enemyAvatar.style.boxShadow = "none";
  enemyAvatar.removeEventListener("mouseenter", attackTargetHover);
  enemyAvatar.removeEventListener("mouseleave", attackTargetUnhover);
  enemyAvatar.removeEventListener("click", attackTarget);
  if (enemyCards) {
    for (let i = 0; i < enemyCards.length; i++) {
      removeTarget(enemyCards[i]);
    }
  }
}

function AtkMsg() {
  // debugger;
  const attacker = this;
  if (attacker.dataset.state === "ready-to-attack") {
    removeAtkMsg();
    return;
  }
  /* For each card in the player's field, if it is not the attacker, set its animation to null, set its
  box shadow to none, and set its transform to translateY(15px). If the card is not exhausted or in
  play, set its state to on-guard. */
  for (let i = 0; i < playerCards.length; i++) {
    if (playerCards[i] !== attacker) {
      playerCards[i].style.animation = null;
      playerCards[i].style.boxShadow = "none";
      playerCards[i].style.transform = "translateY(15px)";
      if (
        playerCards[i].dataset.state !== "exhausted" &&
        playerCards[i].dataset.state !== "in-play"
      ) {
        playerCards[i].dataset.state = "on-guard";
      }
    }
  }
  attacker.style.animation = null;
  attacker.style.boxShadow = $blueGlow;
  attacker.classList.remove("played-card");
  attacker.classList.add("ready-to-attack");
  attacker.dataset.state = "ready-to-attack";
  console.log("What do you want to attack?");
  enemyAvatar.style.transition = "all 300ms";
  enemyAvatar.style.boxShadow = $goldGlow;
  enemyAvatar.addEventListener("mouseenter", attackTargetHover);
  enemyAvatar.addEventListener("mouseleave", attackTargetUnhover);
  enemyAvatar.addEventListener("click", attackTarget);
  if (enemyCards) {
    for (let i = 0; i < enemyCards.length; i++) {
      targetCard(enemyCards[i]);
    }
  }
}

function displayHand(hand) {
  let output = "";
  for (let i = 0; i < hand.length; i++) {
    output += hand[i].dataset.name + " cost=" + hand[i].dataset.cost + ", ";
  }
  return output;
}

function startPlayerTurn() {
  // draws a card
  if (player.deck.length > 0) {
    const newCard = document.createElement("div");
    newCard.classList.add("player-card", "is-size-1");
    const cardImg = document.createElement("img");
    cardImg.src = "./assets/images/placeholder-card.png";
    cardImg.style.transform = "scale(1.2)";
    newCard.appendChild(cardImg);
    playerHand.appendChild(newCard);
    setCardProps(newCard, player.deck);
  }
  console.log(displayHand(player.hand));

  // Make cards in hand clickable to play
  for (let i = 0; i < playerHand.children.length; i++) {
    playerHand.children[i].addEventListener("click", playCard);
  }

  // Initiates cards for attack
  if (playerCards) {
    for (let i = 0; i < playerCards.length; i++) {
      cardReady(playerCards[i]);
      playerCards[i].dataset.state = "on-guard";
      playerCards[i].addEventListener("click", AtkMsg);
    }
  }
  endTurnBtn.addEventListener("click", endPlayerTurn);
  endTurnBtn.addEventListener("mousedown", buttonPressed);
  endTurnBtn.addEventListener("mouseup", buttonReleased);
}

function endEnemyTurn() {
  turnCounter++;
  if (player.class === "mage") {
    player.power = turnCounter + 2;
  } else {
    player.power = turnCounter;
  }
  playerPower.max = player.power * 100;
  playerPower.value = player.power * 100;
  console.log(`You have ${player.power} power.`);
  startPlayerTurn();
}

function coinToss() {
  return Math.floor(Math.random() * 2);
}

function enemyAttack() {
  // Loop through enemy field and find cards that are on-guard
  // if a card is on guard then attack the player
  // Should they attack the player directly or an available card?
  // For now, let's make it random

  for (let i = 0; i < enemyCards.length; i++) {
    if (enemyCards[i].dataset.state === "on-guard") {
      // First choose whether to attack the player or a card
      if (coinToss() === 0 || playerCards.length === 0) {
        player.health -= enemyCards[i].dataset.atk;
        playerHealth.value = player.health;
        console.log(`${enemy.name} attacked ${player.name} directly!`);
        if (player.health <= 0) {
          endGame();
        }
      }
      // If enemy attacks player's cards
      else {
        const randomIndex = Math.floor(Math.random() * playerCards.length);
        console.log(
          `${enemyCards[i].dataset.name} attacked ${playerCards[randomIndex].dataset.name}!`
        );

        playerCards[randomIndex].dataset.def -= enemyCards[i].dataset.atk;
        enemyCards[i].dataset.def -= playerCards[randomIndex].dataset.atk;
        if (playerCards[randomIndex].dataset.def > 0) {
          console.log(
            `${playerCards[randomIndex].dataset.name} survived and now has ${playerCards[randomIndex].dataset.def} def`
          );
        } else {
          console.log(
            `${playerCards[randomIndex].dataset.name} didn't make it`
          );
          discardPile.push(playerCards[randomIndex]);
          playerCards[randomIndex].remove();
        }
        if (enemyCards[i].dataset.def > 0) {
          console.log(
            `${enemyCards[i].dataset.name} survived and now has ${enemyCards[i].dataset.def} def`
          );
        } else {
          console.log(`${enemyCards[i].dataset.name} didn't make it`);
          discardPile.push(enemyCards[i]);
          enemyCards[i].remove();
          i--;
        }
      }
    }
  }
  endEnemyTurn();
}

function enemyPlayCard() {
  setTimeout(function () {
    // loop through hand
    for (let i = 0; i < enemyHand.children.length; i++) {
      const card = enemyHand.children[i];
      // Play a card from the hand that has <= cost than power
      if (card.dataset.cost <= enemy.power) {
        card.classList.add("played-enemy-card");
        card.dataset.state = "in-play";
        enemyField.appendChild(card);
        const placeholder = document.createElement("img");
        placeholder.src = "./assets/images/placeholder-card.png";
        placeholder.style.transform = "scale(1.2)";
        card.appendChild(placeholder);
        console.log(`${enemy.name} played ${card.dataset.name}`);
        enemy.power -= card.dataset.cost;
        enemyPower.value = enemy.power * 100;
        console.log(`${enemy.name} now has ${enemy.power} power`);
      }
    }
    enemyAttack();
  }, 3000);
}

function cardPop(card) {
  setTimeout(function () {
    card.style.transform = "translateY(5rem)";
    setTimeout(function () {
      card.style.transform = "translateY(0rem)";
    }, 200);
  }, 200);
}

function enemyThinking() {
  if (!thinkingInterval) {
    thinkingInterval = setInterval(function () {
      const randomIndex = Math.floor(Math.random() * enemyHand.children.length);
      cardPop(enemyHand.children[randomIndex]);
    }, 200);
  }
  // This needs to wait
  setTimeout(enemyPlayCard(), 2000);
  setTimeout(function () {
    clearInterval(thinkingInterval);
    thinkingInterval = null;
  }, 2000);
}

function enemyTurn() {
  enemy.power = turnCounter;
  enemyPower.max = enemy.power * 100;
  enemyPower.value = enemy.power * 100;

  for (let i = 0; i < enemyCards.length; i++) {
    if (enemyCards[i].dataset.state === "in-play") {
      enemyCards[i].dataset.state = "on-guard";
    }
  }

  // draws a card
  if (enemy.deck.length > 0) {
    const newCard = document.createElement("div");
    newCard.classList.add("enemy-card");
    enemyHand.appendChild(newCard);
    setCardProps(newCard, enemy.deck);
    enemy.hand.push(newCard);
  }
  console.log(`${enemy.name} has ${displayHand(enemy.hand)}`);
  enemyThinking();
}

const apiUrlTwo = "https://foaas.com/";

function endPlayerTurn() {
  endTurnBtn.removeEventListener("click", endPlayerTurn);
  playerCard1.removeEventListener("click", playCard);
  playerCard2.removeEventListener("click", playCard);
  playerCard3.removeEventListener("click", playCard);
  playerCard4.removeEventListener("click", playCard);
  setTimeout(enemyTurn(), 2000);
  setTimeout(fuckOff(apiUrlTwo), 1000);
}

fuckOff(apiUrlTwo);

async function fuckOff(url) {
  // These variables are for the insult array
  let from = enemy.name;
  let name = player.name;
  const randomIndex = Math.floor(Math.random() * insult.length);
  const result = url + insult[randomIndex] + "/" + from;

  const response = await fetch(result, {
    method: "GET",
    headers: {
      accept: "application/json",
    }
  }).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
      });
    }
  });
};

function playCard(event) {
  const chosenCard = event.currentTarget;
  if (player.power >= chosenCard.dataset.cost) {
    chosenCard.classList.remove("player-card");
    chosenCard.classList.add("played-card");
    chosenCard.setAttribute("data-state", "in-play");
    chosenCard.removeEventListener("click", playCard);
    playerField.appendChild(chosenCard);
    console.log(`You played ${chosenCard.dataset.name}!`);
    player.power -= chosenCard.dataset.cost;
    playerPower.value = player.power * 100;
    console.log(`You have ${player.power} power left`);
  }
}

function drawCard(deck) {
  const randomIndex = Math.floor(Math.random() * deck.length);
  const drawnCard = deck[randomIndex];
  deck.splice(randomIndex, 1);
  return drawnCard;
}

function setCardProps(cardEl, fromDeck) {
  cardEl.setAttribute("data-state", "in-hand");
  const cardProps = Object.entries(drawCard(fromDeck));
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
  loadingBar.remove();
  msg.remove();
  heroEl.style = "background-image:url(./assets/images/red-felt.jpeg); cursor:url('./assets/images/custom-cursor.png'), auto;";
  heroBody.style.width = "100%";
  heroBody.classList.add("p0");
  heroBody.style.flexDirection = "column";
  heroBody.style.justifyContent = "space-between";

  feltView.classList.remove("is-hidden");

  turnCounter++;
  player.power++;
  enemy.power++;

  playerHealth.value = player.health;
  playerPower.max = player.power * 100;
  playerPower.value = player.power * 100;

  playerCard1.addEventListener("click", playCard);
  setCardProps(playerCard1, player.deck);
  player.hand.push(playerCard1);

  playerCard2.addEventListener("click", playCard);
  setCardProps(playerCard2, player.deck);
  player.hand.push(playerCard2);

  playerCard3.addEventListener("click", playCard);
  setCardProps(playerCard3, player.deck);
  player.hand.push(playerCard3);

  playerCard4.addEventListener("click", playCard);
  setCardProps(playerCard4, player.deck);
  player.hand.push(playerCard4);

  console.log(`You have ${displayHand(player.hand)}`);

  setCardProps(enemyCard1, enemy.deck);
  enemy.hand.push(enemyCard1);
  setCardProps(enemyCard2, enemy.deck);
  enemy.hand.push(enemyCard2);
  setCardProps(enemyCard3, enemy.deck);
  enemy.hand.push(enemyCard3);

  enemyHealth.value = enemy.health;
  enemyPower.max = enemy.power * 100;
  enemyPower.value = enemy.power * 100;

  console.log(`You are battling ${enemy.name}`);
  endTurnBtn.addEventListener("click", endPlayerTurn);
  endTurnBtn.addEventListener("mousedown", buttonPressed);
  endTurnBtn.addEventListener("mouseup", buttonReleased);
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

function loadScreen() {
  navBarBrand.classList.add("is-hidden");
  navBarMenu.classList.add("is-hidden");
  console.log(`Welcome ${player.name}!`);
  heroBody.style.width = "75%";
  heroBody.classList.add("is-align-self-center", "is-flex", "is-flex-direction-column");
  loadingBar.classList.add("progress", "is-large", "is-medium-dark");
  loadingBar.max = "100";
  loadingBar.textContent = "60%";
  loadingBar.style.marginTop = "5rem";
  msg.src = "./assets/images/box1.png";
  msg.style.width = "25vw";
  heroBody.appendChild(msg);
  heroBody.appendChild(loadingBar);
  heroBody.style.justifyContent = "center";
  setTimeout(displayFelt, 5000);
}

/**
 * It removes the is-active class from the modal and adds the is-hidden class to the landing message.
 * @param event - The event object that was triggered.
 */
function startGame(event) {
  event.preventDefault();
  player.name = nameInput.value.trim();
  player.class = classSelect.value;
  if (player.class === "warrior") {
    playerAvatar.style.backgroundImage =
      "url(./assets/images/aliks_the_barbarian_by_lucy_lisett_da3v8lm-fullview.jpeg)";
  } else if (player.class === "mage") {
    playerAvatar.style.backgroundImage =
      "url(./assets/images/merlin_the_court_wizard_by_lucy_lisett_daakmxo-pre.jpeg)";
    player.power = 2;
  } else {
    playerAvatar.style.backgroundImage =
      "url(./assets/images/commander_by_lucy_lisett_dc6fkyu-pre.jpeg)";
  }

  for (i = 0; i < difficultyInput.length; i++) {
    if (difficultyInput[i].checked) {
      settings.difficulty = difficultyInput[i].value;
    }
  }
  if (settings.difficulty === "easy") {
    enemyAvatar.style.backgroundImage =
      "url(./assets/images/snake_witch_by_lucy_lisett_deecsrr-pre.jpeg)";
  } else if (settings.difficulty === "medium") {
    enemyAvatar.style.backgroundImage =
      "url(./assets/images/black_demon_by_lucy_lisett_deiolkq-pre.jpeg)";
  } else if (settings.difficulty === "hard") {
    enemyAvatar.style.backgroundImage =
      "url(./assets/images/dark_priest_by_lucy_lisett_deftk3k-pre.jpeg)";
  } else {
    enemyAvatar.style.backgroundImage =
      "url(./assets/images/demonic_wizard_by_lucy_lisett_degm84n-pre.jpeg)";
  }

  settings.profanity = profanityInput.checked;
  heroEl.style.backgroundImage = "url(./assets/images/hero2.jpg)";
  heroEl.style.backgroundSize = "cover";
  heroEl.style.backgroundPosition = "top";
  heroEl.style.backgroundColor = "black";
  heroEl.style.boxShadow = "inset 0 0 28vmin 0 rgba(0, 0, 0, 0.9";

  modal.classList.remove("is-active");
  landingMsg.classList.add("is-hidden");
  heroFoot.classList.add("is-hidden");
  footer.classList.add("is-hidden");
  loadScreen();
}

let user = {
  username: "",
  experience: "",
  startingDeck: "",
};

function createAccount(event) {
  // event.preventDefault();
  wildwoodUser.username = usernameInput.value.trim();
  wildwoodUser.experience = experienceLevel.value;
  for (let i = 0; i < experienceLevel.length; i++) {
    if (experienceLevel[i].checked) {
      wildwoodUser.experience = experienceLevel[i].value;
    }
  }
  wildwoodUser.startingDeck = startingDeck.value;
  localStorage.setItem("wildwoodUser", JSON.stringify(wildwoodUser));
  newGameBtn.dataset.target = "new-game-modal";
  accountEl.children[0].textContent = `Welcome ${wildwoodUser.username}`;
  // Welcome, username!;
}

accountForm.addEventListener("submit", createAccount);

newGameForm.addEventListener("submit", startGame);

const localStorageData = JSON.parse(localStorage.getItem("wildwoodUser"));

if (!localStorageData) {
  newGameBtn.dataset.target = "create-account-modal";
} else {
  accountEl.dataset.target = "settings-modal";
  console.log(localStorageData);
  accountEl.children[0].textContent = `Welcome ${localStorageData.username}!`;
}

// BULMA CODE
/* When a user clicks on a button, an element with the `.modal` class is opened. */
document.addEventListener("DOMContentLoaded", () => {
  // NAVBURGERS
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
  // END OF NAVBURGERS

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
    ($delete) => {git
      const $notification = $delete.parentNode;

      $delete.addEventListener("click", () => {
        $notification.parentNode.removeChild($notification);
      });
    }
  );
});
// END OF BULMA JS
