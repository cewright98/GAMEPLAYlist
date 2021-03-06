var gameResults = document.querySelector("#game-results");
var musicResults = document.querySelector("#music-results");
var keywordDatalist = document.querySelector("#keyword-datalist");
var inputOptionIndex = 0;
var gameCategory = "";
var loadingSignal = document.querySelector("#loading-signal");

var getGames = function(platform, category, number) {
    // format api url
    var gameApiUrl = "https://www.freetogame.com/api/games?category=" + category;

    if (platform !== "all") {
        gameApiUrl = gameApiUrl + "&platform=" + platform;
    }

    // add proxy to resolve CORS error
    gameApiUrl = "https://api.allorigins.win/raw?url=" + gameApiUrl;

    // fetch api url
    fetch(gameApiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                //console.log(data);
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
        gameListItemName.setAttribute("target", "_blank");
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

    // remove loading signal
    loadingSignal.classList.add("hidden")
}; 

var loadMusic = function(data) {
    // check for data length
    if (data.length < 10) {
        var resultLength = data.data.length;
    } else {
        resultLength = 10;
    }
    // load playlists from data
    for (var i = 0; i < resultLength; i++) {
        // create div for each result
        var musicListItem = document.createElement("div");
        musicListItem.classList.add("result-container");

        // create link for each result
        var musicListItemName = document.createElement("a");
        musicListItemName.textContent = data.data[i].title;
        musicListItemName.href = data.data[i].link;
        musicListItemName.setAttribute("target", "_blank");
        musicListItemName.classList.add("result-name");

        // append link to div
        musicListItem.appendChild(musicListItemName);

        // add number of tracks for each result
        var musicListItemNum = document.createElement("p");
        musicListItemNum.textContent = "Number of tracks: " + data.data[i].nb_tracks;
        musicListItemNum.classList.add("result-description");

        // append number of tracks to div
        musicListItem.appendChild(musicListItemNum);

        // create thumbnail for each result
        var musicListItemImg = document.createElement("img");
        musicListItemImg.src = data.data[i].picture;
        musicListItemImg.classList.add("result-thumbnail");

        // append thumbnail to div
        musicListItem.appendChild(musicListItemImg);

        // append result to results section
        musicResults.append(musicListItem);
    }

    // remove loading signal
    loadingSignal.classList.add("hidden")
};

var getMusic = function (keyword) {
    var musicApiUrl = "https://api.deezer.com/search/playlist?q=" + keyword;

    musicApiUrl = "https://api.allorigins.win/raw?url=" + musicApiUrl;
    
    fetch(musicApiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                //console.log(data);
                loadMusic(data);
            });
        }
    });
};

var addInputOption = function(keyword) {
    var createDatalistEl = true;
    for (var i = 0; i < inputOptionIndex; i++) {
        if (localStorage.getItem(i) === keyword) {
            createDatalistEl = false;
        }
    }

    if (createDatalistEl) {
        localStorage.setItem(inputOptionIndex, keyword);
        localStorage.setItem("index", inputOptionIndex);
        loadDatalist();
    }
};

var loadDatalist = function() {
    inputOptionIndex = localStorage.getItem("index");
    var str = "";
    for (var i = 0; i <= inputOptionIndex; i++) {
        if (localStorage.getItem(i)) {
            str += "<option value='" + localStorage.getItem(i) + "'>";
        }
    }
    keywordDatalist.innerHTML = str;
    inputOptionIndex++;
};

$("#game-search-button").click(function() {
    // clear previous results
    $("#game-results").empty();
    $("#music-results").empty();

    // show loading signal
    loadingSignal.classList.remove("hidden")

    var gamePlatform = $("#game-platform").val();
    gameCategory = $("#game-category").val();
    var gameNumber = $("#game-number").val();

    getGames(gamePlatform, gameCategory, gameNumber);
});

$("#music-keyword-search").click(function() {
    // clear previous results
    $("#music-results").empty();

    if ($("#music-keyword").val()) {
        var musicKeyword = $("#music-keyword").val();

        // clear text box
        var musicKeywordInput = document.querySelector("#music-keyword");
        musicKeywordInput.value = "";

        // show loading signal
        loadingSignal.classList.remove("hidden")
    
        addInputOption(musicKeyword);
    
        getMusic(musicKeyword);
    } else {
      musicResults.textContent = "Please enter a keyword to search!";
    }
});

$("#music-random-search").click(function() {
    // clear previous results
    $("#music-results").empty();

    var musicKeyword = "";

    if (!gameCategory) {
        musicResults.textContent = "Please search for a game first!";
    } else {
      // show loading signal
      loadingSignal.classList.remove("hidden")

        switch(gameCategory) {
            case "action": 
                musicKeyword = "banger";
                break;
            case "anime": 
                musicKeyword = "k-pop";
                break;
            case "battle-royale": 
                musicKeyword = "instrumental";
                break;
            case "card": 
                musicKeyword = "jazz";
                break;
            case "fantasy": 
                musicKeyword = "orchestra";
                break;
            case "fighting": 
                musicKeyword = "fight";
                break;
            case "horror": 
                musicKeyword = "scary";
                break;
            case "open-world": 
                musicKeyword = "ethereal";
                break;
            case "racing": 
                musicKeyword = "pop";
                break;
            case "shooter": 
                musicKeyword = "rap";
                break;
            case "space": 
                musicKeyword = "space";
                break;
            case "sports": 
                musicKeyword = "motivation";
                break;
            case "strategy": 
                musicKeyword = "classical";
                break;
            case "survival": 
                musicKeyword = "intense";
                break;
            case "zombie": 
                musicKeyword = "spooky";
                break;
        }
        
        getMusic(musicKeyword);
    }
});

loadDatalist();