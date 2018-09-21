app.controller('creatorsController', ['$scope', '$routeParams', 'CreatorsService',

    function ($scope, $routeParams, CreatorsService) {

        $scope.more = new CreatorsService.LoadMore($scope);

        var id = $routeParams.id;

        if (id != null) {

            CreatorsService.findOneById(id)
                .then(
                    function (response) {
                        var data = response.data.results;

                        $scope.firstName = data.firstName;
                        $scope.middleName = data.middleName;
                        $scope.lastName = data.lastName;
                        $scope.suffix = data.suffix;
                        $scope.fullName = data.fullName;                        
                        $scope.resourceUri = data.resourceURI;
                        $scope.comics = data.comics;
                        $scope.series = data.series;
                        $scope.stories = data.stories;
                        $scope.events = data.events;
                        $scope.urls = data.urls;
                        
                        $scope.imageAvailable = false;
                        
                        

                    },
                    function (reason) {
                        $scope.erro = reason;
                    }
                )
        }



    } // fim da function
])