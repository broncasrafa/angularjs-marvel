
app.factory('CharacterService', ['$http', '$q', 
    
    function ($http, $q) {
    
        var publickey = '514a15d713cfbc064c23ea69208462ad';
        var privatekey = '6d01e46ad77053619e8c6fd4cb020a78b275b3c0';
        var ts = new Date().getTime();
        var stringToHash = ts + privatekey + publickey;
        var hash = md5(stringToHash);
        var baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
        var limit = 20;

        var findAll = function () {
            var def = $q.defer();
            var url = baseUrl + '?limit=' + limit + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        };

        var findOneById = function (id) {
            var def = $q.defer();
            var url = baseUrl + '/' + id + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        }

        var findOneByName = function (name) {
            var def = $q.defer();
            var url = baseUrl + '?limit='+ limit + '&name=' + name + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        }

        var findNext = function (offset) {
            var def = $q.defer();
            var url = baseUrl + '?limit=' + limit + '&offset=' + (limit * offset) + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);
            
            return def.promise;
        };        

        var findSomeComicsByCharacter = function (id) {
            var def = $q.defer();
            var url = baseUrl + '/' + id + '/comics?limit=8' + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);
            
            return def.promise;
        }

        var findSomeSeriesByCharacter = function (id) {
            var def = $q.defer();
            var url = baseUrl + '/' + id + '/series?limit=8&startYear=2009' + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        }

        var findSomeEventsByCharacter = function (id) {
            var def = $q.defer();
            var url = baseUrl + '/' + id + '/events?limit=8' + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        }

        var findSomeStoriesByCharacter = function (id) {
            var def = $q.defer();
            var url = baseUrl + '/' + id + '/stories?limit=8' + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        }

        var LoadMore = function ($scope) {
            this.offset = 0;
            this.busy = false;
            this.characters = [];

            this.load = function () {
                if (this.busy) {
                    return;
                }
                this.busy = true;
                findNext(this.offset).then(function (results) {
                    var charac = results.data.results;
                    charac.forEach(function (item) {
                        this.characters.push(item);
                    }.bind(this));
                    this.offset++;
                    this.busy = false;
                }.bind(this));
            }.bind(this);
        };

    return {
        findAll: findAll,
        findNext: findNext,
        findOneById: findOneById,
        findOneByName: findOneByName,
        findSomeComicsByCharacter: findSomeComicsByCharacter,
        findSomeSeriesByCharacter: findSomeSeriesByCharacter,
        findSomeEventsByCharacter: findSomeEventsByCharacter,
        findSomeStoriesByCharacter: findSomeStoriesByCharacter,
        LoadMore: LoadMore
    }

}]);