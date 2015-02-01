var ticTacApp = angular.module('ticTacApp', ["firebase"]);

ticTacApp.controller('ticTacCtrl', function($scope, $firebase){

  $scope.board = $firebase(new Firebase("https://tic-tac-two.firebaseio.com/board")).$asArray();
  $scope.counter = $firebase(new Firebase("https://tic-tac-two.firebaseio.com/counter")).$asArray();

  $scope.counter.$loaded(function () {
        if ($scope.counter.length === 0) {
            $scope.counter.$add({turnCounter: 0});
        } else {
            $scope.counter[0].turnCounter = 0;
            $scope.counter.$save($scope.counter[0]);
        }
    });

  var turnCounter = 1;

    $scope.board.$loaded(function(){
        if ($scope.board.length === 0) {
            for (var i = 0; i < 9; i++) {
                $scope.board.$add({marker: ''});
            }
		} else {
   			for (var i=0; i<9; i++)
   			$scope.board[i] = '';
   			$scope.board.$save(i);
		}
   	});

  $scope.onClick = function(idx) {
    if ($scope.board[idx].marker == 0) {
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
      winLogic();  
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
  }

});

// *** vanilla Javascript *** //

// Functions to end game, change <h2> text, reveal "Play Again" button //
function tieGame() {
  document.getElementById("subheader").innerHTML = "It's a tie!";
  enableButton();
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