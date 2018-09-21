app.factory('ComicsService', ['$http', '$q',
    function ($http, $q) {

        var publickey = '514a15d713cfbc064c23ea69208462ad';
        var privatekey = '6d01e46ad77053619e8c6fd4cb020a78b275b3c0';
        var ts = new Date().getTime();
        var stringToHash = ts + privatekey + publickey;
        var hash = md5(stringToHash);
        var baseUrl = 'https://gateway.marvel.com:443/v1/public/comics';
        var limit = 20;

        // Fetches lists of comics.
        var findAll = function () {
            var def = $q.defer();
            var url = baseUrl + '?limit=' + limit + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        }

        // Fetches a single comic by id.
        var findOneById = function (id) {
            var def = $q.defer();
            var url = baseUrl + '/' + id + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        }

        // Fetches lists of characters filtered by a comic id.
        var findSomeCharacterByComic = function (id) {
            var def = $q.defer();
            var url = baseUrl + '/' + id + '/characters' + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        }

        // Fetches lists of creators filtered by a comic id.
        var findSomeCreatorsByComic = function (id) {
            var def = $q.defer();
            var url = baseUrl + '/' + id + '/creators' + '?limit=4' + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        }

        // Fetches lists of events filtered by a comic id.
        var findSomeEventsByComic = function (id) {
            var def = $q.defer();
            var url = baseUrl + '/' + id + '/events' + '?limit=4' + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        }

        // Fetches lists of stories filtered by a comic id.
        var findSomeStoriesByComic = function (id) {
            var def = $q.defer();
            var url = baseUrl + '/' + id + '/stories' + '?limit=4' + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        }

        // Ver mais da comic, ele vai mostrar as series que terá a lista de comics (mostrar essa lista de comics quando clicar em "See all")
        var findSomeComicOfSerie = function (resourceURI) {
            var def = $q.defer();
            var url = resourceURI + '/comics'+ '?limit=4' + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        }
        var seeAllComicOfSerie = function (resourceURI) {
            var def = $q.defer();
            var url = resourceURI + '/comics' + '?limit=100' + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        }

        var findNext = function (offset) {
            var def = $q.defer();
            var startYear = new Date().getFullYear();
            var url = baseUrl + '?limit=' + limit + '&offset=' + (limit * offset) + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        }

        var LoadMore = function ($scope) {
            this.offset = 0;
            this.busy = false;
            this.comics = [];

            this.load = function () {
                if (this.busy) {
                    return;
                }
                this.busy = true;
                findNext(this.offset).then(function (results) {
                    var comic = results.data.results;
                    comic.forEach(function (item) {
                        this.comics.push(item);
                    }.bind(this));
                    this.offset++;
                    this.busy = false;
                }.bind(this));
            }.bind(this);
        };

        return {
            findAll: findAll,
            findOneById: findOneById,
            findSomeCharacterByComic: findSomeCharacterByComic,
            findSomeCreatorsByComic: findSomeCreatorsByComic,
            findSomeEventsByComic: findSomeEventsByComic,
            findSomeStoriesByComic: findSomeStoriesByComic,
            LoadMore: LoadMore,
            findSomeComicOfSerie: findSomeComicOfSerie,
            seeAllComicOfSerie: seeAllComicOfSerie
        }
    }
]);
