'use strict';

/**
 * @ngdoc overview
 * @name weletoolApp
 * @description
 * # weletoolApp
 *
 * Main module of the application.
 */
angular
  .module('weletoolApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
