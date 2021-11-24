var gameResults = document.querySelector("#game-results");

var getGames = function(platform, category, number) {
    // format api url
    var apiUrl = "https://www.freetogame.com/api/games?category=" + category;

    if (platform !== "all") {
        apiUrl = apiUrl + "&platform=" + platform;
    }

    // add proxy to resolve CORS error
    apiUrl = "https://cors-anywhere.herokuapp.com/" + apiUrl;

    // fetch api url
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                if (data.status === 0) {
                    gameResults.textContent = "No results found.";
                } else {
                    loadGames(data, number);
                }
            });
        }
    });
};

var loadGames = function(data, number) {
    // check for data length
    if (data.length < number) {
        var resultLength = data.length;
    } else {
        resultLength = number;
    }
    // load ten games from data
    for (var i = 0; i < resultLength; i++) {
        // create div for each result
        var gameListItem = document.createElement("div");
        gameListItem.classList.add("result-container");

        // create link for each result
        var gameListItemName = document.createElement("a");
        gameListItemName.textContent = data[i].title;
        gameListItemName.href = data[i].game_url;
        gameListItemName.setAttribute("target", "blank");
        gameListItemName.classList.add("result-name");

        // append link to div
        gameListItem.appendChild(gameListItemName);

        // add description for each result
        var gameListItemDescr = document.createElement("p");
        gameListItemDescr.textContent = data[i].short_description;
        gameListItemDescr.classList.add("result-description");

        // append description to div
        gameListItem.appendChild(gameListItemDescr);

        // create thumbnail for each result
        var gameListItemImg = document.createElement("img");
        gameListItemImg.src = data[i].thumbnail;
        gameListItemImg.classList.add("result-thumbnail");

        // append thumbnail to div
        gameListItem.appendChild(gameListItemImg);

        // append result to results section
        gameResults.append(gameListItem);
    }
}; 

$("#game-search-button").click(function() {
    // clear previous results
    $("#game-results").empty();

    var gamePlatform = $("#game-platform").val();
    var gameCategory = $("#game-category").val();
    var gameNumber = $("#game-number").val();

    getGames(gamePlatform, gameCategory, gameNumber);
});