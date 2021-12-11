// Constructor de usuarios

const usersList = []

function User (userName, userLastName, userEmail, userPassword, userCompany){
    this.userName = userName
    this.userLastName = userLastName
    this.userEmail = userEmail
    this.userPassword = userPassword
    this.userCompany = userCompany
}

// Función que crea un usuario usando el Constructor

function createUser(){
    let newUser = new User(userName.value, userLastName.value, userEmail.value, userPassword.value, userCompany.value)
    usersList.push(newUser);
    usersJSON = JSON.stringify(usersList);
    localStorage.setItem('Users', usersJSON);
}

// Capturas del Formulario

const form = document.getElementById('createAccountForm')
const userName = document.getElementById('inputName')
const userLastName = document.getElementById('inputLastName')
const userEmail = document.getElementById('inputEmail')
const userPassword = document.getElementById('inputPassword')
const userPassword2 = document.getElementById('inputPassword2')
const userCompany = document.getElementById('inputCompany')

// Listener del formulario
form.addEventListener('submit', e =>{
    e.preventDefault()
    validateInputs()

})

//Función que marca error en el formulario
function setError(element, message){
    const inputControl = element.parentElement
    const errorDisplay = inputControl.querySelector('.form-error')

    errorDisplay.innerHTML = `<p class="error-message">${message}</p>`
    inputControl.classList.add('form-error')
    inputControl.classList.remove('success')
}

// Función que marca el campo aceptado en el formulario
function setSuccess(element){
    const inputControl = element.parentElement
    const errorDisplay = inputControl.querySelector('.form-error')

    errorDisplay.innerHTML = ''
    inputControl.classList.add('success')
    inputControl.classList.remove('form-error')
}

// Función que valida que el email sea real

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//Función que valida los ingresos del usuario

function validateInputs(){
    const userNameValue = userName.value.trim()
    const userLastNameValue = userLastName.value.trim()
    const userEmailValue = userEmail.value.trim()
    const userPasswordValue = userPassword.value.trim()
    const userPasswordValue2 = userPassword2.value.trim()
    const userCompanyValue = userCompany.value.trim()

    if (userNameValue === '') {
        setError(userName, 'Por favor, ingresá un nombre')
    }
    else{
        setSuccess(userName)
    }

    if (userLastNameValue === '') {
        setError(userLastName, 'Por favor, ingresá un apellido')
    }
    else{
        setSuccess(userLastName)
    }

    if (userEmailValue === ''){
        setError(userEmail, 'Por favor, ingresá una dirección de email')
    }
    else if(!isValidEmail(userEmailValue)){
        setError(userEmail, 'Por favor, ingresá una dirección de email válida')
    }
    else{
        setSuccess(userEmail)
    }

    if (userPasswordValue === '') {
        setError(userPassword, 'Por favor, ingresá una contraseña')
    }
    else if (userPasswordValue.length < 6){
        setError(userPassword, 'Por favor, ingresá una contraseña que tenga al menos 6 caracteres')
    }
    else{
        setSuccess(userPassword)
    }

    if (userPasswordValue2 === ''){
        setError(userPassword2, 'Por favor, volvé a ingresar tu contraseña')
    }
    else if (userPasswordValue2 !== userPasswordValue){
        setError(userPassword2, 'Las contraseñas no coinciden.')
    }
    else{
        setSuccess(userPassword2)
    }

    if (userCompanyValue === '') {
        setError(userCompany, 'Por favor, ingresá el nombre de tu empresa')
    }
    else{
        setSuccess(userCompany)
    }
    if(userNameValue !== '' && userLastNameValue !== '' && userEmailValue !== '' && userCompanyValue !== '' && userPasswordValue !== '') {
        createUser()
        location.assign("first-steps.html")
    }

}