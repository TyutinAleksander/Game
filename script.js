var cards = document.querySelectorAll('.memory-card');

var count;
var sum = document.querySelector('.sum');
var point;
var points = document.querySelector('.points');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

var countFlipedCard = 0;

var result = {};
//localStorage.removeItem('result');
restoreLeaderBoard();

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
  resetBoard();
  if (countFlipedCard === cards.length)
  {
    endGame();
  }
}

function unflipCards()
 {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 
  1000);
  count--;
  if (point > 0)
    point--;
  points.textContent = point;
  sum.textContent = count;
  if (count === 0)
  {
    endGame();
  }
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
  setTimeout(allCardsFlip, 2000);
  setTimeout(alerted, 3000);
  resetBoard();
}

function StartGame()
{
  cards.forEach(card => card.addEventListener('click', flipCard));
  console.log(lockBoard);
  shuffle();
  allCardsFlip();
  setTimeout(unFlip,1000);
  point = 0;
  count = 3;
  sum.textContent = count;
  points.textContent = point;
  countFlipedCard = 0;
}

function alerted()
{
  var name = prompt("Игра окончена:\nВведите ваше имя!!!");
  if (name) {
    addLeaders(name);
  }
  localStorage.removeItem('result');
  localStorage.setItem('result', JSON.stringify(result));
}

function addLeaders(leaderName) {
  let rows =  document.querySelector(".top-five").childNodes[1].children;
  if (rows.length > 5) {
    alert("Извините, Вы не попали в топ 5 лидеров.");
  } else {
    result[String(leaderName)] = point;
    // Добавляем строку в таблицу
    let row = createRow(leaderName, point);
    if (rows.length < 2) {
      document.querySelector(".top-five").childNodes[1].appendChild(row);
    } else {
      for (let i = 1; i < rows.length; ++i) {
        if (Number(rows[i].querySelector(".point").textContent) < point) {
           rows[i].before(row);
        }
      }
    }
  }
}

function restoreLeaderBoard() {
  let rows =  document.querySelector(".top-five").childNodes[1].children;
  if (localStorage.getItem('result') !== null) {
    while(rows.length > 1) {
      rows[1].remove();
    }
    let jsonData = localStorage.getItem('result');
    result = JSON.parse(jsonData);
    let arr = Object.keys(result).map((key) => [key, result[key]]);
    for (let i = 0; i < arr.length; ++i) {
      rows[i].after(createRow(arr[i][0], arr[i][1]));
    }
  }
}

function createRow(leaderName, pointNumber) {
  let row = document.createElement('tr');
  let tdName = document.createElement('td');
  let tdPoints = tdName.cloneNode(true);
  tdName.textContent = leaderName;
  tdPoints.textContent = pointNumber;
  tdPoints.classList.add("point");
  row.appendChild(tdName);
  row.appendChild(tdPoints);

  return row;
}