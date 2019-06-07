
/* Below is a function and if conditions for empty afields and no space validation */
function noSpace(){
    var errmessage ="";
    if(document.getElementById('userId').value == ""){
        errmessage +='yyyyyyyyyyyyyyyyyy \n';
        document.getElementById('userId').style.borderColor = 'red';
    }

    if(document.getElementById('password').value == ""){
        errmessage +='Emayyyyyyyyyyyyyyyyyy \n';
        document.getElementById('password').style.borderColor = 'red';
    }
    
    if(document.getElementById('name').value == ""){
        errmessage +='Subjeujhefuherfiktand your chat content\n';
        document.getElementById('name').style.borderColor = 'red';
    }

    if(document.getElementById('adress').value == ""){
        errmessage +='A few linejhdujhujs from you would be great \n';
        document.getElementById('adress').style.borderColor = 'red';
    }

    if(errmessage !="") {
        alert(errmessage);
        return false;
    }
}