"use strict";
const scoreoE = document.querySelector("#score--0");
const score1E = document.querySelector("#score--1");
const diceE = document.querySelector(".dice");
const player0E = document.querySelector(".player--0");
const player1E = document.querySelector(".player--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0E = document.querySelector("#current--0");
const current1E = document.querySelector("#current--1");
let currentScore, activePlayer, scores, playing;
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  scoreoE.textContent = 0;
  score1E.textContent = 0;
  current0E.textContent = 0;
  current1E.textContent = 0;

  diceE.classList.add("hidden");
  player0E.classList.remove("player--winner");
  player1E.classList.remove("player--winner");
  player0E.classList.add("player--active");
  player1E.classList.remove("player--active");
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0E.classList.toggle("player--active");
  player1E.classList.toggle("player--active");
};
btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceE.classList.remove("hidden");
    diceE.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 50) {
      playing = false;
      diceE.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--active");
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener("click", init);
