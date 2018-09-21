
app.controller('seriesController', ['$scope', '$window', '$location', '$routeParams', 'SeriesService',

    function ($scope, $window, $location, $routeParams, SeriesService) {

        $scope.more = new SeriesService.LoadMore($scope);
                
        var id = $routeParams.id;

        if (id != null) {
            SeriesService.findOneById(id)
                .then(function (response) {
                    var data = response.data.results[0];

                    var serieId = data.id;
                    $scope.title = data.title;

                    if (data.description == null)
                        $scope.description = "No description provided";
                    else
                        $scope.description = data.description;

                    var currentYear = new Date().getFullYear();
                    var startYear = data.startYear;
                    var endYear = data.endYear > currentYear ? ' - Present' : ' - ' + data.endYear;
                    $scope.date = startYear + endYear;

                    $scope.image = data.thumbnail.path + '/standard_fantastic' + '.' + data.thumbnail.extension;
                    $scope.rating = data.rating;
                    
                    // Criadores --------------------------------------------------------------------------
                    $scope.creatorsAvailable = data.creators.available;
                    $scope.creatorsReturned = data.creators.returned;
                    $scope.creatorsCollectionUri = data.creators.collectionURI;
                    $scope.creators = data.creators.items;
                    //--------------------------------------------------------------------------------------

                    // Personagens da Serie ----------------------------------------------------------------
                    $scope.charactersAvailable = data.characters.available;
                    $scope.charactersReturned = data.characters.returned;
                    $scope.charactersCollectionUri = data.characters.collectionURI;
                    SeriesService.findSomeCharactersBySeries(serieId)
                        .then(
                            function (response) {
                                var characters = response.data.results;
                                $scope.characters = characters;
                            },
                            function (reason) {

                            }
                        );
                    //--------------------------------------------------------------------------------------


                    // Comics da Serie ---------------------------------------------------------------------
                    $scope.comicsAvailable = data.comics.available;
                    $scope.comicsReturned = data.comics.returned;
                    $scope.comicsCollectionUri = data.comics.collectionURI;
                    SeriesService.findSomeComicsBySeries(id)
                        .then(
                            function (response) {
                                var comics = response.data.results;
                                $scope.comics = comics;
                            },
                            function (reason) {

                            }
                        );
                    //--------------------------------------------------------------------------------------

                    // Stories da Serie --------------------------------------------------------------------
                    $scope.storiesAvailable = data.stories.available;
                    $scope.storiesReturned = data.stories.returned;
                    $scope.storiesCollectionUri = data.stories.collectionURI;
                    SeriesService.findSomeStoriesBySeries(id)
                        .then(
                            function (response) {
                                var data = response.data.results;
                                $scope.stories = data;
                            },
                            function (reason) {
                                $scope.erro = reason;
                            }
                        );
                    //--------------------------------------------------------------------------------------
                    
                    // Events da Serie ---------------------------------------------------------------------
                    $scope.eventsAvailable = data.events.available;
                    $scope.eventsReturned = data.events.returned;
                    $scope.eventsCollectionUri = data.events.collectionURI;
                    SeriesService.findSomeEventsBySeries(id)
                        .then(
                            function (response) {
                                var data = response.data.results;
                                $scope.events = data;
                            },
                            function (reason) {
                                $scope.erro = reason;
                            }
                        );
                    //--------------------------------------------------------------------------------------
                },
                function (reason) {
                    $scope.error = reason;
                });
        }
        //else {
        //    SeriesService.findAll()
        //        .then(function (response) {
        //            var data = response.data;
        //            $scope.total = data.total;
        //        },
        //        function (reason) {
        //            $scope.error = reason;
        //        });
        //}
    }

]);