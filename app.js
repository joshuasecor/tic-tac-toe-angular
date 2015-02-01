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
    }
  


});