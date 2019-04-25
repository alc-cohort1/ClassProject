// Declaration a function validate() to check the validity of the form inputs
function validate() {
  // variables to keep the form values for validation
  var name = document.contactForm.name.value;
  var email = document.contactForm.email.value;
  var comments = document.contactForm.comments.value;

  //   Checking if the name is not empty and alphabetical characters as well
  if (!name.match(/^[a-zA-Z]+$/)) {
    document.getElementById("name").innerHTML =
      "Required and must be alphabets only.";
    return false;
  } else {
    document.getElementById("name").innerHTML = "";
  }

  //   Checking if the email entered is correct
  if (/\S+@\S+/.test(email) == false) {
    document.getElementById("email").innerHTML =
      "Required and must be a valid email.";
    return false;
  } else {
    document.getElementById("email").innerHTML = "";
  }

  // Checking if the comment field is not left empty
  if (comments == "") {
    document.getElementById("comments").innerHTML = "Required";
    return false;
  } else {
    document.getElementById("comments").innerHTML = "";
    return true;
  }
}
