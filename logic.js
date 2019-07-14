var zoomin = {}

zoomin.filmPictures = {
    "A New Hope": "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    "Attack of the Clones": "http://www.gstatic.com/tv/thumb/v22vodart/28914/p28914_v_v8_ab.jpg",
    "The Phantom Menace": "https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
    "Revenge of the Sith": "http://www.gstatic.com/tv/thumb/v22vodart/35273/p35273_v_v8_ac.jpg",
    "Return of the Jedi": "https://turkeyfestival.info/img/e5e6d19d7a0f56e3a23eee4b4aa96ff3.jpg",
    "The Empire Strikes Back": "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    "The Force Awakens": "https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_.jpg",
    "error": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
}

// adding films from api to html
zoomin.createFilms = function () {
    var filmContainer = $("#filmcontainer");
    // checking if there is something in the local storage
    if (localStorage.getItem("starwars") != null) {
        filmContainer.html(localStorage.getItem("starwars"));
        let films = $(".film");
        let favorites = $(".favorite");
        let totalMovies = films.length + favorites.length;
        for (let x = 0; x < totalMovies; x++) {
            $("#film" + x).click(zoomin.favorite);
        }
    }
    // if there is no local storage
    else{
        var films = $.getJSON('https://swapi.co/api/films/').done(function () {
            var filmArray = films.responseJSON.results;
            for (let i = 0; i < filmArray.length; i++) {
                let filmbox = $("<div>");
                let film = $("<div>");
                film.text(filmArray[i].title);
                let pic = $("<img>");
                pic.attr("src", zoomin.filmPictures[filmArray[i].title]);
                filmbox.attr("id", "film" + i);
                filmbox.attr("class", "film");
                filmbox.click(zoomin.favorite);
                filmbox.append(pic);
                filmbox.append(film);
                filmContainer.append(filmbox);
            }
        })
    }
}

// marking and unmarking films as favorite
zoomin.favorite = function (film) {
    if (film.target.parentElement.className == "film") {
        film.target.parentElement.classList.add("favorite");
        film.target.parentElement.classList.remove("film");
        var toBeSaved = document.getElementById("filmcontainer").innerHTML;
        localStorage.setItem("starwars", toBeSaved);
    }
    else if (film.target.parentElement.className == "favorite") {
        film.target.parentElement.classList.add("film");
        film.target.parentElement.classList.remove("favorite");
        var toBeSaved = document.getElementById("filmcontainer").innerHTML;
        localStorage.setItem("starwars", toBeSaved);
    }
}

// rendering the page
zoomin.createFilms();