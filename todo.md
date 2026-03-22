* ~~create grid~~
* ~~color boxes~~
* ~~name boxes~~
* ~~create player~~
* ~~movement of player --> SLOW DOWN~~
* ~~create die roll with button click~~
* ~~create die roll animation~~
* ~~only move player when die stop rolling ~~
* ~~correct placement of player~~
* ~~make sure die roll actually = amount of steps moved~~
* ~~fix border/numbering on grid/board~~


# ART
* style site
* draw stuff !!!

# CARDS
* add cards ==> 20 cards for each color + 2 special cards in each ==> DRAW THEM
* ~~draw from pile when correct color~~
* ~~open/close~~
* ~~randomize picture~~


# GAME PLAY
* make it so that if not exact die roll at the end, you move back that many steps --> hard mode!
* welcome screen where user chooses 1 or 2 players and hard mode or not

* ~~only allow roll once player stop moving~~
~~* only allow new roll once player opens/closes card~~
* add button to start movement of die (maybe even "Enter amount to move: if input == correct steps needed then move player" for math component)

* ~~add snakes ~~
* ~~add ladders~~

* ~~restart button~~

* add second player  --> fix some logic like cards not working correctly
    --> when in 2 player mode, cards only read for black player
* ~~add 4 players~~ --> fix placing & color
* add input for how many players

* add amount of exercises count

* add how to play menu




 //coloring the tiles
        if (this.index % 4 == 0) {
            this.color = "#ffde59";
            let name = "yellow";
        } else if (this.index % 4 == 1) {
            this.color = "#d57475";
            let name = "red";
        } else if (this.index % 4 == 2) {
            this.color = "#00ccffff";
            let name = "blue";
        } else if (this.index % 4 == 3) {
            this.color = "#28c900ff";
            let name = "green";
        }

do bunx vite to run