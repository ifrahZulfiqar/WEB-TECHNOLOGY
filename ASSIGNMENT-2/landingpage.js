$(document).ready(function() {
    // Get the maximum height among all carousel images
    var maxHeight = 0;
    $('.carousel-item img').each(function() {
      var imgHeight = $(this).height();
      if (imgHeight > maxHeight) {
        maxHeight = imgHeight;
      }
    });
  
    // Set the maximum height to all carousel images
    $('.carousel-item img').height(maxHeight);
  });
  