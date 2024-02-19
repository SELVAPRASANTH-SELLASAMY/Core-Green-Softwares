const Select_nationality = document.querySelector('.nationality-class #nationality');
const Select_resident_nation = document.querySelector('.change-about-user-details select#country');
const spinner = document.querySelector('.spinner');
function fetchCountries(select_field,append,value){
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data=>{
        data.map((obj)=>{
            const ele = document.createElement('option');
            ele.value = ((obj.name.common).toLowerCase()).trim();
            ele.text = obj.name.common;
            append ? select_field.appendChild(ele) : null;
        })       
        select_field.value = value;
    })
    .catch(error => console.error('Error while fetching countries:', error));
}
fetchCountries(Select_nationality,true,"");
fetchCountries(Select_resident_nation,true,"");

var domain = "http://localhost/coregreen/";

const settings_button = document.querySelector('.settings #settings-button');
const settings_options = document.querySelector('.settings .settings-options');

settings_button.addEventListener('click',()=>{
    settings_options.classList.toggle('settings-active');
    settings_button.classList.toggle('settings-icon-rotate');
})

const edit_personal_info = document.querySelector('.edit-personal-info');
const edit_bank_info = document.querySelector('.edit-bank-info');
const edit_id_proof = document.querySelector('.edit-id-proof');
const edit_user_info = document.querySelector('.user-info-edit-button');

var personal_default_input = true;
var bank_default_field = true;
var id_default_field = true;
const personal_input_field = document.querySelectorAll('.personal-info input');
const bank_input_field = document.querySelectorAll('.bank-info input');
const id_input_field = document.querySelectorAll('.id-proof input');
const personal_select_field = document.querySelectorAll('.personal-info select');
const bank_select_field = document.querySelectorAll('.bank-info select');
const id_select_field = document.querySelectorAll('.id-proof select');
const user_info_edit_form = document.getElementById('change-user-details-field');
const cancel_edit_user_info = document.getElementById('cancel_change_about-user-details');

const save_personal_info = document.querySelector('.save-personal-info');
const save_bank_info = document.querySelector('.save-bank-info');
const save_id_proof = document.querySelector('.save-id-proof');
edit_personal_info.addEventListener('click',()=>{
    personal_input_field.forEach((e)=>{
        e.disabled = !personal_default_input;
    })
    personal_select_field.forEach((e)=>{
        e.disabled = !personal_default_input;
    })
    personal_default_input = !personal_default_input;
    save_personal_info.classList.toggle('show-save-button');
})
edit_bank_info.addEventListener('click',()=>{
    bank_input_field.forEach((e)=>{
        e.disabled = !bank_default_field;
    })
    bank_select_field.forEach((e)=>{
        e.disabled = !bank_default_field;
    })
    bank_default_field = !bank_default_field;
    save_bank_info.classList.toggle('show-save-button');
})
edit_id_proof.addEventListener('click',()=>{
    id_input_field.forEach((e)=>{
        e.disabled = !id_default_field;
    })
    id_select_field.forEach((e)=>{
        e.disabled = !id_default_field;
    })
    id_default_field = !id_default_field;
    save_id_proof.classList.toggle('show-save-button');
})
edit_user_info.addEventListener('click',()=>{
    user_info_edit_form.style.top = "1rem";
})
cancel_edit_user_info.addEventListener('click',()=>{
    user_info_edit_form.style.top = "-40rem";
})

const change_password_button = document.getElementById("change-password-button");
const change_password_cancel = document.getElementById("cancel_change_password");
const change_password_field = document.querySelector(".change-password");
const form_change_password = document.getElementById("change-password");
const currentpassword_warn = document.getElementById('current-password-warn');

const delete_account_field = document.getElementById('delete-account');
const cancel_deletion = document.getElementById('cancel_deletion');
const delete_account = document.querySelector('.settings-options #delete-account-button');
const form_deletion = document.getElementById('delete-my-account');
const user_password_warn = document.getElementById('user-password-warn');

change_password_button.addEventListener('click',()=>{
    settings_button.click();
    change_password_field.style.top = "1rem";
})
delete_account.addEventListener('click',()=>{
    settings_button.click();
    delete_account_field.style.top = '1rem';
})
change_password_cancel.addEventListener('click',()=>{
    reset_field(change_password_field,form_change_password,currentpassword_warn);
})
cancel_deletion.addEventListener('click',()=>{
    reset_field(delete_account_field,form_deletion,user_password_warn);
})

function decrypt(val){
    const decrypted_val = CryptoJS.AES.decrypt(val,"TomRiddle@9003413727_21-07-03").toString(CryptoJS.enc.Utf8);
    return decrypted_val;
}

function getCookie(cookie_name){
    const decode = decodeURIComponent(document.cookie);
    const cookieArray = decode.split(";");
    for(let i=0;i<cookieArray.length;i++){
        cookie = cookieArray[i].trim();
        if(cookie.startsWith(cookie_name+"=")){
            let required_cookie = cookie.substring(cookie_name.length+1);
            return decrypt(required_cookie);
        }
    }
    return null;
}

//Info
const Full_name = document.getElementById('user-name');
const designation = document.getElementById('designation');
const resident_city = document.getElementById('span-city');
const resident_state = document.getElementById('span-state');
const resident_country = document.getElementById('span-country');
const email = document.getElementById('email');
const phone_number = document.getElementById('phone-number');

//Personal-Info
const username = document.getElementById('name');
const dob = document.getElementById('dob');
const age = document.getElementById('age');
const bloodgroup = document.getElementById('blood');
const marital_status = document.getElementById('marital-status');
const gender = document.getElementById('gender');
const languages_known = document.getElementById('lang');
const religion = document.getElementById('religion');

//Bank-Info
const bank_name = document.getElementById('bank-name');
const ac_num = document.getElementById('ac-number');
const branch = document.getElementById('branch');
const account_holder = document.getElementById('ac-holder-name');
const ifsc = document.getElementById('ifsc');

//ID Proof
const aadhaar = document.getElementById('aadhaar-number');
const pan = document.getElementById('pan');
const passport = document.getElementById('passport');
const driving_licence = document.getElementById('driving-license');

//Server response
const server_response = document.getElementById('server-response');
const server_response_heading = document.querySelector('#server-response h1');
const server_response_message = document.querySelector('#server-response p');

//for edit user info form
const current_name = document.getElementById('current-name');
const current_desig = document.getElementById('current-desig');
const current_city = document.getElementById('city');
const current_state = document.getElementById('state');
const current_email = document.getElementById('current-email');
const current_contact = document.getElementById('current-contact');

//for edit user info form wanrning
const current_name_warn = document.getElementById('current-name-warn');
const current_email_warn = document.getElementById('current-email-warn');
const current_contact_warn = document.getElementById('current-contact-warn');

const canvas = document.querySelector('.canvas');

PageLoad();
function PageLoad(){
    load(true);
    const obj = {user:getCookie("user"),userId:getCookie("user_id")};
    $.ajax({
        method:"GET",
        url: domain + "php/profile.php",
        data:obj,
        success:function(res){
            if(res === "fallback"){
                return window.location.replace('login.html');
            }
            else if (res === "Couldn't fetch user datas!"){
                return window.location.replace('login.html');
            }

            const parse = JSON.parse(res);
            const placeArray = parse['place'] ? parse['place'].split(",") : null;

            //UserInfo
            Full_name.innerText = parse['fullname'];
            phone_number.innerText = parse['contact_number'];
            email.innerText = parse['email'];
            designation.innerText = parse['designation'] === "" ? "_" : parse['designation'];
            resident_city.innerText = placeArray ? placeArray[0] === "" ? "_" : placeArray[0] : "_";
            resident_state.innerText = placeArray ? placeArray[1] === "" ? "_" : placeArray[1] : "_";
            resident_country.innerText = placeArray ? placeArray[2] === "" ? "_" : placeArray[2] : "_";

            //profile picture
            if(parse['profile_pic']){
                const img = document.createElement('img');
                img.src = parse['profile_pic'];
                img.alt = "";
                img.id = "users_profile_picture";
                canvas.appendChild(img);
            }
            
            //user info edit form
            //for place need to be split using split()
            const resident_country_val = placeArray ? placeArray[2].toLowerCase().trim() : "";
            current_name.value = parse['fullname'];
            current_desig.value = parse['designation'];
            current_city.value = placeArray ? placeArray[0] : "";
            current_state.value = placeArray ? placeArray[1] : "";
            resident_country_val ? fetchCountries(Select_resident_nation,false,resident_country_val) : null;
            current_email.value = parse['email'];
            current_contact.value = parse['contact_number'];

            //Personal Info
            const country_val = parse['nationality'];
            username.innerText = obj.user;
            dob.value = parse['birth_date'] && parse['birth_date'];
            age.innerText = parse['birth_date'] ? calc_age(parse['birth_date']) : '-';
            bloodgroup.value = parse['blood_group'] ? parse['blood_group'] : "";
            marital_status.value = parse['marital_status'] ? parse['marital_status'] : "";
            gender.value = parse['gender'] ? parse['gender'] : "";
            languages_known.value = parse['languages_known'];
            religion.value = parse['religion'];
            country_val ? fetchCountries(Select_nationality,false,country_val) : null;

            //Bank Info
            bank_name.value = parse['bank_name'];
            ac_num.value = parse['account_number'];
            branch.value = parse['branch'];
            account_holder.value = parse['ac_holder_name'];
            ifsc.value = parse['ifsc_code'];

            //Id Proof
            aadhaar.value = parse['aadhaar'];
            pan.value = parse['pan'];
            passport.value = parse['passport'];
            driving_licence.value = parse['driving_licence'];

            profile_completedness_percent(parse);

            document.querySelector("header").style.display = "block";
            document.querySelector("main").style.display = "flex";
            load(false);
        },
        error:function(error){
            response("Something went wrong!","Please try after sometimes.","#e74c3c");
            console.log("Something went wrong "+error);
            setTimeout(()=>{
                window.location.replace("index.html");
            },[3000]);
            load(false);
        }
    });
}

const profile_percent = document.getElementById('profile-strength-circle');
const percent_text = document.getElementById('percent');

function profile_completedness_percent(obj){
    let count = 1;
    for(const key in obj){
        if(obj.hasOwnProperty(key) && obj[key] !== 0 && (obj[key] !== undefined && obj[key] !== null && obj[key] !== "" && obj[key] !== "0000-00-00")){
            key === "birth_date" ? count+=2 : ++count;
        }
    }
    percent_text.innerHTML = (count/0.24).toFixed(1)+"%";
    profile_percent.style.strokeDashoffset = ((100-(count/0.24))*0.1884) + "rem";
}

function calc_age(dob){
    if(dob === "0000-00-00"){
        return "-";
    }
    const arr = dob.split("-");
    const d = new Date();
    const years = (d.getFullYear()-Number(arr[0]))-1;
    const months = 12-(Math.abs((d.getMonth()+1)-Number(arr[1])));
    return years+" years "+months+" months";
}

function response(h,p,color){
    server_response_heading.innerText = h;
    server_response_message.innerText = p;
    server_response.style.backgroundColor = color;
    server_response.style.top = '.5rem';
    setTimeout(()=>{
        server_response.style.top = '-8rem';
    },[3000]);
    PageLoad();
}

function ModifyInfo(){
    load(true);
    const obj = {
        "field":"info",
        "user":getCookie("user"),
        "username":current_name.value,
        "designation":current_desig.value,
        "resident":current_city.value+","+current_state.value+","+Select_resident_nation.value,
        "email":current_email.value,
        "contact":current_contact.value
    }
    if(validateModifiedInfo(obj)){
    $.ajax({
        method:"POST",
        url:domain+"php/profile.php",
        data:obj,
        success:function(res){
            if(res === "Data's updated!"){
                response("Success!","Datas updated successfully.","#27ae60");
            }
            else{
                response("Something went wrong!","Please try after sometimes.","#e74c3c");
                console.log(res);
            }
            load(false);
        },
        error:function(error){
            response("Something went wrong!","Please try after sometimes.","#e74c3c");
            console.log(error);
            load(false);
        }
    })
    cancel_edit_user_info.click();
    }
}

function validateModifiedInfo(obj){
    current_name_warn.style.visibility = obj.username === "" ? "visible" : "hidden";
    const validate_email = validateEmail(obj.email);
    current_email_warn.innerText = validate_email ? "This field is required!" : "Invalid email address!";
    current_email_warn.style.visibility = obj.email === "" || !validate_email ?  "visible" : "hidden";
    const validate_contact = validatePhoneNumber(obj.contact);
    current_contact_warn.innerText = validate_contact ? "This field is required" : "Invalid contact number!";
    current_contact_warn.style.visibility = obj.contact === "" || !validate_contact ? "visible" : "hidden";
    if(!validate_email || !validate_contact || obj.contact === "" || obj.username === "" || obj.email === ""){
        load(false);
        return false;
    }
    return true;
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

function ModifyPersonalInfo(){
    load(true);
    const obj = {
        "field":"personal_info",
        "user":getCookie("user"),
        "dob":dob.value,
        "bloodgroup":bloodgroup.value,
        "marital_status":marital_status.value,
        "gender":gender.value,
        "languages_known":languages_known.value,
        "religion":religion.value,
        "nationality":nationality.value
    }
    $.ajax({
        method:"POST",
        url:domain+"php/profile.php",
        data:obj,
        success:function(res){
            if(res === "Updated General info!" || res === "Inserted in General info!"){
                response("Success!","Datas updated successfully.","#27ae60");
            }
            else{
                response("Something went wrong!","Please try after sometimes.","#e74c3c");
                console.log(res);
            }
            load(false);
        },
        error:function(error){
            response("Something went wrong!","Please try after sometimes.","#e74c3c");
            console.log(error);
            load(false);
        }
    })
}

function ModifyBankInfo(){
    load(true);
    const obj = {
        "field":"bank_info",
        "user":getCookie("user"),
        "bank_name":bank_name.value,
        "ac_num":ac_num.value,
        "branch":branch.value,
        "account_holder":account_holder.value,
        "ifsc":ifsc.value
    };
    $.ajax({
        method:"POST",
        url:domain+"php/profile.php",
        data:obj,
        success:function(res){
            if(res === "Updated bank info!" || res === "Inserted in bank info!"){
                response("Success!","Datas updated successfully.","#27ae60");
            }
            else{
                response("Something went wrong!","Please try after sometimes.","#e74c3c");
                console.log(res);
            }
            load(false);
        },
        error:function(error){
            response("Something went wrong!","Please try after sometimes.","#e74c3c");
            console.log(error);
            load(false);
        }
    })
}

function ModifyIdProof(){
    load(true);
    const obj = {
        "field":"id_proof",
        "user":getCookie("user"),
        "aadhaar":aadhaar.value,
        "pan":pan.value,
        "passport":passport.value,
        "driving_licence":driving_licence.value
    }
    $.ajax({
        method:"POST",
        url:domain+"php/profile.php",
        data:obj,
        success:function(res){
            if(res === "Updated id_proof!" || res === "Inserted in id_proof!"){
                response("Success!","Datas updated successfully.","#27ae60");
            }
            else{
                response("Something went wrong!","Please try after sometimes.","#e74c3c");
                console.log(res);
            }
            load(false);
        },
        error:function(error){
            response("Something went wrong!","Please try after sometimes.","#e74c3c");
            console.log(error);
            load(false);
        }
    })
}

const currentpassword = document.getElementById('current-password');
const newpassword = document.getElementById('new-password');
const confirmpassword = document.getElementById('confirm-new-password');

const change_password_pages = [document.getElementById('page-1'),document.getElementById('page-2')];

const newpassword_warn = document.getElementById('new-password-warn');
const confirmpassword_warn = document.getElementById('con-password-warn');

var currentpage = 1;
function changePassword(){
    load(true);
    const cpw = currentpassword.value;
    currentpassword_warn.innerText = "This field is required!";
    currentpassword_warn.style.visibility = cpw === "" ? "visible" : "hidden";
    if(cpw !== ""){
        $.ajax({
            method:"POST",
            url:domain+"php/profile.php",
            data:{"field":"password_change_verification","userId":getCookie("user_id"),"cpw":cpw},
            success:function(res){
                if(res === "accepted"){
                    load(false);
                    return ChangingPassword();
                }
                currentpassword_warn.innerText = res;
                currentpassword_warn.style.visibility = res !== "accepted" ? "visible" : "hidden";
                load(false);
            },
            error:function(error){
                response("Something went wrong!","Please try after sometimes.","#e74c3c");
                console.log(error);
                load(false);
            }
        })
    }
    else if(cpw === ""){
        load(false);
    }
}

function ChangingPassword(){
    togglePageVisibility(currentpage);
    if(currentpage === 3){
        const npw = newpassword.value;
        const cnp = confirmpassword.value;
        const check_password = passwordValidation(npw);
        newpassword_warn.innerText = check_password;
        newpassword_warn.style.visibility = check_password !== "valid" ? "visible" : "hidden";
        confirmpassword_warn.innerText = cnp === "" ? "This field is required!" : cnp !== npw ? "Passwords do not match!" : "Matched";
        confirmpassword_warn.style.visibility = cnp === "" || (cnp !== npw) ? "visible" : "hidden";
        if(npw !== "" && cnp !== "" && (check_password === "valid" && cnp === npw)){
            $.ajax({
                method:"POST",
                url:domain+"php/profile.php",
                data:{"npw":npw,"field":"change_password","userId":getCookie("user_id")},
                success:function(res){
                    if(res === "password changed"){
                        response("Success!","Password changed successfully.","#27ae60");
                        reset_field(change_password_field,form_change_password,currentpassword_warn);
                    }
                    else{
                        response("Something went wrong!","Please try after sometimes.","#e74c3c");
                        console.log(res);
                    }
                },
                error:function(error){
                    response("Something went wrong!","Please try after sometimes.","#e74c3c");
                    console.log(error);
                }
            })
        }
    }
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

function togglePageVisibility(page){
    if(page === 1){
        change_password_pages[page-1].style.display = "none";
        change_password_pages[page].style.display = "block";
        currentpage++;
    }
    else if(page === 0){
        change_password_pages[page+1].style.display = "none";
        change_password_pages[page].style.display = "block";
    }
    else if(page === 2){
        currentpage++;
    }
}

const user_password = document.getElementById('user-password');
function deletion(){
    load(true);
    user_password_warn.style.visibility = user_password.value ? "hidden" : "visible";
    user_password_warn.innerText = user_password.value ? "Invalid password!" : "This field is required!";
    if(!user_password.value){
        load(false);
        return false;
    }
    const obj = {
        "field":"account_deletion",
        "user_id":getCookie("user_id"),
        "password":user_password.value
    }
    if(user_password){
        $.ajax({
            method:"POST",
            url:domain+"php/profile.php",
            data:obj,
            success:function(res){
                if(res === "invalid password"){
                    user_password_warn.innerText = "Invalid password!";
                    user_password_warn.style.visibility = "visible";
                }
                else if(res === "account deleted"){
                    reset_field(delete_account_field,form_deletion,user_password_warn);
                    server_response_heading.innerText = "Success!";
                    server_response_message.innerText = "Account deleted successfully.";
                    server_response.style.backgroundColor = "#27ae60";
                    server_response.style.top = '.5rem';
                    setTimeout(()=>{
                        server_response.style.top = '-8rem';
                    },[3000]);
                    setTimeout(()=>{
                        logout();
                    },3001);
                }
                else{
                    response("Something went wrong!","Please try after sometimes.","#e74c3c");
                    console.log(res);
                }
                load(false);
            },
            error:function(error){
                response("Something went wrong!","Please try after sometimes.","#e74c3c");
                console.log(error);
                load(false);
            }
        })
    }
}

function setProfilePic(){
    load(true);
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    var formData = new FormData();
    formData.append("field","upload_profile_pic");
    formData.append("userId",getCookie("user_id"));
    input.onchange = function(e){
        formData.append("image",e.target.files[0]);
        $.ajax({
            method:"POST",
            url:domain+"php/profile.php",
            data:formData,
            contentType:false,
            processData:false,
            success:function(res){
                console.log(res);
                if(res === "profile picture set"){
                    response("Success!","Profile picture set.","#27ae60");
                }
                else if(res === "something went wrong"){
                    response("Something went wrong!","Please try after sometimes.","#e74c3c");
                    console.log(res);
                }
                else if(res === "couldn't upload image"){
                    response("Something went wrong!","Please try after sometimes.","#e74c3c");
                    console.log(res);
                }
                load(false);
            },
            error:function(error){
                response("Something went wrong!","Please try after sometimes.","#e74c3c");
                console.log(error);
                load(false);
            }
        })
    }
    input.click();
}

function remove_profile_pic(){
    const pic = document.getElementById('users_profile_picture');
    if(pic){
        load(true);
        var prefix = domain === "http://localhost/coregreen/" ? "http://127.0.0.1:5500/" : domain;
        var pic_modified;
        if(pic.src.startsWith(prefix)){
            pic_modified = "../"+pic.src.substring(prefix.length);
        }
        const obj = {
            "field":"delete_profile_pic",
            "userId":getCookie("user_id"),
            "pic":pic_modified
        };
        $.ajax({
            method:"POST",
            url:domain+"php/profile.php",
            data:obj,
            success:function(res){
                if(res === "pic deleted"){
                    canvas.removeChild(pic);
                    response("Success!","Profile picture deleted.","#27ae60");
                }
                else{
                    response("Something went wrong!","Please try after sometimes.","#e74c3c");
                    console.log(res);
                }
                load(false);
            },
            error:function(error){
                response("Something went wrong!","Please try after sometimes.","#e74c3c");
                console.log(error);
                load(false);
            }
        })
    }
}

function reset_field(field,form,warning){
    field.style.top = "-16rem";
    togglePageVisibility(0);
    form.reset();
    warning.style.visibility = "hidden";
}

function logout(){
    document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user_id=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
}

function load(bool){
    spinner.style.display = bool ? "block" : "none";
}