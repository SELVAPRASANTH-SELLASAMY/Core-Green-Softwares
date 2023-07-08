window.onload=function(){
    let theme=localStorage.getItem("AppliedTheme");
    if(theme=="dark")
    {
        dark();
    }
    else{
        bright();
    }
}
var spinner=document.querySelector('.spinner_container');
function show(){
    spinner.classList.add('show-spinner');
}
function hide()
{
    spinner.classList.remove('show-spinner');
}
function validate() {
    const cont1=document.getElementById('contact').value;
    const pass1=document.getElementById('pass').value;
    show();
    if(cont1=='')
    {
        document.getElementById('cont_warn').style.visibility='visible';
        hide();
    }
    if(cont1!='')
    {
        document.getElementById('cont_warn').style.visibility='hidden';
    }
    if(pass1=='')
    {
        document.getElementById('pass_warn').style.visibility='visible';
        hide();
    }
    if(pass1!='')
    {
        document.getElementById('pass_warn').style.visibility='hidden';
    }
    if(cont1=='' || pass1=='')
    {
        return false;
    }
    else
    {
        $(document).ready(function(){
            var d=new Date();
            var date=d.getDate();
            var month=(d.getMonth()+1);
            var year=d.getFullYear();
            var time=d.getHours();
            var minute=d.getMinutes();
            localStorage.setItem('date',date);
            localStorage.setItem('month',month);
            localStorage.setItem('year',year);
            localStorage.setItem('time',time);
            localStorage.setItem('minute',minute);

            const user_input={contact1:cont1,password1:pass1,date:date,month:month,year:year,time:time,minute:minute};
            $.ajax({
                url:"http://localhost/MyWebsite/php/login.php",
                type:"POST",
                data:user_input,
                success:function(data){
                    hide();
                    if(data=="Account not found"){
                        document.getElementById('res_msg').innerHTML="Account not found";
                        document.getElementById('res_msg').style.visibility='visible';
                    }
                    else if(data=="Logged in"){
                        localStorage.setItem("contact_global", cont1);
                        window.location.href='profile.html';
                    }
                    else if(data=="Invalid password"){
                        document.getElementById('res_msg').innerHTML="invalid username or password";
                        document.getElementById('res_msg').style.visibility='visible';
                    }
                    else if(data=="Invalid input"){
                        document.getElementById('res_msg').innerHTML="please provide the valid input";
                        document.getElementById('res_msg').style.visibility='visible';
                    }
                    else{
                        document.getElementById('res_msg').innerHTML="internal server error "+data;
                        document.getElementById('res_msg').style.visibility='visible';
                    }
                },
                error:function(data){
                    document.getElementById('res_msg').innerHTML="Couldn't reach the servers";
                    document.getElementById('res_msg').style.visibility='visible';
                    hide();
                }
            });
        });
    }
    return false;
}
function dark(){
    document.querySelector('.right').style.backgroundColor="rgba(0, 0, 0, 0.603)";
    document.getElementById('or').style.color="white";
    var inp=document.querySelectorAll('input');
    for(let i=0;i<inp.length;i++){
        inp[i].style.border='0.15vmin solid white';
        inp[i].onfocus=function(){
        inp[i].style.borderColor="rgb(0, 102, 255)";}
        inp[i].onblur=function(){
            inp[i].style.border='0.15vmin solid white';
        }
        inp[i].style.color='white';
        inp[i].style.backgroundColor='rgba(0, 0, 0, 0.603)';
    }
}
function bright(){
    document.querySelector('.right').style.backgroundColor="white";
    document.getElementById('or').style.color="black";
}