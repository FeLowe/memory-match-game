//BUSINESS LOGIC//
function Game (cards1, cards2){ //<--object--//
  this.cardsOne = cards1;
  this.cardsTwo = cards2;
}

var buildCards = function(numberOfCards){ //---generates an array from 1 to 6 and pushes each # to empty cardsArray--//
  var cardsArray = [];
  for(i=1; i <= numberOfCards; i++){
    cardsArray.push(i);
  }
  return cardsArray;
}

var buildTotalArray = function(cardsOneArray, cardsTwoArray){ ///- 2 loops that manipulats 2 existing arrays---//
  var totalArray = [];
  for(i = 0; i < cardsOneArray.length; i++){
    totalArray.push(cardsOneArray[i]);
  }
  for(i = 0; i < cardsTwoArray.length; i++){
    totalArray.push(cardsTwoArray[i]);
  }

  return totalArray;
}

function Card (cardValue, className){
  this.cardValue = cardValue;
  this.class = className;
}

function HighScore(player, score){
this.player = player;
this.score = score;
}

function checkWin(winCounter) {
  if (winCounter === 6) {
    alert("Game Over!");
    var highScore = new HighScore(player, turnCounter);
    updateHighScores(highScore);
    turnCounter = 0;
  }
}

function updateHighScores(highScore) {
  for (var i = 0; i <3; i++) {
    if (highScore.score < highScoreArray[i].score) {
      highScoreArray[i+2] = highScoreArray[i+1];
      highScoreArray[i+1] = highScoreArray[i];
      highScoreArray[i] = highScore;
      highScoreArray = highScoreArray.slice(0, 3);
      $(".highScores").show();
      $(".user-name").empty();
      $(".user-score").empty();
        $(".user1-name").text(highScoreArray[0].player);
        $(".user1-score").text(highScoreArray[0].score);
        $(".user2-name").text(highScoreArray[1].player);
        $(".user2-score").text(highScoreArray[1].score);
        $(".user3-name").text(highScoreArray[2].player);
        $(".user3-score").text(highScoreArray[2].score);
      break;
    }
  }
}

var defaultScores = new HighScore("Player", 100);
var highScoreArray = [defaultScores, defaultScores, defaultScores];
var turnCounter = 0;
var player;


//USER LOGIC//
$(document).ready(function(){

  $("#player").submit(function(event){
    player = $("#playerName").val();
    $("#player ul#name").text(player);
  });

  columns = "col-xs-4";
  numberOfColumns = 3;
  icons = ["sun", "water", "fire", "moon", "wind", "earth"];
  numberOfCards = 6;


  $("#level1").click(function(){
    $("form .row").empty();
    columns = "col-xs-4";
    numberOfColumns = 3;
    icons = ["sun", "water", "fire", "moon", "wind", "earth"];
    numberOfCards = 6;
  });

  $("#level2").click(function(){
    $("form .row").empty();

    columns = "col-xs-2";
    numberOfColumns = 5;
    icons = ["tree", "mountain", "rock", "rain", "sun", "water", "fire", "moon", "wind", "earth", ];
    numberOfCards = 10;

  });



  $("form").submit(function(event){
    event.preventDefault();
    $("form .row").empty();
    console.log(icons);

    var cards1 = buildCards(numberOfCards);
    var cards2 = buildCards(numberOfCards);
    var newGame = new Game(cards1, cards2);
    var combinedArrays = buildTotalArray(newGame.cardsOne, newGame.cardsTwo);

    var shuffledArray = [];
    var cardObjectsArray = [];


    counter2 = 0
    for(i=0; i < combinedArrays.length; i++){
      var newCard = new Card(combinedArrays[i], icons[counter2]);
      cardObjectsArray.push(newCard);
       counter2 = counter2 + 1
       if (counter2 === icons.length){
         counter2 = 0;
       }
    }

    var lengthOfCardObjectsArray = cardObjectsArray.length;

    for(i = 0; i < (shuffledArray.length + cardObjectsArray.length); i++){
      var randomValue = cardObjectsArray.splice((Math.floor(Math.random() * lengthOfCardObjectsArray)), 1);
      shuffledArray.push(randomValue);
      lengthOfCardObjectsArray = lengthOfCardObjectsArray - 1;

    }

    var newArray = [];

    for(i = 0; i < (shuffledArray.length + cardObjectsArray.length); i++){
      newArray = newArray.concat(shuffledArray[i]);
    }

    var hTMLelement = $(".main-content .row");



    var counter = 0;
    for(i = 0; i < 4; i++){
      for(j = 0; j < numberOfColumns; j++){
        $(hTMLelement[i]).append('<div class="' + columns + '"><li class="back ' + newArray[counter].class + '">' + newArray[counter].cardValue + '</li></div>');
        counter += 1;
      }

    }
    var winCounter = 0;
    var lastClicked;
    $("li").click(function(){
      if (this != lastClicked){
        $(this).removeClass("back");
        $(this).show("li");
        turnCounter ++;
        if ($(this).attr('class') === $(lastClicked).attr('class')) {
          lastClicked = $(".hiddenPlaceholder");
          winCounter ++;
          checkWin(winCounter);
        } else {
        $(lastClicked).addClass("back");
        lastClicked = this;
        }
        $("#score").text("Number of clicks: " + turnCounter);
      }
    });
  });


  $("button").trigger("submit");



});
