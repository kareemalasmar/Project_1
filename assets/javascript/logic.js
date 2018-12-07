console.log("hello")

var youtubeKey = "AIzaSyBxpyfAxI6oQ0SmlVVG1RLx8ArXQGYpLyY";
var youtubeSearch = "cats";

$.ajax({
    url: " https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=" + youtubeSearch + " review" + "&key="+ youtubeKey,          
    method: "GET"
}).then(function(data) {
    console.log(data);
});