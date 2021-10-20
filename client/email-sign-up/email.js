/**************************** SERVER CONNECTION CHECK ****************************/

$("body").mouseup(() => { 
    
    fetch("/check/connection")

        .then(response => response.text())

        .catch(err => {

            console.log(err);
            alert("Server Disconnected, Please Re-connect!");

        });

});