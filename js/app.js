/*  App js */
let getUsername = localStorage.getItem('username');
if(getUsername){
    location.href = 'matir-bank.html';
}
/* 1. login credentials test and work with login page  */
const formInner = document.querySelector(".form-inner"),
    emailInput = formInner.querySelector("[type='email']"),
    passwordInput = formInner.querySelector("[type='password']"),
    errorWrapper = document.querySelector(".toast");

function isCredentialTrue() {

    if (emailInput.value === '' || passwordInput.value === '') {
        errorWrapper.querySelector('span').innerText = 'All fields are required.';
        isError()
    } else if (emailInput.value === 'ashik@gmail.com' && passwordInput.value === 'ashik###') {
        location.href = 'matir-bank.html';
        let setUsername = localStorage.setItem('username', emailInput.value);
    } else {
        errorWrapper.querySelector('span').innerText = 'Wrong Credentials.';
        isError()

    }

};
document.getElementById('login-button').addEventListener('click', isCredentialTrue);

/* 2. Error hide & automatically showing function  */
function isError() {
    emailInput.style.borderColor = 'red';
    passwordInput.style.borderColor = 'red';
    emailInput.previousElementSibling.style.color = 'red';
    passwordInput.previousElementSibling.style.color = 'red';
    errorWrapper.classList.add('show');
    emailInput.value = '';
    passwordInput.value = '';
    setTimeout(() => {
        errorWrapper.classList.remove('show');
    }, 5000);
}



