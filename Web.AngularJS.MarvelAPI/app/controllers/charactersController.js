app.controller("charactersController", ['$scope', '$http', '$window', '$routeParams', '$location', 'CharacterService',

    function ($scope, $http, $window, $routeParams, $location, CharacterService) {

        $scope.more = new CharacterService.LoadMore($scope);


        
        //$scope.char = {};        
        //$scope.getCharacters = function (val) {
        //    var publickey = '514a15d713cfbc064c23ea69208462ad';
        //    var privatekey = '6d01e46ad77053619e8c6fd4cb020a78b275b3c0';
        //    var ts = new Date().getTime();
        //    var stringToHash = ts + privatekey + publickey;
        //    var hash = md5(stringToHash);
        //    var baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
        //    var limit = 20;
        //    var url = baseUrl + '?limit=' + limit + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

        //    return $http.get(url, {
        //        params: {
        //            nameStartsWith: val
        //        }
        //    }).then(function (response) {
        //        //var characters = [];
        //        //angular.forEach(response.data.data.results, function (character) {
        //        //    characters.push(character.name);
        //        //});
        //        //return characters;

        //        $scope.characters = response.data.data.results;
        //        return response.data.data.results.map(function (item) {
        //            return item.name;
        //        });
        //    });
        //};

        //$scope.selectCharacter = function (item) {
        //    angular.forEach($scope.characters, function (obj, key) {
        //        $scope.char.name = obj.name;
        //        $scope.char.thumb = obj.thumbnail.path + "/standard_medium." + obj.thumbnail.extension
        //    });
        //}


        var id = $routeParams.id;

        if (id != null) {
            CharacterService.findOneById(id)
                .then(
                    function (response) {
                        var data = response.data.results[0];
                        $scope.characterName = data.name;
                        $scope.characterUrl = data.urls;
                        $scope.characterImg = data.thumbnail.path + '/detail.' + data.thumbnail.extension;
                        var desc = data.description;
                        if (desc.length <= 0) {
                            desc = "No description provided";
                        }
                        $scope.description = desc;

                        //retorna alguns gibs
                        CharacterService.findSomeComicsByCharacter(id)
                            .then(
                                function (response) {
                                    var data = response.data.results;
                                    $scope.someComics = data;
                                },
                                function (reason) {
                                    $scope.error = reason;
                                }
                            );

                        //retorna algumas series
                        CharacterService.findSomeSeriesByCharacter(id)
                            .then(
                                function (response) {
                                    var data = response.data.results;
                                    $scope.someSeries = data;
                                },
                                function (reason) {
                                    $scope.error = reason;
                                }
                            );
                    },
                    function (reason) {
                        $scope.error = reason;
                    }
                );
        }

        //if ($('#searchCharacter').val().length > 0) {
        //    $('#searchCharacter').autocomplete({
        //        source: characters
        //    }).data("ui-autocomplete")._renderItem = function (ul, item) {
        //        var inner_html = '<a>';
        //        inner_html += '     <div class="list_item_container">';
        //        inner_html += '         <div class="image">';
        //        inner_html += '             <img src="' + item.image + '">';
        //        inner_html += '         </div>';
        //        inner_html += '         <div class="label">' + item.label + '</div>';
        //        inner_html += '         <div class="description">' + item.description + '</div>';
        //        inner_html += '     </div>';
        //        inner_html += '   </a>';
        //        return $("<li></li>").data("item.autocomplete", item).append(inner_html).appendTo(ul);
        //    };
        //}

        //var publickey = '514a15d713cfbc064c23ea69208462ad';
        //var privatekey = '6d01e46ad77053619e8c6fd4cb020a78b275b3c0';
        //var ts = new Date().getTime();
        //var stringToHash = ts + privatekey + publickey;
        //var hash = md5(stringToHash);
        //var baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
        //var limit = 20;
        //var url = baseUrl + '?limit=' + limit + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
        //var characters = [];
        //$http.get(url, {
        //    params: {
        //        nameStartsWith: "Hulk"
        //    }
        //}).then(function(response){
        //    //angular.forEach(response.data.data.results, function (character) {                
        //    //    $scope.characters = response.data.data.results;
        //    //        return response.data.data.results.map(function (item) {
        //    //            return characters.push(item);
        //    //        });
        //    //}); 
        //    characters = response.data.data.results;
        //    return characters;
        //});

        //$('#searchCharacter').autocomplete({
        //    source: characters
        //}).data("ui-autocomplete")._renderItem = function (ul, item) {
        //    var inner_html = '<a>';
        //    inner_html += '     <div class="list_item_container">';
        //    inner_html += '         <div class="image">';
        //    inner_html += '             <img src="' + item.thumbnail.path + "/standard_medium." + item.thumbnail.extension + '">';
        //    inner_html += '         </div>';
        //    inner_html += '         <div class="label">' + item.name + '</div>';
        //    inner_html += '         <div class="description">' + item.id + '</div>';
        //    inner_html += '     </div>';
        //    inner_html += '   </a>';

        //    return $("<li></li>").data("item.autocomplete", item).append(inner_html).appendTo(ul);
        //};

        /*
        var id = $routeParams.id;

        if (id != null) {
            CharacterService.findOneById(id)
                .then(
                    function (response) {
                        var data = response.data.results[0];
                        $scope.characterName = data.name;
                        $scope.characterUrl = data.urls;
                        $scope.characterImg = data.thumbnail.path + '/detail.' + data.thumbnail.extension;
                        var desc = data.description;
                        if (desc.length <= 0) {
                            desc = "No description provided";
                        }
                        $scope.description = desc;

                        //retorna alguns gibs
                        CharacterService.findSomeComicsByCharacter(id)
                            .then(
                                function (response) {
                                    var data = response.data.results;
                                    $scope.someComics = data;
                                },
                                function (reason) {
                                    $scope.error = reason;
                                }
                            );

                        //retorna algumas series
                        CharacterService.findSomeSeriesByCharacter(id)
                            .then(
                                function (response) {
                                    var data = response.data.results;
                                    $scope.someSeries = data;
                                },
                                function (reason) {
                                    $scope.error = reason;
                                }
                            );
                    },
                    function (reason) {
                        $scope.error = reason;
                    }
                );
        }
        else {
            // Definindo o offset para as paginas da paginacao
            var offset = $routeParams.offset;

            if (offset > 0) {
                
                CharacterService.findNext(offset)
                .then(
                    function (data) {
                        $scope.characters = data.data.results;

                        var total = data.data.total;
                        var offset = data.data.offset;
                        var limit = data.data.limit;
                        var count = data.data.count;

                        $scope.offset = offset;
                        $scope.limit = limit;
                        $scope.total = total;
                        $scope.count = count;
                        $scope.pagination = [];

                        var pages = [];
                        var totalPages = Math.round(total / limit);
                        for (var i = 1; i < totalPages; i++) {
                            pages.push(i);
                        }
                        $scope.pagination = pages;
                    },
                    function (reason) {
                        $scope.error = reason;
                    })

                var offset = $routeParams.offset;

                $scope.findNext = function (offset) {
                    $location.path('/characters/' + offset);
                }

                $scope.findFirst = function () {
                    $location.path('/characters');
                }

                $scope.findLast = function () {
                    offset = totalPages;
                    $location.path('/characters/' + offset);
                }

            }
            else {
                // Listar os personagens
                CharacterService.findAll()
                    .then(
                        function (data) {
                            $scope.characters = data.data.results;

                            var total = data.data.total;
                            var offset = data.data.offset;
                            var limit = data.data.limit;
                            var count = data.data.count;

                            $scope.offset = offset;
                            $scope.limit = limit;
                            $scope.total = total;
                            $scope.count = count;
                            $scope.pagination = [];

                            var pages = [];
                            var totalPages = Math.round(total / limit);
                            for (var i = 1; i < totalPages; i++) {
                                pages.push(i);
                            }
                            $scope.pagination = pages;

                        },
                        function (reason) {
                            $scope.error = reason;
                        }
                    );
            }
        }
        */
    }]);
