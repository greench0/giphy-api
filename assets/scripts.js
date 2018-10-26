$(document).ready(function () {
  // ==========================================================
  // ==========================================================

  // global variables 
  var topic = ["uno", "dos", "tres", "banana", "five", "six"];


  // button generation for the topic array
  function topicArray() {

    //empty the button div before adding new buttons
    $(".button-div").empty();
    var i; for (i = 0; i < topic.length; i++) {
      var value = topic[i];
      $(".button-div").append('<button class="button" id=' + value + '>' + value + '</button>');
    }
  }
  topicArray();

  // ========== button event for search feature
  $("#search-button").on("click", function (event) {
    event.preventDefault();
    var searchTerm = $("#search-term").val().trim();
    topic.push(searchTerm);

    topicArray();

  });



  // ========== button event for loading giphy images when topic buttons are selected
  $(".button").on("click", function (event) {
    event.preventDefault();

    $(".giphy-div").empty();
    var giphyBtn = $(this).attr("id");
    console.log(giphyBtn);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphyBtn + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var results = response.data;

        // ========== button event for search
        for (var i = 0; i < results.length; i++) {
          var giphyDiv = $("<div class='single'></div>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);

          var giphyImage = $("<img>");
          giphyImage.attr("src", results[i].images.fixed_height_still.url);
          giphyImage.attr("data-still", results[i].images.fixed_height_still.url);
          giphyImage.attr("data-animate", results[i].images.fixed_height.url);
          giphyImage.attr("data-state='still'");
          giphyImage.addClass("gif-image");
          // add elements to giphydiv
          giphyDiv.prepend(p);
          giphyDiv.prepend(giphyImage);
          $(".giphy-div").prepend(giphyDiv);
        }

        
        // ========== gif image stop / start function
        $(".gif-image").on("click", function () {
          console.log("gif");
      
          var state = $(this).attr("data-state");
      
          if (state === 'still') {
      
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
      
          }
      
          else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });

      

        
      }); // end function responce
  }); // end ajax
  



  



  


  // ==========================================================
}); // end document ready
