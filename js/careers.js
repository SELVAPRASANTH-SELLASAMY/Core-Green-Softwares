const buttons = [document.getElementById('android-developer-role'),document.getElementById('web-developer-role'),document.getElementById('asengineer-role')];
const jobdesc = [document.getElementById('android-developer'),document.getElementById('web-developer'),document.getElementById('ASEngineer')];

const firstname = document.getElementById('first-name');
const lastname = document.getElementById('last-name');
const degree = document.getElementById('degree');
const stream = document.getElementById('stream');
const email = document.getElementById('email');
const phone_number = document.getElementById('phone-number');
const yop = document.getElementById('yop');
const position = document.getElementById('position');

const fname_warn = document.getElementById('first-name-warn');
const lname_warn = document.getElementById('last-name-warn');
const degree_warn = document.getElementById('degree-warn');
const stream_warn = document.getElementById('stream-warn');
const email_warn = document.getElementById('email-warn');
const phone_warn = document.getElementById('phone-number-warn');
const yop_warn = document.getElementById('yop-warn');
const position_warn = document.getElementById('position-warn');

var domain;
$.getJSON("config.json",function(url){
    domain = url.domain;
})

var indexInuse = 0; // default index
buttons.forEach((button,index)=>{
    button.addEventListener('click',()=>{
        toggleDescription(index,indexInuse);
        indexInuse = index;
    });
})

const response_field = document.getElementById('response-message');
function application_response(msg,color){
    response_field.innerHTML = msg;
    response_field.style.color = color;
    response_field.style.top = '1rem';
    setTimeout(()=>{
        response_field.style.top = '-5.5rem';
    },[3000]);
}
function toggleDescription(show,hide){
    if(show !== hide){
        jobdesc[show].style.display = 'block';
        jobdesc[hide].style.display = 'none';
        buttons[show].classList.add('active-tab');
        buttons[hide].classList.remove('active-tab');
        position.value = buttons[show].innerText;
    }
}

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

function validate(applicant_details){
    email_warn.innerText = applicant_details.email === '' ? "This field is required!" : "Invalid email address!";
    phone_warn.innerText = applicant_details.phone_number === '' ? "This field is required!" : "Invalid phone number!";
    var isValidEmail = validateEmail(applicant_details.email);
    var isValidPhone = validatePhoneNumber(applicant_details.phone_number);
    fname_warn.style.visibility = applicant_details.firstname === '' ? 'visible' : 'hidden';
    lname_warn.style.visibility = applicant_details.lastname === '' ? 'visible' : 'hidden';
    degree_warn.style.visibility = applicant_details.degree === '' ? 'visible' : 'hidden';
    stream_warn.style.visibility = applicant_details.stream === '' ? 'visible' : 'hidden';
    email_warn.style.visibility = applicant_details.email === '' || !isValidEmail ? 'visible' : 'hidden';
    phone_warn.style.visibility = applicant_details.phone_number === '' || !isValidPhone ? 'visible' : 'hidden';
    yop_warn.style.visibility = applicant_details.year_of_passing === '' ? 'visible' : 'hidden';
    position_warn.style.visibility = applicant_details.position === '' ? 'visible' : 'hidden';

    if(applicant_details.firstname && applicant_details.lastname && applicant_details.degree && applicant_details.stream && applicant_details.email && applicant_details.phone_number && applicant_details.year_of_passing && applicant_details.position && isValidEmail && isValidPhone){
        return true;
    }
    return false;
}
function apply(){
    const applicant_details = {
        'firstname':firstname.value,
        'lastname':lastname.value,
        'degree':degree.value,
        'stream':stream.value,
        'email':email.value,
        'phone_number':phone_number.value,
        'year_of_passing':yop.value,
        'position':position.value
    }
    console.log(domain);
    if(validate(applicant_details)){
        console.log(applicant_details);
        $.ajax({
            method:"POST",
            url:domain+"php/careers.php",
            data:applicant_details,
            success:function(res){
                application_response("<p>&#9989; Thanks for applying! We will get you back shortly if you are a good fit.</p>",'#008500');
            },
            error:function(error){
                console.log(error);
                application_response("<p>&#10071; Something went wrong! Please try after some times.</p>",'red');
            }
        })
    }
}