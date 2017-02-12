$(()=> {
  const $pressStart = $('#start');
  const $battleScreen = $('#battle');
  const $fight = $('#fight');
  const $item = $('#item');
  const $run = $('#run');
  const $startTheme= $('#startTheme');
  const $battleTheme= $('#battleTheme');
  const $attackBox = $('#attackBox');
  const $itemBox = $('#itemBox');
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
  const $yourScore = $('#yourScore');
  const $rivalScore = $('#rivalScore');
  const $you = $('#you');
  const $rival = $('#opponent');
  const $scratchAnimation = $('#scratchAnimation');
  const $growlAnimation = $('#growlAnimation');
  const $batteryLight = $('#light');
  const $offScreen = $('#offScreen');
  const $firstPointer =$('#startscreenPointer');
  const $fightPointer =$('#fightPointer');
  const $itemPointer =$('#itemPointer');
  const $runPointer =$('#runPointer');
  const $scratchPointer =$('#scratchPointer');
  const $growlPointer =$('#growlPointer');


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
      hit =false;
      $textBox.show();
      $textBox.html(`${you}'s attack missed!`);
      setTimeout(function(){$textBox.fadeOut(100);}, 4000);
      missMultiplier=0;
      console.log('missed');
    }else{
      missMultiplier=1;
      hit =true;
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
    attackAnimation();
    setTimeout(opponentsAttack, 2000);
  }

  let buff=1;
  function checkForYourBuff(){
    buff = 1 * yourBuffClicks;
    console.log(buff);
  }

  let rivalBuff=1;
  function checkForRivalBuff(){
    rivalBuff = 1 * rivalBuffClicks;
    console.log(rivalBuff);
  }

  let rivalBuffClicks = 1;
  function rivalBuffCalculator(){
    rivalBuffClicks = rivalBuffClicks+0.5;
    checkForRivalBuff()
  }

  let wins=0;
  let losses=0;
  function checkForWin(){
    if(opponentsHP <= 0){
      $winLose.html('You Win!');
      $winScreen.fadeIn(1000);
      wins++;
      $yourScore.html(wins);
      $batteryLight.css({'background': '#272424'});
      setTimeout(offScreenFadeIn, 1000);
    }else if(yourHP <= 0){
      $winLose.html('You Lose!');
      $winScreen.fadeIn(1000);
      losses++;
      $rivalScore.html(losses);
      setTimeout(offScreenFadeIn, 1000);
      $batteryLight.css({'background': '#272424'});
    }
  }

  function offScreenFadeIn(){
    $offScreen.fadeIn(400);
  }

  function checkAttack(){
    let rivalAttack = Math.ceil(Math.random()*3);
    if (rivalAttack === 1||rivalAttack === 2){
      attack='TACKLE';
      youUsedAttack();
      checkForCrit();
      checkForMiss();
      checkForRivalBuff();
      attackAnimation();
      let opAttackPower = 10*critMultiplier*missMultiplier*rivalBuff;
      yourHP = yourHP - opAttackPower;
    }else{
      attack='TAIL WHIP';
      youUsedAttack();
      rivalBuffCalculator();
      attackAnimation();
    }
  }

  function opponentsAttack(){
    you = 'SQUIRTLE';
    attack = '';
    checkAttack();
    console.log(yourHP);
    if(yourHP < 0){
      yourHP = 0;
    }
    yourHealthReduction();
    if(opponentsHP>0){
      checkForWin();
    }
  }
  let hit = true;
  function attackAnimation(){
    if ((you==='CHARMANDER') && (attack==='SCRATCH')){
      console.log('SCRATCH');
      $you.animate({left: '28%'});
      $you.animate({left: '24%'});
      if(hit){
        $scratchAnimation.fadeIn(500);
        $scratchAnimation.fadeOut(500);
        $rival.fadeOut(200);
        $rival.fadeIn(200);
        $rival.fadeOut(200);
        $rival.fadeIn(200);
        $rival.fadeOut(200);
        $rival.fadeIn(200);
      }
    }else if((you==='CHARMANDER') && (attack==='GROWL')){
      console.log('GROWL');
      $you.animate({left: '26%'});
      $you.animate({left: '22%'});
      $you.animate({left: '24%'});
      $growlAnimation.fadeIn(100);
      $growlAnimation.animate({top: '40%', left: '58%'});
      $growlAnimation.animate({top: '33%', left: '51%'});
      $growlAnimation.animate({top: '40%', left: '46%'});
      $growlAnimation.animate({top: '33%', left: '39%'});
      $growlAnimation.fadeOut(100);
      $growlAnimation.animate({top: '33%', left: '65%'});
    }else if((you==='SQUIRTLE') && (attack==='TACKLE')){
      console.log('TACKLE');
      $rival.animate({left: '62%', top:'24%'});
      $rival.animate({left: '65%', top:'22%'});
      if(hit){
      $you.fadeOut(200);
      $you.fadeIn(200);
      $you.fadeOut(200);
      $you.fadeIn(200);
      $you.fadeOut(200);
      $you.fadeIn(200);
      }
    }else if((you==='SQUIRTLE') && (attack==='TAIL WHIP')){
      console.log('TAIL WHIP');
      $rival.animate({left: '63%'});
      $rival.animate({left: '67%'});
      $rival.animate({left: '65%'});
    }
  }

  function yourAttack(){
    you = 'CHARMANDER';
    attack = 'SCRATCH';
    youUsedAttack();
    checkForCrit();
    checkForMiss();
    checkForYourBuff();
    attackAnimation();
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
    $textBox.html(`${you}<br>used ${attack}!`);
    setTimeout(function(){$textBox.fadeOut(100);}, 4000);
  }

  function restartBattle(){
    buff=1;
    yourBuffClicks =1;
    rivalBuff=1;
    rivalBuffClicks =1;
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
    $batteryLight.css({'background': '#ff1c1c'});
    $offScreen.fadeOut(100);
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

  function run(){
    $textBox.show();
    $textBox.html(`YOU CAN'T RUN FROM A TRAINER BATTLE!`);
    setTimeout(function(){$textBox.fadeOut(100);}, 2000);
  }

  function item(){
    $itemBox.fadeIn();
    setTimeout(function(){$itemBox.fadeOut(100);}, 5000);
  }

  $pressStart.on('click', scroll);
  $pressStart.on('mouseenter', function() {$firstPointer.show();});
  $pressStart.on('mouseleave', function() {$firstPointer.hide();});

  $fight.on('click', attacks);
  $fight.on('mouseenter', function() {$fightPointer.show();});
  $fight.on('mouseleave', function() {$fightPointer.hide();});

  $item.on('click', item);
  $item.on('mouseenter', function() {$itemPointer.show();});
  $item.on('mouseleave', function() {$itemPointer.hide();});

  $run.on('click', run);
  $run.on('mouseenter', function() {$runPointer.show();});
  $run.on('mouseleave', function() {$runPointer.hide();});

  $scratch.on('click', yourAttack);
  $scratch.on('mouseenter', function() {$scratchPointer.show();});
  $scratch.on('mouseleave', function() {$scratchPointer.hide();});

  $growl.on('click', buffCalculator);
  $growl.on('mouseenter', function() {$growlPointer.show();});
  $growl.on('mouseleave', function() {$growlPointer.hide();});



  $playAgain.on('click', restartBattle);
});
