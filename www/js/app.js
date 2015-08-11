// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('flexipre', ['ionic', 'flexipre.controllers', 'flexipre.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('signin', {
    url: '/sign-in',
    templateUrl: 'templates/sign-in.html',
    controller: 'SignInCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.package-crime', {
    url: '/dash/crime',
    views: {
      'tab-dash': {
        templateUrl: 'templates/package-crime.html',
        controller: 'CrimeCtrl'
      }
    }
  })

  .state('tab.package-accident', {
    url: '/dash/accident',
    views: {
      'tab-dash': {
        templateUrl: 'templates/package-accident.html',
        controller: 'AccidentCtrl'
      }
    }
  })

  .state('tab.package-travel', {
    url: '/dash/travel',
    views: {
      'tab-dash': {
        templateUrl: 'templates/package-travel.html',
        controller: 'TravelCtrl'
      }
    }
  })

  .state('tab.package-travel-add', {
    url: '/dash/travel-add',
    views: {
      'tab-dash': {
        templateUrl: 'templates/package-travel-add.html',
        controller: 'TravelAddCtrl'
      }
    }
  })

  .state('tab.confirm-terms', {
    url: '/dash/:package/terms',
    views: {
      'tab-dash': {
        templateUrl: 'templates/confirm-terms.html',
        controller: 'ConfirmTermsCtrl'
      }
    }
  })

  .state('tab.confirm-purchase', {
    url: '/dash/:package/confirm',
    views: {
      'tab-dash': {
        templateUrl: 'templates/confirm-purchase.html',
        controller: 'ConfirmPurchaseCtrl'
      }
    }
  })

  .state('tab.forecast', {
      url: '/forecast',
      views: {
        'tab-forecast': {
          templateUrl: 'templates/tab-forecast.html',
          controller: 'ForecastCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/sign-in');

})

.config(function($httpProvider) {
  $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
});
