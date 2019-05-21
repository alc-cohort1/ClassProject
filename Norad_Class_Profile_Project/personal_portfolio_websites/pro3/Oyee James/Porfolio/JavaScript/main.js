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
}