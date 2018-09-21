app.controller("charactersPaginationController", ['$scope', '$window', '$routeParams', 'CharacterService',

    function ($scope, $window, $routeParams, CharacterService) {

        var offset = $routeParams.offset;

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

]);