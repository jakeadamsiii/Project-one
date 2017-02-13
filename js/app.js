$(()=> {
  //variables
  const $pressStart = $('#start');
  const $battleScreen = $('#battle');
  const $labScreen = $('#lab');
  //Player options
  const $fight = $('#fight');
  const $item = $('#item');
  const $run = $('#run');
  const $pkmn = $('#pkmn');
  //audio controls
  const $mute = $('#mute');
  const $play = $('#play');
  const $mute2 = $('#mute2');
  const $play2 = $('#play2');
  const $startTheme= $('#startTheme');
  const $battleTheme= $('#battleTheme');
  const $labTheme= $('#labTheme');
  //text boxes
  const $attackBox = $('#attackBox');
  const $itemBox = $('#itemBox');
  const $textBox = $('#textBox');
  //item options
  const $potion = $('#potion');
  const $quant =$('#quant');
  const $back = $('.back');
  //attacks
  const $scratch = $('#scratch');
  const $growl = $('#growl');
  //win screen
  const $winScreen = $('#winScreen');
  const $playAgain = $('#playAgain');
  const $winLose = $('#winLose');
  //Battle animation and sprites
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
  //Gameboy
  const $batteryLight = $('#light');
  const $offScreen = $('#offScreen');
  //Pointers (arrows)
  const $firstPointer =$('#startscreenPointer');
  const $fightPointer =$('#fightPointer');
  const $itemPointer =$('#itemPointer');
  const $pkmnPointer =$('#pkmnPointer');
  const $runPointer =$('#runPointer');
  const $potionPointer =$('#potionPointer');
  const $scratchPointer =$('#scratchPointer');
  const $growlPointer =$('#growlPointer');

//character select pokeballs
  const $bulbaBall = $('#bulbaBall');
  const $charBall = $('#charBall');
  const $squirtBall = $('#squirtBall');
//character select images
  const $bulbasaur = $('#bulbasaur');
  const $charmander = $('#charmander');
  const $squirtle = $('#squirtle');
  const $borderBulba = $('#borderBulba');
  const $borderChar = $('#borderChar');
  const $borderSquirt = $('#borderSquirt');

//game variables
  let you = '';
  let rival = '';
  let attack = '';
  let turn = 'you';

  function nameCheck(){
    $('#yourName').html(`${you}`);
    $('#rivalName').html(`${rival}`);
  }

  const yourTotalHP = 50;
  let yourHP =50;
  let opponentsHP = 50;

  //scroll from landing page
  function scroll(){
    $('html,body').animate({scrollTop: $labScreen.offset().top},'slow');
    labMusic();
  }

  function move(){
    $('html,body').animate({scrollTop: $battleScreen.offset().top},'slow');
    battleMusic();
  }

  //set up audio
  function labMusic(){
    $startTheme[0].pause();
    $labTheme[0].play();
  }

  function battleMusic(){
    $labTheme[0].pause();
    $battleTheme[0].play();
  }

  function attacks(){
    $attackBox.fadeIn();
  }

//battle logic
  let critMultiplier=1;
//critical hit
  function checkForCrit(){
    const crit = Math.ceil(Math.random()*10);
    if (crit===1){
      $textBox.show();
      if(turn==='you'){
        $textBox.html(`${you} landed a critical hit!`);
      }else{
        $textBox.html(`${rival} landed a critical hit!`);
      }
      console.log('crit');
      setTimeout(function(){
        $textBox.fadeOut(100);
      }, 1950);
      critMultiplier=2;
    }else{
      critMultiplier=1;
    }
  }

//miss
  let missMultiplier=1;
  function checkForMiss(){
    const miss = Math.ceil(Math.random()*10);
    if (miss===1){
      hit =false;
      $textBox.show();
      if(turn==='you'){
        $textBox.html(`${you}'s attack missed!`);
      }else{
        $textBox.html(`${rival}'s attack missed!`);
      }
      setTimeout(function(){
        $textBox.fadeOut(100);
      }, 1950);
      missMultiplier=0;
      console.log('missed');
    }else{
      missMultiplier=1;
      hit =true;
    }
  }

//buffs
  let yourBuffClicks = 1;
  function buffCalculator(){
    yourBuffClicks = yourBuffClicks+0.5;
    $attackBox.fadeOut();
    console.log(yourBuffClicks);
    // you ='CHARMANDER';
    attack = 'GROWL';
    youUsedAttack();
    attackAnimation();
    setTimeout(opponentsAttack, 2100);
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
    checkForRivalBuff();
  }

//checking for win conditions
  let wins=0;
  let losses=0;
  function checkForWin(){
    if(opponentsHP <= 0){
      $winLose.html('You Win!');
      $winScreen.fadeIn(1500);
      wins++;
      $yourScore.html(wins);
      $batteryLight.css({'background': '#272424'});
      setTimeout(offScreenFadeIn, 1500);
    }else if(yourHP <= 0){
      $winLose.html('You Lose!');
      $winScreen.fadeIn(1500);
      losses++;
      $rivalScore.html(losses);
      setTimeout(offScreenFadeIn, 1500);
      $batteryLight.css({'background': '#272424'});
    }
  }

  function offScreenFadeIn(){
    $offScreen.fadeIn(400);
  }

//check attack for correct animation and damage calculation
  function checkAttack(){
    const rivalAttack = Math.ceil(Math.random()*3);
    turn='rival';
    if (rivalAttack === 1||rivalAttack === 2){
      attack='TACKLE';
      rivalUsedAttack();
      checkForCrit();
      checkForMiss();
      checkForRivalBuff();
      attackAnimation();
      const opAttackPower = 10*critMultiplier*missMultiplier*rivalBuff;
      yourHP = yourHP - opAttackPower;
    }else{
      attack='TAIL WHIP';
      rivalUsedAttack();
      rivalBuffCalculator();
      attackAnimation();
    }
  }

  function opponentsAttack(){
    // you = 'SQUIRTLE';
    // attack = '';
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
//animations
  let hit = true;
  function attackAnimation(){
    if (attack==='SCRATCH'){
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
    }else if(attack==='GROWL'){
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
    }else if(attack==='TACKLE'){
      console.log('TACKLE');
      $rival.animate({left: '62%', top: '24%'});
      $rival.animate({left: '65%', top: '22%'});
      if(hit){
        $you.fadeOut(200);
        $you.fadeIn(200);
        $you.fadeOut(200);
        $you.fadeIn(200);
        $you.fadeOut(200);
        $you.fadeIn(200);
      }
    }else if(attack==='TAIL WHIP'){
      console.log('TAIL WHIP');
      $rival.animate({left: '63%'});
      $rival.animate({left: '67%'});
      $rival.animate({left: '65%'});
    }
  }

//Attack functions
  function yourAttack(){
    // you = 'CHARMANDER';
    turn='you';
    attack = 'SCRATCH';
    youUsedAttack();
    checkForCrit();
    checkForMiss();
    checkForYourBuff();
    attackAnimation();
    const attackPower = 10*critMultiplier*missMultiplier*buff;
    opponentsHP = opponentsHP - attackPower;
    console.log(opponentsHP);
    $attackBox.fadeOut();
    rivalHealthReduction();
    checkForWin();
    setTimeout(opponentsAttack, 2100);
  }

  function youUsedAttack(){
    $textBox.show();
    $textBox.html(`${you}<br>used ${attack}!`);
  }

  function rivalUsedAttack(){
    $textBox.show();
    $textBox.html(`${rival}<br>used ${attack}!`);
    setTimeout(function(){
      $textBox.fadeOut(100);
    }, 2000);
  }

  function rivalHealthReduction(){
    const oppWidth = opponentsHP*0.414;
    $oppHPBar.animate({width: `${oppWidth}%`}, 500 );
  }

//Restart
  function restartBattle(){
    scroll();
    buff=1;
    yourBuffClicks =1;
    rivalBuff=1;
    rivalBuffClicks =1;
    yourHP =50;
    opponentsHP =50;
    $winScreen.fadeOut(1000);
    $battleTheme[0].pause();
    $startTheme[0].pause();
    $battleTheme[0].currentTime = 0;
    $oppHPBar.animate({width: '20.7%'}, 100 );
    $yourHPBar.animate({width: '20.7%'}, 100 );
    $yourCurrent.html(`${yourTotalHP}`);
    $batteryLight.css({'background': '#ff1c1c'});
    $offScreen.fadeOut(1000);
    itemCount=1;
    $quant.html(' x01');
    $play2.fadeOut();
    $mute2.fadeIn();
  }

  $yourTotal.html(`${yourTotalHP}`);
  $yourCurrent.html(`${yourHP}`);

  function yourHealthReduction(){
    const yourWidth = yourHP*0.414;
    $yourHPBar.animate({width: `${yourWidth}%`}, 500 );
    $yourCurrent.html(`${yourHP}`);
  }

//player functions
  function run(){
    $textBox.show();
    $textBox.html(`YOU CAN'T RUN FROM A TRAINER BATTLE!`);
    setTimeout(function(){
      $textBox.fadeOut(100);
    }, 2000);
  }

  function pkmn(){
    $textBox.show();
    $textBox.html(`YOU ONLY HAVE ONE POKE'MON!`);
    setTimeout(function(){
      $textBox.fadeOut(100);
    }, 2000);
  }

//item related functions
  function item(){
    $itemBox.fadeIn();
    // setTimeout(function(){$itemBox.fadeOut(100);}, 5000);
  }

  let itemCount=1;
  $quant.html(' x01');
  function potion(){
    if (itemCount<=0){
      $textBox.show();
      $textBox.html(`YOU HAVE NO POTIONS!`);
      setTimeout(function(){
        $textBox.fadeOut(100);
      }, 2000);
    }else{
      if(yourHP===50){
        $textBox.show();
        $textBox.html(`IT WILL HAVE NO EFFECT!`);
        setTimeout(function(){
          $textBox.fadeOut(100);
        }, 2000);
      }else{
        turn='you';
        yourHP = yourHP+20;
        $itemBox.hide();
        $textBox.show();
        $textBox.html(`YOU USED A POTION!`);
        // setTimeout(function(){$textBox.fadeOut(100);}, 2000);
        if(yourHP>50){
          yourHP=50;

        }
      // $yourCurrent.html(yourHP);
        yourHealthReduction();
        itemCount--;
        $quant.html(' x00');
        setTimeout(opponentsAttack, 2100);
      }
    }
  }

//audio functions
  function mute(){
    $battleTheme[0].pause();
    $startTheme[0].pause();
    $mute.fadeOut();
    $play.fadeIn();
  }

  function play1(){
    $startTheme[0].play();
    $play.fadeOut();
    $mute.fadeIn();
  }

  function mute2(){
    $battleTheme[0].pause();
    $startTheme[0].pause();
    $mute2.fadeOut();
    $play2.fadeIn();
  }

  function play2(){
    $battleTheme[0].play();
    $play2.fadeOut();
    $mute2.fadeIn();
  }

//Character Select
  function characterB(){
    you = 'BULBASAUR';
    rival = 'CHARMANDER';
    $you.attr('src','bulba.png');
    $rival.attr('src','charmander.png');
    nameCheck();
  }

  function characterC(){
    you = 'CHARMANDER';
    rival = 'SQUIRTLE';
    $you.attr('src','char.png');
    $rival.attr('src','squirtle.png');
    nameCheck();
  }

  function characterS(){
    you = 'SQUIRTLE';
    rival = 'BULBASAUR';
    $you.attr('src','squirt.png');
    $rival.attr('src','bulbasaur.png');
    $rival.css({
      'height': '21%',
      'width': '18%'
    });
    nameCheck();
  }

//events
  $pressStart.on('click', scroll);
  $pressStart.on('mouseenter', function() {
    $firstPointer.show();
  });
  $pressStart.on('mouseleave', function() {
    $firstPointer.hide();
  });

  $fight.on('click', attacks);
  $fight.on('mouseenter', function() {
    $fightPointer.show();
  });
  $fight.on('mouseleave', function() {
    $fightPointer.hide();
  });

  $item.on('click', item);
  $item.on('mouseenter', function() {
    $itemPointer.show();
  });
  $item.on('mouseleave', function() {
    $itemPointer.hide();
  });

  $potion.on('click', potion);
  $potion.on('mouseenter', function() {
    $potionPointer.show();
  });
  $potion.on('mouseleave', function() {
    $potionPointer.hide();
  });

  $pkmn.on('click', pkmn);
  $pkmn.on('mouseenter', function() {
    $pkmnPointer.show();
  });
  $pkmn.on('mouseleave', function() {
    $pkmnPointer.hide();
  });

  $run.on('click', run);
  $run.on('mouseenter', function() {
    $runPointer.show();
  });
  $run.on('mouseleave', function() {
    $runPointer.hide();
  });

  $back.on('click', function() {
    $itemBox.fadeOut(200); $attackBox.fadeOut(200);
  });

  $scratch.on('click', yourAttack);
  $scratch.on('mouseenter', function() {
    $scratchPointer.show();
  });
  $scratch.on('mouseleave', function() {
    $scratchPointer.hide();
  });

  $growl.on('click', buffCalculator);
  $growl.on('mouseenter', function() {
    $growlPointer.show();
  });
  $growl.on('mouseleave', function() {
    $growlPointer.hide();
  });

  $mute.on('click', mute);
  $play.on('click', play1);

  $mute2.on('click', mute2);
  $play2.on('click', play2);

  $playAgain.on('click', restartBattle);

  //ball events
  $bulbaBall.on('click', move);
  $bulbaBall.on('click', characterB);
  $bulbaBall.on('mouseenter', function() {
    $bulbasaur.fadeIn(200); $borderBulba.fadeIn(200);
  });
  $bulbaBall.on('mouseleave', function() {
    $bulbasaur.fadeOut(200); $borderBulba.fadeOut(200);
  });

  $charBall.on('click', move);
  $charBall.on('click', characterC);
  $charBall.on('mouseenter', function() {
    $charmander.fadeIn(200); $borderChar.fadeIn(200);
  });
  $charBall.on('mouseleave', function() {
    $charmander.fadeOut(200); $borderChar.fadeOut(200);
  });

  $squirtBall.on('click', move);
  $squirtBall.on('click', characterS);
  $squirtBall.on('mouseenter', function() {
    $squirtle.fadeIn(200); $borderSquirt.fadeIn(200);
  });
  $squirtBall.on('mouseleave', function() {
    $squirtle.fadeOut(200); $borderSquirt.fadeOut(200);
  });
});
