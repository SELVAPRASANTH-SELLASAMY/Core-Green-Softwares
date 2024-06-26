const settings_button = document.querySelector('.navigation > img');
const navbar = document.querySelector('.navigation > nav');
settings_button.addEventListener('click',()=>{
    settings_button.classList.toggle('rotate-settings-icon');
    navbar.classList.toggle('show-navbar');
});
const personal_info_edit_button = document.getElementById('personal-info-edit-button');
const personal_info_edit_field = document.querySelector('#edit_personal_info');
personal_info_edit_button.addEventListener('click',()=>{
    personal_info_edit_field.classList.add('display-edit-field');
});
const changePasswordField = document.getElementById('change_password_field');
const changePasswordFieldPages = changePasswordField.querySelectorAll('.page');
const changePasswordFieldButtons = changePasswordField.querySelectorAll('button');
const changePasswordFieldWarnings = changePasswordField.querySelectorAll('.warn');
changePasswordFieldButtons.forEach((changePasswordFieldButton)=>{
    changePasswordFieldButton.addEventListener('click',()=>{
        switch(changePasswordFieldButton.id){
            case 'next':
                fetchData("password_verification");
                break;
            case 'cancel':
                changePasswordField.querySelector('form').reset();
                changePasswordField.classList.remove('display-edit-field');
                break;
            case 'previous':
                togglepageVisibility(changePasswordFieldPages[0],changePasswordFieldPages[1]);
                toggleButtonVisibility(['next','cancel']);
                break;
            case 'save':
                const SectionId ='page2'; 
                sendToServer(SectionId);
                break;
        }
    });
});
const deleteAccountField = document.getElementById('delete_account_field');
const deleteAccountFieldButtons = deleteAccountField.querySelectorAll('button');
deleteAccountFieldButtons.forEach((deleteAccountFieldButton)=>{
    deleteAccountFieldButton.addEventListener('click',()=>{
        switch(deleteAccountFieldButton.id){
            case 'cancel':
                deleteAccountField.querySelector('form').reset();
                deleteAccountField.classList.remove('display-edit-field');
                break;
            case 'save':
                fetchData("accountDeleteVerification");
                break;
        }
    });
});
const navButtons = document.querySelectorAll('nav li');
navButtons.forEach((navButton)=>{
    navButton.addEventListener('click',()=>{
        settings_button.click();
        switch(navButton.id){
            case 'change_password':
                changePasswordField.classList.add('display-edit-field');
                break;
            case 'logout':
                var confirm = window.confirm("Are you sure want to sign out?");
                if(!confirm){
                    return;
                }
                logout();
                break;
            case 'delete_account':
                deleteAccountField.classList.add('display-edit-field');
                break;
        }
    });
});
function togglepageVisibility(pageToShow,pageToHide){
    pageToHide.style.display = 'none';
    pageToShow.style.display = 'block';
}
function toggleButtonVisibility([...buttonIds]){
    changePasswordFieldButtons.forEach((changePasswordFieldButton)=>{
        changePasswordFieldButton.style.display = 'none';
    });
    buttonIds.forEach((buttonId)=>{
        changePasswordField.querySelector(`button#${buttonId}`).style.display = 'block';
    });
}
function cancelEdit(sectionId){
    const form = document.querySelector(`#${sectionId} > form`);
    form.reset();
    if(sectionId === "edit_personal_info"){fetchData()};
    personal_info_edit_field.classList.remove('display-edit-field');
}
const detail_sections = [document.getElementById('personal_details'),document.getElementById('bank_id_details'),document.getElementById('academic_details'),document.getElementById('experience_details')];
detail_sections.forEach((section) => {
    section.querySelector('.edit-button').addEventListener('click',()=>{
        const fields = [section.querySelectorAll('input'),section.querySelectorAll('select')];
        fields.forEach((field)=>{
            field.forEach((element)=>{
                element.disabled = !(element.disabled);
            });
        });
        section.querySelector('button').classList.toggle('display-save-button');
    });
});
const forms = document.querySelectorAll('form');
forms.forEach((formName)=>{
    formName.addEventListener('reset',()=>{
        const warnings = document.querySelectorAll(`form#${formName.id} .warn`);
        warnings.forEach((warning)=>{
            warning.style.visibility = 'hidden';
        });
    });
});
function getConfig(key){
    return new Promise((resolve,reject)=>{
        $.getJSON("config.json",function(url){
            if(url && url[key]) resolve(url[key]);
            else reject('Domain not found');
        }).fail(function(){
            reject("Couldn't load config.json");
        });
    });
}
fetchData();
async function fetchData(request = "all"){
    const username = await getCookie("user");
    loading(true);
    var data = {username:username};
    if(request === "password_verification"){
        data['password'] = changePasswordField.querySelector('input#current_password').value;
    }
    else if(request === "accountDeleteVerification"){
        data['password'] = deleteAccountField.querySelector('input#password').value;
    }
    $.ajax({
        method:"GET",
        url:await getConfig('domain')+"php/profile.php",
        data:data,
        success:function(res){
            loading(false);
            const parsed = JSON.parse(res);
            if(parsed['execution_error']){
                respond(`&#10060; ${parsed['execution_error']}!`);
                logout();
                return;
            }
            if(request === "all"){
                populateData(parsed);
                document.querySelector('header').style.display = '';
                document.querySelector('main').style.display = '';
            }
            else if(request === "password_verification"){
                changePasswordFieldWarnings[0].innerText = !parsed['password_verification'] ? 'Invalid password' : 'This field is required!';
                changePasswordFieldWarnings[0].style.visibility = !parsed['password_verification'] ? 'visible' : 'hidden';
                if(parsed['password_verification']){
                    togglepageVisibility(changePasswordFieldPages[1],changePasswordFieldPages[0]);
                    toggleButtonVisibility(['previous','save']);
                }
            }
            else if(request === "accountDeleteVerification"){
                deleteAccountField.querySelector('p#password_warn').innerText = !parsed['password_verification'] ? 'Invalid password' : 'This field is required!';
                deleteAccountField.querySelector('p#password_warn').style.visibility = !parsed['password_verification'] ? 'visible' : 'hidden';
                if(parsed['password_verification']){
                    deleteAccount();
                }
            }
        },
        error:function(error){
            console.error(error);
            respond("&#10060; Something went wrong!");
            loading(false);
        }
    });
}
function populateData(res){
    var sections = [document.getElementById('personal_info'),document.getElementById('edit_personal_info')];
    const application_stat = res.status;
    switch(application_stat){
        case "offered":
            sections.push(document.getElementById('bank_id_details'));
        case "shortlisted":
            sections.push(document.getElementById('personal_details'));
            sections.push(document.getElementById('academic_details'));
            sections.push(document.getElementById('experience_details'));
        case "applied":
            sections.push(document.getElementById('application_status'));
            break;
        case null:
            sections.push(document.getElementById('applications'));
            break;
        default:
            console.error("Switch case error");
    }
    sections.forEach((section)=>{
        const keys = Object.keys(res);
        keys.forEach((key)=>{
            const element = section.querySelector("#"+key);
            element ? element.tagName === "H1" || element.tagName === "H2" || element.tagName === "P" || element.tagName === "SPAN" ? element.innerText = res[key] ? res[key] : "---" : element.value = res[key] : null;
        });
    });
    displaySections(sections);
}
async function sendToServer(SectionId){
    var confirm = window.confirm("Are you sure want to save changes?");
    if(!confirm){
        return;
    }
    loading(true);
    var data = {};
    const section = document.getElementById(SectionId);
    const fields = [section.querySelectorAll('input'),section.querySelectorAll('select')];
    fields.forEach((field)=>{
        field.forEach((element)=>{
            data[element.id] = element.value;
        });
    });
    if(SectionId === "page2"){
        const verify = passwordVerification(data.new_password,data.confirm_new_password);
        const isValid = passwordValidation(data.new_password);
        changePasswordFieldWarnings[1].innerText = isValid;
        changePasswordFieldWarnings[1].style.visibility = !data.new_password || isValid !== "valid" ? 'visible' : 'hidden';
        changePasswordFieldWarnings[2].innerText = verify;
        changePasswordFieldWarnings[2].style.visibility = !data.confirm_new_password || verify !== "valid" ? 'visible' : 'hidden';
        if(isValid !== "valid" || verify !== "valid"){
            loading(false);
            return;
        }
        data["password"] = data.new_password;
        delete data['new_password'];
        delete data['confirm_new_password'];
    }
    data["table"] = SectionId === "page2" ? "personal_info" : SectionId;
    data["request"] = "insert";
    data["username"] = await getCookie("user");
    $.ajax({
        method:"POST",
        url:await getConfig('domain')+"php/profile.php",
        data:data,
        success:function(res){
            if(res === "executed"){
                changePasswordField.classList.remove('display-edit-field');
                personal_info_edit_field.remove('display-edit-field');
                respond("&#9989; Modification's done successfully!");
                fetchData();
            }
            else{
                respond("&#10060; Something went wrong!");
                console.warn(res);
            }
            loading(false);
        },
        error:function(error){
            console.error(error);
            respond("&#10060; Something went wrong!");
            loading(false);
        }
    });
    data = {}; //At the end of request data should become empty
}
async function decrypt(value){
    const secret = await getConfig('secret');
    const decrypted_value = CryptoJS.AES.decrypt(value,secret).toString(CryptoJS.enc.Utf8);
    return decrypted_value;
}
async function getCookie(cookie_name){
    const decode = decodeURIComponent(document.cookie);
    const cookieArray = decode.split(";");
    for(let i=0;i<cookieArray.length;i++){
        cookie = cookieArray[i].trim();
        if(cookie.startsWith(cookie_name+"=")){
            let required_cookie = cookie.substring(cookie_name.length+1);
            let decrypted_cookie = await decrypt(required_cookie);
            return decrypted_cookie;
        }
    }
    return null;
}
function fetchCountries(){
    $.ajax({
        method:"GET",
        url:"https://restcountries.com/v3.1/all",
        success:function(res){
            const select_contry = document.querySelector('#personal_details select#nationality');
            res.forEach((country)=>{
                const element = document.createElement('option');
                element.value = (country.name.common).toLowerCase().trim();
                element.text = country.name.common;
                select_contry.appendChild(element);
            });
        },
        error:function(error){
            console.error(error);
        }
    });
}
fetchCountries();
function displaySections(sections){
    sections.forEach((section)=>{
        section.style.display = '';
    });
}
const response_field = document.getElementById('response_field');
function respond(msg){
    response_field.innerHTML = `<p>${msg}</p>`;
    response_field.style.top = '1rem';
    setTimeout(()=>{
        response_field.style.top = "-5rem";
    },[5000]);
}
const loader = document.getElementById('loader');
function loading(load){
    loader.style.display = load ? 'grid' : 'none';
}
function validateForm(SectionId){
    const section = document.getElementById(SectionId);
    const fields = [section.querySelectorAll('input'),section.querySelectorAll('select')];
    var valid = true;
    fields.forEach((field)=>{
        field.forEach((element)=>{
            if(!element.value || element.value === 'null' || (element.id === 'contact_number' && !validateInput(element)) || (element.id === 'email' && !validateInput(element))){ document.getElementById(`${element.id}_warn`).style.visibility = 'visible'; valid = false;}
            else{document.getElementById(`${element.id}_warn`).style.visibility = 'hidden';}
        });
    });
    if(valid){
        sendToServer(SectionId);
    }
}
function validateInput(element){
    var criteria;
    if(element.id === "email"){
        criteria = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    }
    else{
        criteria = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    }
    if(element.value === '' || criteria.test(element.value)){
        document.getElementById(`${element.id}_warn`).innerText = "This field is required!";
        return true;
    }
    document.getElementById(`${element.id}_warn`).innerText = `Invalid ${element.id}!`;
    return false;
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
function logout(){
    document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user_id=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
}
async function deleteAccount(){
    var confirm = window.confirm("Are you sure want delete account?");
    if(!confirm){
        return;
    }
    const user = await getCookie('user');
    $.ajax({
        method:"POST",
        url:await getConfig("domain")+"php/profile.php",
        data:{username:user,deleteRequest:true},
        success:function(res){
            if(res){
                respond("&#9989; Account deleted successfully!");
                deleteAccountField.classList.remove('display-edit-field');
                logout();
                return;
            }
            respond("&#10060; Something went wrong!");
            return;
        },
        error:function(error){
            respond("&#10060; Something went wrong!");
            console.error(error);
        }
    });
}
function uploadpic(){
    const imageInput = document.createElement('input');
    imageInput.type = 'file';
    imageInput.accept = 'image/*';
    imageInput.id = "profile_pic";
    imageInput.onchange = async(e) =>{
        var formData = new FormData();
        formData.append('profile_pic',e.target.files[0]);
        const user = await getCookie('user');
        formData.append('username',user);
        $.ajax({
            method:"POST",
            data:formData,
            contentType:false,
            processData:false,
            url:await getConfig('domain')+"php/profile.php",
            success:function(res){
                if(res === "profile picture set!"){
                    respond("&#9989; Profile picture set!");
                }
                else{
                    respond("&#10060; Something went wrong");
                    console.warn(res);
                }
            },
            error:function(error){
                respond("&#10060; Something went wrong!");
                console.error(error);
            }
        });
    };
    imageInput.click();
}
async function deletepic(){
    const username = await getCookie("user");
    $.ajax({
        method:"POST",
        url:await getConfig('domain')+"php/profile.php",
        data:{username:username,deletepic:true},
        success:function(res){
            if(res === "pic deleted"){
                respond("&#9989; Profile picture deleted!");
            }
            else{
                respond("&#10060; Something went wrong!");
                console.warn(res);
            }
        },
        error:function(error){
            respond("&#10060; Something went wrong!");
            console.error(error);
        }
    });
}