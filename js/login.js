const signin = document.getElementById('sign-in-button');
const signup = document.getElementById('sign-up-button');

const login_form = document.getElementById('login-form');
const registeration_form = document.getElementById('registeration-form');

const pages = [document.getElementById('page1'),document.getElementById('page2'),document.getElementById('page3')];

const prev_button = document.getElementById('previous-button');
const next_button = document.getElementById('next-button');
const submit_button = document.getElementById('submit-button');

var current_page = 1;
function handleButtons(){
    prev_button.style.display = current_page > 1 ? 'block' : 'none';
    next_button.style.display = current_page < 3 ? 'block' : 'none';
    submit_button.style.display = current_page === 3 ? 'block' : 'none';
}

function toggleFormVisibility(formToShow,formToHide){
    formToShow.style.display = 'flex';
    formToHide.style.display = 'none';
}

signin.addEventListener('click',()=>toggleFormVisibility(login_form,registeration_form));
signup.addEventListener('click',()=>toggleFormVisibility(registeration_form,login_form));
prev_button.addEventListener('click',()=>goToPage(current_page-1));
next_button.addEventListener('click',()=>getInputs(current_page));
submit_button.addEventListener('click',()=>{return getInputs(current_page)});


//Login form

const show_password = document.getElementById('show-password');
const username = document.getElementById('user-name');
const password = document.getElementById('password');

const uname_warn = document.getElementById('uname_warn');
const pw_warn = document.getElementById('pw_warn');
const login_response = document.getElementById('login-response-message');

show_password.addEventListener('click',()=>{
    if(show_password.checked){
        password.type = 'text';
    }
    else{
        password.type = 'password';
    }
});

var userCredentials = {
    username : '',
    password : ''
}

function getConfig(key){
    return new Promise((resolve,reject)=>{
        $.getJSON("config.json",function(url){
            if(url && url[key]) resolve(url[key]);
            else reject('Domain not found');
        }).fail(function(){
            reject("Couldn't load config.json");
            loading(false);
        });
    });
}

function validateLoginForm(){
    uname_warn.innerText = "This field is required!";
    uname_warn.style.visibility = userCredentials.username === '' ? 'visible' : 'hidden';
    pw_warn.innerText = "This field is required!";
    pw_warn.style.visibility = userCredentials.password === '' ? 'visible' : 'hidden';
    if(userCredentials.username === '' || userCredentials.password === ''){
        loading(false);
        return false;
    }
    return true;
}
async function encrypt(val){
    const encrypted_value = CryptoJS.AES.encrypt(val,await getConfig('secret')).toString();
    return encrypted_value;
}
function login(){
    loading(true);
    userCredentials.username = username.value;
    userCredentials.password = password.value;
    if(validateLoginForm()){
        $(document).ready(async function(){
            $.ajax({
                method:"POST",
                url:await getConfig('domain')+"php/login.php",
                data:userCredentials,
                success:async function(res){
                    if(res === "Invalid password"){
                        pw_warn.innerText = "Invalid password!";
                        pw_warn.style.visibility = 'visible';
                    }
                    else if(res === "User not found"){
                        uname_warn.innerText = "User not found!";
                        uname_warn.style.visibility = 'visible'
                    }
                    else if(res === "Couldn't reach the servers!"){
                        login_response.innerText = "Couldn't reach the servers!";
                        login_response.style.visibility = 'visible';
                    }
                    else{
                        const date = new Date();
                        date.setTime(date.getTime()+(1*60*60*1000));
                        const expires = "expires="+date.toUTCString();
                        var cookieName = "user";
                        if(userCredentials.username === await getConfig('admin')){cookieName = "admin"};
                        const encryptedName = await encrypt(userCredentials.username);
                        document.cookie = (`${cookieName}=`+encryptedName+";"+expires+";path=/");
                        if(userCredentials.username === await getConfig('admin')){
                            window.location.replace('/adminpanel.html');
                            window.history.replaceState(null,null,'/adminpanel.html');
                            return;
                        }
                        window.location.replace('/profile.html');
                        window.history.replaceState(null,null,'/profile.html');
                    }
                    loading(false);
                },
                error:function(error){
                    console.log(error);
                    login_response.innerText = "Something went wrong!";
                    login_response.style.visibility = 'visible';
                    loading(false);
                }
            });
        })
    }
    return false;
}
// Registration form

const response_message = document.getElementById('registeration-response');
const fullname_warn = document.getElementById('fname-warn');
const contact_warn = document.getElementById('contact-warn');
const email_warn = document.getElementById('email-warn');
const username_warn = document.getElementById('username-warn');
const password_warn = document.getElementById('password-warn');
const confirm_password_warn = document.getElementById('con-pass-warn');

var userInput = {
    fullname : '',
    contact : '',
    email : '',
    username : '',
    password : '',
    confirm_password : ''
};

function validatePhoneNumber(phoneNumber){
    if(phoneNumber === ''){
        return true;
    }
    const criteria = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return criteria.test(phoneNumber);
}

function validateEmail(email){
    if(email === ''){
        return true;
    }
    const criteria = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return criteria.test(email);
}

function passwordValidation(password){
    if(password.length < 1){
        return "This field is required!";
    }
    else if(password.length >= 5){
        const case_upper = password.match(/[A-Z]/);
        const case_lower = password.match(/[a-z]/);
        const digit = password.match(/[0-9]/);
        const special_chars = password.match(/[^A-Za-z0-9]/);
        if(case_upper === null){
            return "Password must contain 1 uppercase!";
        }
        else if(case_lower === null){
            return "Password must contain 1 lowercase!";
        }
        else if(digit === null){
            return "Password must contain 1 digit!";
        }
        else if(special_chars === null){
            return "Password must contain 1 special characters";
        }
        return "valid";
    }
    return "Password length must be greater than 5!";
}

function passwordVerification(password1,password2){
    if(password2 === ''){
        return "This field is required!";
    }
    if(password1 === password2){
        return "valid";
    }
    return "Passwords doesn't match!";
}

function getInputs(pageNumber){
    if(pageNumber === 1){
        userInput.fullname = document.getElementById('full-name').value;
        userInput.contact = document.getElementById('contact').value;
        const validate_contact = validatePhoneNumber(userInput.contact);
        contact_warn.innerText = validate_contact ? 'This field is required!' : 'Invalid contact number';
        fullname_warn.style.visibility = userInput.fullname === '' ? 'visible' : 'hidden';
        contact_warn.style.visibility = userInput.contact === '' || validate_contact === false  ? 'visible' : 'hidden';
        userInput.fullname !== '' && (userInput.contact !== '' && validate_contact) ? goToPage(pageNumber+1) : null;
    }
    else if(pageNumber === 2){
        userInput.email = document.getElementById('email').value;
        userInput.username = document.getElementById('reg-user-name').value;
        const validate_email = validateEmail(userInput.email);
        email_warn.innerHTML = validate_email ? 'This field is required!' : 'Invalid email address';
        email_warn.style.visibility = userInput.email === '' || validate_email === false ? 'visible' : 'hidden';
        username_warn.style.visibility = userInput.username === '' ? 'visible' : 'hidden';
        userInput.email !== '' && (userInput.username !== '' && validate_email) ? goToPage(pageNumber+1) : null;
    }
    else if(pageNumber === 3){
        userInput.password = document.getElementById('reg-password').value;
        userInput.confirm_password = document.getElementById('confirm-password').value;
        const password_validation = passwordValidation(userInput.password);
        password_warn.innerText = password_validation !== "valid" ? password_validation : "This field is required!";
        password_warn.style.visibility = userInput.password === '' || password_validation !== "valid" ? 'visible' : 'hidden';
        const verify = password_validation === "valid" ? passwordVerification(userInput.password,userInput.confirm_password) : '';
        confirm_password_warn.innerText = verify !== '' && verify !== "valid" ? verify : "This field is required!"; 
        confirm_password_warn.style.visibility = userInput.confirm_password === '' || (verify !== '' && verify !== 'valid') ? 'visible' : 'hidden';
        (userInput.password !== '' && password_validation === "valid") && (userInput.confirm_password !== '' && verify === "valid") ? sendToServer() : null;
    }
    return false;
}

function goToPage(pagenumber){
    toggleFormVisibility(pages[pagenumber-1],pages[current_page-1]);
    current_page = pagenumber;
    handleButtons();
}

function sendToServer(){
    loading(true);
    $(document).ready(async function(){
        $.ajax({
            method:"POST",
            data: userInput,
            url:await getConfig('domain')+"php/register.php",
            success:function(res){
                if(res === "Username already exists!"){
                    username_warn.innerHTML = res;
                    username_warn.style.visibility = 'visible';
                    goToPage(2);
                }
                else if(res === "Signed up successfully!"){
                    response_message.innerHTML = "Signed up successfully!";
                    response_message.style.color = '#008500';
                    response_message.style.visibility = 'visible';
                    setTimeout(()=>{
                        registeration_form.reset();
                        response_message.style.visibility = "hidden";
                        signin.click();
                    },3000);
                }
                else{
                    response_message.innerHTML = "Something went wrong!";
                    response_message.style.color = 'red';
                    response_message.style.visibility = 'visible';
                }
                loading(false);
            },
            error:function(e){
                console.log("Error "+e);
                response_message.innerHTML = "Couldn't reach the servers!";
                response_message.style.color = 'red';
                response_message.style.visibility = 'visible';
                loading(false);
            }
        });
    })
    return false;
}

function loading(spin){
    const spinner = document.getElementById('spinner');
    spinner.style.display = spin ? 'block' : 'none';
}