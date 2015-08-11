angular.module('flexipre.controllers', [])

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

.controller('DashCtrl', function($scope, $ionicLoading, api, session) {

  $scope.crime = session.crime;
  $scope.accident = session.accident;
  $scope.travel = session.travel.plans();

  $scope.showPosition = function(position) {
    var request = {};

    request.id = session.customerId;
    request.latitude = position.coords.latitude;
    request.longitude = position.coords.longitude;
    
    request.package = "crime";

    api.assessment(request).then(function(response){
      session.crime.riskSolution = parseInt(response);
      $scope.crime = session.crime;
      $scope.$broadcast('scroll.refreshComplete');
      $ionicLoading.hide();
    });

    request.package = "accident";

    api.assessment(request).then(function(response){
      session.accident.riskSolution = parseInt(response);
      $scope.accident = session.accident;
    });

  };

  $scope.getPosition = function() {
    navigator.geolocation.getCurrentPosition($scope.showPosition);  
  };

  $ionicLoading.show();
  $scope.getPosition();

})

.controller('CrimeCtrl', function($scope, $state, $ionicLoading, api, session) {
  $scope.crime = session.crime || {};
  $scope.crime.selectedPlan = session.crime.activePlan || session.crime.riskSolution;
  session.route = "crime";
  $scope.goNext = function() {
    session.crime.selectedPlan = $scope.crime.selectedPlan;
    $state.go("tab.confirm-terms", {"package": "crime"})
  };
})

.controller('AccidentCtrl', function($scope, $state, $ionicLoading, api, session) {
  $scope.accident = session.accident || {};
  $scope.accident.selectedPlan = session.accident.activePlan ||session.accident.riskSolution;
  session.route = "accident";
  $scope.goNext = function() {
    session.accident.selectedPlan = $scope.accident.selectedPlan;
    $state.go("tab.confirm-terms", {"package": "accident"})
  };
})

.controller('ConfirmTermsCtrl', function($scope, $stateParams, $state, session) {
  $scope.route = session.route;
  if(session.route === "crime")
    $scope.package = session.crime;
  else
    $scope.package = session.accident;
  $scope.goNext = function() {
    if(session[session.route].selectedPlan) {
      session[session.route].activePlan = session[session.route].selectedPlan;
    }
    $state.go("tab.confirm-purchase", {"package": session.route})
  };
})

.controller('ConfirmPurchaseCtrl', function($scope, $stateParams, $state, session) {
  $scope.route = session.route;
  if(session.route === "crime")
    $scope.package = session.crime;
  else
    $scope.package = session.accident;

  $scope.gotoDash = function() {
    $state.go('tab.dash');
  };
})

.controller('TravelCtrl', function($scope, $stateParams, $state, session) {
  session.route = "travel";
  $scope.plans = session.travel.plans();
})

.controller('TravelAddCtrl', function($scope, $stateParams, $state, session) {
  $scope.plan = {};
  $scope.goNext = function() {
    session.travel.add($scope.plan);
    $state.go("tab.confirm-terms", {"package": "travel"})
  };
})

.controller('ForecastCtrl', function($scope, $stateParams, $state, session) {
  $scope.crime = session.crime;
  $scope.accident = session.accident;
  $scope.forecast = {};
  $scope.forecast.life = 25;
  $scope.forecast.crime = 10 + ((session.crime.activePlan * 13) / 4); 
  $scope.forecast.accident = 15 + ((session.accident.activePlan * 7) / 3); 
  $scope.forecast.total = $scope.forecast.life + $scope.forecast.crime + $scope.forecast.accident;
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableTracking: true
  };
});
