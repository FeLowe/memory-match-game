//BUSINESS LOGIC//
function Game (cards1, cards2){ //<--object--//
  this.cardsOne = cards1;
  this.cardsTwo = cards2;
}

var buildCards = function(){ //---generates an array from 1 to 6 and pushes each # to empty cardsArray--//
  var cardsArray = [];
  for(i=1; i <= 6; i++){
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


//USER LOGIC//
$(document).ready(function(){

  var cards1 = buildCards();
  var cards2 = buildCards();
  var newGame = new Game(cards1, cards2);
  var combinedArrays = buildTotalArray(newGame.cardsOne, newGame.cardsTwo);
  var icons = ["sun", "water", "fire", "moon", "wind", "earth"];

  var shuffledArray = [];
  var cardObjectsArray = [];


  counter2 = 0
  for(i=0; i < combinedArrays.length; i++){
    var newCard = new Card(combinedArrays[i], icons[counter2]);
    cardObjectsArray.push(newCard);
     counter2 = counter2 + 1
     if (counter2 === 6){
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

  var hTMLelement = $(".col-xs-4");




  var counter = 0;
  for(i = 0; i < 12; i++){
    $(hTMLelement[i]).append('<li class="back ' + newArray[i].class + '">' + newArray[i].cardValue + '</li>');
    counter += 1;
    if (counter === 6) {
      counter = 0;
    }
  }


  var lastClicked = $(".hiddenPlaceholder");

  $("li").click(function(){
    $(this).removeClass("back");
    $(this).show("li");
    if ($(this).attr('class') === $(lastClicked).attr('class')) {
      lastClicked = $(".hiddenPlaceholder");
    } else {
    $(lastClicked).addClass("back");
    lastClicked = this;
    }
  });

});
