$(()=> {
  console.log('hello');
  const $pressStart = $('#start');
  const $battleScreen = $('#battle');

  function scroll(){
    $('html,body').animate({scrollTop: $battleScreen.offset().top},'slow');
  }

  $pressStart.on('click', scroll);

});
