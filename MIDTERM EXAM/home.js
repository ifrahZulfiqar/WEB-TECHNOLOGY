document.addEventListener('DOMContentLoaded', function() {
    var imgs = document.querySelectorAll('img');
  
    imgs.forEach(function(img) {
      img.addEventListener('click', function() {
        var src = img.getAttribute('src'); 
        var navLink = document.querySelector('nav a'); 
        navLink.setAttribute('href', src); 
        return false; 
      });
    });
  });
  