
		var slideIndex = 0;
showSlides();

// Next/previous controls
function plusSlides(n) {
	var slideIndex = 1;
showSlides(slideIndex);
  showSlides(slideIndex += n);
}
// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");// return an html collection object with all elements  with classname "myslides"
  
  var dots = document.getElementsByClassName("dot");
  /*   .length defines the number of elements in the html collection
  */
 for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  //display no image
  }
  slideIndex++;
 
  //checks if the slide index is greater than the length.if it is greater assigns slide index value 1
  if (slideIndex > slides.length)
   {
   	slideIndex = 1
   }   
for (i = 0; i < dots.length; i++) {

    dots[i].className = dots[i].className.replace(" active", "");
  }
 slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  //call the function 'showSlides' after 2 seconds
  setTimeout(showSlides, 3000); // Change image every 2 seconds
}

//refference slider

var slide_Index = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("refSlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none"; 
  }
  slide_Index++;
  if (slide_Index > x.length) {slide_Index = 1} 
  x[slide_Index-1].style.display = "block"; 
  setTimeout(carousel, 4000); 
}

