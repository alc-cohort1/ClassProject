/*A jQuery function to display pictures on hover*/
$(function() {
    $('#three').hover(
      function() {
        $('.img1').fadeIn();
      },
      function() {
        $('.img1').fadeOut();
      }
    );

    $('#three').hover(
        function() {
          $('.img2').fadeIn();
        },
        function() {
          $('.img2').fadeOut();
        }
      );

      $('#three').hover(
        function() {
          $('.img3').fadeIn();
        },
        function() {
          $('.img3').fadeOut();
        }
      );
      $('#three').hover(
        function() {
          $('.img4').fadeIn();
        },
        function() {
          $('.img4').fadeOut();
        }
      );
  });
  