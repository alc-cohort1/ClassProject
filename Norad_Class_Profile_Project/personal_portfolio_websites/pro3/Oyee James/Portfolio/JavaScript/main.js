function validate (){
    var name = document.contactMe.name.value;
    var email = document.contactMe.email.value;
    var comments = document.contactMe.comments.value;
    
    if(name==""||!isNaN(name)){
        document.getElementById("name").innerHTML="Required. Please provide a valid name*";
    }
    if (/\S+@\S+/.test(email) == false|| email==""){
        document.getElementById("email").innerHTML="Required. Please provide a valid email*";
        }
    if(comments==""||!isNaN(comments)){
        document.getElementById("comments").innerHTML="Required. Please leave a comment*";
    }
}