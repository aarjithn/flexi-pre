angular.module('starter.controllers', [])

.controller('SignInCtrl', function($scope, $state, $timeout, $ionicLoading, session) {
  $scope.signIn = function(user) {
    $ionicLoading.show();
    $timeout(function() {
      console.log('Sign-In', user);
      session.customerId = user.id;
      $ionicLoading.hide();
      $state.go('tab.dash');
    }, 600);
  };
})

.controller('DashCtrl', function($scope, api, location, session) {

  $scope.showPosition = function(position) {
    $scope.coords = {};
    
    location.id = session.customerId;
    location.latitude = position.coords.latitude;
    location.longitude = position.coords.longitude;
    //$scope.$apply();

    api.getRisk(location).then(function(response){
      session.riskSolution = parseInt(response);
    });
  };

  navigator.geolocation.getCurrentPosition($scope.showPosition);

})

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

.controller('PackageCrimeCtrl', function($scope, $stateParams, $timeout, $ionicLoading, api, session, Chats) {
  $scope.package = session || {};
  
  $scope.package.riskSolution = session.riskSolution;
  $scope.package.selectedSolution = session.currentSolution;
})

.controller('TermsCtrl', function($scope, $stateParams, $timeout, session) {
  $scope.package = session || {};

  //$scope.chat = Chats.get($stateParams.chatId);
})

.controller('ConfirmPurchaseCtrl', function($scope, $stateParams, $state, session) {
  $scope.package = session || {};
  $scope.gotoDash = function() {
    $state.go('tab.dash');
  };
  //$scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableTracking: true
  };
});
