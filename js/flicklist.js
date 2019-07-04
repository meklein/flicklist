

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {

  root: "https://api.themoviedb.org/3",
  token: "0b2d4c266d2d87de465c3dc414a23ace",

  /**
   * Given a movie object, returns the url to its poster image
   */
  posterUrl: function(movie) {
    // TODO 4b
	// implement this function
	let url = "http://image.tmdb.org/t/p/w300/" + movie.poster_path;
    return  url;
  }
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
  $.ajax({
    url: api.root + "/discover/movie",
    data: {
      api_key: api.token
    },
    success: function(response) {
      model.browseItems = response.results;
      callback(response);
      console.log(response);
    }
  });
}


/**
 * Makes an AJAX request to the /search endpoint of the API, using the 
 * query string that was passed in
 *
 * if successful, updates model.browseItems appropriately and then invokes
 * the callback function that was passed in
 */
function searchMovies(query, callback) {
  $.ajax({
    url: api.root + "/search/movie",
    data: {
      api_key: api.token,
      query: query
    },
    success: function(response) {
      model.browseItems = response.results;
      callback(response);
    }
  });
}




/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {

  // clear everything
  $("#section-watchlist ul").empty();
  $("#section-browse ul").empty();

  // insert watchlist items
  model.watchlistItems.forEach(function(movie) {

	var title = $("<h5></h5>")
	.text(movie.original_title)
	.attr("class", "card-title");

    // TODO 1 
    // add an "I watched it" button and append it below the title
	// Clicking should remove this movie from the watchlist and re-render
	let removeBtn = $("<button'></button>")
		.text("I watched it")
		.attr("class", "btn btn-danger btn-block")
		.click(function(){
		let index = model.watchlistItems.indexOf(movie);
		model.watchlistItems.splice(index, 1);
		render();
	})

    // TODO 4a
    // add a poster image and append it inside the 
    // panel body above the button
	let posterImg = $("<img>")
	.attr("src", api.posterUrl(movie))
	.attr("class", "card-img-top");



    // TODO 2g
	// re-implement the li as a bootstrap panel with a heading and a body

	var cardBody = $("<div></div>")
		.attr("class", "card-body")
		.append(title)
		.append(removeBtn);

	var cardContainer = $("<div></div>")
		.attr("class", "card")
		.append(posterImg)
		.append(cardBody);

	var itemView = $("<li></li>")
	  .attr("class", "item-watchlist list-inline-item")
	  .append(cardContainer);


	


    $("#section-watchlist ul").append(itemView);
  });

  // insert browse items
  model.browseItems.forEach(function(movie) {

    // TODO 2d continued
    // style this list item to look like the demo
    // You'll also need to make changes in index.html.
    // use the following BS classes:
    // "list-group", "list-group-item", btn", "btn-primary", 

    var title = $("<h4></h4>").text(movie.original_title);

    var button = $("<button></button>")
	  .text("Add to Watchlist")
	  .attr("class", "btn btn-primary")
      .click(function() {
        model.watchlistItems.push(movie);
        render();
      })
      .prop("disabled", model.watchlistItems.indexOf(movie) !== -1);

    var overview = $("<p></p>").text(movie.overview);

    // append everything to itemView, along with an <hr/>
	var itemView = $("<li></li>")
	  .attr("class", "list-group-item list-group-item-action")
      .append(title)
      .append(overview)
      .append(button);
      
    // append the itemView to the list
    $("#section-browse ul").append(itemView);
  });
  
}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
//   $("#submit").click(function(){
// 	  let query = $("#query").val();
// 	searchMovies(query);
//   })
});