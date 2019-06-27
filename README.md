# liri-node-app
This is a terminal based app that takes in user input and processes certain operations using Node.js

##NPM Packages Used
<ul>
<li>axios</li>
<li>doeenv</li>
<li>moment</li>
<li>node-spoitfy-api</li>
</ul>

###### axios
<p>Axios in order to request and process JSON objects from OMDB, Spotify, and BandsInTown</p>

###### doenv
<p>doenv creates api key references that are set to be ignored so they wont be uploaded to the github repository</p>

######moment
<p>moment allows the reformatting of time information.  Specifically, the time in which bands perform during their tour is changed to an easy to read format, MM/DD/YYYY</p>

######node-spotify-api
<p>The spotify node package makes it easy to get JSON objects of set tracks, albums, or artists.

##Use Instructions
<p>Be sure to download the necessary packages from NPM</p>
<p>In your terminal, type "npm install"</p>;
<p>To use Liri, type "node {filepath to liri.js} {operation} {query}"

###Possible operations
<ul>
<li>concert-this</li>
<li>spotify-this-song</li>
<li>movie-this</li>
<li>do-what-it-says</li>
</ul>

######concert-this
<p> will search for tour dates and venues for touring bands specified by {query}</p>

######spotify-this-song
<p> will return information about a song specified by {query} using spotify track JSON</p>

######movie-this
<p>will return OMDB movie information based on the title specified by {query}</p>

######do-what-it-says
<p>will execute the {operation} and {query} defined by random.txt</p>


<h3>Video Demonstration</h3>
<a href="https://drive.google.com/file/d/1Kn-_7NHsBG0xZtKBUm-cQ-RY_wnvn2UW/view?usp=sharing">ScreenCastify Liri demo</a>