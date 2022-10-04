$(document).ready(function(){
  $('.btn').hide();
  $(window).scroll(function(){
    if($(this).scrollTop() < 1000){
      $('.btn').fadeOut();
    }else {
      $('.btn').fadeIn();
    }
  });

  $('.btn').click(function(){
    $('html, body').animate({scrollTop : 0}, 700);
  });
});
