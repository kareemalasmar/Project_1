var youtubeKey = "AIzaSyBxpyfAxI6oQ0SmlVVG1RLx8ArXQGYpLyY";
// var youtubeSearch = $("#gift-input").val().trim();


$("#add-gift").on("click", function(event){
    event.preventDefault();
    var productSearch = $("#gift-input").val().trim();
    $("#gift-input").val("");
    console.log(productSearch);
    $.ajax({
        url: " https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=1&key=AIzaSyBxpyfAxI6oQ0SmlVVG1RLx8ArXQGYpLyY&q=" + productSearch + " review",          
        method: "GET"
    }).then(function(data) {
        videoId = data.items[0].id.videoId;
        var video = $("<iframe>").attr({width: "560", height: "315", src: "https://www.youtube.com/embed/" + videoId, frameborder: "0", allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture", allowfullscreen: "allowfullscreen"});
        $("#videoContainer").append(video);
    });

    $.ajax({
        url: "http://cors-anywhere.herokuapp.com/https://api.walmartlabs.com/v1/search?apiKey=c2dsw2ypw9kedr4kky5vw7dk&numItems=1&query=" + productSearch,
        method: "GET"
    }).then(function(response){
        console.log(response.items[0]);
    });
});


