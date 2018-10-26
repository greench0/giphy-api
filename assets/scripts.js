$(document).ready(function () {
  // ==========================================================

  // Create a basic html button then create an onClick event that triggers an on click event.
  // 
  // function triviaGame(question, answers, correctAnswer) {
  // this.question = question;
  // this.answers = answers;
  // this.correctAnswer = correctAnswer;
  // } // end function triviagame
  // 
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
    // return value;
  }
  topicArray();


  $(".button").on("click", function (event) {
    event.preventDefault();

    $(".giphy-div").empty();
    var giphyBtn = $(this).attr("id");
    console.log(giphyBtn);
    https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cats
    // "https://api.giphy.com/v1/gifs/search?q=" + giphyBtn + "&api_key=dc6zaTOxFJmzC&limit=10"
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

          // img src="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-still="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-animate="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" data-state="still" class="gif"

          var giphyImage = $("<img>");
          giphyImage.attr("src", results[i].images.fixed_height_still.url);
          giphyImage.attr("data-still", results[i].images.fixed_height_still.url);
          giphyImage.attr("data-animate", results[i].images.fixed_height.url);
          giphyImage.attr("data-state='still'");
          giphyImage.addClass("gif-image");

          giphyDiv.prepend(p);
          giphyDiv.prepend(giphyImage);

          $(".giphy-div").prepend(giphyDiv);
        }

        

        // ========== button event for search
  $("#search-button").on("click", function (event) {
    event.preventDefault();
    var searchTerm = $("#search-term").val().trim();
    topic.push(searchTerm);

    topicArray();

  });


  // ========== gif image stop / start 
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

        
      });
  });



  


  // ==========================================================
}); // end document ready
