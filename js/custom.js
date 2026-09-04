(function ($) {
  "use strict";

  // COUNTER NUMBERS
  if (jQuery().appear && jQuery().countTo) {
    jQuery('.counter-thumb').appear(function() {
      jQuery('.counter-number').countTo();
    });
  }
  
  // SMOOTH SCROLL
  $('.smoothscroll').click(function(e){
    e.preventDefault();
    var el = $(this).attr('href');
    var elWrapped = $(el);
    if (elWrapped.length) {
      var header_height = $('.navbar').outerHeight() || 70;
      var offsetTop = elWrapped.offset().top;
      var totalScroll = offsetTop - header_height;

      $('body,html').animate({
        scrollTop: totalScroll
      }, 400);
    }
  });

  // SCROLL TO TOP BUTTON
  $(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
      $('#scrollToTopBtn').addClass('visible');
    } else {
      $('#scrollToTopBtn').removeClass('visible');
    }
  });

  $('#scrollToTopBtn').click(function(e) {
    e.preventDefault();
    $('body,html').animate({ scrollTop: 0 }, 400);
  });

})(window.jQuery);


