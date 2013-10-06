'use strict';

var hyperApp = angular.module('hyperApp',[]);

hyperApp.config(function($routeProvider){

    $routeProvider.when('/matplot', { controller : 'MatplotController',
                                      templateUrl: 'partials/matplot.html'}

    ).when('/graph', { controller  : 'GraphController',
                       templateUrl : 'partials/graph.html' }

    ).otherwise({ redirectTo: '/matplot' });
});