$(document).ready(function() {
  // Hides product info and loading containers on start up
  $("#productContainer").hide();
  $("#loadingContainer").hide();
  $("#productNotFoundContainer").hide();

  // Array of gifts will pull data from local storage
  var shoppingList = JSON.parse(localStorage.getItem("giftList"));

  // creates a function to display gift buttons from shopping list array to html
  function dumpButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < shoppingList.length; i++) {
      var span = $("<span>");
      var giftButton = $("<button>");
      var removeButton = $("<button>")
        .addClass("removeButton")
        .attr("data-name", shoppingList[i])
        .text("✓");
      giftButton
        .addClass("product-button")
        .attr("data-name", shoppingList[i])
        .text(shoppingList[i]);
      span.append(removeButton, giftButton);
      $("#buttons-view").append(span);
    }
  }

  // When any button with "removeButton" class is clicked it will remove it from the array, save to local storage and remove it from html
  $(document.body).on("click", ".removeButton", function() {
    for (var i = 0; i < shoppingList.length; i++) {
      if (shoppingList[i] === $(this).attr("data-name")) {
        shoppingList.splice(i, 1);
      }
    }
    localStorage.setItem("giftList", JSON.stringify(shoppingList));

    $(this)
      .parent()
      .remove();
  });

  // When button with id "add-gift" is clicked it will take value of text input and will push it to shoppingList array. Will then run dumpButton function
  $("#add-gift").on("click", function(event) {
    event.preventDefault();
    var newProduct = $("#gift-input")
      .val()
      .trim();
    // Will only do this if the text input field is not empty or equal to an already existing button.
    if (newProduct !== "" && shoppingList.indexOf(newProduct) === -1) {
      shoppingList.push(newProduct);
      dumpButtons();

      localStorage.setItem("giftList", JSON.stringify(shoppingList));
      $("#gift-input").val("");
    } else {
      $("#gift-input").val("");
    }
  });

  // Created a function to hide loading gif and show product info
  function loadingGif() {
    $("#productContainer").show();
    $("#loadingContainer").hide();
  }

  // Created a fucntion that will display new product info onto html
  function displayProductData() {
    $(".productInfo").empty();
    $("#productContainer").hide();
    $("#productNotFoundContainer").hide();

    // Variable = to the value of data-name attr from button clicked which is equal to value of text input
    var productSearch = $(this).attr("data-name");

    // Requests data from walmart api with productSearch var in query string
    $.ajax({
      url:
        "https://cors-anywhere.herokuapp.com/https://api.walmartlabs.com/v1/search?apiKey=c2dsw2ypw9kedr4kky5vw7dk&numItems=1&query=" +
        productSearch,
      method: "GET"
    }).then(function(response) {
      if (response.items === undefined) {
        $("#productNotFoundContainer").show();
        $("#productContainer").hide();
        $("#loadingContainer").hide();
        clearTimeout(loadingTimeout);
      } else {
        // Shows loading gif
        $("#loadingContainer").show();

        // SetTimeout function will wait 5 seconds before hiding loading gif again and showing product info
        loadingTimeout();
        // Pulls product name and displays on html
        var productName = response.items[0].name;
        var name = $("<h4>").text(productName);
        $("#prodName").append(name);
        // Pulls product price and displays on html
        var productPrice = response.items[0].salePrice;
        var price = $("<h5>").text("$" + productPrice + " USD");
        $("#prodPrice").append(price);
        // Pulls product image and displays on html
        var productImage = response.items[0].largeImage;
        var image = $("<img>").attr({ src: productImage, alt: productName });
        $("#prodImage").append(image);
        // Pulls product link to walmart page and displays on html
        var productLink = response.items[0].productUrl;
        var link = $("<a>")
          .attr({ href: productLink, target: "_blank" })
          .text("Go to product!");
        $("#prodBuy").append(link);
        // Pulls product description and displays on html
        var productDescription = response.items[0].shortDescription;
        var description = $("<p>").text(productDescription);
        $("#prodDescription").append(description);
      }
      // Pulls product rating and displays on html
      var productRating = response.items[0].customerRating;
      // Conditional to check if product has rating before displaying
      if (productRating === undefined) {
        var rating = $("<div>").text("Product rating not available");
        $("#prodRating").append(rating);
      } else {
        var rating = $("<div>")
          .addClass("Ratediv")
          .text("  " + productRating + "/5");
        $("#prodRating").append(rating);
        // Pulls product star image and displays on html
        var productStars = response.items[0].customerRatingImage;
        var stars = $("<img>")
          .addClass("stars")
          .attr({ src: productStars, alt: "  " + productRating + "/5 stars" });
        $("#prodRatingStars").append(stars);
      }
      // Nested ajax takes product name from walmart api and adds it to youtube api query string with the word "review" attached to the end
      $.ajax({
        url:
          " https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=1&key=AIzaSyBxpyfAxI6oQ0SmlVVG1RLx8ArXQGYpLyY&q=" +
          productName +
          " review",
        method: "GET"
        // Displays embedded video on html
      }).then(function(response) {
        // Will only run if a youtube review video of product exists
        if (response.items[0] === undefined) {
          var video = $("<p>").text("Video review not available");
          $("#prodVideo").append(video);
        } else {
          var ytVideoId = response.items[0].id.videoId;
          var video = $("<iframe>").attr({
            width: "560",
            height: "315",
            src: "https://www.youtube.com/embed/" + ytVideoId,
            frameborder: "0",
            allow:
              "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
            allowfullscreen: "allowfullscreen"
          });
          $("#prodVideo").append(video);
        }
      });
    });
  }

  function loadingTimeout() {
    setTimeout(loadingGif, 5000);
  }

  // Creates Clear button and appends it to page
  var clearButton = $("<button>");
  clearButton.attr("id", "clearButton").text("Clear");
  $("#clearButton").append(clearButton);

  // When Clear button is clicked it will empty all product info divs and hide entire section
  $("#clearButton").on("click", function() {
    $("#prodName").empty();
    $("#prodPrice").empty();
    $("#prodImage").empty();
    $("#prodBuy").empty();
    $("#prodDescription").empty();
    $("#prodRatingStars").empty();
    $("#prodRating").empty();
    $("#prodVideo").empty();
    $("#productContainer").hide();
    $("#productNotFoundContainer").hide();
  });

  // When any button with class "product-button" is clicked it will run our Display function
  $(document).on("click", ".product-button", displayProductData);

  // if shoppingList generated by local storage is not an array it will set it equal to an empty array
  if (!Array.isArray(shoppingList)) {
    shoppingList = [];
  }

  // Generates buttons on start up from already existing array
  dumpButtons();
});
