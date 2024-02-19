const nav = document.querySelector('nav');
const ham = document.querySelector('.hamburger');
const shadow = document.querySelector('.shadow');
ham.addEventListener('click',()=>{
    nav.classList.toggle('show-nav-bar');
    shadow.classList.toggle('show-shadow');
});
nav.addEventListener('click',()=>{
    nav.classList.remove('show-nav-bar');
    shadow.classList.remove('show-shadow');
});
shadow.addEventListener('click',()=>{
    nav.classList.remove('show-nav-bar');
    shadow.classList.remove('show-shadow');
})

var domain;
$.getJSON("config.json",function(url){
    domain = url.domain;
})

const verify = document.cookie.includes("user") && document.cookie.includes("user_id");
function verifySession(){
    if(verify){
        return window.location.href = '/profile.html';
    }
    return window.location.href = '/login.html';
}

const res_msg = document.getElementById("response-message");
function response(msg,color){
    res_msg.innerText = msg;
    res_msg.style.color = color;
    res_msg.style.visibility = "visible";
}
const userQueryForm = document.getElementById("user-query");
function sendQuery(){
    loading(true);
    const obj = {
        "name" : document.getElementById('fname').value + " "+document.getElementById('lname').value,
        "email" : document.getElementById('email').value,
        "contact_number" : document.getElementById('contact-number').value,
        "message" : document.getElementById('message').value
    }
    if(obj.message === ""){
        loading(false);
        return response("Message field is required!","red");
    }
    $.ajax({
        method:"POST",
        url:domain+"php/index.php",
        data:obj,
        success:function(res){
            if(res === "success"){
                response("Thank You! We got your message.","#008500");
                setTimeout(()=>{
                    userQueryForm.reset();
                    res_msg.style.visibility = "hidden";
                },[3000]);
            }
            else{
                response("Something went wrong!","red");
                console.log(res);
            }
            loading(false);
        },
        error:function(error){
            response("Something went wrong!","red");
            console.log(error);
            loading(false);
        }
    })
}

const loading_svg = document.getElementById('load');
const text = document.getElementById('submit-text');
function loading(bool){
    loading_svg.style.display = bool ? "block" : "none";
    text.style.display = bool ? "none" : "block";
}