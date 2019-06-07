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