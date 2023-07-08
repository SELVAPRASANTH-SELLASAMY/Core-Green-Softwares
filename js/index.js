window.onload=function(){
    var getTheme=localStorage.getItem('AppliedTheme');
    if(getTheme=="dark")
    {
        darkmode();
    }
    else
    {
        brightmode();
    }
}
var hamburger=document.querySelector('.mobile_menu');
var menu=document.querySelector('nav');
hamburger.addEventListener('click', ()=>{
    menu.classList.add('display_mobile_menu');
});
var close=document.querySelector('.close');
close.addEventListener('click', ()=>{
    menu.classList.remove('display_mobile_menu');
});
var abt=document.querySelector('.menu1');
var abt_sub=document.querySelector('.abt_sub_menu');
abt.addEventListener('click',()=>{
    abt_sub.classList.toggle('display_sub_menu');
});
var theme=document.querySelector('.menu2');
var theme_sub=document.querySelector('.theme_sub_menu');
theme.addEventListener('click',()=>{
    theme_sub.classList.toggle('display_sub_menu');
});
var log=document.querySelector('.menu3');
var log_sub=document.querySelector('.login_sub_menu');
log.addEventListener('click',()=>{
    log_sub.classList.toggle('display_sub_menu');
});
function loginPage(){
    let req=localStorage.getItem('contact_global');
    if(req==null || req=='null'){
        window.location.href='login.html';
    }
    else{
        window.location.href='profile.html';
    }
}
function registerPage(){
    window.location.href='register.html';
}
function sendMail(){
    window.location.href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJqZjBVlhxgksRhbBWFDRLfqvgpFrVfDJmSQPxZCNDGmJgxbTbzHCBdMvPCkrzTgrlMjWnV";
}
function visit_profile(){
    window.location.href="https://www.linkedin.com/in/selvaprasanth-s-371898248";
}
function contact_viaTelegram(){
    window.location.href="https://www.t.me/s/SELVAPRASANTHS";
}
function instagram_profile(){
    window.location.href="https://instagram.com/prasanth_sellasamy?igshid=ZDdkNTZiNTM=";
}
function facebook_profile(){
    window.location.href="https://m.facebook.com/selvaprasanth.sellachamy";
}
function darkmode(){
    localStorage.setItem("AppliedTheme","dark");
    document.querySelector('body').style.backgroundColor="rgba(0, 0, 0, 0.834)";
    const contents=document.querySelectorAll('.content');
    for(let i=0;i<contents.length;i++)
    {
        contents[i].style.backgroundColor="#004D40";
        contents[i].style.color="white";
    }
    const about1=document.querySelectorAll('#abt_frame');
    for(let j=0;j<about1.length;j++)
    {
        about1[j].style.backgroundColor="#00695C";
        about1[j].style.color="white";
        about1[j].style.borderColor='white';
    }
    document.querySelector('.work_flow_heading').style.color="white";
    const color_for_role=document.querySelectorAll('.role');
    for(let k=0;k<color_for_role.length;k++)
    {
        color_for_role[k].style.backgroundColor="#004D40";
        color_for_role[k].style.color="white";
    }
    const job_name_color=document.querySelectorAll('#job_name');
    for(let l=0;l<job_name_color.length;l++)
    {
        job_name_color[l].style.backgroundColor="#00695C";
        job_name_color[l].style.color="white";
    }
    document.querySelector('.site_information').style.backgroundColor="#004D40";
    document.querySelector('.site_information').style.color="white";
    const job_border=document.querySelectorAll('#job_name');
    for(let m=0;m<job_border.length;m++)
    {
        job_border[m].style.borderColor="white";
    }
}
function brightmode(){
    localStorage.setItem("AppliedTheme","bright");
    document.querySelector('body').style.backgroundColor="white";
    const contents=document.querySelectorAll('.content');
    for(let i=0;i<contents.length;i++)
    {
        contents[i].style.backgroundColor="rgb(228, 255, 228)";
        contents[i].style.color="black";
    }
    const about1=document.querySelectorAll('#abt_frame');
    for(let j=0;j<about1.length;j++)
    {
        about1[j].style.backgroundColor="rgb(198, 255, 198)";
        about1[j].style.color="black";
        about1[j].style.borderColor='black';
    }
    document.querySelector('.work_flow_heading').style.color="black";
    const color_for_role=document.querySelectorAll('.role');
    for(let k=0;k<color_for_role.length;k++)
    {
        color_for_role[k].style.backgroundColor="rgb(228, 255, 228)";
        color_for_role[k].style.color="black";
    }
    const job_name_color=document.querySelectorAll('#job_name');
    for(let l=0;l<job_name_color.length;l++)
    {
        job_name_color[l].style.backgroundColor="rgb(198, 255, 198)";
        job_name_color[l].style.color="black";
    }
    document.querySelector('.site_information').style.backgroundColor="rgb(228, 255, 228)";
    document.querySelector('.site_information').style.color="black";
    const job_border=document.querySelectorAll('#job_name');
    for(let m=0;m<job_border.length;m++)
    {
        job_border[m].style.borderColor="black";
    }
}