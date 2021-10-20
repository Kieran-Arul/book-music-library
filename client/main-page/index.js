/**************************** SERVER CONNECTION CHECK ****************************/

$("body").mouseup(() => { 
    
    fetch("/check/connection")

        .then(response => response.text())

        .catch(err => {

            console.log(err);
            alert("Server Disconnected, Please Re-connect!");

        });

});

/***************************************** READ AND PLAY BUTTONS *****************************************/

$(document).ready(() => {

    $("body").on("click", ".entity-interaction-btn", event => {
        
        $(event.target).fadeOut(100).fadeIn(100);

        // Obtains the class list of the clicked button
        let clickedElementClassList = event.target.classList;

        // If the clicked button was the email sign up one
        if (clickedElementClassList.contains("read-book-btn")) {
            
            setTimeout(function () {
                alert("Opening book..."); 
            }, 1000);

        // If the clicked button was one of the download buttons
        } else if (clickedElementClassList.contains("play-song-btn")) {
            
            setTimeout(function () {
                alert("Loading song..."); 
            }, 1000);

        // Error case
        } else {

            console.log(event.target);

        }

    });

});

/********************************* BOOK GENRE DROPDOWN ANCHOR TAGS *********************************/

// Callback function to display library contents of chosen book genre

// Ensures we do not make multiple fetch requests if a user clicks a genre more than once
let bookGenreClickCount = {

    "classic": 0,
    "mystery": 0,
    "romance": 0,
    "scifi": 0

};

$(".book-genre-option").click(event => {

    // Removes the divider that initially separated the add entity form and the interaction carousell
    $(".interaction-form-divider").addClass("hidden-element");

    // Shows the book shelf
    $("#shelf").removeClass("hidden-element");

    // Ensures the music shelf is not visible
    $(".music-shelf").addClass("hidden-element");

    // Ensures the book shelf is visible
    $(".book-shelf").removeClass("hidden-element");
    
    // Establishes which book genre the user has chosen
    let chosenBookGenre = event.target.text.toLowerCase();

    switch (chosenBookGenre) {

        case "classic":

            // Hides all library listings of books that are not of the classic genre
            $(".mystery-book-genre").addClass("hidden-element");
            $(".romance-book-genre").addClass("hidden-element");
            $(".scifi-book-genre").addClass("hidden-element");
            $(".classic-book-genre").removeClass("hidden-element");

            break;

        case "mystery":
            
            // Hides all library listings of books that are not of the mystery genre
            $(".classic-book-genre").addClass("hidden-element");
            $(".romance-book-genre").addClass("hidden-element");
            $(".scifi-book-genre").addClass("hidden-element");
            $(".mystery-book-genre").removeClass("hidden-element");

            break;

        case "romance":
            
            // Hides all library listings of books that are not of the romance genre
            $(".classic-book-genre").addClass("hidden-element");
            $(".mystery-book-genre").addClass("hidden-element");
            $(".scifi-book-genre").addClass("hidden-element");
            $(".romance-book-genre").removeClass("hidden-element");

            break;
        
        case "scifi":
            
            // Hides all library listings of books that are not of the scifi genre
            $(".classic-book-genre").addClass("hidden-element");
            $(".romance-book-genre").addClass("hidden-element");
            $(".mystery-book-genre").addClass("hidden-element");
            $(".scifi-book-genre").removeClass("hidden-element");

            break;
    
        default:

            // Error case: If clicked book genre does not exist
            console.log(chosenBookGenre);

            break;

    }

    // Only fetches books of a specific genre once per page load
    if (bookGenreClickCount[chosenBookGenre] === 0) {

        fetch("/browse/books/" + chosenBookGenre)
                
        .then(response => response.json())

        .then(data => {

            data.forEach(book => {

                // Book Attributes
                let bookTitle = book.title;
                let bookAuthor = book.author;
                let bookYearPublished = book.yearPublished;
                let bookNumOfPages = book.numOfPages;
                let bookBlurb = book.blurb;

                // Book Object (Boostrap card)
                let bookItem = '<div class="col-lg-4 entity-box ' + chosenBookGenre + '-book-genre"><i class="fas fa-book fa-3x icon"></i><div class="card"><div class="card-header"><h3 class="object-title book-name">' + bookTitle + '</h3></div><div class="card-body"><p>Author: <span class="author">' + bookAuthor + '</span></p><p>Published: <span class="year-published">' + bookYearPublished + '</span></p><p>Pages: <span class="num-of-pages">' + bookNumOfPages + '</span></p><p>Blurb: <span class="blurb">' + bookBlurb + '</span></p><button type="button" class="btn btn-lg btn-dark w-100 entity-interaction-btn read-book-btn">Read</button></div></div></div>';

                // Adds on the each book object to the book shelf
                document.querySelector(".book-shelf").innerHTML += bookItem;

            });

        })

        .catch(error => console.log(error));

    }

    bookGenreClickCount[chosenBookGenre] += 1;

    event.preventDefault();
    
});

/********************************* MUSIC GENRE DROPDOWN ANCHOR TAGS *********************************/

// Callback function to display library contents of chosen music genre

// Ensures we do not make multiple fetch requests if a user clicks a genre more than once
let musicGenreClickCount = {

    "rock": 0,
    "pop": 0,
    "classical": 0,
    "rap": 0

};

$(".music-genre-option").click(event => {

    // Removes the divider that initially separated the add entity form and the interaction carousell
    $(".interaction-form-divider").addClass("hidden-element");

    // Shows the music shelf
    $("#shelf").removeClass("hidden-element");
    
    // Ensures the book shelf is not visible
    $(".book-shelf").addClass("hidden-element");

    // Ensures the music shelf is visible
    $(".music-shelf").removeClass("hidden-element");
    
    // Establishes which music genre the user has chosen
    let chosenMusicGenre = event.target.text.toLowerCase();

    switch (chosenMusicGenre) {

        case "rock":

            // Hides all library listings of music that are not of the rock genre
            $(".pop-music-genre").addClass("hidden-element");
            $(".classical-music-genre").addClass("hidden-element");
            $(".rap-music-genre").addClass("hidden-element");
            $(".rock-music-genre").removeClass("hidden-element");

            break;

        case "pop":
            
            // Hides all library listings of music that are not of the pop genre
            $(".rock-music-genre").addClass("hidden-element");
            $(".classical-music-genre").addClass("hidden-element");
            $(".rap-music-genre").addClass("hidden-element");
            $(".pop-music-genre").removeClass("hidden-element");

            break;

        case "classical":
            
            // Hides all library listings of music that are not of the classical genre
            $(".rock-music-genre").addClass("hidden-element");
            $(".pop-music-genre").addClass("hidden-element");
            $(".rap-music-genre").addClass("hidden-element");
            $(".classical-music-genre").removeClass("hidden-element");

            break;
        
        case "rap":
            
            // Hides all library listings of music that are not of the rap genre
            $(".rock-music-genre").addClass("hidden-element");
            $(".pop-music-genre").addClass("hidden-element");
            $(".classical-music-genre").addClass("hidden-element");
            $(".rap-music-genre").removeClass("hidden-element");

            break;
    
        default:

            // Error case: If clicked music genre does not exist
            console.log(chosenMusicGenre);

            break;

    }

    // Only fetches songs of a specific genre once per page load
    if (musicGenreClickCount[chosenMusicGenre] === 0) {

        fetch("/browse/music/" + chosenMusicGenre)
                
        .then(response => response.json())

        .then(data => {

            data.forEach(song => {

                // Book Attributes
                let songName = song.name;
                let songArtist = song.artist;
                let songYearReleased = song.yearReleased;
                let songDuration = song.duration;

                // Book Object (Boostrap card)
                let songItem = '<div class="col-lg-4 entity-box ' + chosenMusicGenre + '-music-genre"><i class="fas fa-music fa-3x icon"></i><div class="card"><div class="card-header"><h3 class="object-title song-name">' + songName + '</h3></div><div class="card-body"><p>Artist: <span class="artist">' + songArtist + '</span></p><p>Released: <span class="year-released">' + songYearReleased + '</span></p><p>Duration: <span class="duration">' + songDuration + '</span></p><button type="button" class="btn btn-lg btn-dark w-100 entity-interaction-btn play-song-btn">Play</button></div></div></div>';

                // Adds on the each book object to the book shelf
                document.querySelector(".music-shelf").innerHTML += songItem;

            });

        })

        .catch(error => console.log(error));

    }

    musicGenreClickCount[chosenMusicGenre] += 1;

    event.preventDefault();
    
});
