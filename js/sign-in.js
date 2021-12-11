$(document).ready(function () {

    // Importación de datos con JSON

    const usersInput = "data/users.json";

    $.getJSON(usersInput, function (answer, status) {

        const usersData = answer
        if (status === "success") {
            // Push a la consola para confirmar la importación
            console.log("Data loaded ok");
        }

    // Acción de hacer click en el botón

    $('#login-btn').on('click', function (e){
        e.preventDefault();
        // Verifica si es usuario de la plataforma

        isUser()
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
            let errorBox = $('.form-error')

            errorBox.html('Alguno de los datos ingresados no es correcto o está incompleto.')

        }
    })


});
