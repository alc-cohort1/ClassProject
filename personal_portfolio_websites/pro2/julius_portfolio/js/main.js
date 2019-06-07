// Select DOM Items
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const menuNav = document.querySelector(".menu-nav");
const menuBranding = document.querySelector(".menu-branding");
const navItems = document.querySelectorAll(".nav-item");

// Set Initial State Of Menu
let showMenu = false;

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add("close");
    menu.classList.add("show");
    menuNav.classList.add("show");
    menuBranding.classList.add("show");
    navItems.forEach(item => item.classList.add("show"));

    // Set Menu State
    showMenu = true;
  } else {
    menuBtn.classList.remove("close");
    menu.classList.remove("show");
    menuNav.classList.remove("show");
    menuBranding.classList.remove("show");
    navItems.forEach(item => item.classList.remove("show"));

    // Set Menu State
    showMenu = false;
  }
}

// The function to validate the message form values
function validate() {
  // variables for keeping the form values
  const name = document.messageForm.name.value;
  const email = document.messageForm.email.value;
  const message = document.messageForm.message.value;

  // checking the name, email and messages are provided and are also correct
  if (!name.match(/^[a-zA-Z]+$/)) {
    document.getElementById("name").innerHTML = "Enter a correct name.";
    return false;
  } else if (/\S+@\S+/.test(email) === false) {
    document.getElementById("email").innerHTML =
      "Enter a correct email address";
    return false;
  } else if (message.length < 5) {
    document.getElementById("message").innerHTML =
      "Enter a reasonable message!";
    return false;
  } else {
    // return true when all the form values passed the validation
    return true;
  }
}
