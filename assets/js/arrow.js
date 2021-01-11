$(document).ready(function(){
  $(window).scroll(function(){
    if($(this).scrollTop() > 1140){
      $('.btn').fadeIn();
    }else {
      $('.btn').fadeOut();
    }
  });

  $('.btn').click(function(){
    $('html, body').animate({scrollTop : 0}, 700);
  });
});
