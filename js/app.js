$(()=> {
  const $pressStart = $('#start');
  const $battleScreen = $('#battle');
  const $fight = $('#fight');
  const $startTheme= $('#startTheme');
  const $battleTheme= $('#battleTheme');
  const $attackBox = $('#attackBox');
  const $textBox = $('#textBox');
  const $scratch = $('#scratch');
  const $growl = $('#growl');
  const $winScreen = $('#winScreen');
  const $playAgain = $('#playAgain');
  const $winLose = $('#winLose');
  const $oppHPBar= $('#opponentshealth');
  const $yourHPBar= $('#yourhealth');
  const $yourTotal = $('#hitPointTotal');
  const $yourCurrent = $('#hitPointCurrent');

  let you = 'CHARMANDER';
  let rival = 'SQUIRTLE';
  let attack = '';

  $('#yourName').html(`${you}`);
  $('#rivalName').html(`${rival}`);

  const yourTotalHP = 50;
  let yourHP =50;
  let opponentsHP = 50;

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
      $textBox.show();
      $textBox.html(`${you} landed a critical hit!`);
      console.log('crit');
      setTimeout(function(){$textBox.fadeOut(100);}, 4000);
      critMultiplier=2;
    }else{
      critMultiplier=1;
    }
  }

  let missMultiplier=1;
  function checkForMiss(){
    const miss = Math.ceil(Math.random()*10);
    if (miss===1){
      $textBox.show();
      $textBox.html(`${you}'s attack missed!`);
      setTimeout(function(){$textBox.fadeOut(100);}, 4000);
      missMultiplier=0;
      console.log('missed');
    }else{
      missMultiplier=1;
    }
  }

  let yourBuffClicks = 1;
  function buffCalculator(){
    yourBuffClicks = yourBuffClicks+0.5;
    $attackBox.fadeOut();
    console.log(yourBuffClicks);
    you ='CHARMANDER';
    attack = 'GROWL';
    youUsedAttack();
    setTimeout(opponentsAttack, 2000);
  }

  let buff=1;
  function checkForYourBuff(){
    buff = 1 * yourBuffClicks;
    console.log(buff);
  }

  function checkForWin(){
    if(opponentsHP <= 0){
      $winLose.html('You Win!');
      $winScreen.fadeIn(1000);
    }else if(yourHP <= 0){
      $winLose.html('You Lose!');
      $winScreen.fadeIn(1000);
    }
  }

  function opponentsAttack(){
    you = 'SQUIRTLE';
    attack = 'TACKLE';
    youUsedAttack();
    checkForCrit();
    checkForMiss();
    // checkForBuff();
    let opAttackPower = 10*critMultiplier*missMultiplier;
    yourHP = yourHP - opAttackPower;
    console.log(yourHP);
    if(yourHP < 0){
      yourHP = 0;
    }

    yourHealthReduction();
    checkForWin();
  }

  function yourAttack(){
    you = 'CHARMANDER';
    attack = 'SCRATCH';
    youUsedAttack();
    checkForCrit();
    checkForMiss();
    checkForYourBuff();
    let attackPower = 10*critMultiplier*missMultiplier*buff;
    opponentsHP = opponentsHP - attackPower;
    console.log(opponentsHP);
    $attackBox.fadeOut();
    rivalHealthReduction();
    checkForWin();
    setTimeout(opponentsAttack, 2000);
  }

  function youUsedAttack(){
    $textBox.show();
    $textBox.html(`${you}<br>used ${attack}!`)
    setTimeout(function(){$textBox.fadeOut(100);}, 4000);
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
    $oppHPBar.animate({width: '20.7%'}, 100 );
    $yourHPBar.animate({width: '20.7%'}, 100 );
    $yourCurrent.html(`${yourTotalHP}`);
  }


  function rivalHealthReduction(){
    let oppWidth = opponentsHP*0.414;
    $oppHPBar.animate({width: `${oppWidth}%`}, 500 );
  }


  $yourTotal.html(`${yourTotalHP}`);
  $yourCurrent.html(`${yourHP}`);

  function yourHealthReduction(){
    let yourWidth = yourHP*0.414;
    $yourHPBar.animate({width: `${yourWidth}%`}, 500 );
    $yourCurrent.html(`${yourHP}`);
  }

  $pressStart.on('click', scroll);
  $fight.on('click', attacks);
  $scratch.on('click', yourAttack);
  $growl.on('click', buffCalculator);
  $playAgain.on('click', restartBattle);
});
