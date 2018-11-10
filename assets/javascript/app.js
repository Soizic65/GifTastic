$(document).ready(function () {

    var topics = [
        "horses",
        "cats",
        "chickens",
        "pigs"
    ];

    function createButtons() {
        $("#buttonArea").empty();

        for (var i = 0; i < topics.length; i++) {

            var newButton = $("<button>")
            newButton.attr("class", "button");
            newButton.attr("class", "btn btn-danger")
            newButton.attr("data-name", topics[i]);
            newButton.text(topics[i]);
            $("#buttonArea").append(newButton);
        }
    }
    function images() {
        $("button").on("click", function () {
            var a = $(this).attr('data-name');


            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + a + "&api_key=05fqTKAXJ1iqImoGBeEdZpvo6OAuG4qF&limit=10";
            

            $.ajax({
                url: queryURL,
                method: 'GET'
            }).done(function(response) {
                var results = response.data;


                $('#imageArea').empty();

                for (var i = 0; i < results.length; i++) {

                    var animalDiv = $("<div class='animals'>");
                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);
                    var animalImage = $("<img>");

                    animalImage.attr("src", results[i].images.fixed_height_still.url);
                    animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                    animalImage.attr("data-animate", results[i].images.fixed_height.url);
                    animalImage.attr("data-condition", "still")
                    animalImage.attr("class", "pause")

                    animalDiv.append(p);
                    animalDiv.append(animalImage);

                    $('#imageArea').append(animalDiv);
                }

            });

        });
    }
    function addButton() {
        $("#submit").on("click", function (event) {
            event.preventDefault();
            var animal = $("#input").val().trim();
            topics.push(animal);
            createButtons();
            images();
           
        });
    }
        $("#imageArea").on("click", ".pause", function () {
            var condition = $(this).attr("data-condition");
            if (condition === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-condition", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-condition", "still");
            }
        });
  
         $(document).on('click', '.btn btn-danger', images);
         createButtons();
         images();
         addButton();
        
    


    })



        




