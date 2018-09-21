app.directive("autoComplete", ["CharacterService", function (CharacterService) {
    return {
        restrict: "A",
        link: function (scope, elem, attr, ctrl) {
            elem.autocomplete({
                source: function (searchTerm, response) {
                    CharacterService.findOneByName(searchTerm.term).then(function (autocompleteResults) {
                        response($.map(autocompleteResults.data.results, function (autocompleteResult) {
                            return {
                                label: autocompleteResult.name,
                                value: autocompleteResult
                            }
                        }))
                    });
                },
                minLength: 2,
                select: function (event, selectedItem) {
                    // Faz alguma coisa com o item selecionado
                    scope.yourObject = selectedItem.item.value;
                    scope.$apply();
                    event.preventDefault();
                }
            });
        }
    };
}]);