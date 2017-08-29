var app = angular.module('myApp', []);

app.controller('SwapiController', ['$http', function ($http) {
    console.log('controller loaded');

    var self = this;
    var giphyAPIKey = '0519f34a9ef7479bbfa47c27f07ec019';   // your API Key

    self.getSpecies = function (id) {

        $http.get('https://swapi.co/api/species/' + id).then(function (response) {
            console.log('response.data ', response.data);
            self.speciesResult = response.data;

            $http.get(self.speciesResult.films[0]).then(function (response) {
                console.log('film data: ', response.data);

                self.filmResult = response.data;
            });
        });
    }

    self.getTrendingGiphy = function () {
        // example request:
        // http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5
        var baseUrl = 'http://api.giphy.com/v1/gifs/trending?';
        baseUrl += 'api_key=' + giphyAPIKey;    // api key
        baseUrl += '&limit=5';  // limit
        baseUrl += '&rating=g'; // rating
        baseUrl += '&accept:image/*'; // rating


        console.log('baseUrl: ', baseUrl);
        self.links = [];
        $http.get(baseUrl).then(function (response) {
            console.log('response.data', response.data);

            for (var i = 0; i < response.data.data.length; i++) {
                self.links.push(response.data.data[i].images.downsized_medium.url);
            }
            console.log(self.links);
        });
    };

    self.getRandomGiphy = function () {
        // example request:
        // http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5
        var baseUrl = 'http://api.giphy.com/v1/gifs/random?';
        baseUrl += 'api_key=' + giphyAPIKey;    // api key
        // baseUrl += '&limit=1';  // limit
        baseUrl += '&rating=g'; // rating
        baseUrl += '&accept:image/*'; // rating


        console.log('baseUrl: ', baseUrl);
        self.links = [];
        $http.get(baseUrl).then(function (response) {
            console.log('response.data', response.data.data.image_original_url);
            self.rando = response.data.data.image_original_url
        });
    };

    self.searchExecute = function () {
        self.result="";
        // example request:
        // http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5
        var baseUrl = 'http://api.giphy.com/v1/gifs/search?';
        baseUrl += 'api_key=' + giphyAPIKey;    // api key
        baseUrl += '&q='+self.search;
        baseUrl += '&limit=1' // limit
        baseUrl += '&rating=g'; // rating
        baseUrl += '&accept:image/'; // img only


        console.log('baseUrl: ', baseUrl);
        self.links = [];
        $http.get(baseUrl).then(function (response) {

            console.log('response.data.data[0].images.downsized_medium.url', response.data.data[0].images.downsized_medium.url);
            self.result = response.data.data[0].images.downsized_medium.url
            console.log('self.result', self.result);
            
        });
    };


}]);
