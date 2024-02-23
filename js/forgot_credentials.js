const line = document.querySelector('#enter-otp .line');
const otp_input = document.getElementById('otp');
otp_input.addEventListener('input',(e)=>{
    line.style.width = ((e.target.value.length) * 2.7) + "rem";
    if(e.target.value.length === 5){
        otp_input.blur();
    }
})
var domain;
$.getJSON("config.json",function(url){
    domain = url.domain;
})

const response_message = document.getElementById('response-message');
const username = document.getElementById("username");
const username_warn = document.getElementById('username_warn');

const forms = [document.getElementById('forgot-credentials-form'),document.getElementById('enter-otp'),document.getElementById('reset-password-form')];
function send_OTP(){
    loading(true);
    respond("");
    username_warn.style.visibility = username.value ? "hidden" : "visible";
    if(username.value){
        const obj = {
            "username" : username.value,
            "field" : "send_otp"
        }
        $.ajax({
            method:"POST",
            url:domain+"php/forgot_credentials.php",
            data:obj,
            success:function(res){
                if(res === "OTP sent"){
                    toggleFormVisibility(1);
                }
                else if(res === "user not found" || res === "max limit exeeded"){
                    respond(res);
                }
                else{
                    respond("Something went wrong!");
                    console.error(res);
                }
                loading(false);
            },
            error:function(error){
                respond("Something went wrong!");
                console.error(error);
                loading(false);
            }
        })
    }
}

const otp_warn = document.getElementById('otp_warn');

function verify_OTP(){
    loading(true);
    respond("");
    const obj = {
        //TODO:Repace with username
        "username":username.value,
        "otp" : otp_input.value,
        "field":"verify_otp"
    };
    otp_warn.innerText = otp_input.value.length > 0 ? "Please enter 5 digit OTP!" : "This field is required!";
    otp_warn.style.visibility = otp_input.value.length < 5 ? "visible" : "hidden";
    if(otp_input.value.length >= 5){
        $.ajax({
            method:"POST",
            url:domain+"php/forgot_credentials.php",
            data:obj,
            success:function(res){
                if(res === "verification success"){
                    toggleFormVisibility(2);
                }
                else if(res === "Invalid OTP"){
                    respond("Invalid OTP!");
                }
                else{
                    respond("Something went wrong!");
                    console.error(res);
                }
                loading(false);
            },
            error:function(error){
                respond("Something went wrong!");
                console.error(error);
                loading(false);
            }
        })
    }
}

const password = document.getElementById("password");
const confirm_password = document.getElementById("confirm-password");
const password_warn = document.getElementById("password_warn");
const confirm_password_warn = document.getElementById("con_password_warn");
function reset_password(){
    respond("");
    var status = passwordValidation(password.value);
    password_warn.innerText = status !== "valid" ? status : "This field is required!";
    password_warn.style.visibility = status !== "valid" ? "visible" : "hidden";
    var issame = passwordVerification(password.value,confirm_password.value);
    confirm_password_warn.innerText = issame !== "valid" ? issame : "This field is required!";
    confirm_password_warn.style.visibility = issame !== "valid" ? "visible" : "hidden";
    if(status === "valid" && issame === "valid"){
        loading(true);
        const obj = {
            "field":"change-password",
            "username":username.value,//TODO:Replace with actual username
            "password":password.value
        }
        $.ajax({
            method:"POST",
            url:domain+"php/forgot_credentials.php",
            data:obj,
            success:function(res){
                if(res === "password changed"){
                    respond("Password changed go back to Sign in!");
                }
                else{
                    respond("Something went wrong!");
                    console.error(res);
                }
                loading(false);
            },
            error:function(error){
                respond("Something went wrong!");
                console.error(error);
                loading(false);
            }
        })
    }
}

function toggleFormVisibility(page){
    forms[page-1].style.display = "none";
    forms[page].style.display = "flex";
}

function respond(message){
    response_message.innerText = message ? message : "Something went wrong!";
    response_message.style.color = message === "Password changed go back to Sign in!" ? "#008500" : "red";
    response_message.style.visibility = message ? "visible" : "hidden";
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

function loading(spin){
    const spinner = document.getElementById('spinner');
    spinner.style.display = spin ? 'block' : 'none';
}