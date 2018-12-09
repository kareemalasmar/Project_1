var youtubeKey = "AIzaSyBxpyfAxI6oQ0SmlVVG1RLx8ArXQGYpLyY";
// var youtubeSearch = $("#gift-input").val().trim();


$("#add-gift").on("click", function(event){
    event.preventDefault();
    var youtubeSearch = $("#gift-input").val().trim();
    $("#gift-input").val("");
    console.log(youtubeSearch);
    $.ajax({
        url: " https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=10&q=" + youtubeSearch + " review" + "&key="+ youtubeKey,          
        method: "GET"
    }).then(function(data) {
        videoId = data.items[0].id.videoId;
        console.log(videoId);
        var video = $("<iframe>").attr({width: "560", height: "315", src: "https://www.youtube.com/embed/" + videoId, frameborder: "0", allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture", allowfullscreen: "allowfullscreen"});
        $("#videoContainer").append(video);
    });
});

