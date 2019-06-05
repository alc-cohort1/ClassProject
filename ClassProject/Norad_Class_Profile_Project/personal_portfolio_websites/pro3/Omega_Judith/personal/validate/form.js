



/*A function To validate form fields*/
function validation(){
    var errmessage ="";
    if(document.getElementById('userId').value == ""){
        errmessage +=' Input ID and must be numerical \n';
        document.getElementById('userId').style.borderColor = 'red';
    }

    /* Using mainly if statements to validate*/

    if(document.getElementById('password').value == ""){
        errmessage +='Pass Word Required For Security Purposes\n';
        document.getElementById('password').style.borderColor = 'red';
    }
    
    if(document.getElementById('name').value == ""){
        errmessage +=' Whats Your Name?\n';
        document.getElementById('name').style.borderColor = 'red';
    }
    
    if(errmessage !="") {
        alert(errmessage);
        return false;
    }
}
