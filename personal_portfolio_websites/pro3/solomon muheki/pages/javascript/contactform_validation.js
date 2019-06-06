    
            
    <!--
        // Validation function that checks for all the fields of the HTML Registration form when submitted.
        function validate() {
        

        // Variable to check whether the name input field has alphabets only.
        var name = document.myform.Name.value;
        if (!name.match(/^[A-Za-z]+$/)) {
            document.getElementById("name_error").innerHTML="<b>Required and alphabets only.</b>";
            return false;
        }
        
       

      
        // Variable to check whether the email input field is valid. 
        var email = document.myform.email.value;
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) == false){
                    document.getElementById("email_error").innerHTML="<b>Required. Must be a valid email</b>";
            return false;
                }


           // Variable to check whether the comment input field has alphabets only.
        var comm = document.myform.comment.value;
        if ( comm==null || comm==""){
            document.getElementById("comm_error").innerHTML="<b>Required .</b>";
            return false;
        }
                
     
     
 
               } 
    -->              
    
        