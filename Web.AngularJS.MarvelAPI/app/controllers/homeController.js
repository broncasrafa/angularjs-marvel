
app.controller("HomeController", ['$scope', '$location',

    function ($scope, $location) {

        $scope.characters = function () {
            $location.path('/characters');
        }

        $scope.comics = function () {
            $location.path('/comics');
        }

        $scope.series = function () {
            $location.path('/series');
        }

        $scope.creators = function () {
            $location.path('/creators');
        }

    }
])