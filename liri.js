require("dotenv").config();
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

var keys = require("./keys.js");
// var spotify = new spotify(keys.spotify);

var operation = process.argv[2];
var subject = process.argv.slice(3);

var searchableSubject =  subject.join(" ");

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
            printData.push(`Venue: ${tourData[i].venue.name} ` + `| City: ${tourData[i].venue.city}`+ ` | Date: ${time}`);
        };
        
        console.log(printData);
    });
    
};

//TODO: node liri.js spotify-this-song '<song name here>'
//ARTIST
//THE SONGS NAME
//A PREVIEW LINK OF THE SONG FROM SPOTIFY
//THE ALBUM THAT THE SONG IS FROM

//TODO: if no song is provided then your program will default to "The Sign" by Ace of Base


//TODO: node liri.js movie-this '<movie name here>'
// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.

//TODO:no movie typed will output Mr. Nobody
// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
// It's on Netflix!

//TODO: node liri.js do-what-it-says
//run spotify-this-song for "I Want it That Way" in random.txt

//TODO: read me

if (operation === "concert-this") {
    console.log(searchableSubject);
    concertThis(searchableSubject);
}








