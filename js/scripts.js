//BUSINESS LOGIC//
function Game (cards1, cards2){ //<--object--//
  this.cardsOne = cards1;
  this.cardsTwo = cards2;
}

function Card (cardValue, className){
  this.cardValue = cardValue;
  this.class = className;
}

function HighScore(player, score){
this.player = player;
this.score = score;
}

var buildCards = function(numberOfCards){ //---generates an array from 1 to numberOfCards and pushes each # to empty cardsArray--//
  var cardsArray = [];
  for(i=1; i <= numberOfCards; i++){
    cardsArray.push(i);
  }
  return cardsArray;
}

var buildTotalArray = function(cardsOneArray, cardsTwoArray){ ///- 2 loops that manipulate 2 existing arrays---//
  var totalArray = [];
  for(i = 0; i < cardsOneArray.length; i++){
    totalArray.push(cardsOneArray[i]);
  }
  for(i = 0; i < cardsTwoArray.length; i++){
    totalArray.push(cardsTwoArray[i]);
  }

  return totalArray;
}

var combineArray = function(array, iconsArray){
  counter2 = 0
  var cardObjectsArray = [];
  for(i=0; i < array.length; i++){
    var newCard = new Card(array[i], iconsArray[counter2]);
    cardObjectsArray.push(newCard);
     counter2 = counter2 + 1
     if (counter2 === iconsArray.length){
       counter2 = 0;
     }
  }
  return cardObjectsArray;
}

var shuffle = function(array2, length){
  var shuffledArray = [];
  var newArray = [];
  for(i = 0; i < (shuffledArray.length + array2.length); i++){
    var randomValue = array2.splice((Math.floor(Math.random() * length)), 1);
    shuffledArray.push(randomValue);
    length = length - 1;

  }
  for(i = 0; i < (shuffledArray.length + array2.length); i++){
    newArray = newArray.concat(shuffledArray[i]);
  }
  return newArray;
}



function checkWin(winCounter) {
  if (winCounter === numberOfCards) {
    alert("Game Over!");
    var highScore = new HighScore(player, turnCounter);
    updateHighScores(highScore);
    updateHighScoreDisplay();
    turnCounter = 0;
  }
}

function determineDifficulty() {
  if (difficulty === "Easy") {
    storageArray = "easyArray";
    return highScoreArrayEasy;
  } else if (difficulty === "Medium") {
    storageArray = "mediumArray";
    return highScoreArrayMedium;
  } else {
    storageArray = "hardArray";
    return highScoreArrayHard;
  }
}

function updateHighScores(highScore) {
  for (var i = 0; i < 3; i++) {
    var targetArray = determineDifficulty(); // Picks the right array to use for the difficulty level
    if (highScore.score < targetArray[i].score) {
      targetArray[i+2] = targetArray[i+1];
      targetArray[i+1] = targetArray[i];
      targetArray[i] = highScore;
      targetArray = targetArray.slice(0, 3);
      localStorage.setItem(storageArray, JSON.stringify(targetArray))
      break;
    }
  }
}

function updateHighScoreDisplay() {
  var targetArray = determineDifficulty(); // Picks the right array to use for the difficulty level
  for(i = 0; i < 3; i++){
    $(".user" + (i+1) + "-name").text(targetArray[i].player);
    $(".user" + (i+1) + "-score").text(targetArray[i].score);

  }
}


var highScoreArrayEasy = JSON.parse(localStorage.getItem("easyArray"));
var highScoreArrayMedium = JSON.parse(localStorage.getItem("mediumArray"));
var highScoreArrayHard = JSON.parse(localStorage.getItem("hardArray"));
var defaultScores = new HighScore("", 100);
var storageArray;
var turnCounter = 0;
var player;
var numberOfCards;
var difficulty = "Easy";

if (highScoreArrayEasy === null){
  highScoreArrayEasy = [defaultScores, defaultScores, defaultScores];
}
if (highScoreArrayMedium === null){
  highScoreArrayMedium = [defaultScores, defaultScores, defaultScores];
}
if (highScoreArrayHard === null){
  highScoreArrayHard = [defaultScores, defaultScores, defaultScores];
}



//USER LOGIC//
$(document).ready(function(){

  $("#player").submit(function(event){
    event.preventDefault();
    player = $("#playerName").val();
    $("#player ul#name").text("User: " + player);
    $("#playerName").val("");
  });


  $("#level1").click(function(){
    $("form .row").empty();

    columns = "col-xs-4";
    numberOfColumns = 3;
    icons = ["sun", "water", "fire", "moon", "wind", "earth"];
    numberOfCards = 6;
    difficulty = "Easy";
    numberOfRows = 4;
    layoutId = 0;
    updateHighScoreDisplay();

  });

  $("#level2").click(function(){
    $("form .row").empty();

    columns = "col-xs-2";
    numberOfColumns = 5;
    icons = ["tree", "mountain", "rock", "rain", "sun", "water", "fire", "moon", "wind", "earth"];
    numberOfCards = 10;
    difficulty = "Medium";
    layoutId = "layout";
    numberOfRows = 4;
    updateHighScoreDisplay();

  });

  $("#level3").click(function(){
    $("form .row").empty();

    columns = "col-xs-2";
    numberOfColumns = 6;
    icons = ["tree", "mountain", "rock", "rain", "sun", "water", "fire", "moon", "wind", "earth", "flower", "snow", "cloud", "star", "leave"];
    numberOfCards = 15;
    numberOfRows =  5;
    layoutId = 0;
    difficulty = "Hard";
    updateHighScoreDisplay();

  });

  $("#gameBoard").submit(function(event){
    event.preventDefault();
    $("form .row").empty();
    $("#score").empty();
    $("#name").empty();

    var cards1 = buildCards(numberOfCards);
    var cards2 = buildCards(numberOfCards);
    var newGame = new Game(cards1, cards2);
    var combinedArrays = buildTotalArray(newGame.cardsOne, newGame.cardsTwo);
    var cardObjectsArray = combineArray(combinedArrays, icons);
    var lengthOfCardObjectsArray = cardObjectsArray.length;
    var newArray = shuffle(cardObjectsArray, lengthOfCardObjectsArray);


    var hTMLelement = $(".main-content .row");
    var counter = 0;
    for(i = 0; i < numberOfRows; i++){
      for(j = 0; j < numberOfColumns; j++){
        if (counter !== 30){
          $(hTMLelement[i]).append('<div id = "' + layoutId +'" class="' + columns + '"><li class="back ' + newArray[counter].class + '">' + newArray[counter].cardValue + '</li></div>');
          counter += 1;
        }
      }

    }

    var winCounter = 0;
    turnCounter = 0;
    var lastClicked;
    $("li").click(function(){
      if (this != lastClicked){
        $(this).removeClass("back");
        $(this).fadeIn(500);
        turnCounter ++;
        if ($(this).attr('class') === $(lastClicked).attr('class')) {
          lastClicked = $(".hiddenPlaceholder");
          winCounter ++;
          checkWin(winCounter);
        }
        else {
        $(lastClicked).addClass("back");
        lastClicked = this;
        }
        $("#score").text("Number of clicks: " + turnCounter);
      }
    });

    $("#refresh").show();

  });

  $("button").trigger("#gameBoard");
  // $("#level1").trigger("click");
});
