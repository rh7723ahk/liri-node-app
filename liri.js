var APIkeys = require("./keys.js"); 
var request = require("request"); 
var Spotify = require("node-spotify-api");
var inquirer = require("inquirer"); 
var userOperand = process.argv[2]; 
var userInput = process.argv;
var inputString = "";
var fs = require("fs");


stringMaker();


switch (userOperand) {

    case "spotify-this-song":
    case "song":
        if (inputString === undefined || inputString === "") {
          
            spotifyDefault();
        } else {
            spotify();
            
        }
        break;
    case "movie-this":
    case "movie":
        if (inputString === undefined || inputString === "") {
            movieDefault();
            
        } else {
            movies();
        }
        break;
    case "do-what-it-says":
    case "whatever":
        autoFS();
        break;
    default:
        helper();
}


function stringMaker() {
    for (var i = 3; i < userInput.length; i++) {

        if (i > 3 && i < userInput.length) {

            inputString = inputString + "+" + userInput[i];

        } else {

            inputString += userInput[i];

        }
    }
    console.log("stringMaker done" + (typeof inputString));
}



function spotify() {
  console.log("error" +inputString+ "#");
    var sKey = new Spotify(
        APIkeys.spotifyKeys
    );

    sKey
        .search({ type: 'track', query: inputString, limit: 1 },
            function(err, data) {

                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                var songData = data.tracks.items[0];

                console.log("######### Your results for the song \'" + inputString + "\': ##########");
                console.log("------------------------------------------------------");
                console.log("Artist(s): " + songData.artists[0].name);
                console.log("Song Name: " + songData.name);
                console.log("Preview Link: " + songData.preview_url);
                console.log("Song Album: " + songData.album.name);
                console.log("------------------------------------------------------");
                console.log(songData);
            });


}



function spotifyDefault() {
    
    inputString = "The Sign by Ace of Base";
    console.log("Undefined. Here is \'The Sign\' by Ace of Base instead. If you don\'t like that, then put in something else.");
    
    spotify();
}




function movies() {
    var call = "http://www.omdbapi.com/?t=" + inputString + "&y=&plot=short&apikey=40e9cece";

    request(call, function(error, response, body) {

        if (!error && response.statusCode === 200) {

            var mText = JSON.parse(body);

            console.log("------------------------------------------------------");
            console.log("Title: " + mText.Title);
            console.log("Release Year: " + mText.Year);
            console.log("IMBD Rating: " + mText.imdbRating);
            console.log("Rotten Tomatoes Rating: " + mText.Ratings[1].Value);
            console.log("Country of Production: " + mText.Country);
            console.log("Language: " + mText.Language);
            console.log("Plot: " + mText.Plot);
            console.log("Actors: " + mText.Actors);
            console.log("------------------------------------------------------");

        }
    });

}


function movieDefault() {
  
    inputString = "Mr. Nobody";
    console.log("Your input is undefined. Here is the film \'Mr. Nobody\'. If you haven't watched \'Mr. Nobody\', then you should: \n<http://www.imdb.com/title/tt0485947/> \n It's on Netflix! If you don\'t like that, then put in something else.");
   
    movies();
}


function autoFS() {
    
   
    var randomData = "";
  
    fs.readFile("random.txt", "utf8", function(err, data) {

        
        if (err) {
            return console.log(err);
        }

        randomData = data.split(",");
        
        inputString = randomData[1];
    

        spotify();

    });

}


function helper() {
    console.log("------------------------------------------------------");
    console.log("Try one of these commands: \n" +
        "movie-this (followed by the movie's name) \n" +
        "spotify-this-song (followed by the song name) \n" +
        "do-what-it-says");
    console.log("------------------------------------------------------");
}