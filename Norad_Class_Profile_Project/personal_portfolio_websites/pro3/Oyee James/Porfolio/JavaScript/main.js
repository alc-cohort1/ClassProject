<<<<<<< HEAD
//This function validates all the various inputs
function validate (){
    
    //Assigning variables for storing various inputs
    var name = document.contactMe.name.value;
    var email = document.contactMe.email.value;
    var comments = document.contactMe.comments.value;
    
    //Checking if the name input field is empty or is not a number 
    if(name==""||!isNaN(name)){
        document.getElementById("name").innerHTML="Required. Please provide a valid name*";
        }else{
        document.getElementById("name").innerHTML="";
    }

    //Checking if email input is enered in the right formate
    if (/\S+@\S+/.test(email) == false|| email==""){
        document.getElementById("email").innerHTML="Required. Please provide a valid email*";
        }else{
        document.getElementById("email").innerHTML="";
    }

    //Check if comment input field is empty or is not a number
    if(comments==""||!isNaN(comments)){
        document.getElementById("comments").innerHTML="Required. Please leave a comment*"
        }else{
        document.getElementById("comments").innerHTML="";
    }
=======
function validate (){
    var name = document.contactMe.name.value;
    var email = document.contactMe.email.value;
    var comments = document.contactMe.comments.value;
    
    if(name==""||!isNaN(name)){
        document.getElementById("name").innerHTML="Required. Please provide a valid name*";
        }else{
        document.getElementById("name").innerHTML="";
    }
    if (/\S+@\S+/.test(email) == false|| email==""){
        document.getElementById("email").innerHTML="Required. Please provide a valid email*";
        }else{
        document.getElementById("email").innerHTML="";
    }
    if(comments==""||!isNaN(comments)){
        document.getElementById("comments").innerHTML="Required. Please leave a comment*"
        }else{
        document.getElementById("comments").innerHTML="";
    }
>>>>>>> 4b5d27f741c391f76eb7a794c2fb5c1f0ad9754e
}