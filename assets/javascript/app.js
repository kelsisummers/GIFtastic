// Initial Array of Search Terms
var topics = ["The Incredibles", "Wall-E", "Inside Out", "Toy Story", "Ratatouille", "Finding Nemo", "A Bug's Life", "Up"];

// Function for dumping the JSON content for each button into the div
function displayGIF() {
  // Empties GIF Container and Changes Display Property
  $('#gifs-view').empty();
  $('#gifs-view').css('display', "inherit");

  // When Button is Clicked, 'Name' Becomes Search Variable
  var search = $(this).data('name');

  // Creates URL with Search Term for Giphy API
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=pixar+" + search + "&api_key=hLs3wdbBMaPe6kBOZTHuFQHvKAVxkFS6&limit=15";

  // AJAX Call to Giphy API
  $.ajax({
  url: queryURL,
  method: "GET"
  // When AJAX Call is "Done"
  }).done(function(response) {
    // Log Response to Console
    // console.log(response);

    // For Loop to Populate 10 Gifs
    for (var i=0; i < response.data.length;i++){    
    	// Appended to HTML
      $('#gifs-view').append(
        // Initial Image Source; Still Image; Assign "gif" class
        '<div id = "gif" style = "position: relative"><img class="gif" src="' + response.data[i].images.fixed_height_still.url + 
        // URL for Data State Still Gif
        '"data-still="'+ response.data[i].images.fixed_height_still.url + 
        // URL for Data Sate Animated Gif
        '"data-animate="'+response.data[i].images.fixed_height.url +
        // Assigns Initial Data State of Still
        '"data-state="still" style="position:relative"><div id="rating" class= "uk-label">Rated: ' + response.data[i].rating + '</div></div>'  
      )
    }
  })
};

// Function for Displaying Search Buttons from Initial 'topics' Array
function renderButtons() {
  // Deletes the Buttons Prior to Adding New Titles
  $("#buttons-view").empty();

  // Loops Through 'topics' Array
  for (var i = 0; i < topics.length; i++) {
    // Dynamicaly Generates Buttons for Each Term in the Array; Classes from UIKit for Styling
    var button = $("<button class='gif-button uk-button uk-button-default uk-button-large'>");

    // Adds a Class to the Button
    button.addClass("topics-button");

    // Adds a Data-Attribute for displayGIF Function
    button.attr("data-name", topics[i]);

    // Provides initial button text
    button.text(topics[i]);

    // Adds the BButton to the HTML
    $("#buttons-view").append(button);
  }
};

// Button onclick Function
$("#add-gifs").on("click", function() {
  // console.log(searchTerm);

  // Prevents Submitting to Page
  event.preventDefault();

  // Creates a Search Term from User Input
  var searchTerm = $('#search-input').val().trim();

  if (searchTerm==="") {
    alert('Error! Type Something Pixar!')
  } else {
    // Pushes User Search to 'topics' Array
    topics.push(searchTerm);
    // Calls Button Function
    renderButtons();
  }

  // Empties Text from Input Box
  $('#search-input').val('');

  // Troubleshoot searchTerm
  // console.log(searchTerm);
});



// Onclick Function to Animate GIFs
$('#gifs-view').on('click', ".gif", function(){

  // Variable State Assigned to Data State of Clicked Gif
  var state = $(this).attr('data-state');

  // Troubleshoot Current State
  // console.log(state)

  // If The Gifs State is "Still", Change it to "Animate" When Clicked
  if (state === 'still') {
    $(this).attr('src', $(this).attr('data-animate')).attr('data-state', 'animate');  
  // If The Gifs State is "Animated", Change it to "Still" When Clicked
  } else {
    $(this).attr('src', $(this).attr('data-still')).attr('data-state', 'still');
  } 
});

// Calls the renderButtons function to Display Intial Buttons\
renderButtons();

// Calls Function for Displaying Gifs When a Button is Clicked
$(document).on("click", ".topics-button", displayGIF);