$(()=> {
  //scroll to top on page reload to prevent bugs
  $(window).on('beforeunload', function() {
    $(window).scrollTop(0);
  });
  //variables - screen containers
  const $pressStart = $('#start');
  const $battleScreen = $('#battle');
  const $labScreen = $('#lab');
  //level on battle screen
  const $yourLevel = $('#yourLevel');
  const $rivalLevel = $('#rivalLevel');
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
  const $oakBox = $('#oakBox');
  //item options
  const $potion = $('#potion');
  const $quant =$('#quant');
  const $back = $('.back');
  //attacks
  const $scratch = $('#scratch');
  const $growl = $('#growl');
  let $attackOne ='';
  let $attackTwo = '';
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
  const $rivalsScratchAnimation = $('#rivalsScratchAnimation');
  const $sandAttack =$('#sandAnimation');
  const $thunderAnimation = $('#thunderAnimation');
  const $boltAnimation = $('#boltAnimation');
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

//character select pokeballs invisible divs
  const $bulbaBall = $('#bulbaBall');
  const $charBall = $('#charBall');
  const $squirtBall = $('#squirtBall');
  const $pikaBall = $('#pikaBall');
//character select images and borders
  const $bulbasaur = $('#bulbasaur');
  const $charmander = $('#charmander');
  const $squirtle = $('#squirtle');
  const $borderBulba = $('#borderBulba');
  const $borderChar = $('#borderChar');
  const $borderSquirt = $('#borderSquirt');
  const $Bstats = $('#bulbaStats');


//game variables defining variables that will change later
  let you = '';
  let rival = '';
  let attack = '';
  let turn = 'you';

  let yourTotalHP = 10;
  let yourHP =10;
  let opponentsHP = 10;

//Setting battlefield with correct HP and player names
  function nameCheck(){
    $('#yourName').html(`${you}`);
    $('#rivalName').html(`${rival}`);
  }

  function levelCheck(){
    $yourLevel.html(yourLevel);
    $rivalLevel.html(rivalLevel);
  }

  function attackCheck(){
    $growl.html($attackTwo);
    $scratch.html($attackOne);
  }

  function hpCheck(){
    $yourTotal.html(`${yourTotalHP}`);
    $yourCurrent.html(`${yourHP}`);
    $oppHPBar.animate({width: '20.7%'}, 50 );
    $yourHPBar.animate({width: '20.7%'}, 50 );
  }

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
  let debuffNum=10;
  function checkForMiss(){
    const missVal = you==='PIKACHU'&&turn==='you' ? debuffNum : 10;
    const miss = Math.ceil(Math.random()*missVal);
    if (miss===1){
      hit = false;
      const player = turn === 'you' ? you : rival;
      $textBox
        .show()
        .html(`${player}'s attack missed!`);

      setTimeout(function(){
        $textBox.fadeOut(100);
      }, 1950);

      missMultiplier=0;

    }else{
      missMultiplier=1;
      hit =true;
    }
  }

  function debuff(){
    debuffNum=debuffNum/2;
    console.log(debuffNum);
  }

//buffs - attack modifiers that effect damage dealt
  let yourBuffClicks = 1;
  function buffCalculator(){
    turn='you';
    switch(you){
      case 'CHARMANDER':
        attack = 'GROWL';
        break;
      case 'SQUIRTLE':
        attack = 'TAIL WHIP';
        break;
      case 'BULBASAUR':
        attack = 'GROWL';
        break;
      case 'PIKACHU':
        attack = 'GROWL';
        break;
    }
    yourBuffClicks = yourBuffClicks+0.5;
    $attackBox.fadeOut();
    youUsedAttack();
    attackAnimation();
    setTimeout(opponentsAttack, 2100);
  }

  let buff=1;
  function checkForYourBuff(){
    buff = 1 * yourBuffClicks;
  }

  let rivalBuff=1;
  function checkForRivalBuff(){
    if (rival==='EEVEE'&&attack==='SAND ATTACK'){
      debuff();
    }else{
      rivalBuff = 1 * rivalBuffClicks;
    }
  }

  let rivalBuffClicks = 1;
  function rivalBuffCalculator(){
    turn='rival';
    switch(rival){
      case 'CHARMANDER':
        attack = 'GROWL';
        break;
      case 'SQUIRTLE':
        attack = 'TAIL WHIP';
        break;
      case 'BULBASAUR':
        attack = 'GROWL';
        break;
      case 'EEVEE':
        attack = 'SAND ATTACK';
        break;
    }if(rival!=='EEVEE'){
      rivalBuffClicks = rivalBuffClicks+0.5;
    }
    checkForRivalBuff();
  }

  let baseAttack='';
  let rivalBaseAttack='';

  function checkBaseAttack(){
    // refactor to switch statement
    if(you==='CHARMANDER'){
      baseAttack=10;
      rivalBaseAttack=8;
    }else if(you==='SQUIRTLE'){
      baseAttack=8;
      rivalBaseAttack=8;
    }else if(you==='BULBASAUR'){
      baseAttack=8;
      rivalBaseAttack=10;
    }else if (you==='PIKACHU'){
      baseAttack=12;
      rivalBaseAttack=14;
    }
  }

//checking for win conditions
  let wins=0;
  let losses=0;
  function checkForWin(){
    let result = '';
    if(opponentsHP <= 0){
      result = 'You Win!';
      wins++;
      $winLose.html('You Win!');
    } else if(yourHP <= 0){
      result = 'You Lose!';
      losses++;
    }
    $winLose.html(result);
    $yourScore.html(wins);
    $winScreen.fadeIn(1500);
    $rivalScore.html(losses);
    setTimeout(offScreenFadeIn, 1500);
    $batteryLight.css({'background': '#272424'});
  }

  function offScreenFadeIn(){
    $offScreen.fadeIn(400);
  }

//check attack for correct animation and damage calculation rival is 2/3 likely to do a damaging move
  function checkAttack(){
    const rivalAttack = Math.ceil(Math.random()*3);
    turn='rival';
    if (rivalAttack === 1||rivalAttack === 2){
      switch(rival){
        case 'CHARMANDER':
          attack = 'SCRATCH';
          break;
        case 'SQUIRTLE':
          attack = 'TACKLE';
          break;
        case 'BULBASAUR':
          attack = 'TACKLE';
          break;
        case 'EEVEE':
          attack = 'TACKLE';
          break;
      }
      rivalUsedAttack();
      checkForCrit();
      checkForMiss();
      checkForRivalBuff();
      checkBaseAttack();
      attackAnimation();
      const opAttackPower = rivalBaseAttack*critMultiplier*missMultiplier*rivalBuff;
      yourHP = yourHP - opAttackPower;
    }else{
      switch(rival){
        case 'CHARMANDER':
          attack = 'GROWL';
          break;
        case 'SQUIRTLE':
          attack = 'TAIL WHIP';
          break;
        case 'BULBASAUR':
          attack = 'GROWL';
          break;
        case 'EEVEE':
          attack = 'SAND ATTACK';
          break;
      }
      rivalUsedAttack();
      rivalBuffCalculator();
      attackAnimation();
    }
  }

  function opponentsAttack(){
    // you = 'SQUIRTLE';
    // attack = '';
    checkAttack();
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
    if (turn==='you' && attack==='SCRATCH'){

      $you.animate({left: '28%'});
      $you.animate({left: '24%'});
      if(hit){
        $scratchAnimation.fadeIn(500);
        $scratchAnimation.fadeOut(500);
        // $rival.fadeOut(200);
        // $rival.fadeIn(200);
        // $rival.fadeOut(200);
        // $rival.fadeIn(200);
        // $rival.fadeOut(200);
        // $rival.fadeIn(200);
        $rival.addClass('flash');
        setTimeout(() => $rival.removeClass('flash'), 500);
      }
    }else if (turn==='you' && attack==='TACKLE'){

      $you.animate({left: '28%'});
      $you.animate({left: '24%'});
      if(hit){
        $rival.fadeOut(200);
        $rival.fadeIn(200);
        $rival.fadeOut(200);
        $rival.fadeIn(200);
        $rival.fadeOut(200);
        $rival.fadeIn(200);
      }
    }else if(turn==='you' && attack==='GROWL'){

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
    }else if (turn==='you' && attack==='THUNDERBOLT'){
      $you.animate({left: '26%'});
      $you.animate({left: '24%'});
      if(hit){
        $thunderAnimation.fadeIn(200);
        $thunderAnimation.fadeOut(200);
        $boltAnimation.fadeIn(200);
        $boltAnimation.fadeOut(200);
        $thunderAnimation.fadeIn(200);
        $thunderAnimation.fadeOut(200);
        $boltAnimation.fadeIn(200);
        $boltAnimation.fadeOut(200);
        $rival.fadeOut(200);
        $rival.fadeIn(200);
        $rival.fadeOut(200);
        $rival.fadeIn(200);
        $rival.fadeOut(200);
        $rival.fadeIn(200);
      }
    }else if(turn==='you' && attack==='TAIL WHIP'){
      $you.animate({left: '26%'});
      $you.animate({left: '22%'});
      $you.animate({left: '24%'});
    }else if(turn==='rival' && attack==='TACKLE'){

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
    }else if(turn==='rival' && attack==='TAIL WHIP'){

      $rival.animate({left: '63%'});
      $rival.animate({left: '67%'});
      $rival.animate({left: '65%'});
    }else if(turn==='rival' && attack==='GROWL'){

      $rival.animate({left: '63%'});
      $rival.animate({left: '67%'});
      $rival.animate({left: '65%'});
      $growlAnimation.fadeIn(100);
      $growlAnimation.animate({top: '40%', left: '58%'});
      $growlAnimation.animate({top: '33%', left: '51%'});
      $growlAnimation.animate({top: '40%', left: '46%'});
      $growlAnimation.animate({top: '33%', left: '39%'});
      $growlAnimation.fadeOut(100);
      $growlAnimation.animate({top: '33%', left: '65%'});
    }else if(turn==='rival' && attack==='SCRATCH'){

      $rival.animate({left: '62%', top: '24%'});
      $rival.animate({left: '65%', top: '22%'});
      if(hit){
        $rivalsScratchAnimation.fadeIn(500);
        $rivalsScratchAnimation.fadeOut(500);
        $you.fadeOut(200);
        $you.fadeIn(200);
        $you.fadeOut(200);
        $you.fadeIn(200);
        $you.fadeOut(200);
        $you.fadeIn(200);
      }
    }else if(turn==='rival' && attack==='SAND ATTACK'){
      $sandAttack.fadeIn(500);
      $sandAttack.fadeOut(500);
    }
  }

//Attack functions
  function yourAttack(){
    turn='you';
    switch(you){
      case 'CHARMANDER':
        attack = 'SCRATCH';
        break;
      case 'SQUIRTLE':
        attack = 'TACKLE';
        break;
      case 'BULBASAUR':
        attack = 'TACKLE';
        break;
      case 'PIKACHU':
        attack = 'THUNDERBOLT';
        break;
    }
    youUsedAttack();
    checkForCrit();
    checkForMiss();
    checkForYourBuff();
    checkBaseAttack();
    attackAnimation();
    const attackPower = baseAttack*critMultiplier*missMultiplier*buff;
    opponentsHP = opponentsHP - attackPower;

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
    let oppWidth = opponentsHP*0.414;
    if (rival==='CHARMANDER'){
      oppWidth = opponentsHP*0.414;
    }else if(rival==='BULBASAUR'){
      oppWidth = opponentsHP*0.345;
    }else if(rival==='SQUIRTLE'){
      oppWidth = opponentsHP*0.376;
    }else if(rival==='EEVEE'){
      oppWidth = opponentsHP*0.207;
    }
    $oppHPBar.animate({width: `${oppWidth}%`}, 500 );
  }

//Restart
  function restartBattle(){
    scroll();
    hpCheck();
    buff=1;
    yourBuffClicks =1;
    rivalBuff=1;
    rivalBuffClicks =1;
    debuffNum=10;
    // yourHP =50;
    // opponentsHP =50;
    $winScreen.fadeOut(1000);
    $battleTheme[0].pause();
    $startTheme[0].pause();
    $battleTheme[0].currentTime = 0;
    $yourCurrent.html(`${yourTotalHP}`);
    $batteryLight.css({'background': '#ff1c1c'});
    $offScreen.fadeOut(1000);
    itemCount=1;
    $quant.html(' x01');
    $play2.fadeOut();
    $mute2.fadeIn();
  }

  function yourHealthReduction(){
    let yourWidth = yourHP*0.414;
    if (you==='CHARMANDER'){
      yourWidth = yourHP*0.414;
    }else if(you==='BULBASAUR'){
      yourWidth = yourHP*0.345;
    }else if(you==='SQUIRTLE'){
      yourWidth = yourHP*0.376;
    }else if(you==='PIKACHU'){
      yourWidth = yourHP*0.295;
    }
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
      if((you==='CHARMANDER' && yourHP===50)||(you==='BULBASAUR' && yourHP===60)||(you==='SQUIRTLE' && yourHP===55)||(you==='PIKACHU' && yourHP===70)){
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
        if(you==='CHARMANDER' && yourHP>50){
          yourHP=50;
        }else if (you==='BULBASAUR' && yourHP>60){
          yourHP=60;
        }else if(you==='SQUIRTLE' && yourHP>55){
          yourHP=55;
        }else if(you==='PIKACHU' && yourHP>70){
          yourHP=70;
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
  let yourLevel=0;
  let rivalLevel=0;
//Character Select
  function characterB(){
    you = 'BULBASAUR';
    rival = 'CHARMANDER';
    $attackOne='TACKLE';
    $attackTwo='GROWL';
    yourLevel=5;
    rivalLevel=5;
    $you.attr('src','bulba.png');
    $rival.attr('src','charmander.png');
    yourTotalHP = 60;
    yourHP =60;
    opponentsHP = 50;
    nameCheck();
    attackCheck();
    hpCheck();
    levelCheck();
  }

  function characterC(){
    you = 'CHARMANDER';
    rival = 'SQUIRTLE';
    $attackOne='SCRATCH';
    $attackTwo='GROWL';
    yourLevel=5;
    rivalLevel=5;
    $you.attr('src','char.png');
    $rival.attr('src','squirtle.png');
    yourTotalHP = 50;
    yourHP =50;
    opponentsHP = 55;
    nameCheck();
    attackCheck();
    hpCheck();
    levelCheck();
  }

  function characterP(){
    you = 'PIKACHU';
    rival ='EEVEE';
    yourLevel=10;
    rivalLevel=14;
    $attackOne='THUNDERBOLT';
    $attackTwo='GROWL';
    $you.attr('src','chu.png');
    $rival.attr('src','eevee.png');
    yourTotalHP = 70;
    yourHP =70;
    opponentsHP = 100;
    nameCheck();
    attackCheck();
    hpCheck();
    levelCheck();
  }

  function characterS(){
    you = 'SQUIRTLE';
    rival = 'BULBASAUR';
    $attackOne='TACKLE';
    $attackTwo='TAIL WHIP';
    yourLevel=5;
    rivalLevel=5;
    $you.attr('src','squirt.png');
    $rival.attr('src','bulbasaur.png');
    $rival.css({
      'height': '21%',
      'width': '18%'
    });
    yourTotalHP = 55;
    yourHP =55;
    opponentsHP = 60;
    nameCheck();
    attackCheck();
    hpCheck();
    levelCheck();
  }

  //pikachu unlock
  function oakTalk(){
    $oakBox.html(`OAK: It appears you're too late, all the poke'mon have been chosen...`);
    $oakBox.fadeIn(100);
    setTimeout(function(){
      $oakBox.html(`OAK: unless you'd like this poke'mon... `);
    },3000);
    setTimeout(move,6000);
    setTimeout(function(){
      $oakBox.fadeOut(100);
    },6000);
    characterP();
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
  $bulbaBall.on('mouseenter', function() {
    $bulbasaur.fadeIn(200); $Bstats.fadeIn(200);
  });
  $bulbaBall.on('mouseleave', function() {
    $bulbasaur.fadeOut(200); $Bstats.fadeOut(200);
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

  $pikaBall.on('click', oakTalk);

});
