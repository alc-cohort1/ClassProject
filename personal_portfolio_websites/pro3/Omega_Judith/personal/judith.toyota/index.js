
/* Name validation */
function toyota(){
    var errmessage ="";
    if(document.getElementById('customer_id_input').value == ""){
        errmessage +=' yyyyyyooooo \n';
        document.getElementById('customer_id_input').style.borderColor = 'red';
    }

/*email field validation */
    if(document.getElementById('name_value_input').value == ""){
        errmessage +=' eeeeeeeeeeeeee\n';
        document.getElementById('name_value_input').style.borderColor = 'red';
    }
    /*sunjectand below text area */
    if(document.getElementById('state_input').value == ""){
        errmessage +='Sssssssssssssssssssssssss\n';
        document.getElementById('state_input').style.borderColor = 'red';
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