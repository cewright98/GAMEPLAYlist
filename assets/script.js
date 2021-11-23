var getGames = function(platform, sort, category) {
    //console.log(platform);
    //console.log(sort);
    //console.log(category);

    // format api url
    var apiUrl = "https://www.freetogame.com/api/games?sort-by=" + sort + "&category=" + category;

    if (platform !== "all") {
        apiUrl = apiUrl + "&platform=" + platform;
    }

    apiUrl = "https://cors-anywhere.herokuapp.com/" + apiUrl;

    // fetch api url
    fetch(apiUrl, {}).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            });
        }
    });
};

$("#game-search-button").click(function() {
    var gamePlatform = $("#game-platform").val();
    var gameSort = $("#game-sort").val();
    var gameCategory = $("#game-category").val();

    getGames(gamePlatform, gameSort, gameCategory);
});