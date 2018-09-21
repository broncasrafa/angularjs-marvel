app.controller('comicsController', ['$scope', '$location', '$routeParams', 'ComicsService',

    function ($scope, $location, $routeParams, ComicsService) {

        $scope.more = new ComicsService.LoadMore($scope);

        var id = $routeParams.id;

        if (id != null) {
            ComicsService.findOneById(id)
                .then(
                    function (response) {
                        var data = response.data.results[0];
                        $scope.comicId = id;
                        $scope.title = data.title;

                        if (data.description == null)
                            $scope.description = "No description provided";
                        else
                            $scope.description = data.description;

                        $scope.upc = data.upc;
                        $scope.format = data.format;
                        $scope.numberOfPages = data.pageCount;
                        $scope.story = data.textObjects[0].text;
                        $scope.dates = data.dates;
                        $scope.price = data.prices[0].price;
                        $scope.image = data.thumbnail.path + '/portrait_incredible' + '.' + data.thumbnail.extension;
                        $scope.images = data.images;

                        // Creators
                        $scope.creatorsAvailable = data.creators.available;
                        $scope.creatorsReturned = data.creators.returned;
                        $scope.creatorsCollectionUri = data.creators.collectionURI;
                        $scope.creators = data.creators.items;

                        //Characters
                        $scope.charactersAvailable = data.characters.available;
                        $scope.charactersReturned = data.characters.returned;
                        $scope.charactersCollectionUri = data.characters.collectionURI;
                        ComicsService.findSomeCharacterByComic(id)
                            .then(
                                function (response) {
                                    var data = response.data.results;
                                    $scope.characters = data;
                                },
                                function (reason) {
                                    $scope.erro = reason;
                                }
                            );
                        //--------------------------------------------------------------------

                        // Stories
                        $scope.stories = data.stories.items;

                        // Series
                        $scope.series = data.series;

                        // See some comics of series from comic
                        var seriesResourceURI = data.series.resourceURI;
                        ComicsService.findSomeComicOfSerie(seriesResourceURI)
                            .then(
                                function (response) {
                                    var data = response.data.results;
                                    $scope.comicsFromSeries = data;
                                },
                                function (reason) {
                                    $scope.erro = reason;
                                }
                            );

                        var serieId = seriesResourceURI.replace('http://gateway.marvel.com/v1/public/series/', '');
                        $scope.serieId = serieId;                       
                    
                    },
                    function (reason) {
                        $scope.erro = reason;
                    }
                );
        }
        else {
            ComicsService.findAll()
                .then(
                    function (response) {
                        var data = response.data.results;
                        $scope.comics = data;
                    },
                    function (reason) {
                        $scope.error = reason;
                    }
                );
        }



    }
])