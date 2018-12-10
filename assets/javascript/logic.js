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
    }).then(function(response) {
        var videoId = response.items[0].id.videoId;
        var video = $("<iframe>").attr({width: "560", height: "315", src: "https://www.youtube.com/embed/" + videoId, frameborder: "0", allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture", allowfullscreen: "allowfullscreen"});
        $("#videoContainer").append(video);
    });

    $.ajax({
        url: "http://cors-anywhere.herokuapp.com/https://api.walmartlabs.com/v1/search?apiKey=c2dsw2ypw9kedr4kky5vw7dk&numItems=1&query=" + productSearch,
        method: "GET"
    }).then(function(response){
        console.log(response.items[0]);
        // product name 
        var productName = response.items[0].name;
        var name = $("<h1>").text(productName);
        $("#prodName").append(name);
        // product price
        var productPrice = response.items[0].salePrice
        var price = $("<h1>").text("$" + productPrice + " USD");
        $("#prodPrice").append(price);
        // product image
        var productImage = response.items[0].largeImage;
        var image = $("<img>").attr({src: productImage, alt: productName});
        $("#prodImage").append(image);
        // product link
        var productLink = response.items[0].productUrl;
        var link = $("<a>").attr({href: productLink, target: "_blank"}).text("Go to product!");
        // product description
        var productDescription = response.items[0].shortDescription;
        var description = $("<p>").text(productDescription);
        $("#prodDescription").append(description);
        // product rating
        var productRating = response.items[0].customerRating;
        var rating = $("<p>").text(productRating);
        // product stars
        var productStars = response.items[0].customerRatingImage;
        var stars = $("<img>").attr({src: productStars, alt: productRating + "/5 stars"});
    });
});

// addToCartUrl: "http://c.affil.walmart.com/t/api02?l=http%3A%2F%2Faffil.walmart.com%2Fcart%2FaddToCart%3Fitems%3D579371947%7C1%26affp1%3D3hNHE7EA1nU0eRC3epL-hWFEJRz7jH59opakvxkGEbc%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi"
// affiliateAddToCartUrl: "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=http%253A%252F%252Faffil.walmart.com%252Fcart%252FaddToCart%253Fitems%253D579371947%257C1%2526affp1%253D3hNHE7EA1nU0eRC3epL-hWFEJRz7jH59opakvxkGEbc%2526affilsrc%253Dapi"
// availableOnline: false
// bundle: false
// categoryNode: "2636_1102672_1106096"
// categoryPath: "Video Games/PlayStation 4 Consoles, Games, Controllers + More/PlayStation 4 (PS4) Consoles"
// customerRating: "4.387"
// customerRatingImage: "http://i2.walmartimages.com/i/CustRating/4_4.gif"
// itemId: 579371947
// largeImage: "https://i5.walmartimages.com/asr/124749fb-3d24-45bd-a976-2ba1cf12e00c_5.72efc48d2db2ef4fecd71e31f25e6533.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff"
// longDescription: "Marvel&rsquo;s Spider-Man PlayStation 4&nbsp; BundleExperience a brand-new and authentic Spider-Man adventure with Marvel&rsquo;s Spider-Man PS4&trade; bundle which includes a jet black 1TB PS4, matching DUALSHOCK4 wireless controller and Marvel&rsquo;s Spider-Man game.This isn&rsquo;t the Spider-Man you&rsquo;ve met or ever seen before. This is an experienced Peter Parker who&rsquo;s more masterful at fighting big crime in New York City. At the same time, he&rsquo;s struggling to balance his chaotic personal life and career while the fate of millions of New Yorkers rest upon his shoulders.PlayStation 4Incredible Games: You&rsquo;ve come to the right place. Exclusive games take you on incredible journeys, from critically acclaimed indies to award-winning AAA hits.Endless Entertainment: Something new and amazing is always in reach. Find what you&rsquo;re looking for and get it at the touch of a button via PlayStation entertainment options like PlayStation Vue and more.&nbsp;Marvel&rsquo;s Spider-ManBe GreaterWhen a new villain threatens New York City, Peter Parker and Spider-Man&rsquo;s worlds collide. To save the city and those he loves, he must rise up and be greater.Be Spider-ManAfter eight years behind the mask, Peter Parker is a crime-fighting master. Feel the full power of a more experienced Spider-Man with improvisational combat, dynamic acrobatics, fluid urban traversal, and environmental interactions. A rookie no longer, this is the most masterful Spider-Man you&rsquo;ve ever played.Worlds CollideThe worlds of Peter Parker and Spider-Man collide in an original action-packed story. In this new Spider-Man universe, iconic characters from Peter and Spider-Man&rsquo;s lives have been reimagined, placing familiar characters in unique roles.Marvel&rsquo;s New York is Your PlaygroundThe Big Apple comes to life as Insomniac&rsquo;s most expansive and interactive world yet. Swing through vibrant neighborhoods and catch breathtaking views of iconic Marvel and Manhattan landmarks. Use the environment to defeat villains with epic takedowns in true blockbuster action."
// marketplace: false
// mediumImage: "https://i5.walmartimages.com/asr/124749fb-3d24-45bd-a976-2ba1cf12e00c_5.72efc48d2db2ef4fecd71e31f25e6533.jpeg?odnHeight=180&odnWidth=180&odnBg=ffffff"
// modelNumber: "CUH-2215B"
// msrp: 299.99
// name: "Sony PlayStation 4 Slim 1TB Spiderman Bundle, Black, CUH-2215B"
// numReviews: 235
// parentItemId: 579371947
// productTrackingUrl: "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=https%253A%252F%252Fwww.walmart.com%252Fip%252FSony-PlayStation-4-Slim-1TB-Spiderman-Bundle-Black-CUH-2215B%252F579371947%253Faffp1%253D3hNHE7EA1nU0eRC3epL-hWFEJRz7jH59opakvxkGEbc%2526affilsrc%253Dapi"
// productUrl: "http://c.affil.walmart.com/t/api02?l=https%3A%2F%2Fwww.walmart.com%2Fip%2FSony-PlayStation-4-Slim-1TB-Spiderman-Bundle-Black-CUH-2215B%2F579371947%3Faffp1%3D3hNHE7EA1nU0eRC3epL-hWFEJRz7jH59opakvxkGEbc%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi"
// rhid: "33334"
// salePrice: 199
// shortDescription: "Marvel&rsquo;s Spider-Man PS4 bundle includes a jet black 1TB PS4, matching DUALSHOCK4 wireless controller, and Marvel&rsquo;s Spider-Man game. Experience a brand-new and authentic Spider-Man adventure. After eight years behind the mask, Peter Parker is a crime fighting master. Feel the power with improvisational combat, fluid urban traversal, dynamic acrobatics, and environmental interactions."
// standardShipRate: 0
// stock: "Not available"
// thumbnailImage: "https://i5.walmartimages.com/asr/124749fb-3d24-45bd-a976-2ba1cf12e00c_5.72efc48d2db2ef4fecd71e31f25e6533.jpeg?odnHeight=100&odnWidth=100&odnBg=ffffff"
// upc: "711719518808"


