var topics = ["dogs", "cats", "birds", "puppies"];

// var apiKeyGiphy = "CJ1Ryc1L7ZAKLUjbawD1S8xwrconLjor";

var userQueryURL = "https://api.giphy.com/v1/gifs/random?api_key=CJ1Ryc1L7ZAKLUjbawD1S8xwrconLjor&tag=cats"

var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=CJ1Ryc1L7ZAKLUjbawD1S8xwrconLjor&tag=cats";

// Populate the initial buttons from existing array
var buttonPopulator = function() {
    topics.forEach(element => {
        var topicButton = $("<button>").text(element);
        topicButton.attr("data-topic", element);
        topicButton.attr("class", "search_topic btn btn-primary")
        $("#topicButtons").append(topicButton);
        
    });      
    
}


// Add a new button from the submit field. Check if topic exists already or if field is blank.  If neither, populate new button.
$("#addTopic").on("click", function(event) {
    event.preventDefault();
    var newTopic = $("#topic-input").val().trim().toLowerCase();

    console.log(newTopic);

    if (topics.indexOf(String(newTopic)) === -1 && newTopic != "") {
    topics.push(newTopic);
    var topicButton = $("<button>").text(newTopic);
    topicButton.attr("data-topic", newTopic);
    topicButton.attr("class", "search_topic btn btn-primary");
    $("#topicButtons").append(topicButton);
    }

    $("#topic-input").val("");

    
})

// listener for search gif database for the topic name  of the button selected.  empty the images on page from the previous search

$(document.body).on("click", ".search_topic", function() {
    var topic = $(this).attr("data-topic");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=CJ1Ryc1L7ZAKLUjbawD1S8xwrconLjor&limit=10";
    $("#topics").empty();
// search the gif database
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
// for each item returned, create divs with identifying elemenets for use.  
        response.data.forEach(function(result) {
            var topicDiv =$("<div>")
            topicDiv.attr("class", "image-item")
            var p = $("<p>").text("Rating: " + result.rating.toUpperCase())
            var img = $("<img>")
            img.attr("class", "gif")
            img.attr("src", result.images.fixed_height_still.url)
            img.attr("data-status", "still")
            img.attr("still-image", result.images.fixed_height_still.url)
            img.attr("moving-image", result.images.fixed_height.url)
// attach returned information to new elements and prepend to html body
            topicDiv.prepend(img, p)
            $("#topics").prepend(topicDiv)

        })
    })

})

// when returned gifs are clicked, animate the gif when clicked.  if animated, then return to original still return state

$(document.body).on("click", ".gif", function(){
    var status = $(this).attr("data-status");

    if (status === "still") {
        $(this).attr("src", $(this).attr("moving-image"));
        $(this).attr("data-status", "moving");
    }
    else {
        $(this).attr("src", $(this).attr("still-image"));
        $(this).attr("data-status", "still")
    }
})



buttonPopulator();
