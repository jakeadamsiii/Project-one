<h1>Project 1: Pokemon Turn Based Game</h1>

File list:

index.html,
style.css,
index.php,
app.js,
gulpfile.js

The Poke'mon battler is a recreation of the battle engine of the first generation Poke'mon games(Red, Blue and Yellow). The Game emulates the first battle encountered in the games, with the same character choices available to the user(Charmander, Bulbasaur, Squirtle and Pikachu).

It can be played here:
[Pokemon game](https://quiet-fortress-14634.herokuapp.com/)

![](Project-one/readme2.png)

Copyright
---------
I do not own any of the sprites or audio used. Copyright for the Poke'mon franchise belongs to Nintendo and Game-freak.

Brief
--------
The brief was to create an in browser game using jquery for DOM manipulation. The game needed a win condition and had to display a win/loss screen. The game must be deployed online via Heroku. DRY code principles where strongly recommended.

Instructions
------------
When loading the page the user has two options. Mute the music and press start. Pressing start will move the user to the second 'character-selection' screen as scrolling is locked.

From here the user has 4 choices. The 'Pick a Pokeball' text was included as user testing revealed players unfamiliar with the franchise didn't know how to progress.

After choosing a character, the screen is again scrolled to the battle window. Here the player has 2 choices, fight or use an item. There is only 1 item in the game, a potion, that will restore 20hp to the player at the cost of one turn. After one use the item is depleted, this allows some balance to the game. The player always goes fist so they have an advantage over the opponent.

The other option available is to fight. Clicking this will open a menu with 2 possible attacks. The top is the only damaging move. This attack will damage the opponent (reducing their HP). The second attack is a buff. This will increase your attack by 1.5. I.e if an attack does 10 damage, after a buff it will do 15 damage. Buffs can be chained, after two buffs your attack will be doubled etc.

Each character has a buff and a damaging attack however they will all have different HP and base attack statistics.  

Game mechanics
--------------
Miss - The game is slightly luck based. There is a 10% chance that any damaging attack will miss, ending your turn and starting the opponents attack.

Critical - Each attack, if hit, has a 10% chance to deal double damage. This is referred to as a critical.

Debuff - One enemy attack 'Sand Attack' can augment the players hit/miss ratio. It is doubled with every use up until a maximum of 80% chance to miss. Any use of the attack after this will have no effect.  

Design
--------
I chose to replicate a childhood classic, 'Poke'mon' for the Nintendo Gameboy. The game features a basic battle engine that runs an algorithm with a fairly small amount of variables to begin with. This will later go on the develop later in the game. I chose to focus on early battles and recreated the first battle the player will have in the Poke'mon franchise.

In keeping  with the original Gameboy theme, I used a 'gameboy-esque' shade of green throughout the project, accompanied by sprites from the original games. The sprites available online were poor quality, and would need to be vectored and the backgrounds made in transparent png files - this was done through Adobe photoshop.

After trying to find an appropriate image and failing to find one suitable, CSS was used to produce a Gameboy border for the battle screen.

![](https://github.com/jakeadamsiii/Project-one/blob/master/readme3.png "Battle screen")

Attack sprites again had to be made png files, the attack animations are largely jquery animation or fade transitions. I would have liked to reduce the swell in the JS file by transferring many of these animations to CSS. I started this process by making the flashing hit animation a class in CSS and then adding and removing the class in the JS.

Font was styled using the Poke'mon font: Pokemon_GB.ttf.

Implementation  
--------------
The MVP involved just the start screen and the battle page - no character selection. This was mostly achieved through DOM manipulation with jquery and explicit if else statements checking for you vs the rival. When adding extra characters, the JS had to accommodate different values for you and rival, so a turn variable was added. Switch statements were added to set the correct attacks when choosing different characters. This was important as it allowed for character customisation, and unique move-sets.

The second screen was then added. A still from the original game was chosen as the background to immerse the player and continue with the 8-bit theme.

After a battle is completed, a win screen will show, along with a score, and the user can choose to play again, and choose a new Poke'mon to play as.

![](https://github.com/jakeadamsiii/Project-one/blob/master/readme2.png "Second screen")

Challenges
-----------
Many unexpected bugs where encountered throughout the process.
Most notably there were issues including multiple characters. Much of the code was written for a single character player. From here making unique moves and different stats was a big challenge.
The JS is very long and much of it can be refactored or transfered to CSS (i.e. CSS animation opposed to jquery).
Name-spacing was difficult and resulted in a lot of bugs. After name-spacing much of the JS needed to be altered to fix these problems.  

Extra features to include
-------------------------
Additional Challenges - Boss battle was meant to be included.
Level up on Win.
Implementing SASS.
Added battle sound effects.
Tidier assets.
Tidy CSS.
More rewarding win screen.
Making the battle screen better resemble the original games.
Making the game responsive and mobile ready.
More mute/audio options.
Midifiy and G-zip?
