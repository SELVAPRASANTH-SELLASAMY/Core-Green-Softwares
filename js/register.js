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
function registration(){
    show();
    const fname1=document.getElementById('fname').value;
    const lname1=document.getElementById('lname').value;
    const r_no1=document.getElementById('r_no').value;
    const dob1=document.getElementById('dob').value;
    const contact1=document.getElementById('contact').value;
    const pass1=document.getElementById('pass1').value;
    const conpass1=document.getElementById('pass2').value;
    if(fname1=='')
    {
        document.getElementById('warn_fname').style.visibility='visible';
    }
    if(fname1!='')
    {
        document.getElementById('warn_fname').style.visibility='hidden';
    }
    if(lname1=='')
    {
        document.getElementById('warn_lname').style.visibility='visible';
    }
    if(lname1!='')
    {
        document.getElementById('warn_lname').style.visibility='hidden';
    }
    if(r_no1=='')
    {
        document.getElementById('warn_rno').style.visibility='visible';
    }
    if(r_no1!='')
    {
        document.getElementById('warn_rno').style.visibility='hidden';
    }
    if(dob1=='')
    {
        document.getElementById('warn_dob').style.visibility='visible';
    }
    if(dob1!='')
    {
        document.getElementById('warn_dob').style.visibility='hidden';
    }
    if(contact1=='')
    {
        document.getElementById('warn_cont').style.visibility='visible';
    }
    if(contact1!='')
    {
        document.getElementById('warn_cont').style.visibility='hidden';
    }
    if(pass1=='')
    {
        document.getElementById('warn_pass').style.visibility='visible';
    }
    if(pass1!='')
    {
        document.getElementById('warn_pass').style.visibility='hidden';
    }
    if(conpass1=='')
    {
        document.getElementById('warn_conpass').style.visibility='visible';
    }
    if(conpass1!='')
    {
        document.getElementById('warn_conpass').style.visibility='hidden';
    }
    if(fname1=='' || lname1=='' || r_no1=='' || dob1=='' || contact1=='' || pass1=='' || conpass1=='')
    {
        hide();
        return false;
    }
    else
    {
        if(pass1!=conpass1)
        {
            hide();
            document.getElementById('warn_conpass').innerHTML="Passwords do not match";
            document.getElementById('warn_conpass').style.visibility='visible';
        }
        else
        {
            var d=new Date();
            var date=d.getDate();
            var month=(d.getMonth()+1);
            var year=d.getFullYear();
            var time=d.getHours();
            var minute=d.getMinutes();
            var userdata={fname:fname1,
                lname:lname1,
                r_no:r_no1,
                dob:dob1,
                contact:contact1,
                pass:pass1,
                date:date,month:month,year:year,time:time,minute:minute};
            $(document).ready(function(){
                $.ajax({
                    type:"POST",
                    url:"http://localhost/MyWebsite/php/register.php",
                    data:userdata,
                    success: (data) =>{
                        hide();
                        if(data=="duplicate"){
                            document.getElementById('warn_cont').innerHTML="This number already has an account";
                            document.getElementById('warn_cont').style.color='red';
                            document.getElementById('warn_cont').style.visibility='visible';
                            return false;
                        }
                        success_visibility();
                    },
                    error :(data) =>{
                        hide();
                        error_visibility();
                    },
                });
            });
        }
    }
    return false;
}
function success_visibility(){
    document.getElementById('success_msg').style.visibility='visible';
}
function error_visibility(){
    document.getElementById('success_msg').innerHTML="OOPS! couldn't reach the servers";
    document.getElementById('success_msg').style.color='red';
    document.getElementById('success_msg').style.visibility='visible';
}
function dark(){
    document.querySelector('.right').style.backgroundColor="rgba(0, 0, 0, 0.603)";
    var inp=document.querySelectorAll('input');
    var forDate=document.getElementById('dob');
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
    forDate.onfocus=function(){
        forDate.type='date';
    }
    forDate.onblur=function(){
        forDate.type='text';
    }
    document.getElementById('success_msg').style.color='rgb(0, 232, 0)';
}
function bright(){
    document.querySelector('.right').style.backgroundColor="white";
}