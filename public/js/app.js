var app = angular.module('myApp', [
  'ngRoute', 'ngStorage']);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
     templateUrl: "index1.html",
     controller: "personalController"
    })
    .when("/create", {
      templateUrl : "create.html",
      controller: "createController"
    })
	.when("/login", {
      templateUrl : "original.html",
      controller: "personalController"
    })
    .otherwise({
      //redirectTo: '/'
       redirectTo: "/"
    });
  });