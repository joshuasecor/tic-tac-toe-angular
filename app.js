var ticTacApp = angular.module('ticTacApp', ["firebase"]);

ticTacApp.controller('ticTacCtrl', function($scope, $firebase){

  $scope.board = $firebase(new Firebase("https://tic-tac-two.firebaseio.com/board")).$asArray();
  $scope.counter = $firebase(new Firebase("https://tic-tac-two.firebaseio.com/counter")).$asArray();

  // Check for win every time counter changes value - not working?? //
  $scope.counter.$watch(function() {
    if ($scope.counter[0].turnCounter %2 == 0) {
      document.getElementById("subheader").innerHTML = "Player 1's turn...";
    }
    else {
      document.getElementById("subheader").innerHTML = "Player 2's turn...";
    };
    winLogic();
    if ($scope.counter[0].turnCounter == 0) {
      disableButton();
      yesClicks();
      document.getElementById("subheader").innerHTML = "Player 1's turn...";
    }
  });

  // Create counter and set to 0 if board loading for first time //
  $scope.counter.$loaded(function () {
        if ($scope.counter.length === 0) {
            $scope.counter.$add({turnCounter: 0});
            // If already created, set to 0 when loading page //
        } else {
            $scope.counter[0].turnCounter = 0;
            $scope.counter.$save($scope.counter[0]);
        }
        // Disply player 1's turn at start //
        document.getElementById("subheader").innerHTML = "Player 1's turn...";
    });

  // Dynamically create board on load, boxes have empty values ("marker") //
  $scope.board.$loaded(function(){
    if ($scope.board.length === 0) {
      for (var i = 0; i < 9; i++) {
        $scope.board.$add({marker: ''});
      }
      // If board already created, clear square markers //
  } for (var i=0; i<9; i++) {
      $scope.board[i].marker = '';
      $scope.board.$save($scope.board[i]);
    }
  });

  // Square clickability //

  $scope.onClick = function(idx) {
    if ($scope.board[idx].marker == '') {
      if ($scope.counter[0].turnCounter %2 == 0) {
        $scope.board[idx].marker = "X";
        $scope.board.$save($scope.board[idx]);
      }
      else {
        $scope.board[idx].marker = "O";
        $scope.board.$save($scope.board[idx]);
      };
      $scope.counter[0].turnCounter++;
      $scope.counter.$save($scope.counter[0]);
    };
    
  };

  // Restarts turn counter, clears board,  //
  $scope.playAgain = function () {
    for (var i=0; i<9; i++) {
      $scope.board[i].marker = '';
      $scope.board.$save($scope.board[i]);
    }
    $scope.counter[0].turnCounter = 0;
    $scope.counter.$save($scope.counter[0]);
  }

  // Win logic //
  function winLogic() {
    if($scope.board[0].marker == "X" && $scope.board[1].marker == "X" && $scope.board[2].marker == "X")
    {xWins()}
    else if($scope.board[3].marker == "X" && $scope.board[4].marker == "X" && $scope.board[5].marker == "X")
    {xWins()}
    else if($scope.board[6].marker == "X" && $scope.board[7].marker == "X" && $scope.board[8].marker == "X")
    {xWins()}
      else if($scope.board[0].marker == "X" && $scope.board[3].marker == "X" && $scope.board[6].marker == "X")
    {xWins()}
    else if($scope.board[1].marker == "X" && $scope.board[4].marker == "X" && $scope.board[7].marker == "X")
    {xWins()}
      else if($scope.board[2].marker == "X" && $scope.board[5].marker == "X" && $scope.board[8].marker == "X")
    {xWins()}
      else if($scope.board[0].marker == "X" && $scope.board[4].marker == "X" && $scope.board[8].marker == "X")
    {xWins()}
      else if($scope.board[2].marker == "X" && $scope.board[4].marker == "X" && $scope.board[6].marker == "X")
    {xWins()}


    else if($scope.board[0].marker == "O" && $scope.board[1].marker == "O" && $scope.board[2].marker == "O")
    {oWins()}
    else if($scope.board[3].marker == "O" && $scope.board[4].marker == "O" && $scope.board[5].marker == "O")
    {oWins()}
    else if($scope.board[6].marker == "O" && $scope.board[7].marker == "O" && $scope.board[8].marker == "O")
    {oWins()}
      else if($scope.board[0].marker == "O" && $scope.board[3].marker == "O" && $scope.board[6].marker == "O")
    {oWins()}
    else if($scope.board[1].marker == "O" && $scope.board[4].marker == "O" && $scope.board[7].marker == "O")
    {oWins()}
      else if($scope.board[2].marker == "O" && $scope.board[5].marker == "O" && $scope.board[8].marker == "O")
    {oWins()}
      else if($scope.board[0].marker == "O" && $scope.board[4].marker == "O" && $scope.board[8].marker == "O")
    {oWins()}
      else if($scope.board[2].marker == "O" && $scope.board[4].marker == "O" && $scope.board[6].marker == "O")
    {oWins()}
      else if ($scope.counter[0].turnCounter > 8) {
      tieGame()
    };
  };

});

// *** vanilla Javascript *** //



// Functions to end game, change <h2> text, reveal "Play Again" button //
function tieGame() {
  document.getElementById("subheader").innerHTML = "It's a tie!";
  enableButton();
  noClicks();
}

function xWins() {
  document.getElementById("subheader").innerHTML = "Player 1 wins!";
  point1();
  enableButton();
  noClicks();
}

function oWins() {
  document.getElementById("subheader").innerHTML = "Player 2 wins!";
  point2();
  enableButton();
  noClicks();
}

// Player scores //

var plyr1 = 0;
var plyr2 = 0;

function point1() {
  plyr1++;
  document.getElementById("player1").innerHTML = plyr1;
}

function point2() {
  plyr2++;
  document.getElementById("player2").innerHTML = plyr2;
}

// Enable the "Play Again" button //
function enableButton() {
  document.getElementById("replay").disabled = false;
}

// Disable to "Play Again button" - this function is run on page load (see opening <body> tag) //
function disableButton() {
  document.getElementById("replay").disabled = true;
}

var squares = document.getElementsByClassName("squares");

// Disable board //

function noClicks() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.pointerEvents = 'none';
  }
}

// Enable board //

function yesClicks() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.pointerEvents = 'auto';
  }
}