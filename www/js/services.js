angular.module('flexipre.services', [])

.factory("session", function() {
  var travelPlans = [ {
        origin: "LHR",
        destination: "ABD",
        pnr: "EHJF87FF",
        date: "14/09/2015",
        carrier: "British Airways"
      },
      {
        origin: "LGT",
        destination: "ABD",
        pnr: "BB216QWV",
        date: "23/09/2015",
        carrier: "Turkish Airlines"
      }
    ];
  return {
    route: '',
    crime: {
      activePlan : 1
    },
    accident: {
      activePlan : 1
    },
    travel: {
      plans : function() {
        return travelPlans;
      },
      add: function(plan) {
        return travelPlans.push(plan);
      }
    }
  };
})

.factory("api",['$http',function($http){
  var baseURL = "http://flexipre.azurewebsites.net/FlexiPremiumAssesment";
  var postHeaders = {
        'Accept': 'application/json, text/javascript',
        'Content-Type': 'application/json; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest'
   };
  
  var api = {};

  api.assessment = function (request){
    return $http({
      method: "GET",
      url: baseURL+"/assessment.do",
      params: {
        customerId: request.id || 'AB12334C', 
        latitude: request.latitude, 
        longitude: request.longitude,
        package: request.package
      }
    })
    .then(function(response){
      return response.data;
    });
  };

  return api;
}])

.filter('capitalize', function() {
  return function(input, scope) {
    if (input!=null)
    return input.substring(0,1).toUpperCase()+input.substring(1);
  }
});
