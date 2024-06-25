const buttons = [document.getElementById('android-developer-role'),document.getElementById('web-developer-role'),document.getElementById('asengineer-role')];
const jobdesc = [document.getElementById('android-developer'),document.getElementById('web-developer'),document.getElementById('ASEngineer')];

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

var position = buttons[0].innerText;
function toggleDescription(show,hide){
    if(show !== hide){
        jobdesc[show].style.display = 'block';
        jobdesc[hide].style.display = 'none';
        buttons[show].classList.add('active-tab');
        buttons[hide].classList.remove('active-tab');
        position = buttons[show].innerText;
    }
}

function gotoProfile(){
    window.location.href = `/profile.html?pos=${position}`;
}