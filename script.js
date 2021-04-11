var cards = document.querySelectorAll('.memory-card');

var count;
var sum = document.querySelector('.sum');
var point;
var points = document.querySelector('.points');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

var countFlipedCard = 0;

function flipCard() 
{
  if (lockBoard) 
    return;
  if (this === firstCard)
   return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() 
{
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards() 
   
}

function disableCards() 
{
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  point++;
  points.textContent = point;
  countFlipedCard = countFlipedCard + 2;
  if (countFlipedCard === 64)
  {
    setTimeout(endGame(), 2000);
  }
  resetBoard();
}

function unflipCards()
 {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    count--;
    if (point > 0)
      point--;
    points.textContent = point;
    sum.textContent = count;
    if (count === 0)
    {
      endGame();
    }
    resetBoard();
  }, 
  1500);
}

function resetBoard()
 {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() 
{
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 64);
    card.style.order = randomPos;
  });
};

cards.forEach(card => card.addEventListener('click', flipCard));

function allCardsFlip()
{
  cards.forEach(card => card.classList.add('flip'));
}

function unFlip()
{
  cards.forEach(card => card.classList.remove('flip'));
}

function endGame()
{
  
  if (count > 0)
  {
    point = count * 2 + point;
    points.textContent = point;
  }
  setTimeout(alerted, 500);
  setTimeout(unFlip, 1000);
}

function StartGame()
{
  cards = document.querySelectorAll('.memory-card');
  hasFlippedCard = false;
  lockBoard = false;
  resetBoard();
  shuffle();
  allCardsFlip();
  setTimeout(unFlip,5000);
  point = 0;
  count = 3;
  sum.textContent = count;
  points.textContent = point;
  countFlipedCard = 0;
}

function alerted()
{
  var name = prompt("Игра окончена:\nВведите ваше имя!!!");
  result [name] = point;
  document.querySelector(".name").textContent = name;
  document.querySelector(".result").textContent = result[name];
  localStorage.setItem(result[name]);
  
}

var result = 
{
  name : point
}
