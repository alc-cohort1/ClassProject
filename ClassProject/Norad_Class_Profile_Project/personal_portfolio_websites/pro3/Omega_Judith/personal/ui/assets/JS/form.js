function validate(){
    var errmessage ="";
    if(document.getElementById('userId').value == ""){
        errmessage +='Secury Identifier Required \n';
        document.getElementById('userId').style.borderColor = 'red';
    }
    if(document.getElementById('password').value == ""){
        errmessage +='Your Password, Your security \n';
        document.getElementById('password').style.borderColor = 'red';
    }
    if(document.getElementById('name').value == ""){
        errmessage +='Whats Your Name?\n';
        document.getElementById('name').style.borderColor = 'red';
    }
    if(document.getElementById('address').value == ""){
        errmessage +='Where Do You Stay? \n';
        document.getElementById('address').style.borderColor = 'red';
    }
    if(document.getElementById('country').value == ""){
        errmessage +='Nationality \n';
        document.getElementById('country').style.borderColor = 'red';
    }
    if(document.getElementById('zip').value == ""){
        errmessage +='Punch In Your Zip Code \n';
        document.getElementById('zip').style.borderColor = 'red';
    }
    if(document.getElementById('email').value == ""){
        errmessage +='Your Email Address Helps Us Get Back To You? \n';
        document.getElementById('email').style.borderColor = 'red';
    }
    if(document.getElementById('gender').value == ""){
        errmessage +='Tick One Of The Radio Buttons For Your Gender Preference \n';
        document.getElementById('gender').style.borderColor = 'red';
    }
    if(document.getElementById('language').value == ""){
        errmessage +='Do You Speak English? \n';
        document.getElementById('language').style.borderColor = 'red';
    }
    if(document.getElementById('area').value == ""){
        errmessage +='Write to us \n';
        document.getElementById('area').style.borderColor = 'red';
    }
    
    if(errmessage !="") {
        alert(errmessage);
        return false;
    }

 }
