//BUSINESS LOGIC//
function Game (cards, cardsTwo){ //<--object--//
  this.cardsOne = cards;
  this.cardsTwo = cardsTwo;
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


//USER LOGIC//
$(document).ready(function(){
  var cardsOne = buildCards();
  var cardsTwo = buildCards();
  var newGame = new Game(cardsOne, cardsTwo);

  var combinedArrays = buildTotalArray(newGame.cardsOne, newGame.cardsTwo);
  var hTMLelement = $(".col-xs-4");
  var icons = ["sun", "water", "fire", "moon", "wind", "earth"];



    var counter = 0;
    for(i = 0; i < 12; i++){
      $(hTMLelement[i]).append('<li class="' + icons[counter] + '">' + combinedArrays[i] + '</li>');
      counter += 1;
      if (counter === 6) {
        counter = 0;
      }


    }

    // for(i = 6; i < 12; i++){
    //   $(hTMLelement[i]).append('<li class="' + icons[i-6] + '">' + combinedArrays[i] + '</li>');
    // }
//
// $(hTMLelement[i]).append("<li class='sun'>" + combinedArrays[i] + "</li>");
// $(hTMLelement[i]).append("<li class='water'>" + combinedArrays[i] + "</li>");
// $(hTMLelement[i]).append("<li class='fire'>" + combinedArrays[i] + "</li>");
// $(hTMLelement[i]).append("<li class='moon'>" + combinedArrays[i] + "</li>");
// $(hTMLelement[i]).append("<li class='wind'>" + combinedArrays[i] + "</li>");
// $(hTMLelement[i]).append("<li class='earth'>" + combinedArrays[i] + "</li>");
//


});
