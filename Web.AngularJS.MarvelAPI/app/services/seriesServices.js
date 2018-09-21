app.factory('SeriesService', ['$http', '$q',

    function ($http, $q) {

        var publickey = '514a15d713cfbc064c23ea69208462ad';
        var privatekey = '6d01e46ad77053619e8c6fd4cb020a78b275b3c0';
        var ts = new Date().getTime();
        var stringToHash = ts + privatekey + publickey;
        var hash = md5(stringToHash);
        var baseUrl = 'https://gateway.marvel.com:443/v1/public/series';
        var limit = 20;

        // Fetches lists of series.
        var findAll = function () {
            var def = $q.defer();
            var url = baseUrl + '?limit=1&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        }

        // Fetches a single comic series by id.
        var findOneById = function (id) {
            var def = $q.defer();
            var url = baseUrl + '/' + id + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        }

        // Fetches lists of characters filtered by a series id.
        var findSomeCharactersBySeries = function (id) {
            var def = $q.defer();
            var url = baseUrl + '/' + id + '/characters' + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        }

        // Fetches lists of comics filtered by a series id.
        var findSomeComicsBySeries = function (id) {
            var def = $q.defer();
            var url = baseUrl + '/' + id + '/comics' + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        }

        // Fetches lists of creators filtered by a series id.
        var findSomeCreatorsBySeries = function (id) {
            var def = $q.defer();
            var url = baseUrl + '/' + id + '/creators' + '?limit=4' + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        }

        // Fetches lists of events filtered by a series id.
        var findSomeEventsBySeries = function (id) {
            var def = $q.defer();
            var url = baseUrl + '/' + id + '/events' + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
            $http.get(url).success(def.resolve).error(def.reject);

            return def.promise;
        }

        // Fetches lists of stories filtered by a series id.
        var findSomeStoriesBySeries = function (id) {
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
            this.series = [];
            
            this.load = function () {
                if (this.busy) {
                    return;
                }
                this.busy = true;
                findNext(this.offset).then(function (results) {
                    var sers = results.data.results;
                    sers.forEach(function (item) {
                        this.series.push(item);
                    }.bind(this));
                    this.offset++;
                    this.busy = false;
                }.bind(this));
            }.bind(this);
        };

        return {
            findAll: findAll,
            findOneById: findOneById,
            findSomeCharactersBySeries: findSomeCharactersBySeries,
            findSomeComicsBySeries: findSomeComicsBySeries,
            findSomeCreatorsBySeries: findSomeCreatorsBySeries,
            findSomeEventsBySeries: findSomeEventsBySeries,
            findSomeStoriesBySeries: findSomeStoriesBySeries,
            LoadMore: LoadMore
        }
    }
])
