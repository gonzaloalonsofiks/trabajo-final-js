$(document).ready(function () {
    /****************
    *
    *  Ubicaciones
    *
    ****************/
    
    // Array de locaciones geográficas cubiertas por la app
    
    const locationsArray = ["Nuñez", "Saavedra", "Belgrano", "Colegiales", "Coghlan", "Villa Urquiza", "Palermo", "Villa Ortúzar", "Villa Pueyrredón", "Chacarita", "Villa Crespo", "Recoleta", "Retiro", "Parque Chas", "Agronomía", "Paternal"]
    
    // Agregar elementos nuevos al array (método PUSH)
    
    locationsArray.push("Almagro", "Balvanera", "San Nicolás", "Montserrat", "Puerto Madero", "La Boca")
    
    //Ordena alfabéticamente las ubicaciones
    
    locationsArray.sort()
    
    // Publica en el HTML la lista de ubicaciones (en la sección #FAQ)
    
    if (locationsArray.length > 0){
        
        $('#available-locations').append(
            `En este momento, tenemos cobertura en ${locationsArray.length} barrios de la Ciudad de Buenos Aires.
            <ul id="locations-list">
            </ul>
            `
        )
    
        $(locationsArray).each((index, location) => {
            $('#locations-list').append(`<li>${location}</li>`);
            });
    }
    else{
        availableLocationsContainer.html(`En este momento, no tenemos barrios disponibles en la Ciudad de Buenos Aires.`)
    }

    /****************
    *
    *  Servicios
    *
    ****************/
    
    // Array de servicios disponibles

    const servicesArray = [
        {
            "service_name": "Colecta",
            "service_description": `Retiramos los ventas desde tu local o depósito y los llevamos al punto <span class="pickapp">Pickapp</span> que tus clientes seleccionaron al momento de comprar.`,
            "service_img": "./img/colecta.png"
        }, 
        {
            "service_name": "Dashboard",
            "service_description": `Tendrás acceso a nuestro dashboard en tiempo real para saber el estado de cada pedido, y estadísticas básicas de tus ventas.`,
            "service_img": "./img/dashboard.png"
        },
        {
            "service_name": "Encuestas de satisfacción",
            "service_description": `Al retirar su pedido en un punto <span class="pickapp">Pickapp</span>, tus clientes podrán completar una encuesta para conocer su nivel de satisfacción con su pedido.`,
            "service_img": "./img/survey.png"
        }
    ]

    // Publicar en el HTML los servicios disponibles
    
    $.each(servicesArray, function (index, service) { 
        $('#service-container').append(
            `
            <div class="col-4">
                <div class="card mb-4 shadow">
                  <img src="${service.service_img}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${service.service_name}</h5>
                    <p class="card-text">${service.service_description}</p>
                  </div>
                </div>
              </div>
            `
        );         
    });
});

