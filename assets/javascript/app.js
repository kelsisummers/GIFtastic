// Initial Array of Search Terms

var topics = ["The Incredibles", "Wall-E", "Inside Out", "Toy Story", "Ratatouille", "Finding Nemo", "A Bug's Life"];



// Function for dumping the JSON content for each button into the div
function displayMovieInfo() {
    $('#gifs-view').empty();
    search = $(this).data('name');

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=pixar+" + search + "&api_key=hLs3wdbBMaPe6kBOZTHuFQHvKAVxkFS6&limit=10";

    $.ajax({
    url: queryURL,
    method: "GET"
    }).done(function(response) {
        console.log(response);
        for (var i=0; i < response.data.length;i++){
        $('#gifs-view').append(
            
            '<img src="' + response.data[i].images.fixed_height_still.url + 
            '"data-still="'+ response.data[i].images.fixed_height_still.url + 
            '"data-animate="'+response.data[i].images.fixed_height.url +'"data-state="still" class="gif">'
            
            
             + '<div id="rating">Rated: ' + response.data[i].rating + '</div>');
        }
    });
}

// Function for displaying movie data
function renderButtons() {
    // Deleting the buttons prior to adding new movies
    $("#buttons-view").empty();
    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {
        // Dynamicaly generates buttons for each term in the array
        var button = $("<button>");
          // Adding a class to the button
          button.addClass("topics-button");
          // Adding a data-attribute
          button.attr("data-name", topics[i]);
          // Providing the initial button text
          button.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(button);
    }
}

// This function handles events where one button is clicked
$("#add-gifs").on("click", function() {
    // Prevents Submitting to Page
    event.preventDefault();

    var searchTerm = $('#search-input').val().trim();
        topics.push(searchTerm);
        renderButtons();
    $('#search-input').val('');
      });

// Function to Animate GIFs
$('#gifs-view').on('click', ".gif", function(){
    var state = $(this).attr('data-state');
    console.log(state)

    if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate')).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).attr('data-still')).attr('data-state', 'still');
    } 
})

// Calling the renderButtons function to display the intial buttons
renderButtons();

// Calls Function for Displaying Gifs
$(document).on("click", ".topics-button", displayMovieInfo);