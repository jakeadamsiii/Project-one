$(()=> {
  console.log('hello');
  const $pressStart = $('#start');
  const $battleScreen = $('#battle');
  const $fight = $('#fight');
  const $startTheme= $('#startTheme');
  const $battleTheme= $('#battleTheme');
  const $attackBox = $('#attackBox');
  const $scratch = $('#scratch');
  const $growl = $('#growl');

  let yourHP =50;
  let opponentsHP = 50;

  console.log($startTheme);
  console.log($battleTheme);

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
    $attackBox.fadeIn();
  }
let critMultiplier=1;

  function checkForCrit(){
    let crit = Math.ceil(Math.random()*10);
    if (crit===1){
      critMultiplier=2;
    }else{
      critMultiplier=1;
    }
  }
let missMultiplier=1;
  function checkForMiss(){
    let miss = Math.ceil(Math.random()*10);
    if (miss===1){
      missMultiplier=0;
    }else{
      missMultiplier=1;
    }
  }

  // let buffMultiplier=1;
  //   function checkForBuff(){
  //     let buff = Math.ceil(Math.random()*10);
  //     if (buff===1){
  //       buffMultiplier=1.5;
  //     }else{
  //       buffMultiplier=1;
  //     }
  //   }

  function checkForWin(){
    if(yourHP <= 0 || opponentsHP<=0){

    }
  }

  function yourAttack(){
    checkForCrit();
    checkForMiss();
    // checkForBuff();
    let attackPower = 10*critMultiplier*missMultiplier;
    opponentsHP = opponentsHP - attackPower;
    console.log(opponentsHP);
    $attackBox.fadeOut();
    checkForWin();
  }

  $pressStart.on('click', scroll);
  $fight.on('click', attacks);
  $scratch.on('click', yourAttack);

});
