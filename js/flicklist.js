

var model = {
	watchlistItems: [],
	browseItems: []
};


var api = {
	root: "https://api.themoviedb.org/3",
	token: "0b2d4c266d2d87de465c3dc414a23ace"
};

function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function (response) {
			console.log("We got a response from The Movie DB!");
			model.browseItems = response.results;
			// invoke the callback function that was passed in. 
			callback();
		}
	});
};

function render() {
	// TODO 7
	// clear everything from both lists
	$("#section-watchlist ul").empty();
	$("#section-browse ul").empty();


	//Add watchlist titles to elements and to fragment
	model.watchlistItems.forEach(function (movie) {
		var movieToSee = $("<li></li>").text(movie.title);
		$("#section-watchlist ul").append(movieToSee);
	});

	//Add browselist titles to element and to fragment
	model.browseItems.forEach(function (movie) {
		var movieEle = $("<li></li>").html("<p>" + movie.title + "</p>");
		var btn = $("<button></button>").text("Add to Watchlist");

		btn.click(function () {
			model.watchlistItems.push(movie);
			render();
		});

		//Add button to element, and the element to the fragment
		movieEle.append(btn);
		$("#section-browse ul").append(movieEle);
	});
}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function () {
	discoverMovies(render);
});

