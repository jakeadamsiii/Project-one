$(()=> {
  console.log('hello');
  const $pressStart = $('#start');
  const $battleScreen = $('#battle');
  const $fight = $('#fight');
  let yourHP =50;
  let opponentsHP =50;

  function fight(){
    if (yourHP > 0 && opponentsHP>0){

    }
  }

  //scroll from landing page to battle page
  function scroll(){
    $('html,body').animate({scrollTop: $battleScreen.offset().top},'slow');
  }



  $pressStart.on('click', scroll);

});
