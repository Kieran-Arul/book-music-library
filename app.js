/******************* IMPORT SERVER-SIDE MODULES *******************/

const express = require("express");
const fs = require("fs");
const app = express();

/******************* MIDDLEWARE *******************/

// Middleware to parse POST requests
app.use(express.urlencoded({

    extended: true

}));

// Middleware to serve static files from the client directory
app.use(express.static("client"));

/******************* FUNCTIONS TO READ AND WRITE TO JSON FILES *******************/

// Reads the data from a specific JSON file
// Called when the user wants to see a particular entity in their library
function readJson(filepath) {
    
    let rawJsonData = fs.readFileSync(filepath);

    return JSON.parse(rawJsonData);

}

// Writes to JSON a specific JSON file
// Called when the user wants to add a new entity to their library
function writeToJson(filepath, genre, newData) {
    
    fs.readFile(filepath, "utf8", (error, data) => {

        if (error) {

            throw new Error("Error reading the file");

        } else {

            let currentJsonData = JSON.parse(data);
            currentJsonData[genre].push(newData);

            let newJsonData = JSON.stringify(currentJsonData, null, 2);

            fs.writeFile(filepath, newJsonData, "utf8", err => {

                if (err) {

                    throw new Error("Error writing to file");

                } else {

                    console.log("Successfully written to JSON file");

                }

            });

        }

    });

}

/******************* GET ROUTES *******************/

// Server connection check
app.get("/check/connection", (_, res) => {

    res.send("Connection Successful!");

});

// Handler for when the user goes to the homepage
app.get("/", (_, res) => {

    res.sendFile(__dirname + "/client/main-page/index.html");

});

// Handler for when the user goes to the email subscribe page
app.get("/signup", (_, res) => {

    res.sendFile(__dirname + "/client/email-sign-up/email.html");

});

// Handler for when the user wants to log in as an admin
app.get("/login", (_, res) => {

    res.sendFile(__dirname + "/client/admin-login/login.html");

});

// Handler for when the user wants to browse books of a specific genre
app.get("/browse/books/:genre", (req, res) => {

    let chosenBookGenre = req.params.genre;

    let bookData = readJson(__dirname + "/books.json");

    res.send(bookData[chosenBookGenre]);

});

// Handler for when the user wants to browse music of a specific genre
app.get("/browse/music/:genre", (req, res) => {

    let chosenMusicGenre = req.params.genre;

    let musicData = readJson(__dirname + "/music.json");

    res.send(musicData[chosenMusicGenre]);

});

// Handler for when an admin wants to see the user data
app.get("/admin/data", (_, res) => {

    let userData = readJson(__dirname + "/users.json");

    res.send(userData["users"]);

});

/******************* POST ROUTES *******************/

// Handler for when the user wants to add a new book to their library
app.post("/addbook", (req, res) => {

    let bookGenre = req.body.bookGenre.toLowerCase();
    let bookTitle = req.body.bookTitle;
    let bookAuthor = req.body.bookAuthor;
    let bookYearPublished = req.body.bookYearPublished;
    let bookNumOfPages = req.body.bookNumOfPages;
    let bookBlurb = req.body.bookBlurb;

    if (res.statusCode === 200) {

        let newBook = {

            "title": bookTitle,
            "author": bookAuthor,
            "yearPublished": bookYearPublished,
            "numOfPages": bookNumOfPages,
            "blurb": bookBlurb
    
        };
    
        writeToJson(__dirname + "/books.json", bookGenre, newBook);

        res.redirect("/");

    } else {

        res.sendStatus(404);

    }

});

// Handler for when the user wants to add a new song to their library
app.post("/addmusic", (req, res) => {

    const songGenre = req.body.songGenre.toLowerCase();
    const songName = req.body.songName;
    const songArtist = req.body.songArtist;
    const songYearReleased = req.body.songYearReleased;
    const songDuration = req.body.songDuration;

    if (res.statusCode === 200) {

        const newSong = {

            "name": songName,
            "artist": songArtist,
            "yearReleased": songYearReleased,
            "duration": songDuration
    
        };
    
        writeToJson(__dirname + "/music.json", songGenre, newSong);

        res.redirect("/");

    } else {

        res.sendStatus(404);

    }

});

// Handler for when the user submits their name and email details on the sign-up page
app.post("/signup", (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.userEmail;

    if (res.statusCode === 200) {

        const newUser = {

            "firstName": firstName,
            "lastName": lastName,
            "email": email
    
        };

        writeToJson(__dirname + "/users.json", "users", newUser);

        res.redirect("/");

    } else {

        res.sendFile(__dirname + "/client/email-sign-up/failure.html");

    }

});

// Handler for when the user clicks the go back button, occurs when error posting their name and email data
app.post("/failure", (_, res) => {

    res.redirect("/signup");

});

// Handler for when the user wants to log in as an admin
app.post("/login", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    if (username === "admin" && password === "admin") {

        res.sendFile(__dirname + "/client/admin-page/admin.html");

    } else {

        res.redirect("/login");

    }

});

/******************* MODULE EXPORTS *******************/

module.exports = app;