$(document).ready(function () {
    /***********
    *
    *  Planes
    *
    ***********/
    
    // Función constructora de un plan
    
    function Plan (id, planName, planMinQuantity, planMaxQuantity, planPrice, planAudience){
        this.id = id;
        this.planName = planName;
        this.planMinQuantity = planMinQuantity;
        this.planMaxQuantity = planMaxQuantity;
        this.planPrice = planPrice;
        this.planAudience = planAudience;
    }
    
    // Planes creados usando el constructor
    
    const planA = new Plan(1, "Plan A", 1, 30, 400, "principiantes")
    const planB = new Plan(2, "Plan B", 31, 100, 380, "pequeñas empresas")
    const planC = new Plan(3, "Plan C", 101, 250, 360, "empresas en desarrollo") 
    
    /***********
    *
    *  Clientes
    *
    ***********/
    
    // Función creadora de un posible cliente (para uso futuro)
    
    function Lead (leadName, leadLastName, leadEmail, leadCompany, leadPlatform, leadAvgOrders){
        this.leadName = leadName;
        this.leadLastName = leadLastName;
        this.leadEmail = leadEmail;
        this.leadCompany = leadCompany;
        this.leadPlatform = leadPlatform;
        this.leadAvgOrders = leadAvgOrders;
    }

    /***********
     *
     *  Funciones básicas de cotización
     *
     ***********/
    
    // Función que calcula el precio final (con IVA incluido)
    
    function addIVA(planPrice){
        return planPrice * 1.21
    }
    
    // Función que calcula el subtotal
    
    function subtotal(plan){
        let subtotal = $('#orders').val() * plan.planPrice
        subtotal = addIVA(subtotal)
        return subtotal
    }
    
    // Función que convierte los precios a formato $X.XXX 
    function numberToPrice(number){
        let nonDecimalNumber = {maximumFractionDigits: 0}
        result = number.toLocaleString('es', nonDecimalNumber)
        return result
    }
    
    /***********
     *
     *  Funciones del formulario
     *
     ***********/
    
    // Función que calcula el monto del plan mensualmente en función a la cantidad de envíos
    
    function estimatePlan(){    
        let inputOrders = $('#orders').val()
        if (inputOrders != "") {
            if (inputOrders >= planA.planMinQuantity && inputOrders <= planA.planMaxQuantity){
                let subTotalPlan = numberToPrice(subtotal(planA))
                createQuoteBox(planA, planA.planAudience, subTotalPlan, planA.planPrice)
                upgradeDelta()
            }
            else if (inputOrders >= planB.planMinQuantity && inputOrders <= planB.planMaxQuantity){
                let subTotalPlan = numberToPrice(subtotal(planB))
                createQuoteBox(planB, planB.planAudience, subTotalPlan, planB.planPrice)
                upgradeDelta()
            }
            else if (inputOrders >= planC.planMinQuantity && inputOrders <= planC.planMaxQuantity){
                let subTotalPlan = numberToPrice(subtotal(planC))
                createQuoteBox(planC, planC.planAudience, subTotalPlan, planC.planPrice)
                upgradeDelta()
            }
            else if (inputOrders > planC.planMaxQuantity){
                createAlertMessage("No podemos cotizar esa cantidad. Ponete en contacto con nosotros.")
            }
            else{
                createErrorMessage("Deberías ingresar un número mayor que 0 para cotizar tu plan.")
            }
        }
        else{
            createErrorMessage("Es necesario ingresar el número de pedidos.")
        }   
    }
    
    // Función que crea un cuadro de error
    function createErrorMessage(errorType){
        $('#answer').html(
            `
            <div class="alert alert-danger" role="alert">
            Error:  ${errorType}
            </div>
            `
        );
    }
    
    // Función que crea un cuadro de alerta
    
    function createAlertMessage(errorType){
        $('#answer').html(
            `
            <div class="alert alert-warning" role="alert">
            ¡Ups! ${errorType}
            </div>
            `
        );
    }
    
    // Función que crea el cuadro de cotización
    $('#estimate-form').append(
        `<div id="answer"></div>`
    );
    
    function createQuoteBox(plan, companyType, totalPrice, singlePrice){
        $('#answer').html(
            `
            <div class="card card-quote" style="width: 18rem;">
            <div class="card-header">
            Plan recomendado
            </div>
            <div class="card-body">
            <h5 class="card-title">${plan.planName}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Nuestra opción para ${companyType}.</h6>
            <p class="card-text">Pagarías un total de $${totalPrice}, es decir, $${singlePrice} + IVA por envío.</p>
            <a href="/create-account.html" class="btn btn-primary">Empezá ahora</a>
            </div>
            </div>
            `
        );
    }

    // Función que agrega un box que calcula el mejor precio

    $('#answer').mouseover(function () { 
        $('#card-side')
        .delay(500)
        .fadeIn(700)
    });

    function createUpgradeBox(deltaOrders, bestPrice) {
        $('#answer').append(
            `
            <div id="card-side"></div>
            `
        );
        $('#card-side').html(
            `
            <div class="card card-quote" style="width: 18rem;">
            <div class="card-header">
            ¿Querés el mejor precio?
            </div>
            <div class="card-body">
            <p class="card-text">Te faltan ${deltaOrders} órdenes para alcanzar nuestra tarifa más barata, de $${bestPrice} + IVA por envío.</p>
            <p class="card-text">No te preocupes, siempre pagarás el mejor precio para tu plan. Actualizaremos automáticamente tu plan en función a la cantidad de órdenes que tu empresa tenga por mes.</p>
            </div>
            </div>
            ` 
        );
    }

    function createBestDealBox(bestPrice) {
        $('#answer').append(
            `
            <div id="card-side"></div>
            `
        );
        $('#card-side').html(
            `
            <div class="card card-quote" style="width: 18rem;">
            <div class="card-header">
            El mejor precio
            </div>
            <div class="card-body">
            <p class="card-text">Ya estás pagando $${bestPrice} + IVA por envío, ¡nuestra mejor tarifa!</p>
            <p class="card-text">No te preocupes, siempre pagarás el mejor precio para tu plan. Si tenés menos ventas, actualizaremos automáticamente tu plan en función a la cantidad de órdenes que tu empresa tenga por mes.</p>
            </div>
            </div>
            ` 
        );
    }

    function upgradeDelta(i) {
        i = $('#orders').val()
        let deltaOrders = planC.planMaxQuantity - i
        if (i <= planC.planMinQuantity){
            createUpgradeBox(deltaOrders, planC.planPrice)
        }
        else{
            createBestDealBox(planC.planPrice)
        }
    }

    //Función que valida el formulario
    function validateForm() {
        let fname = $('#fname').val()
        let lname = $('#lname').val()
        let email = $('#email').val()
        let company = $('#company').val()
        if(fname == "" || lname == "" || email == "" || company ==""){
            createErrorMessage("Faltan completar datos")
            fname.focus
            lname.focus
            email.focus
            company.focus
            return false
        }
    }
    
    // Listener del formulario

    $('#submitForm').on('click', function submitResults(e) {
        e.preventDefault()
        estimatePlan()
        validateForm()
    });
});
