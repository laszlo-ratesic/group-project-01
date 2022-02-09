const pantryID = "e7259b55-e424-4352-b9d4-af473fc7431a";
const apiurl =
  "https://getpantry.cloud/apiv1/pantry/e7259b55-e424-4352-b9d4-af473fc7431a/basket/dragons-wrath";

const accountEl = document.getElementById("account-el");
const navBarBrand = document.querySelector(".navbar-brand");
const navBarMenu = document.querySelector(".navbar-menu");
const modal = document.querySelector(".modal");
const landingMsg = document.getElementById("landing-msg");

const deleteAccountBtn = document.getElementById("delete-account-btn");

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
const imgTop = document.querySelector(".img-top");


const enemyHealth = document.getElementById("enemy-health");
const enemyPower = document.getElementById("enemy-power");
const playerHealth = document.getElementById("player-health");
const playerPower = document.getElementById("player-power");

const newGameBtn = document.getElementById("new-game-btn");

const youWon = document.getElementById("you-won");
const youLost = document.getElementById("you-lost");

const loadingBar = document.createElement("progress");
const msg = document.createElement("img");
msg.src = "./assets/images/box1.png";
msg.style.width = "25vw";
const msgText = document.createElement("div");


const localStorageData = JSON.parse(localStorage.getItem("bloodgateUser"));

const restartBtn = document.getElementById("restart-btn");

$insetGoldGlow =
  "inset gold -15px -15px 10px, inset gold 15px -15px 10px, inset gold 15px 15px 10px, inset gold -15px 15px 10px";
$insetRedGlow =
  "inset red 15px 15px 10px, inset red 15px -15px 10px, inset red -15px -15px 10px, inset red -15px 15px 10px";

$redGlow = "0 0 50px 25px rgb(255,0,0)";
$blueGlow = "0 0 50px 25px rgb(0,0,255)";
$goldGlow = "0 0 50px 25px rgb(255,215,0)";

let turnCounter = 0;

let bloodgateUser = {
  username: "",
  experience: "",
  startingDeck: "",
};

let player = {
  name: "",
  class: "",
  power: 0,
  health: 30,
  deck: null,
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
  deck: "bloodfury-dominion",
  hand: [],
};

let discardPile = [];

let thinkingInterval;

let playerCards = playerField.children;
let enemyCards = enemyField.children;


function buttonPressed(event) {
  event.target.src = "./assets/images/buttonPressed.png";
  event.target.style.top = "0";
}

function buttonReleased(event) {
  event.target.src = "./assets/images/buttonHighLight.png";
  event.target.style.top = "-3px";
}

function hover(event) {
  event.target.style.boxShadow = $goldGlow;
}

function unhover(event) {
  event.target.style.boxShadow = $blueGlow;
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
  gsap.fromTo(notification, {
    opacity: 0,
  },{
    opacity: 1,
    y: 270
    })
  enemyAvatar.prepend(notification);
  setTimeout(function () {
    enemyAvatar.removeChild(notification);
  }, 3000);
}

// {Player's} card floats with red shadow
// *We use this to show which cards are in play on player's turn
function cardReady(cardEl) {
  cardEl.style.transition = "all 400ms";
  cardEl.style.transform = "translateY(-15px)";
  cardEl.style.boxShadow = $blueGlow;
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

function reloadPage() {
  location.reload(true);
}

function endGame() {
  feltView.classList.add("is-hidden");
  gameOver.classList.remove("is-hidden");
  if (enemy.health <= 0) {
    youWon.classList.remove("is-hidden");
  } else {
    youLost.classList.remove("is-hidden");
  }
  restartBtn.addEventListener("click", reloadPage);
  return;
}

function gBCR(elem) {
  return elem.getBoundingClientRect();
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
    var tween = gsap.fromTo(target, {
      boxShadow: "inset 0 0 25px 25px red",
    }, {
      boxShadow: "inset 0 0 25px 0 red",
      ease: "elastic.out(1, 0.3)",
    });
    tween.play();
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
    var tween2 = gsap.fromTo(target.children[0], {
      boxShadow: "inset 0 0 100px 25px red, 0 0 25px 25px red",
      duration: 1
    }, {
      clearProps: "box-shadow",
      ease: "elastic.out(1, 0.3)"
    });
    tween2.play();
    // Subtract the player card's atk score from the enemy card's def score
    target.dataset.def -= readyToAttack.dataset.atk;
    target.children[3].textContent = target.dataset.def;
    target.children[3].style.color = "red";

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
    readyToAttack.children[3].textContent = readyToAttack.dataset.def;
    readyToAttack.children[3].style.color = "red";

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
      playerCards[i].addEventListener("mouseenter", hover);
      playerCards[i].addEventListener("mouseleave", unhover);
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
  attacker.removeEventListener("mouseenter", hover);
  attacker.removeEventListener("mouseleave", unhover);
  if (attacker.dataset.state === "ready-to-attack") {
    removeAtkMsg();
    return;
  }
  /* For each card in the player's field, if it is not the attacker, set its animation to null, set its
  box shadow to none, and set its transform to translateY(15px). If the card is not exhausted or in
  play, set its state to on-guard. */
  for (let i = 0; i < playerCards.length; i++) {
    if (playerCards[i] !== attacker) {
      playerCards[i].removeEventListener("mouseenter", hover);
      playerCards[i].removeEventListener("mouseleave", unhover);
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
  attacker.style.boxShadow = $redGlow;
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
    newCard.classList.add("player-card", "is-size-1", "has-text-black");
    setCardProps(newCard, player.deck);
    const cardImg = document.createElement("img");
    cardImg.src = newCard.dataset.img;
    cardImg.style.transform = "scale(1.2)";
    newCard.appendChild(cardImg);

    const costStat = document.createElement("div");
    costStat.style =
      "position:absolute;top:-1.45rem;left:-.18rem;font-size:.5em;font-weight:bold;-webkit-text-stroke:1px black;";
    costStat.textContent = newCard.dataset.cost;
    newCard.appendChild(costStat);

    const atkStat = document.createElement("div");
    atkStat.style =
      "position:absolute;top:5.5rem;left:-.55rem;font-size:.55em;font-weight:bold;color:white;-webkit-text-stroke:1px black;";
    atkStat.textContent = newCard.dataset.atk;
    newCard.appendChild(atkStat);

    const defStat = document.createElement("div");
    defStat.style =
      "position:absolute;top:5.5rem;left:9.53rem;font-size:.55em;font-weight:bold;color:white;-webkit-text-stroke:1px black;";
    defStat.textContent = newCard.dataset.def;
    newCard.appendChild(defStat);

    gsap.fromTo(
      newCard,
      {
        onStart: function () {
          playerHand.append(newCard);
        },
        x: 700,
        onComplete: function () {
          playerHand.appendChild(newCard);
        },
      },
      {
        x: 0,
        onComplete: function () {
          gsap.set(newCard, {
            clearProps: "all",
          });
        },
      }
    );
    player.hand.push(newCard);
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
      playerCards[i].addEventListener("mouseenter", hover);
      playerCards[i].addEventListener("mouseleave", unhover);
    }
  }
  endTurnBtn.addEventListener("click", endPlayerTurn);
  endTurnBtn.addEventListener("mousedown", buttonPressed);
  endTurnBtn.addEventListener("mouseup", buttonReleased);
}

function yourTurnMsg() {
  msg.style = "position:relative; top:0; left:0; margin: 0 auto;";
  msgText.style = "position:relative; top:-5rem; left:0; margin: 0 auto; font-family:'MedievalSharp',serif; font-size: 3em; font-weight:bolder; color:black;";
  msgText.textContent = "Your Turn";
  enemyField.after(msg);
  msg.after(msgText);
  setTimeout(function() {
    msg.style = "opacity:0; transition: opacity 600ms;"
    msgText.style = "opacity:0; transition: opacity 600ms;"
    msg.remove();
    msgText.remove();
  }, 2000);
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
  yourTurnMsg();
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
        playerCards[randomIndex].children[3].textContent = playerCards[randomIndex].dataset.def;
        playerCards[randomIndex].children[3].style.color = "red";

        enemyCards[i].dataset.def -= playerCards[randomIndex].dataset.atk;
        enemyCards[i].children[3].textContent = enemyCards[i].dataset.def;
        enemyCards[i].children[3].style.color = "red";
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
        const cardFace = document.createElement("img");
        cardFace.src = card.dataset.img;
        cardFace.style.transform = "scale(1.2)";
        card.appendChild(cardFace);
        card.classList.add("played-enemy-card");
        card.dataset.state = "in-play";

        const costStat = document.createElement("div");
        costStat.style =
          "position:absolute;top:-1.45rem;left:-.3rem;font-size:1.5em;font-weight:bold; color:black;-webkit-text-stroke:1px black;";
        costStat.textContent = card.dataset.cost;
        card.appendChild(costStat);

        const atkStat = document.createElement("div");
        atkStat.style =
          "position:absolute;top:5.65rem;left:-.45rem;font-size:1.5em;font-weight:bold;color:white;-webkit-text-stroke:1px black;";
        atkStat.textContent = card.dataset.atk;
        card.appendChild(atkStat);

        const defStat = document.createElement("div");
        defStat.style =
          "position:absolute;top:5.65rem;left:9.53rem;font-size:1.5em;font-weight:bold;color:white;-webkit-text-stroke:1px black;";
        defStat.textContent = card.dataset.def;
        card.appendChild(defStat);

        console.log(`${enemy.name} played ${card.dataset.name}`);
        const w = window.innerWidth / 4;
        const h = window.innerHeight / 8;
        gsap.from(card, {
          duration: 2,
          ease: "power4",
          scale: 1.5,
          xPercent: w,
          yPercent: -h,
        });
        enemyField.appendChild(card);
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
  if (settings.difficulty === "easy") {
    enemy.power = turnCounter;
  } else if (settings.difficulty === "medium") {
    enemy.power = turnCounter + 2;
  } else if (settings.difficulty === "hard") {
    enemy.power = turnCounter + 4;
  } else {
    enemy.power = turnCounter + 6;
  }
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
    gsap.fromTo(
      newCard,
      {
        onStart: function () {
          enemyHand.after(newCard);
        },
        x: 700,
        onComplete: function () {
          enemyHand.appendChild(newCard);
        },
      },
      {
        x: 0,
      }
    );
    setCardProps(newCard, enemy.deck);
    enemy.hand.push(newCard);
  }
  console.log(`${enemy.name} has ${displayHand(enemy.hand)}`);
  enemyThinking();
}

function compliment() {
  const apiUrl = "https://complimentr.com/api";

  fetch(apiUrl, {
    method: 'GET'
  }).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        trashTalk = data.compliment;
      })
    } else {
      console.log("error")
    }
  })
}

function endPlayerTurn() {
  endTurnBtn.removeEventListener("click", endPlayerTurn);
  for (let i = 0; i < playerField.children.length; i++) {
    if (playerField.children[i].dataset.state === "ready-to-attack") {
      removeAtkMsg();
    }
    playerField.children[i].removeEventListener("click", AtkMsg);
    playerField.children[i].removeEventListener("mouseenter", hover);
    playerField.children[i].removeEventListener("mouseleave", unhover);
    playerField.children[i].style = "transition: all 400ms; box-shadow:none; transform: translateY(15px); animation:none;";
  }
  for (let i = 0; i < playerHand.children.length; i++) {
    if (playerHand.children[i].dataset.state === "in-hand") {
      playerHand.children[i].removeEventListener("click", playCard);
    }
  }
  if (settings.profanity) {
    fuckOff("https://cors-anywhere.herokuapp.com/http://foaas.com/");
  } else {
    compliment();
  }
  setTimeout(notification(trashTalk), 2000);
  setTimeout(enemyTurn(), 2000);
}

// This array holds API call commands for foaas API

let trashTalk = "";


async function fuckOff(url) {
  // These variables are for the insult array
  let insult = [
    `anyway/${player.name}`,
    `asshole`,
    `back`,
    `bag`,
    `blackadder`,
    `bus/${player.name}`,
    `bye`,
    `caniuse/shears`,
    `cocksplat/${player.name}`,
    `dosomething/waste/time`,
    `dumbledore`,
    `everyone`,
    `everything`,
    `fascinating`,
    `field/${player.name}`,
    `give`,
    `holygrail`,
    `horse`,
    `legend/${player.name}`,
    `life`,
    `linus/${player.name}`,
    `mornin`,
    `nugget/${player.name}`,
    `problem/${player.name}`,
    `ridiculous`,
    `sake`,
    `shakespeare/${player.name}`,
    `shit`,
    `thinking/${player.name}`,
    `waste/${player.name}`,
  ];
  let from = enemy.name;
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
        trashTalk = data.message;
      });
    } else {
      console.log("error");
    }
  });
};

function playCard(event) {
  const chosenCard = event.currentTarget;
  if (player.power >= chosenCard.dataset.cost) {
    const index = player.hand.indexOf(chosenCard);
    player.hand.splice(index, 1);
    chosenCard.classList.remove("player-card");
    chosenCard.classList.add("played-card");
    chosenCard.setAttribute("data-state", "in-play");
    chosenCard.removeEventListener("click", playCard);
    const w = window.innerWidth / 4;
    const h = window.innerHeight / 8;
    gsap.from(chosenCard, {
      duration: 2,
      ease: "power4",
      scale: 1.5,
      xPercent: -w,
      yPercent: -h,
    });
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
    } else if (i === 3) {
      cardEl.setAttribute("data-def", cardProps[i][1]);
    } else {
      cardEl.setAttribute("data-img", cardProps[i][1]);
    }
  }
}

function createStats(cardEl) {
  const costStat = document.createElement("div");
  costStat.style = "position:absolute; top:-1.45rem; left:-.18rem; font-size:.5em; font-weight:bold; color:black; -webkit-text-stroke:1px black;";
  costStat.textContent = cardEl.dataset.cost;
  cardEl.appendChild(costStat);

  const atkStat = document.createElement("div");
  atkStat.style = "position:absolute;top:5.5rem;left:-.55rem;font-size:.55em;font-weight:bold;color:white;-webkit-text-stroke:1px black;";
  atkStat.textContent = cardEl.dataset.atk;
  cardEl.appendChild(atkStat);

  const defStat = document.createElement("div");
  defStat.style = "position:absolute;top:5.5rem;left:9.53rem;font-size:.55em;font-weight:bold;color:white;-webkit-text-stroke:1px black;";
  defStat.textContent = cardEl.dataset.def;
  cardEl.appendChild(defStat);
}

function displayFelt() {
  loadingBar.remove();
  msg.remove();
  heroEl.style =
    "background-image:url(./assets/images/red-felt.jpeg); cursor:url('./assets/images/custom-cursor.png'), auto;";
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

  console.log(player.deck);

  playerCard1.addEventListener("click", playCard);
  setCardProps(playerCard1, player.deck);
  playerCard1.children[0].src = playerCard1.dataset.img;
  createStats(playerCard1);
  player.hand.push(playerCard1);

  playerCard2.addEventListener("click", playCard);
  setCardProps(playerCard2, player.deck);
  playerCard2.children[0].src = playerCard2.dataset.img;
  createStats(playerCard2);
  player.hand.push(playerCard2);

  playerCard3.addEventListener("click", playCard);
  setCardProps(playerCard3, player.deck);
  playerCard3.children[0].src = playerCard3.dataset.img;
  createStats(playerCard3);
  player.hand.push(playerCard3);

  playerCard4.addEventListener("click", playCard);
  setCardProps(playerCard4, player.deck);
  playerCard4.children[0].src = playerCard4.dataset.img;
  createStats(playerCard4);
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

function loadScreen() {
  navBarBrand.classList.add("is-hidden");
  navBarMenu.classList.add("is-hidden");
  console.log(`Welcome ${player.name}!`);
  heroBody.style.width = "75%";
  heroBody.classList.add(
    "is-align-self-center",
    "is-flex",
    "is-flex-direction-column"
  );
  loadingBar.classList.add("progress", "is-large", "is-medium-dark");
  loadingBar.max = "100";
  loadingBar.textContent = "60%";
  loadingBar.style.marginTop = "5rem";
  heroBody.appendChild(msg);
  heroBody.appendChild(loadingBar);
  if (settings.profanity) {
    fuckOff("https://cors-anywhere.herokuapp.com/http://foaas.com/");
  } else {
    compliment();
  }
  heroBody.style.justifyContent = "center";
  setTimeout(displayFelt, 2000);
}

/**
 * It removes the is-active class from the modal and adds the is-hidden class to the landing message.
 * @param event - The event object that was triggered.
 */
function startGame(event) {
  event.preventDefault();
  console.log(player);
  player.name = nameInput.value.trim();
  player.class = classSelect.value;
  if (player.class === "barbarian") {
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

  getDeck(enemy, "bloodfury-dominion");

  if (settings.difficulty === "easy") {
    enemyAvatar.style.backgroundImage =
      "url(./assets/images/snake_witch_by_lucy_lisett_deecsrr-pre.jpeg)";
  } else if (settings.difficulty === "medium") {
    enemy.power = 2;
    enemyAvatar.style.backgroundImage =
      "url(./assets/images/black_demon_by_lucy_lisett_deiolkq-pre.jpeg)";
  } else if (settings.difficulty === "hard") {
    enemy.power = 4;
    enemyAvatar.style.backgroundImage =
      "url(./assets/images/dark_priest_by_lucy_lisett_deftk3k-pre.jpeg)";
  } else {
    enemy.power = 6;
    enemyAvatar.style.backgroundImage =
      "url(./assets/images/demonic_wizard_by_lucy_lisett_degm84n-pre.jpeg)";
  }

  settings.profanity = profanityInput.checked;

  heroEl.style.backgroundImage = "url(./assets/images/hero2.jpg)";
  heroEl.style.backgroundSize = "cover";
  heroEl.style.backgroundPosition = "top";
  heroEl.style.backgroundColor = "black";
  heroEl.style.boxShadow = "inset 0 0 28vmin 0 rgba(0, 0, 0, 0.9)";

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
  bloodgateUser.username = usernameInput.value.trim();
  bloodgateUser.experience = experienceLevel.value;
  for (let i = 0; i < experienceLevel.length; i++) {
    if (experienceLevel[i].checked) {
      bloodgateUser.experience = experienceLevel[i].value;
    }
  }
  bloodgateUser.startingDeck = startingDeck.value;
  localStorage.setItem("bloodgateUser", JSON.stringify(bloodgateUser));
  newGameBtn.dataset.target = "new-game-modal";
  accountEl.children[0].textContent = `Welcome ${bloodgateUser.username}`;
  // Welcome, username!;
}

function getDeck(user, deck) {
  const apiUrl =
    "https://getpantry.cloud/apiv1/pantry/e7259b55-e424-4352-b9d4-af473fc7431a/basket/" +
    deck;

  fetch(apiUrl, {
    method: 'GET',
    headers: {
      accept: "application/json"
    }
  }).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        user.deck = data.cards;
      });
    } else {
      console.log("error");
    }
  });
}

accountForm.addEventListener("submit", createAccount);
newGameForm.addEventListener("submit", startGame);
deleteAccountBtn.addEventListener("click", function () {
  localStorage.removeItem("bloodgateUser");
  location.reload(true);
});

if (!localStorageData) {
  newGameBtn.dataset.target = "create-account-modal";
} else {
  accountEl.dataset.target = "settings-modal";
  accountEl.children[0].textContent = `Welcome ${localStorageData.username}!`;
  getDeck(player, localStorageData.startingDeck);
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
    ($delete) => {
      git;
      const $notification = $delete.parentNode;

      $delete.addEventListener("click", () => {
        $notification.parentNode.removeChild($notification);
      });
    }
  );
});
// END OF BULMA JS
