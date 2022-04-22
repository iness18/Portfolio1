$(document).ready(function(){
  $(window).scroll(function(){
    if($(this).scrollTop() < 1140){
      $('.btn').fadeOut();
    }else {
      $('.btn').fadeIn();
    }
  });

  $('.btn').click(function(){
    $('html, body').animate({scrollTop : 0}, 700);
  });
});
