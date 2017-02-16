'use strict';

var pkmn = pkmn || {};

//game variables defining variables that will change later
pkmn.you = '';
pkmn.rival = '';
pkmn.attack = '';
pkmn.turn = 'you';
pkmn.hit = true;
pkmn.yourTotalHP = 10;
pkmn.yourHP = 10;
pkmn.opponentsHP = 10;
pkmn.critMultiplier = 1;
pkmn.itemCount = 1;
pkmn.yourLevel = 0;
pkmn.rivalLevel = 0;

pkmn.player = '';
pkmn.missMultiplier = 1;
pkmn.debuffNum = 10;

pkmn.fail = '';
pkmn.yourBuffClicks = 1;

pkmn.buff = 1;
pkmn.rivalBuff = 1;
pkmn.rivalBuffClicks = 1;

pkmn.baseAttack = '';
pkmn.rivalBaseAttack = '';

pkmn.result = '';
pkmn.wins = 0;
pkmn.losses = 0;

pkmn.setup = function () {
  var _this = this;

  //scroll to top on page reload to prevent bugs
  $(window).on('beforeunload', function () {
    $(window).scrollTop(0);
  });
  //variables - screen containers
  this.$pressStart = $('#start');
  this.$battleScreen = $('#battle');
  this.$labScreen = $('#lab');
  //level on battle screen
  this.$yourLevel = $('#yourLevel');
  this.$rivalLevel = $('#rivalLevel');
  //Player options
  this.$fight = $('#fight');
  this.$item = $('#item');
  this.$run = $('#run');
  this.$pkmn = $('#pkmn');
  //audio controls
  this.$info = $('#info');
  this.$mute = $('#mute');
  this.$play = $('#play');
  this.$mute2 = $('#mute2');
  this.$play2 = $('#play2');
  this.$startTheme = $('#startTheme');
  this.$battleTheme = $('#battleTheme');
  this.$labTheme = $('#labTheme');
  //text boxes
  this.$attackBox = $('#attackBox');
  this.$itemBox = $('#itemBox');
  this.$textBox = $('#textBox');
  this.$oakBox = $('#oakBox');
  //item options
  this.$potion = $('#potion');
  this.$quant = $('#quant');
  this.$back = $('.back');
  //attacks
  this.$scratch = $('#scratch');
  this.$growl = $('#growl');
  this.$attackOne = '';
  this.$attackTwo = '';
  this.aiAgression = '';
  //win screen
  this.$winScreen = $('#winScreen');
  this.$playAgain = $('#playAgain');
  this.$winLose = $('#winLose');
  //Battle animation and sprites
  this.$oppHPBar = $('#opponentshealth');
  this.$yourHPBar = $('#yourhealth');
  this.$yourTotal = $('#hitPointTotal');
  this.$yourCurrent = $('#hitPointCurrent');
  this.$yourScore = $('#yourScore');
  this.$rivalScore = $('#rivalScore');
  this.$you = $('#you');
  this.$rival = $('#opponent');
  this.$scratchAnimation = $('#scratchAnimation');
  this.$rivalsScratchAnimation = $('#rivalsScratchAnimation');
  this.$sandAttack = $('#sandAnimation');
  this.$thunderAnimation = $('#thunderAnimation');
  this.$boltAnimation = $('#boltAnimation');
  this.$growlAnimation = $('#growlAnimation');
  //Gameboy
  this.$batteryLight = $('#light');
  this.$offScreen = $('#offScreen');
  //Pointers (arrows)
  this.$firstPointer = $('#startscreenPointer');
  this.$fightPointer = $('#fightPointer');
  this.$itemPointer = $('#itemPointer');
  this.$pkmnPointer = $('#pkmnPointer');
  this.$runPointer = $('#runPointer');
  this.$potionPointer = $('#potionPointer');
  this.$scratchPointer = $('#scratchPointer');
  this.$growlPointer = $('#growlPointer');
  //character select pokeballs invisible divs
  this.$bulbaBall = $('#bulbaBall');
  this.$charBall = $('#charBall');
  this.$squirtBall = $('#squirtBall');
  this.$pikaBall = $('#pikaBall');
  //character select images and borders
  this.$bulbasaur = $('#bulbasaur');
  this.$charmander = $('#charmander');
  this.$squirtle = $('#squirtle');
  this.$borderBulba = $('#borderBulba');
  this.$borderChar = $('#borderChar');
  this.$borderSquirt = $('#borderSquirt');
  this.$Bstats = $('#bulbaStats');
  this.$Cstats = $('#charStats');
  this.$Sstats = $('#squirtStats');

  //events
  this.$pressStart.on('click', this.scroll.bind(this));

  this.$fight.on('click', function () {
    return _this.$attackBox.fadeIn();
  });
  this.$item.on('click', this.item.bind(this));
  this.$item.on('mouseenter', function () {
    return _this.$itemPointer.show();
  });
  this.$item.on('mouseleave', function () {
    return _this.$itemPointer.hide();
  });

  this.$potion.on('click', this.potion.bind(this));
  this.$potion.on('mouseenter', function () {
    return _this.$potionPointer.show();
  });
  this.$potion.on('mouseleave', function () {
    return _this.$potionPointer.hide();
  });

  this.$pkmn.on('click', this.pkmn.bind(this));
  this.$pkmn.on('mouseenter', function () {
    return _this.$pkmnPointer.show();
  });
  this.$pkmn.on('mouseleave', function () {
    return _this.$pkmnPointer.hide();
  });

  this.$run.on('click', this.run.bind(this));

  this.$back.on('click', function () {
    _this.$itemBox.fadeOut(200);
    _this.$attackBox.fadeOut(200);
  });

  this.$scratch.on('click', this.yourAttack.bind(this));

  this.$growl.on('click', this.buffCalculator.bind(this));

  this.$info.on('click', function () {
    _this.$textBox.show().html('Click FIGHT to battle! Click ITEM to use a potion that heals 20hp.');
    setTimeout(function () {
      _this.$textBox.fadeOut(100);
    }, 3000);
  });

  this.$mute.on('click', this.mute.bind(this));
  this.$play.on('click', this.play1.bind(this));

  this.$mute2.on('click', this.mute2.bind(this));
  this.$play2.on('click', this.play2.bind(this));

  this.$playAgain.on('click', this.restartBattle.bind(this));

  //ball events
  this.$bulbaBall.on('click', this.move.bind(this));
  this.$bulbaBall.on('click', this.characterB.bind(this));
  this.$bulbaBall.on('mouseenter', function () {
    _this.$bulbasaur.fadeIn(200);
    _this.$borderBulba.fadeIn(200);
  });
  this.$bulbaBall.on('mouseleave', function () {
    _this.$bulbasaur.fadeOut(200);
    _this.$borderBulba.fadeOut(200);
  });
  this.$bulbaBall.on('mouseenter', function () {
    return _this.$Bstats.fadeIn(200);
  });
  this.$bulbaBall.on('mouseleave', function () {
    return _this.$Bstats.fadeOut(200);
  });

  this.$charBall.on('click', this.move.bind(this));
  this.$charBall.on('click', this.characterC.bind(this));
  this.$charBall.on('mouseenter', function () {
    _this.$charmander.fadeIn(200);
    _this.$borderChar.fadeIn(200);
  });
  this.$charBall.on('mouseleave', function () {
    _this.$charmander.fadeOut(200);
    _this.$borderChar.fadeOut(200);
  });
  this.$charBall.on('mouseenter', function () {
    return _this.$Cstats.fadeIn(200);
  });
  this.$charBall.on('mouseleave', function () {
    return _this.$Cstats.fadeOut(200);
  });

  this.$squirtBall.on('click', this.move.bind(this));
  this.$squirtBall.on('click', this.characterS.bind(this));
  this.$squirtBall.on('mouseenter', function () {
    _this.$squirtle.fadeIn(200);
    _this.$borderSquirt.fadeIn(200);
  });
  this.$squirtBall.on('mouseleave', function () {
    _this.$squirtle.fadeOut(200);
    _this.$borderSquirt.fadeOut(200);
  });
  this.$squirtBall.on('mouseenter', function () {
    return _this.$Sstats.fadeIn(200);
  });
  this.$squirtBall.on('mouseleave', function () {
    return _this.$Sstats.fadeOut(200);
  });

  this.$pikaBall.on('click', this.oakTalk.bind(this));
};

//Setting battlefield with correct HP and player names
pkmn.nameCheck = function nameCheck() {
  $('#yourName').html('' + this.you);
  $('#rivalName').html('' + this.rival);
};

pkmn.levelCheck = function levelCheck() {
  this.$yourLevel.html(this.yourLevel);
  this.$rivalLevel.html(this.rivalLevel);
};

pkmn.attackCheck = function attackCheck() {
  this.$growl.html(this.$attackTwo);
  this.$scratch.html(this.$attackOne);
};

pkmn.hpCheck = function hpCheck() {
  this.$yourTotal.html('' + this.yourTotalHP);
  this.$yourCurrent.html('' + this.yourHP);
  this.$oppHPBar.animate({ width: '20.7%' }, 50);
  this.$yourHPBar.animate({ width: '20.7%' }, 50);
};

//scroll from landing page
pkmn.scroll = function scroll() {
  $('html,body').animate({ scrollTop: this.$labScreen.offset().top }, 'slow');
  pkmn.labMusic();
};

pkmn.move = function move() {
  $('html,body').animate({ scrollTop: pkmn.$battleScreen.offset().top }, 'slow');
  pkmn.battleMusic();
};

//set up audio
pkmn.labMusic = function labMusic() {
  this.$startTheme[0].pause();
  this.$labTheme[0].play();
};

pkmn.battleMusic = function battleMusic() {
  this.$labTheme[0].pause();
  this.$battleTheme[0].play();
};

//battle logic

//critical hit
pkmn.checkForCrit = function checkForCrit() {
  var _this2 = this;

  this.crit = Math.ceil(Math.random() * 10);
  if (this.crit === 1) {
    this.$textBox.show();
    this.turn === 'you' ? this.$textBox.html(this.you + ' landed a critical hit!') : this.$textBox.html(this.rival + ' landed a critical hit!');
    setTimeout(function () {
      _this2.$textBox.fadeOut(100);
    }, 1950);
    pkmn.critMultiplier = 2;
  } else {
    pkmn.critMultiplier = 1;
  }
};

pkmn.checkForMiss = function checkForMiss() {
  var _this3 = this;

  this.missVal = this.you === 'PIKACHU' && this.turn === 'you' ? this.debuffNum : 10;
  this.miss = Math.ceil(Math.random() * this.missVal);
  if (this.miss === 1) {
    this.hit = false;
    this.player = this.turn === 'you' ? this.you : this.rival;
    this.$textBox.show().html(this.player + '\'s attack missed!');
    setTimeout(function () {
      _this3.$textBox.fadeOut(100);
    }, 1950);
    this.missMultiplier = 0;
  } else {
    this.missMultiplier = 1;
    this.hit = true;
  }
};

pkmn.debuff = function debuff() {
  if (this.debuffNum <= 1.25) {
    // if statement used to prevent unwinable situation where attacks never hit
    this.fail = ' But it failed!';
    pkmn.youUsedAttack();
    pkmn.textBoxFadeOut();
  } else {
    this.debuffNum = this.debuffNum / 2;
  }
};

//buffs - attack modifiers that effect damage dealt

pkmn.buffCalculator = function buffCalculator() {
  this.turn = 'you';
  this.player = this.turn === 'you' ? this.you : this.rival;
  switch (this.you) {
    case 'CHARMANDER':
      this.attack = 'GROWL';
      break;
    case 'SQUIRTLE':
      this.attack = 'TAIL WHIP';
      break;
    case 'BULBASAUR':
      this.attack = 'GROWL';
      break;
    case 'PIKACHU':
      this.fail = '';
      this.attack = 'GROWL';
      break;
  }
  this.yourBuffClicks = this.yourBuffClicks + 0.5;
  this.$attackBox.fadeOut();
  pkmn.youUsedAttack();
  pkmn.attackAnimation();
  setTimeout(pkmn.opponentsAttack, 2100);
};

pkmn.checkForYourBuff = function checkForYourBuff() {
  this.buff = 1 * this.yourBuffClicks;
};

pkmn.checkForRivalBuff = function checkForRivalBuff() {
  this.rival === 'EEVEE' && this.attack === 'SAND ATTACK' ? pkmn.debuff() : this.rivalBuff = 1 * this.rivalBuffClicks;
};

pkmn.rivalBuffCalculator = function rivalBuffCalculator() {
  this.turn = 'rival';
  this.player = this.turn === 'you' ? this.you : this.rival;
  switch (this.rival) {
    case 'CHARMANDER':
      this.attack = 'GROWL';
      break;
    case 'SQUIRTLE':
      this.attack = 'TAIL WHIP';
      break;
    case 'BULBASAUR':
      this.attack = 'GROWL';
      break;
    case 'EEVEE':
      this.attack = 'SAND ATTACK';
      break;
  }if (this.rival !== 'EEVEE') {
    this.rivalBuffClicks = this.rivalBuffClicks + 0.5;
  }
  pkmn.checkForRivalBuff();
};

pkmn.checkBaseAttack = function checkBaseAttack() {
  switch (this.you) {
    case 'CHARMANDER':
      this.baseAttack = 10;
      this.rivalBaseAttack = 8;
      break;
    case 'SQUIRTLE':
      this.baseAttack = 8;
      this.rivalBaseAttack = 8;
      break;
    case 'BULBASAUR':
      this.baseAttack = 8;
      this.rivalBaseAttack = 10;
      break;
    case 'PIKACHU':
      this.baseAttack = 12;
      this.rivalBaseAttack = 14;
      break;
  }
};

//checking for win conditions
pkmn.winning = function winning() {
  var _this4 = this;

  this.$winLose.html(this.result);
  this.$yourScore.html(this.wins);
  this.$rivalScore.html(this.losses);
  this.$winScreen.fadeIn(1500);
  setTimeout(function () {
    _this4.$offScreen.fadeIn(400);
  }, 1500);
  this.$batteryLight.css({ 'background': '#272424' });
};

pkmn.checkForWin = function checkForWin() {
  if (pkmn.opponentsHP <= 0) {
    this.result = 'You Win!';
    this.wins++;
    pkmn.winning();
  } else if (pkmn.yourHP <= 0) {
    this.result = 'You Lose!';
    this.losses++;
    pkmn.winning();
  }
};

//check attack for correct animation and damage calculation rival is 2/3 likely to do a damaging move
pkmn.checkAttack = function checkAttack() {
  this.rivalAttack = Math.ceil(Math.random() * this.aiAgression);
  this.turn = 'rival';
  this.player = this.turn === 'you' ? this.you : this.rival;
  if (this.rivalAttack === 1 || this.rivalAttack === 2) {
    switch (this.rival) {
      case 'CHARMANDER':
        this.attack = 'SCRATCH';
        break;
      case 'SQUIRTLE':
        this.attack = 'TACKLE';
        break;
      case 'BULBASAUR':
        this.attack = 'TACKLE';
        break;
      case 'EEVEE':
        this.attack = 'TACKLE';
        this.fail = '';
        break;
    }
    pkmn.youUsedAttack();
    pkmn.textBoxFadeOut();
    pkmn.checkForCrit();
    pkmn.checkForMiss();
    pkmn.checkForRivalBuff();
    pkmn.checkBaseAttack();
    pkmn.attackAnimation();
    this.opAttackPower = this.rivalBaseAttack * pkmn.critMultiplier * this.missMultiplier * this.rivalBuff;
    this.yourHP = this.yourHP - this.opAttackPower;
  } else {
    switch (this.rival) {
      case 'CHARMANDER':
        this.attack = 'GROWL';
        break;
      case 'SQUIRTLE':
        this.attack = 'TAIL WHIP';
        break;
      case 'BULBASAUR':
        this.attack = 'GROWL';
        break;
      case 'EEVEE':
        this.attack = 'SAND ATTACK';
        break;
    }
    pkmn.youUsedAttack();
    pkmn.textBoxFadeOut();
    pkmn.rivalBuffCalculator();
    pkmn.attackAnimation();
  }
};

pkmn.opponentsAttack = function opponentsAttack() {
  pkmn.checkAttack();
  if (pkmn.yourHP <= 0) {
    pkmn.yourHP = 0;
    pkmn.checkForWin();
  }
  pkmn.yourHealthReduction();
  if (this.opponentsHP >= 0) {
    pkmn.opponentsHP = 0;
  }
};

//animations

pkmn.attackAnimation = function attackAnimation() {
  var _this5 = this;

  if (this.turn === 'you' && this.attack === 'SCRATCH') {

    this.$you.animate({ left: '28%' });
    this.$you.animate({ left: '24%' });
    if (this.hit) {
      this.$scratchAnimation.fadeIn(500);
      this.$scratchAnimation.fadeOut(500);
      this.$rival.addClass('flash');
      setTimeout(function () {
        return _this5.$rival.removeClass('flash');
      }, 1000);
    }
  } else if (this.turn === 'you' && this.attack === 'TACKLE') {

    this.$you.animate({ left: '28%' });
    this.$you.animate({ left: '24%' });
    if (this.hit) {
      this.$rival.addClass('flash');
      setTimeout(function () {
        return _this5.$rival.removeClass('flash');
      }, 1000);
    }
  } else if (this.turn === 'you' && this.attack === 'GROWL') {

    this.$you.animate({ left: '26%' });
    this.$you.animate({ left: '22%' });
    this.$you.animate({ left: '24%' });
    this.$growlAnimation.fadeIn(100);
    this.$growlAnimation.animate({ top: '40%', left: '58%' });
    this.$growlAnimation.animate({ top: '33%', left: '51%' });
    this.$growlAnimation.animate({ top: '40%', left: '46%' });
    this.$growlAnimation.animate({ top: '33%', left: '39%' });
    this.$growlAnimation.fadeOut(100);
    this.$growlAnimation.animate({ top: '33%', left: '65%' });
  } else if (this.turn === 'you' && this.attack === 'THUNDERBOLT') {
    this.$you.animate({ left: '26%' });
    this.$you.animate({ left: '24%' });
    if (this.hit) {
      this.$thunderAnimation.fadeIn(200);
      this.$thunderAnimation.fadeOut(200);
      this.$boltAnimation.fadeIn(200);
      this.$boltAnimation.fadeOut(200);
      this.$thunderAnimation.fadeIn(200);
      this.$thunderAnimation.fadeOut(200);
      this.$boltAnimation.fadeIn(200);
      this.$boltAnimation.fadeOut(200);
      this.$rival.addClass('flash');
      setTimeout(function () {
        return _this5.$rival.removeClass('flash');
      }, 1000);
    }
  } else if (this.turn === 'you' && this.attack === 'TAIL WHIP') {
    this.$you.animate({ left: '26%' });
    this.$you.animate({ left: '22%' });
    this.$you.animate({ left: '24%' });
  } else if (this.turn === 'rival' && this.attack === 'TACKLE') {

    this.$rival.animate({ left: '62%', top: '24%' });
    this.$rival.animate({ left: '65%', top: '22%' });
    if (this.hit) {
      this.$you.addClass('flash');
      setTimeout(function () {
        return _this5.$you.removeClass('flash');
      }, 1000);
    }
  } else if (this.turn === 'rival' && this.attack === 'TAIL WHIP') {

    this.$rival.animate({ left: '63%' });
    this.$rival.animate({ left: '67%' });
    this.$rival.animate({ left: '65%' });
  } else if (this.turn === 'rival' && this.attack === 'GROWL') {

    this.$rival.animate({ left: '63%' });
    this.$rival.animate({ left: '67%' });
    this.$rival.animate({ left: '65%' });
    this.$growlAnimation.fadeIn(100);
    this.$growlAnimation.animate({ top: '40%', left: '58%' });
    this.$growlAnimation.animate({ top: '33%', left: '51%' });
    this.$growlAnimation.animate({ top: '40%', left: '46%' });
    this.$growlAnimation.animate({ top: '33%', left: '39%' });
    this.$growlAnimation.fadeOut(100);
    this.$growlAnimation.animate({ top: '33%', left: '65%' });
  } else if (this.turn === 'rival' && this.attack === 'SCRATCH') {

    this.$rival.animate({ left: '62%', top: '24%' });
    this.$rival.animate({ left: '65%', top: '22%' });
    if (this.hit) {
      this.$rivalsScratchAnimation.fadeIn(500);
      this.$rivalsScratchAnimation.fadeOut(500);
      this.$you.addClass('flash');
      setTimeout(function () {
        return _this5.$you.removeClass('flash');
      }, 1000);
    }
  } else if (this.turn === 'rival' && this.attack === 'SAND ATTACK') {
    this.$sandAttack.fadeIn(500);
    this.$sandAttack.fadeOut(500);
  }
};

//Attack functions
pkmn.yourAttack = function yourAttack() {
  this.turn = 'you';
  this.player = this.turn === 'you' ? this.you : this.rival;
  switch (this.you) {
    case 'CHARMANDER':
      this.attack = 'SCRATCH';
      break;
    case 'SQUIRTLE':
      this.attack = 'TACKLE';
      break;
    case 'BULBASAUR':
      this.attack = 'TACKLE';
      break;
    case 'PIKACHU':
      this.fail = '';
      this.attack = 'THUNDERBOLT';
      break;
  }
  pkmn.youUsedAttack();
  pkmn.checkForCrit();
  pkmn.checkForMiss();
  pkmn.checkForYourBuff();
  pkmn.checkBaseAttack();
  pkmn.attackAnimation();
  this.attackPower = this.baseAttack * pkmn.critMultiplier * this.missMultiplier * this.buff;
  this.opponentsHP = this.opponentsHP - this.attackPower;

  this.$attackBox.fadeOut();
  pkmn.rivalHealthReduction();
  pkmn.checkForWin();
  setTimeout(pkmn.opponentsAttack, 2100);
};

pkmn.youUsedAttack = function youUsedAttack() {
  this.$textBox.show().html(this.player + '<br>used ' + this.attack + '!' + this.fail);
};

pkmn.textBoxFadeOut = function textBoxFadeOut() {
  var _this6 = this;

  setTimeout(function () {
    _this6.$textBox.fadeOut(100);
  }, 2000);
};

pkmn.yourHealthReduction = function yourHealthReduction() {
  this.yourWidth = this.yourHP * 0.414;
  if (this.you === 'CHARMANDER') {
    this.yourWidth = this.yourHP * 0.414;
  } else if (this.you === 'BULBASAUR') {
    this.yourWidth = this.yourHP * 0.345;
  } else if (this.you === 'SQUIRTLE') {
    this.yourWidth = this.yourHP * 0.376;
  } else if (this.you === 'PIKACHU') {
    this.yourWidth = this.yourHP * 0.295;
  }
  this.$yourHPBar.animate({ width: this.yourWidth + '%' }, 500);
  this.$yourCurrent.html('' + this.yourHP);
};

pkmn.rivalHealthReduction = function rivalHealthReduction() {
  this.oppWidth = this.opponentsHP * 0.414;
  if (this.rival === 'CHARMANDER') {
    this.oppWidth = this.opponentsHP * 0.414;
  } else if (this.rival === 'BULBASAUR') {
    this.oppWidth = this.opponentsHP * 0.345;
  } else if (this.rival === 'SQUIRTLE') {
    this.oppWidth = this.opponentsHP * 0.376;
  } else if (this.rival === 'EEVEE') {
    this.oppWidth = this.opponentsHP * 0.207;
  }
  this.$oppHPBar.animate({ width: this.oppWidth + '%' }, 500);
};

//Restart
pkmn.restartBattle = function restartBattle() {
  pkmn.scroll();
  this.buff = 1;
  this.yourBuffClicks = 1;
  this.rivalBuff = 1;
  this.rivalBuffClicks = 1;
  this.debuffNum = 10;
  this.fail = '';
  this.$winScreen.fadeOut(1000);
  this.$battleTheme[0].pause();
  this.$startTheme[0].pause();
  this.$battleTheme[0].currentTime = 0;
  this.$yourCurrent.html('' + this.yourTotalHP);
  this.$batteryLight.css({ 'background': '#ff1c1c' });
  this.$offScreen.fadeOut(1000);
  this.itemCount = 1;
  this.$quant.html(' x01');
  this.$play2.fadeOut();
  this.$mute2.fadeIn();
};

//player functions
pkmn.run = function run() {
  this.$textBox.show().html('YOU CAN\'T RUN FROM A TRAINER BATTLE!');
  this.textBoxFadeOut();
};

pkmn.pkmn = function pkmn() {
  this.$textBox.show().html('YOU ONLY HAVE ONE POKE\'MON!');
  this.textBoxFadeOut();
};

//item related functions
pkmn.item = function item() {
  this.$itemBox.fadeIn();
};

pkmn.potion = function potion() {
  if (this.itemCount <= 0) {
    this.$textBox.show().html('YOU HAVE NO POTIONS!');
    pkmn.textBoxFadeOut();
  } else {
    if (this.you === 'CHARMANDER' && this.yourHP === 50 || this.you === 'BULBASAUR' && this.yourHP === 60 || this.you === 'SQUIRTLE' && this.yourHP === 55 || this.you === 'PIKACHU' && this.yourHP === 70) {
      this.$textBox.show().html('IT WILL HAVE NO EFFECT!');
      pkmn.textBoxFadeOut();
    } else {
      this.turn = 'you';
      this.yourHP = this.yourHP + 20;
      this.$itemBox.hide();
      this.$textBox.show().html('YOU USED A POTION!');
      if (this.you === 'CHARMANDER' && this.yourHP > 50) {
        this.yourHP = 50;
      } else if (this.you === 'BULBASAUR' && this.yourHP > 60) {
        this.yourHP = 60;
      } else if (this.you === 'SQUIRTLE' && this.yourHP > 55) {
        this.yourHP = 55;
      } else if (this.you === 'PIKACHU' && this.yourHP > 70) {
        this.yourHP = 70;
      }
      pkmn.yourHealthReduction();
      this.itemCount--;
      this.$quant.html(' x00');
      setTimeout(pkmn.opponentsAttack, 2100);
    }
  }
};

//audio functions
pkmn.mute = function mute() {
  this.$battleTheme[0].pause();
  this.$startTheme[0].pause();
  this.$mute.fadeOut();
  this.$play.fadeIn();
};

pkmn.play1 = function play1() {
  this.$startTheme[0].play();
  this.$play.fadeOut();
  this.$mute.fadeIn();
};

pkmn.mute2 = function mute2() {
  this.$battleTheme[0].pause();
  this.$startTheme[0].pause();
  this.$mute2.fadeOut();
  this.$play2.fadeIn();
};

pkmn.play2 = function play2() {
  this.$battleTheme[0].play();
  this.$play2.fadeOut();
  this.$mute2.fadeIn();
};

pkmn.check = function check() {
  pkmn.$quant.html(' x01');
  this.$offScreen.fadeOut(100);
  pkmn.nameCheck();
  pkmn.attackCheck();
  pkmn.hpCheck();
  pkmn.levelCheck();
};

//Character Select
pkmn.characterB = function characterB() {
  this.you = 'BULBASAUR';
  this.rival = 'CHARMANDER';
  this.$attackOne = 'TACKLE';
  this.$attackTwo = 'GROWL';
  this.yourLevel = 5;
  this.rivalLevel = 5;
  this.aiAgression = 3;
  this.$you.attr('src', 'bulba.png');
  this.$rival.attr('src', 'charmander.png');
  this.yourTotalHP = 60;
  this.yourHP = 60;
  this.opponentsHP = 50;
  pkmn.check();
};

pkmn.characterC = function characterC() {
  this.you = 'CHARMANDER';
  this.rival = 'SQUIRTLE';
  this.$attackOne = 'SCRATCH';
  this.$attackTwo = 'GROWL';
  this.yourLevel = 5;
  this.rivalLevel = 5;
  this.aiAgression = 3;
  this.$you.attr('src', 'char.png');
  this.$rival.attr('src', 'squirtle.png');
  this.yourTotalHP = 50;
  this.yourHP = 50;
  this.opponentsHP = 55;
  pkmn.check();
};

pkmn.characterP = function characterP() {
  this.you = 'PIKACHU';
  this.rival = 'EEVEE';
  this.yourLevel = 10;
  this.rivalLevel = 14;
  this.rivalBuff = 1;
  this.$attackOne = 'THUNDERBOLT';
  this.$attackTwo = 'GROWL';
  this.aiAgression = 2.5;
  this.$you.attr('src', 'chu.png');
  this.$rival.attr('src', 'eevee.png');
  this.yourTotalHP = 70;
  this.yourHP = 70;
  this.opponentsHP = 100;
  pkmn.check();
};

pkmn.characterS = function characterS() {
  this.you = 'SQUIRTLE';
  this.rival = 'BULBASAUR';
  this.$attackOne = 'TACKLE';
  this.$attackTwo = 'TAIL WHIP';
  this.yourLevel = 5;
  this.rivalLevel = 5;
  this.aiAgression = 4;
  this.$you.attr('src', 'squirt.png');
  this.$rival.attr('src', 'bulbasaur.png');
  this.$rival.css({
    'height': '21%',
    'width': '18%'
  });
  this.yourTotalHP = 55;
  this.yourHP = 55;
  this.opponentsHP = 60;
  pkmn.check();
};

//pikachu unlock
pkmn.oakTalk = function oakTalk() {
  var _this7 = this;

  this.$oakBox.html('OAK: It appears you\'re too late, all the poke\'mon have been chosen...').fadeIn(100);
  setTimeout(function () {
    _this7.$oakBox.html('OAK: unless you\'d like this poke\'mon... ');
  }, 3000);
  setTimeout(pkmn.move, 6000);
  setTimeout(function () {
    _this7.$oakBox.fadeOut(100);
  }, 6000);
  pkmn.characterP();
};

$(pkmn.setup.bind(pkmn));