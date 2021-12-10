$(document).ready(function () {

    // Importación de datos con JSON

    const usersInput = "data/users.json";

    $.getJSON(usersInput, function (answer, status) {

        const usersData = answer
        if (status === "success") {
            // Chequeo por consola que lo haya importado (hasta ahí OK, por eso no lo muestro)
            //console.log(usersData);
        }

    // Acción de hacer click en el botón

    $('#login-btn').on('click', function (e){
        e.preventDefault();
        isUser() //Verifica si está en la "base de datos (JSON)
        })

        function isUser(){
            const email = $('#emailLogin').val()
            const password = $('#passwordLogin').val()

            for (i = 0; i < usersData.length; i++) {
                if (email === usersData[i].userEmail && password === usersData[i].userPassword) {
                    let userData = JSON.stringify(usersData[i])
                    localStorage.setItem('loggedUser', userData)
                    location.assign("dashboard.html")
                    return
                }
            }
            alert("Error")

        }
    })



});
