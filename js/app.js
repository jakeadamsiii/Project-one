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
  const $winScreen = $('#winScreen');
  const $playAgain = $('#playAgain');
  const $winLose = $('#winLose');

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
    const crit = Math.ceil(Math.random()*10);
    if (crit===1){
      critMultiplier=2;
    }else{
      critMultiplier=1;
    }
  }
  let missMultiplier=1;
  function checkForMiss(){
    const miss = Math.ceil(Math.random()*10);
    if (miss===1){
      missMultiplier=0;
    }else{
      missMultiplier=1;
    }
  }

  let yourBuffClicks = 1;
  function buffCalculator(){
    yourBuffClicks = yourBuffClicks+0.5;
    $attackBox.fadeOut();
    console.log(yourBuffClicks);
    opponentsAttack();
  }

  let buff=1;
  function checkForYourBuff(){
    buff = 1 * yourBuffClicks;
    console.log(buff);
  }

  function checkForWin(){
    if(yourHP <= 0){
      $winLose.html('You Lose!');
      $winScreen.fadeIn(1000);
    }else if(opponentsHP <= 0){
      $winLose.html('You Win!');
      $winScreen.fadeIn(1000);
    }
  }

  function opponentsAttack(){
    checkForCrit();
    checkForMiss();
    // checkForBuff();
    let opAttackPower = 10*critMultiplier*missMultiplier;
    yourHP = yourHP - opAttackPower;
    console.log(yourHP);
    checkForWin();
  }

  function yourAttack(){
    checkForCrit();
    checkForMiss();
    checkForYourBuff();
    let attackPower = 10*critMultiplier*missMultiplier*buff;
    opponentsHP = opponentsHP - attackPower;
    console.log(opponentsHP);
    $attackBox.fadeOut();
    checkForWin();
    opponentsAttack();
  }

  function restartBattle(){
    buff=1;
    yourBuffClicks =1;
    yourHP =50;
    opponentsHP =50;
    $winScreen.fadeOut(400);
    $battleTheme[0].pause();
    $startTheme[0].pause();
    $battleTheme[0].currentTime = 0;
    $battleTheme[0].play();
  }

  $pressStart.on('click', scroll);
  $fight.on('click', attacks);
  $scratch.on('click', yourAttack);
  $growl.on('click', buffCalculator);
  $playAgain.on('click', restartBattle);
});
