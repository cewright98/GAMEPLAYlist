var getGames = function(platform, sort, category) {
    //console.log(platform);
    //console.log(sort);
    //console.log(category);

    // format api url
    var apiUrl = "https://www.freetogame.com/api/games?sort-by=" + sort + "&category=" + category;

    if (platform !== "all") {
        apiUrl = apiUrl + "&platform=" + platform;
    }

    // add proxy to resolve CORS error
    apiUrl = "https://cors-anywhere.herokuapp.com/" + apiUrl;

    // fetch api url
    fetch(apiUrl, {}).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                loadGames(data);
            });
        }
    });
};

var loadGames = function(data) {
    // load ten games from data
    for (var i = 0; i < 10; i++) {
        // get random game from data
        gameIndex = Math.floor(Math.random() * data.length);

        // create div for each result
        var gameListItem = document.createElement("div");
        gameListItem.classList.add("result-container");

        // create link for each result
        var gameListItemName = document.createElement("a");
        gameListItemName.textContent = data[gameIndex].title;
        gameListItemName.href = data[gameIndex].game_url;
        gameListItemName.setAttribute("target", "blank");
        gameListItemName.classList.add("result-name");

        // append link to div
        gameListItem.appendChild(gameListItemName);

        // add description for each result
        var gameListItemDescr = document.createElement("p");
        gameListItemDescr.textContent = data[gameIndex].short_description;
        gameListItemDescr.classList.add("result-description");

        // append description to div
        gameListItem.appendChild(gameListItemDescr);

        // create thumbnail for each result
        var gameListItemImg = document.createElement("img");
        gameListItemImg.src = data[gameIndex].thumbnail;
        gameListItemImg.classList.add("result-thumbnail");

        // append thumbnail to div
        gameListItem.appendChild(gameListItemImg);

        // append result to results section
        $("#game-results").append(gameListItem);
    }
}; 

$("#game-search-button").click(function() {
    var gamePlatform = $("#game-platform").val();
    var gameSort = $("#game-sort").val();
    var gameCategory = $("#game-category").val();

    getGames(gamePlatform, gameSort, gameCategory);
});