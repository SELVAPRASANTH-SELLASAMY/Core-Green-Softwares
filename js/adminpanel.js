const settings_button = document.querySelector('.navigation > img');
const navbar = document.querySelector('.navigation > nav');
settings_button.addEventListener('click',()=>{
    settings_button.classList.toggle('rotate-settings-icon');
    navbar.classList.toggle('show-navbar');
});
const li = navbar.querySelectorAll('li');
li.forEach((element)=>{
    element.onclick = function(){
        settings_button.click();
        switch(element.id){
            case "logout":
                logout();
        }
    };
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
const main = document.querySelector('main');
getApplications();
async function getApplications(){
    $.ajax({
        method:"GET",
        url:await getConfig('domain')+"php/adminpanel.php",
        success:function(res){
            if(res === "No applications found!"){
                const win = document.createElement('div');
                win.class = "noApplications";
                win.innerHTML = `<h4 style="text-align:center">No applications were found!</h4>`;
                main.appendChild(win);
                loading(false);
                return;
            }
            console.log("Response => "+res);
            const parsed = JSON.parse(res);
            parsed.forEach((obj)=>{
                const section = document.createElement('section');
                section.id = obj.username.replace(/\s+/g, '_');
                section.innerHTML = `<h1 id="fullname">${obj.fullname}</h1>
                                    <h2 class="position">${obj.designation ? obj.designation : "Unknown"}</h2>
                                    <select name="status">
                                        <option value="applied">Applied</option>
                                        <option value="shortlisted">Shortlist</option>
                                        <option value="rejected">Reject</option>
                                        <option value="offered">Offer</option>
                                        <option value="appointed">Onboard</option>
                                    </select>
                                    <div class="table-container">
                                        <table class="applicant-details">
                                        </table>
                                    </div>
                                    <button type='button'>View details</button>`;
                main.appendChild(section);
                const viewDetailsButton = section.querySelector('button');
                viewDetailsButton.addEventListener('click',()=>{
                    const tableContainer = section.querySelector('.table-container');
                    tableContainer.classList.toggle('show-applicant-details');
                });
                const statusChangeButton = section.querySelector('select');
                statusChangeButton.value = obj.status;
                statusChangeButton.addEventListener('change',()=>{
                    changeStatus(obj.username,statusChangeButton.value);
                });
                const keys = Object.keys(obj);
                const table = section.querySelector('table');
                keys.forEach((key)=>{
                    if(key !== "designation" && key !== "fullname" && key !== "username"){
                        const trow = document.createElement('tr');
                        trow.innerHTML = `<th>${key.replaceAll('_'," ")}</th>
                                        <td>${obj[key] ? obj[key] : "Unknown"}</td>`;
                        table.appendChild(trow);
                    }
                });
            });
            loading(false);
        },
        error:function(error){
            console.error(error);
            respond("&#10060; Something went wrong!");
            loading(false);
        }
    });
}

async function changeStatus(user,value){
    loading(true);
    $.ajax({
        method:"POST",
        url: await getConfig('domain')+"php/adminpanel.php",
        data:{username:user,status:value},
        success:function(res){
            respond(`&#9989; ${value}!`);
            loading(false);
        },
        error:function(error){
            console.error(error);
            respond("&#10060; Something went wrong!");
            loading(false);
        }
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
function logout(){
    const confirm = window.confirm("Are you sure want to sign out?");
    if(!confirm){
        return;
    }
    document.cookie = "admin=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
}