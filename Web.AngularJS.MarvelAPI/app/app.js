
var app = angular.module("MarvelApp", ['ngRoute', 'infinite-scroll', 'ui.bootstrap']);

app.value('$anchorScroll', angular.noop);

app.config(function ($routeProvider, $locationProvider) {

    $routeProvider
    .when("/home", {
        controller: "HomeController",
        templateUrl: "Forms/home.html"
    })
    .when("/characters", {
        controller: "charactersController",
        templateUrl: "Forms/characters.html"
    })
    .when("/characterDetails/:id", {
        controller: "charactersController",
        templateUrl: "Forms/charactersDetails.html"
    })
    //.when("/characters/:offset", {
    //    controller: "charactersController",
    //    templateUrl: "Forms/characters.html"
    //})
    .when("/comics", {
        controller: "comicsController",
        templateUrl: "Forms/comics.html"
    })
    .when('/comics/:id', {
        controller: 'comicsController',
        templateUrl: 'Forms/comicsDetails.html'
    })
    .when("/series", {
        controller: "seriesController",
        templateUrl: "Forms/series.html"
    })
    .when('/series/:id', {
        controller: 'seriesController',
        templateUrl: 'Forms/seriesDetails.html'
    })
    .when("/creators", {
        controller: "creatorsController",
        templateUrl: "Forms/creators.html"
    })
    .when('/creators/:id', {
        controller: 'creatorsController',
        templateUrl: 'Forms/creatorsDetails.html'
    })
    .otherwise({ redirectTo: "/home" });

    //$locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: false
    //});
});

