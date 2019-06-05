

/* Name validation */
function contact(){
    var errmessage ="";
    if(document.getElementById('name').value == ""){
        errmessage +='Name is missing \n';
        document.getElementById('name').style.borderColor = 'red';
    }

    /*email field validation */
    if(document.getElementById('email').value == ""){
        errmessage +='Email records required \n';
        document.getElementById('name').style.borderColor = 'red';
    }
    /*subject and below is a text area if condition*/
    if(document.getElementById('subject').value == ""){
        errmessage +='Subject helps us understand your chat content\n';
        document.getElementById('subject').style.borderColor = 'red';
    }

    if(document.getElementById('area').value == ""){
        errmessage +='A few lines from you would be great \n';
        document.getElementById('area').style.borderColor = 'red';
    }

    if(errmessage !="") {
        alert(errmessage);
        return false;
    }
}
