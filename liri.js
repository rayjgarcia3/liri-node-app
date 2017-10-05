var request = require('request');
var fs = require('fs');
var spotify = require('node-spotify-api');
var Twitter = require('twitter');
var keys = require('./keys.js');
var twit = new Twitter(keys);
var argument = process.argv[2];
var value = process.argv[3];
var dataText = process.argv[4];
// Twitter
var params = {
    "screen_name": "macklinfbi13",
    "count": 20
}
if (argument === "my-tweets") {
    twit.get('statuses/user_timeline', params, gotData);

    function gotData(error, data, response) {
        var tweets = data;
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
            console.log(tweets[i].created_at);
            console.log("--------------------------------------------------------------------------------");
        }
    };
    outputText();
}
// Spotify
var spotify = new spotify({
    id: "343759baf35a4f8ca9f52bccd281e8e4",
    secret: "e406e999d23d4478a739ab57c7ed9c46"
});
if (argument === "spotify-this-song") {
    var song = process.argv[3];
    spotify.search({
        type: 'track',
        query: song
    }, function(err, data) {
        if (process.argv[3]) {
            var data = data.tracks.items;
            for (var i = 0; i < data.length; i++) {
                console.log(data[i].name);
                console.log(data[i].album.href);
                console.log(data[i].album.name);
                console.log(data[i].preview_url);
            }
        } else {
            spotify.search({
                type: 'track',
                query: "All the Small Things"
            }, function(err, data) {
                var data = data.tracks.items;
                console.log(data[0].name);
                console.log(data[0].album.href);
                console.log(data[0].album.name);
                console.log(data[0].preview_url);
                console.log(data[0].artists[0].name);
            });
        }
    });
    outputText();
}
//OMDB
if (argument === "movie-this") {
    console.log(process.argv);
    var movieTitle = process.argv[3];
    request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
        if (process.argv[3]) {
            var body = JSON.parse(body)
            console.log(body);
        } else {
            request("http://www.omdbapi.com/?t=mr+nobody+&y=&plot=short&apikey=40e9cece", function(error, response, body) {
                console.log(body);
                if (movieTitle === "Mr. Nobody") {
                    console.log("-----------------------");
                    console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
                    console.log("It's on Netflix!");
                }
            })
        }
    });
};
if (argument === "do-what-it-says") {
    fs.readFile('random.txt', "utf8", function(err, data) {
        console.log(data);
    });
    outputText();
}

function outputText() {
    fs.appendFile('log.txt', 'Argument: ' + argument + '. Movie or Song Title: ' + value + '. Movie or Song info: ' + dataText + '.');
}