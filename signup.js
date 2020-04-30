const emailInput = document.getElementById('signup-email');
const passwordInput = document.getElementById('signup-password');
const signupBtn = document.getElementById('signup-btn');
const emailInputLogin = document.getElementById('login-email');
const passwordInputLogin = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');

const auth = firebase.auth();

signupBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    if(emailInput.value !== "" && passwordInput.value!== ""){
        const email = emailInput.value;
        const password = passwordInput.value;

        auth.createUserWithEmailAndPassword(email, password)
        .then(() =>{
            clearSignupInputs();
            showAlert("You have been sucesfully signed up!", "success");
        })
        .catch(err =>{
            showAlert(`An Error has Occured: ${err.message}`, 'warning');
        })
    }else{
        showAlert("Fields are empty, please fill out all fields", 'warning')
    }
})


loginBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    if(emailInputLogin.value !== "" && passwordInputLogin.value!== ""){
        const email = emailInputLogin.value;
        const password = passwordInputLogin.value;

        auth.signInWithEmailAndPassword(email, password)
        .then(() =>{
            clearLoginInputs();
            showAlert("You have been sucesfully Logged In!", "success");
            window.location.href = "blogs.html";
        })
        .catch(err =>{
            showAlert(`An Error has Occured:${err.message}`, 'warning');
        })
    }else{
        showAlert("Fields are empty, please fill out all fields", 'warning')
    }
})

function clearLoginInputs(){
    emailInputLogin.value = "";
    passwordInputLogin.value = "";
}

function clearSignupInputs(){
    passwordInput.value = "";
    emailInput.value = "";
}

function showAlert(message, className){
    const alert = document.createElement('div');
    const body = document.querySelector('.main');
    const main = document.querySelector('.login-signup');

    if(className === "warning"){
        alert.className = "container #d32f2f red darken-2 center warning alert"
    }

    if(className === "success"){
        alert.className = "container #00c853 green accent-4 center success alert"
    }

    alert.innerHTML = `
        <span class="paragraph">${message}</span>
    `;

    if(document.querySelector('.alert') === null){
        body.insertBefore(alert, main);
        setTimeout(() =>{
            alert.remove();   
        }, 3000);
    }
}