$(()=> {
  console.log('hello');
  const $pressStart = $('#start');
  const $battleScreen = $('#battle');
  const $fight = $('#fight');
  const $startTheme= $('#startTheme');
  const $battleTheme= $('#battleTheme');

  let yourHP =50;
  let opponentsHP =50;

  console.log($startTheme);
  console.log($battleTheme);

  function fight(){
    if (yourHP > 0 && opponentsHP>0){

    }
  }

  //scroll from landing page to battle page
  function scroll(){
    $('html,body').animate({scrollTop: $battleScreen.offset().top},'slow');
    battleMusic();
  }

  function battleMusic(){
    $startTheme[0].pause();
    $battleTheme[0].play();
  }

  function attacks(){

  }


  $pressStart.on('click', scroll);
  $fight.on('click', attacks);

});
