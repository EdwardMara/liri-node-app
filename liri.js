require("dotenv").config();
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var Spotify = require("node-spotify-api");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var operation = process.argv[2];
var subject = process.argv.slice(3);

var searchableSubject = subject.join(" ");

// node liri.js concert-this <artist/band name here>
// search the Bands in Town Artist Events API
//"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
//show NAME OF THE VENUE
// VENUE LOCATION
// DATE OF THE EVENT in MM/DD/YYYY
var concertThis = function (artist) {
    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    var printData;
    axios.get(url).then(function (response) {
        var tourData = response.data;
        printData = [];
        for (var i = 0; i < tourData.length; i++) {
            var time = moment(tourData[i].datetime).format('L');
            printData.push(`Venue: ${tourData[i].venue.name} ` + `| City: ${tourData[i].venue.city}` + ` | Date: ${time}`);
        };

        console.log(printData);
    }).catch(function (err) {
        console.log(err);
    });

};

//node liri.js spotify-this-song '<song name here>'
//ARTIST
//THE SONGS NAME
//A PREVIEW LINK OF THE SONG FROM SPOTIFY
//THE ALBUM THAT THE SONG IS FROM

var spotifyThisSong = function (song) {
    if (song != "") {
        spotify.search({
            type: 'track',
            query: song
        }).then(function (response) {
            // console.log(response.tracks.items[0].artists[0].name);
            var track = response.tracks.items[0];

            console.log(`Song: ${track.name} | Artist: ${track.artists[0].name}  | Album: ${track.album.name}  | Preview: ${track.preview_url}`);
        }).catch(function (err) {
            console.log(err);
        });
    } else {
        // if no song is provided then your program will default to "The Sign" by Ace of Base
        spotify.search({
            type: 'track',
            query: "The Sign"
        }).then(function (response) {
            console.log(response.tracks.items[5].artists[0].name);
            var track = response.tracks.items[5];

            console.log(`Song: ${track.name} | Artist: ${track.artists[0].name}  | Album: ${track.album.name}  | Preview: ${track.preview_url}`);
        }).catch(function (err) {
            console.log(err);
        });
    }

};



// node liri.js movie-this '<movie name here>'

// http://www.omdbapi.com/?t=***MOVIE NAME***&y=&plot=short&apikey=trilogy
// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.

//no movie typed will output Mr. Nobody
// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
// It's on Netflix!

var movieThis = function (movie) {
    if (movie != "") {
        var url = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
        axios.get(url).then(function (response) {
            // console.log(response.data);
            console.log(
                `Title: ${response.data.Title}\n`,
                `Year: ${response.data.Year}\n`,
                `IMDB Rating: ${response.data.imdbRating}\n`,
                `Rotten Tomatoes: ${response.data.Ratings[1].Value}\n`,
                `Country: ${response.data.Country}\n`,
                `Language: ${response.data.Language}\n`,
                `Plot: ${response.data.Plot}\n`,
                `Actors: ${response.data.Actors}\n`
            );

        });
    } else {
        axios.get("https://www.omdbapi.com/?t=mr nobody&y=&plot=short&apikey=trilogy").then(function (response) {
            // console.log(response.data);
            console.log(
                `Title: ${response.data.Title}\n`,
                `Year: ${response.data.Year}\n`,
                `IMDB Rating: ${response.data.imdbRating}\n`,
                `Rotten Tomatoes: ${response.data.Ratings[1].Value}\n`,
                `Country: ${response.data.Country}\n`,
                `Language: ${response.data.Language}\n`,
                `Plot: ${response.data.Plot}\n`,
                `Actors: ${response.data.Actors}\n`
            );

        });

    }
}

var doWhatItSays = function(){

    fs.readFile("random.txt", "utf8", function(error, data){
        if(error){
            return console.log(error);
        }
        var dataArr = data.split(",");
        var stringData =dataArr[1];
        spotifyThisSong(stringData);
    });
    
    
};

// node liri.js do-what-it-says
//run spotify-this-song for "I Want it That Way" in random.txt

//TODO: read me

if (operation === "concert-this") {
    console.log(searchableSubject);
    concertThis(searchableSubject);
} else if (operation === 'spotify-this-song') {
    console.log(searchableSubject);
    spotifyThisSong(searchableSubject);
} else if (operation === 'movie-this') {
    console.log(searchableSubject);
    movieThis(searchableSubject);
}else if (operation === 'do-what-it-says'){
    doWhatItSays();
}







