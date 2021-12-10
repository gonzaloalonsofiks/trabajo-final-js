$(document).ready(function(){
const dataInput = "data/dashboard_orders_1.json"

$.getJSON(dataInput, function (answer, status){
    if (status === "success"){
        $('#orders-table').append(`
            <table class="table table-sm table-hover">
            <thead>
                <th scope="col">Orden</th>
                <th scope="col">Tracking</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Email</th>
                <th scope="col" class="no-wrap">ID Comercio</th>
                <th scope="col">Comercio</th>
                <th scope="col">Dirección</th>
                <th scope="col" id="order-status">Estado</th>
                <th scope="col">Actualizado</th>
            </thead>
                <tbody id="table-content">
                </tbody>
            </table>
        `)
    }

    if (status  = "success"){
        let userData = answer;
        for (const order of userData) {
            $('#table-content').append(
                `<tr scope="row">
                    <td>${order.order_id}</td>
                    <td class="no-wrap">${order.order_tracking}</td>
                    <td>${order.first_name}</td>
                    <td>${order.last_name}</td>
                    <td>${order.email}</td>
                    <td>${order.location_id}</td>
                    <td>${order.location_name}</td>
                    <td>${order.location_address}</td>
                    <td>${order.order_status}</td>
                    <td>${order.date}</td>
                </tr>

                `
            )
        }
    }

})

let userInfo = localStorage.getItem('loggedUser')
let userInfoParsed = JSON.parse(userInfo)
let userNameDisplay = userInfoParsed.userName
let userCompanyDisplay = userInfoParsed.userCompany

$('#user-name').text(userNameDisplay)
$('#companyName').text(userCompanyDisplay)

// Función que setea el color de los estados del envío
let orderStatusValue = $('#order-status').val()

function setColorCoding(element, color){
    const statusContainer = element.parentElement
    const colorDisplay = statusContainer.querySelector('#order-status')

    colorDisplay.addClass(color)
}

if (orderStatusValue === "En espera"){
    setColorCoding('waiting')
}
else if (orderStatusValue === "Retirado"){
    setColorCoding('pickedup')
}
else if(orderStatusValue === "Devuelto")
{
    setColorCoding('returned')
}});