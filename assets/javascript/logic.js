// Event listener for all button elements
$("button").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var animals = $(this).attr("data-animal");
    

    // Constructing a URL to search Giphy for the name of the animal button clicked
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=DPvJg8Pk57QWmP9WKLaf1wVQZXjcOWiS&q=" + animals + "&limit=10&offset=0&rating=G&lang=en";


    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    // After the data comes back from the API
    .then(function(response) {

        console.log(queryURL);
        console.log(response);

        // Storing an array of results in the results variable
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var animalDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var animalImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(p);
            animalDiv.append(animalImage);

            // Prependng the animalDiv to the HTML page in the "#animals" div
            $("#animals").prepend(animalDiv);

            $("#animals").on("click", function() {
                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                var state = $(this).attr("data-state");
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                // Else set src to the data-still value
                if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
            });  
                
        }
    });
});
