

app.directive('loading', ['$http',

    function ($http) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v) {
                    if (v) {
                        element.show();
                    }
                    else {
                        element.hide();
                    }
                });
            }
        }
    }
]);