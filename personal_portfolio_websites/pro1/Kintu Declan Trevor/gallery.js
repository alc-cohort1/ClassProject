let sliderimages = document.querySelectorAll('.slide'), 
    arrowleft = document.querySelector('#arrow-left'),
    arrowright = document.querySelector('#arrow-right'),
    current = 0;

//This function clears all images.
function reset()
{
    for (let i = 0; i<sliderimages.length; i++) {
        sliderimages[i].style.display = 'none';
    }
}

//This function initiates the slider.
function startslide()
{
    reset();
    sliderimages[0].style.display = 'block';
}

//This function shows the previous image.
function slideleft()
{
    reset();
    sliderimages[current - 1].style.display = 'block';
    current--;
}

//This function shows the next image.
function slideright()
{
    reset();
    sliderimages[current + 1].style.display = 'block';
    current++;
}

//Left arrow click.
arrowleft.addEventListener('click', function() 
{
    if(current === 0) {
        current = sliderimages.length;
    }
    slideleft();
});

//Right arrow click.
arrowright.addEventListener('click', function() 
{
    if(current === sliderimages.length - 1) {
        current = -1;
    }
    slideright();
});

startslide();

/*
let sliderImages = document.querySelectorAll(".slide"),
  arrowLeft = document.querySelector("#arrow-left"),
  arrowRight = document.querySelector("#arrow-right"),
  current = 0;

// Clear all images
function reset() {
  for (let i = 0; i < sliderImages.length; i++) {
    sliderImages[i].style.display = "none";
  }
}

// Init slider
function startSlide() {
  reset();
  sliderImages[0].style.display = "block";
}

// Show prev
function slideLeft() {
  reset();
  sliderImages[current - 1].style.display = "block";
  current--;
}

// Show next
function slideRight() {
  reset();
  sliderImages[current + 1].style.display = "block";
  current++;
}

// Left arrow click
arrowLeft.addEventListener("click", function() {
  if (current === 0) {
    current = sliderImages.length;
  }
  slideLeft();
});

// Right arrow click
arrowRight.addEventListener("click", function() {
  if (current === sliderImages.length - 1) {
    current = -1;
  }
  slideRight();
});

startSlide();
