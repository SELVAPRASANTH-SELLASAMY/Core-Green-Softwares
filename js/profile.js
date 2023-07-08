let contact=localStorage.getItem('contact_global');
let fname,lname,rno,dob,cont,id,contChangeRequest=0;
var btn=document.querySelector('#ac_settings');
var menu1=document.querySelector('.settings');
btn.addEventListener('click',()=>{
    menu1.classList.toggle('settings_action');
});
var bgforalert=document.querySelector('.alertmsg_container');
var cancelbtn=document.querySelector('#cancel');
var changePasswordLI=document.querySelector('.ChangePasswordRequest');
var passwordChangeMenu=document.querySelector('.InnerMsg');
changePasswordLI.addEventListener('click', ()=>{
    bgforalert.classList.add('showInnerMsgBg');
    passwordChangeMenu.classList.add('showInnerMsg');
    document.getElementById('current_warn').style.visibility='hidden';
    document.getElementById('new_warn').style.visibility='hidden';
    document.getElementById('con_warn').style.visibility='hidden';
});
cancelbtn.addEventListener('click', ()=>{
    bgforalert.classList.remove('showInnerMsgBg');
    passwordChangeMenu.classList.remove('showInnerMsg');
});
var deletion1=document.querySelector('.accountDeletion');
var deletionAction=document.querySelector('.alertMsg1');
deletion1.addEventListener('click', ()=>{
    bgforalert.classList.add('showInnerMsgBg');
    deletionAction.classList.add('showInnerMsg1');
});
var cancelBtn=document.querySelector('.cancelBtn');
cancelBtn.addEventListener('click', ()=>{
    document.getElementById('wrong-pass').style.visibility='hidden';
    bgforalert.classList.remove('showInnerMsgBg');
    deletionAction.classList.remove('showInnerMsg1');
});
window.onload=function(){
    show();
    //developement
    sessionValidation();
    //developement
    var userRequest={key:contact,request:"getData"};
    $.ajax({
        url:"http://localhost/MyWebsite/php/profile.php",
        type:"POST",
        data:userRequest,
        success:function(data){
            hide();
            var parsed_data=JSON.parse(data);
            document.getElementById('user').innerHTML=parsed_data['firstname']+' '+parsed_data['lastname'];
            document.getElementById('Id').innerHTML+=parsed_data['id'];
            id=parsed_data['id'];
            localStorage.setItem("PrimaryId",id);
            document.getElementById('fname').innerHTML+=parsed_data['firstname'];
            fname=parsed_data['firstname'];
            document.getElementById('lname').innerHTML+=parsed_data['lastname'];
            lname=parsed_data['lastname'];
            document.getElementById('rno').innerHTML+=parsed_data['roll_no'];
            rno=parsed_data['roll_no'];
            document.getElementById('dob').innerHTML+=parsed_data['DOB'];
            dob=parsed_data['DOB'];
            document.getElementById('cont').innerHTML+=parsed_data['contact'];
            cont=parsed_data['contact'];
        },
        error:function(data){
            hide();
            document.querySelector('.session').style.backgroundColor='rgb(255, 78, 78)';
            document.querySelector('.changes_made').innerText="Couldn't reach the servers";
            document.querySelector('.alertmsg_container').style.display="flex";
            document.querySelector('.session').style.top="2vmin";
            setTimeout(function(){
                document.querySelector('.session').style.top="-50vmin";
                document.querySelector('.alertmsg_container').style.display="none";
            },3000);
        }
    });
    return false;
}
function logout()
{
    show();
    window.location.href='index.html';
    localStorage.setItem("logout_request",true);
    localStorage.removeItem("contact_global");
    localStorage.removeItem("PrimaryId");
    localStorage.removeItem('date');
    localStorage.removeItem('month');
    localStorage.removeItem('year');
    localStorage.removeItem('time');
    localStorage.removeItem('minute');
    return false;
}
//from here
var spinner=document.querySelector('.spinner_container');
function show(){
    spinner.classList.add('show-spinner');
}
function hide()
{
    spinner.classList.remove('show-spinner');
}//from here
function changeId()
{
    document.querySelector("#Id").innerHTML="User id can't be changed";
}
function changeFname(){
    document.querySelector("#fname").style.display="none";
    document.querySelector("#ufname").style.display="flex";
}
function changeLname()
{
    document.querySelector("#lname").style.display="none";
    document.querySelector("#ulname").style.display="flex";
}
function changeAcNum()
{
    document.querySelector("#rno").style.display="none";
    document.querySelector("#uacnum").style.display="flex";
}
function changeDob(){
    document.querySelector("#dob").style.display="none";
    document.querySelector("#uDOB").style.display="flex";
}
function changeCont(){
    document.querySelector("#cont").style.display="none";
    document.querySelector("#ucont").style.display="flex";
    contChangeRequest=1;
}
function Reload(){
    window.location.href="profile.html";
}

function updateData()
{
    show();
    let fname1=document.querySelector('#ufname').value;
    let lname1=document.querySelector('#ulname').value;
    let rno1=document.querySelector('#uacnum').value;
    let dob1=document.querySelector('#uDOB').value;
    let cont1=document.querySelector('#ucont').value;
    if(fname1=='')
    {
        fname1=fname;
    }
    if(lname1=='')
    {
        lname1=lname;
    }
    if(rno1=='')
    {
        rno1=rno;
    }
    if(dob1=='')
    {
        dob1=dob;
    }
    if(cont1=='')
    {
        cont1=cont;
    }
    $(document).ready(function(){
        let PrimaryId=localStorage.getItem('PrimaryId');
        let up_data={PrimaryId:PrimaryId,
            reqChangeCont:contChangeRequest,
            previous_contact:contact,
            request:"update",
            fname:fname1,
            lname:lname1,
            rno:rno1,
            dob:dob1,
            cont:cont1};
        $.ajax({
            type:"POST",
            url:"http://localhost/MyWebsite/php/profile.php",
            data:up_data,
            success:function(data)
            {
                hide();
                document.querySelector('.changes_made').innerText=data;
                document.querySelector('.alertmsg_container').style.display="flex";
                document.querySelector('.session').style.top="2vmin";
                if(data=="Changes saved successfully")
                {
                    document.querySelector('.session').style.backgroundColor='#029600';
                    localStorage.setItem('contact_global',cont1);
                }
                else{
                    document.querySelector('.session').style.backgroundColor='rgb(255, 78, 78)';
                }
                setTimeout(function(){
                    Reload();
                },3000);
            },
            error:function(data)
            {
                hide();
                document.querySelector('.session').style.backgroundColor='rgb(255, 78, 78)';
                document.querySelector('.changes_made').innerText="Something went wrong";
                document.querySelector('.alertmsg_container').style.display="flex";
                document.querySelector('.session').style.top="2vmin";
                setTimeout(function(){
                    Reload();
                },3000);
            }
        });
    });
    return false;
}

function changePassword(){
    show();
    var currentpassword=document.getElementById('current-password').value;
    var newpassword=document.getElementById('new-password').value;
    var confirmation=document.getElementById('con-password').value;
    var currentwarn=document.getElementById('current_warn');
    var newwarn=document.getElementById('new_warn');
    var conwarn=document.getElementById('con_warn');
    if(currentpassword=='')
    {
        hide();
        currentwarn.style.visibility='visible';
    }
    else{
        currentwarn.style.visibility='hidden';
    }
    if(newpassword=='')
    {
        hide();
        newwarn.style.visibility='visible';
    }
    else{
        newwarn.style.visibility='hidden';
    }
    if(confirmation=='')
    {
        hide();
        conwarn.innerHTML="This field couldn't be empty";
        conwarn.style.visibility='visible';
    }
    else{
        conwarn.style.visibility='hidden';
    }
    if(currentpassword!='' && newpassword!='' && confirmation!='')
    {
        if(newpassword==confirmation)
        {
            //Requesting Ajax to change password
            $(document).ready(function(){
                $.ajax({
                    type:"POST",
                    url:"http://localhost/MyWebsite/php/profile.php",
                    data:{request:"updatePassword",getFrom:contact,current:currentpassword,newpassword:newpassword},
                    success:function(data){
                        hide();
                        if(data=="password changed successfully"){
                            passwordChangeMenu.classList.remove('showInnerMsg');
                            conwarn.style.visibility='hidden';
                            document.querySelector('.session').style.backgroundColor='#029600';
                            document.querySelector('.changes_made').innerText=data;
                            document.querySelector('.alertmsg_container').style.display="flex";
                            document.querySelector('.session').style.top="2vmin";
                            setTimeout(function(){
                                document.querySelector('.session').style.top="-50vmin";
                                document.querySelector('.alertmsg_container').style.display="none";
                            },3000);
                        }
                        else{
                            conwarn.innerText=data;
                            conwarn.style.visibility='visible';
                        }
                    },
                    error:function(data)
                    {
                        hide();
                        document.querySelector('.session').style.backgroundColor='rgb(255, 78, 78)';
                        document.querySelector('.changes_made').innerText="Something went wrong";
                        document.querySelector('.alertmsg_container').style.display="flex";
                        document.querySelector('.session').style.top="2vmin";
                        setTimeout(function(){
                            document.querySelector('.session').style.top="-50vmin";
                            document.querySelector('.alertmsg_container').style.display="none";
                        },3000);
                    }
                });
            });
        }
        else{
            hide();
            conwarn.innerHTML="Passwords do not match";
            conwarn.style.visibility='visible';
            return false;
        }
    }
}

function DeleteAccount()
{
    show();
    var userPassword=document.getElementById('current-password1').value;
    $(document).ready(function(){
        $.ajax({
            type:"POST",
            url:"http://localhost/MyWebsite/php/profile.php",
            data:{account:contact,request:"delete",password:userPassword},
            success:function(data){
                hide();
                if(data=="Account deleted successfully")
                {
                    deletionAction.classList.remove('showInnerMsg1');
                    document.querySelector('.session').style.backgroundColor='#029600';
                    document.querySelector('.changes_made').innerText=data;
                    document.querySelector('.alertmsg_container').style.display="flex";
                    document.querySelector('.session').style.top="2vmin";
                    setTimeout(function(){
                        logout();
                    }, 3000);
                }
                else{
                    document.getElementById('wrong-pass').style.visibility='visible';
                }
            },
            error:function(data){
                hide();
                document.querySelector('.session').style.backgroundColor='rgb(255, 78, 78)';
                document.querySelector('.changes_made').innerText="Something went wrong";
                document.querySelector('.alertmsg_container').style.display="flex";
                document.querySelector('.session').style.top="2vmin";
                setTimeout(function(){
                    document.querySelector('.session').style.top="-50vmin";
                    document.querySelector('.alertmsg_container').style.display="none";
                }, 3000);
            }
        });
    });
}

function sessionValidation()
{
    var d=new Date();
    var date=d.getDate();
    var month=(d.getMonth()+1);
    var year=d.getFullYear();
    var time=d.getHours();
    var minute=d.getMinutes();

    var date1=localStorage.getItem('date');
    var month1=localStorage.getItem('month');
    var year1=localStorage.getItem('year');
    var time1=localStorage.getItem('time');
    var minute1=localStorage.getItem('minute');
    $(document).ready(function(){
        var datas={date1,month1,year1,time1,minute1,For:contact,date:date,month:month,year:year,time:time,minute:minute,request:"sessionValidation"};
        $.ajax({
            type:"POST",
            url:"http://localhost/MyWebsite/php/profile.php",
            data:datas,
            success:function(data)
            {
                hide();
                if(data=='Expired')
                {
                    document.querySelector('.session').style.backgroundColor='rgb(255, 78, 78)';
                    document.querySelector('.alertmsg_container').style.display="flex";
                    document.querySelector('.session').style.top="2vmin";
                    setTimeout(function(){
                        logout();
                    }, 3000);
                    return false;
                }
            },
            error:function(data)
            {
                hide();
                document.querySelector('.session').style.backgroundColor='rgb(255, 78, 78)';
                document.querySelector('.changes_made').innerText="Something went wrong";
                document.querySelector('.alertmsg_container').style.display="flex";
                document.querySelector('.session').style.top="2vmin";
                setTimeout(function(){
                    document.querySelector('.session').style.top="-50vmin";
                    document.querySelector('.alertmsg_container').style.display="none";
                }, 3000);
            }
        });
    });
}