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
        if (clickedElementClassList.contains("generate-profile-btn")) {
            
            setTimeout(function () {
                alert("Generating User Profile..."); 
            }, 1000);


        // Error case
        } else {

            console.log(event.target);

        }

    });

});

/********************************* View User Data Button Event Listener *********************************/

// Callback function to display user data to an admin

$(".view-data-btn").click(event => {

    $("#user-data-shelf").removeClass("hidden-element");

    fetch("/admin/data")
                
        .then(response => response.json())

        .then(data => {

            let userNumber = 1;

            data.forEach(user => {

                console.log(user);

                // Book Attributes
                let firstName = user.firstName;
                let lastName = user.lastName;
                let email = user.email;

                // Book Object (Boostrap card)
                let eachUser = '<div class="col-lg-4 entity-box"><i class="fas fa-user fa-3x icon"></i><div class="card"><div class="card-header"><h3 class="object-title user-number"> User Number: ' + userNumber + '</h3></div><div class="card-body"><p>First Name: <span class="user-first-name">' + firstName + '</span></p><p>Last Name: <span class="user-last-name">' + lastName + '</span></p><p>Email: <span class="user-email">' + email + '</span></p><button type="button" class="btn btn-lg btn-dark w-100 entity-interaction-btn generate-profile-btn">Generate Profile</button></div></div></div>';

                // Adds on the each book object to the book shelf
                document.querySelector(".user-data").innerHTML += eachUser;

                userNumber += 1;

            });

        })

        .catch(error => console.log(error));
    
    location.href = "/login#user-data-shelf";

    event.preventDefault();
    
});
