$(window).on("scroll", function() {
    if($(window).scrollTop()) {
        $('nav').addClass('sticky-add');
    }

    else {
        $('nav').removeClass('sticy-add');
    }
})

