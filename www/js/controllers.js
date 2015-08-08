angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('PackageCrimeCtrl', function($scope, $stateParams, $timeout, $ionicLoading, sessionService, Chats) {
  $ionicLoading.show();
  $scope.package = sessionService || {};
  $timeout(function() {
      $scope.assessed = true;
      $scope.package.selectedSolution = 3;
      $ionicLoading.hide();
    }, 2000);
  //$scope.chat = Chats.get($stateParams.chatId);
})

.controller('TermsCtrl', function($scope, $stateParams, $timeout, sessionService) {
  $scope.package = sessionService || {};
  //$scope.chat = Chats.get($stateParams.chatId);
})

.controller('ConfirmPurchaseCtrl', function($scope, $stateParams, $state, sessionService) {
  $scope.package = sessionService || {};
  $scope.gotoDash = function() {
    $state.go('tab.dash');
  };
  //$scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
