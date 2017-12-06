//DOC READY WAITS FOR THE HTML TO LOAD BEFOR RUNNING CODE
$(document).ready(function(){
});

var movies = ['Aladin', 'Fantasia', 'The Jungle Book', 'Bambi', 'The Lion King', 'Pinocchio', 'Peter Pan', 'Dumbo', 'Snow White and the Seven Dwarfs', 'Frozen', 'Alice In Wonderland', 'The Little Mermaid'];





	function displayMovie(){
		var movie = $(this).data('name');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";
		
		$.ajax({
			url: queryURL, 
			method: 'GET'
		}).done(function(response) {
			$('#moviesView').empty();

			var results = response.data;

			for(var i=0; i<results.length; i++){
				var movieDiv = $('<div>');
				movieDiv.addClass('cinema');

				var rate = $('<p>');
				rate.text('Rating: ' + results[i].rating);

				var image = $('<img>');
				image.attr('src', results[i].images.fixed_height.url);
				image.attr('data-still', results[i].images.fixed_height_still.url);
				image.attr('data-animate', results[i].images.fixed_height.url);
				image.attr('data-state', 'still');
				image.addClass('film');

				movieDiv.append(rate);
				movieDiv.append(image);
				$('#moviesView').prepend(movieDiv);
			}
		});
	}

	$(document).on('click', '.movie', displayMovie);





	function clickOnGif(){
		var state = $(this).attr('data-state');

		if(state === 'still'){
		    var imageURL = $(this).attr('data-animate');
		    $(this).attr('src', imageURL);
		    $(this).attr('data-state', 'animate');
		} else{
		    var imageURL = $(this).attr('data-still');
		    $(this).attr('src', imageURL);
		    $(this).attr('data-state', 'still');
		}
	}

	$(document).on('click', '.film', clickOnGif);
	




	// This creates a button with the user's input.
	function createButton(){ 
		$('#buttonsView').empty();
		for(var i = 0; i < movies.length; i++){
		    var a = $('<button>'); 
		    a.addClass('movie');  
		    a.attr('data-name', movies[i]);
		    a.text(movies[i]); 
		    $('#buttonsView').append(a);
		}
	}

	createButton();


	// This is triggered when you click the submit button.
	$('#addMovie').on('click', function(){
		var movie = $('#movie-input').val().trim();
		movies.push(movie);		
		createButton();
		$('#movie-input').val([]);
		return false;
	});


	


	


