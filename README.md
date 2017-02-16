<h1>Project 1: Pokemon Turn Based Game</h1>

File list:
index.html
style.css
app.js

The Poke'mon battler is a recreation of the battle engine of the first generation Poke'mon games(Red, Blue and Yellow). The Game emulates the first battle encountered in the games, with the same character choices available to the user(Charmander, Bulbasaur, Squirtle and Pikachu).

Copyright
---------

I do not own any of the sprites or audio used. Copyright for the Poke'mon franchise belongs to Nintendo and Game-freak.

Brief
--------
The brief was to create an in browser game using jquery for DOM manipulation. The game needed a win condition and had to display a win/loss screen. The game must be deployed online via Heroku. DRY code principles where strongly recommended.

Design
--------
I chose to replicate a childhood classic, 'Poke'mon' for the Nintendo Gameboy. The game features a basic battle engine that runs an algorithm with a fairly small amount of variables to begin with. This will later go on the develop later in the game. I chose to focus on early battles and recreated the first battle the player will have in the Poke'mon franchise.

In keeping  with the original Gameboy theme, I used a 'gameboy-esque' shade of green throughout the project, accompanied by sprites from the original games. The sprites available online were poor quality, and would need to be vectored and the backgrounds made in transparent png files - this was done through Adobe photoshop.

After trying to find an appropriate image and failing to find one suitable, CSS was used to produce a Gameboy border for the battle screen.

Attack sprites again had to be made png files, the attack animations are largely jquery animation or fade transitions. I would have liked to reduce the swell in the JS file by transferring many of these animations to CSS. I started this process by making the flashing hit animation a class in CSS and then adding and removing the class in the JS.

Implementation  
--------------

Challenges
-----------

Extra features to include
-------------------------
