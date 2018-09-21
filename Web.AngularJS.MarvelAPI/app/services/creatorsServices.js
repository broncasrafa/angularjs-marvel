app.factory('CreatorsService', ['$http', '$q',
    function ($http, $q) {

        var publickey = '514a15d713cfbc064c23ea69208462ad';
        var privatekey = '6d01e46ad77053619e8c6fd4cb020a78b275b3c0';
        var ts = new Date().getTime();
        var stringToHash = ts + privatekey + publickey;
        var hash = md5(stringToHash);
        var baseUrl = 'https://gateway.marvel.com:443/v1/public/creators';
        var limit = 20;

        // Fetches lists of creators.
        var findAll = function () {
            var def = $q.defer();
            var url = baseUrl + '?limit=1&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        }

        // Fetches a single creator by id.
        var findOneById = function (id) {
            var def = $q.defer();
            var url = baseUrl + '/' + id + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        }

        // Fetches lists of comics filtered by a creator id.
        var findCreatorComics = function (id) {
            var def = $q.defer();
            var url = baseUrl + '/' + id + '/comics' + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        }

        // Fetches lists of events filtered by a creator id.
        var findCreatorEvents = function (id) {
            var def = $q.defer();
            var url = baseUrl + '/' + id + '/events' + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        }

        // Fetches lists of series filtered by a creator id.
        var findCreatorSeries = function (id) {
            var def = $q.defer();
            var url = baseUrl + '/' + id + '/series' + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        }

        // Fetches lists of stories filtered by a creator id.
        var findCreatorStories = function (id) {
            var def = $q.defer();
            var url = baseUrl + '/' + id + '/stories' + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
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
            this.creators = [];

            this.load = function () {
                if (this.busy) {
                    return;
                }
                this.busy = true;
                findNext(this.offset).then(function (results) {
                    var creator = results.data.results;
                    creator.forEach(function (item) {
                        this.creators.push(item);
                    }.bind(this));
                    this.offset++;
                    this.busy = false;
                }.bind(this));
            }.bind(this);
        };


        return {
            findAll: findAll,
            findOneById: findOneById,
            findCreatorComics: findCreatorComics,
            findCreatorEvents: findCreatorEvents,
            findCreatorSeries: findCreatorSeries,
            findCreatorStories: findCreatorStories,
            LoadMore: LoadMore
        }

    } // fim da function
]);