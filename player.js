class Player {
    constructor() {
        this.spot = 0;
        this.steps = 0;
        this.direction = 1; // 1 = forward, -1 = backward
    }

    move(totalSteps) {
        this.steps = totalSteps;
        this.direction = 1; 
    }

    update() {
        if (this.steps > 0) { //when player is moving
            this.spot += this.direction; //move one in direction 
            this.steps --; //steps = steps - 1
//for hard mode
            // //if player hit end of board
            // if (this.spot >= tiles.length - 1) {
            //     this.spot = tiles.length - 1; //stay on last tile
            //     this.direction = -1; //reverse direction
            // }

        } else { //when player stops moving 
            //check for road/ladder
            let currentTile = tiles[this.spot];
            if (currentTile.next != null) { //when specified certain tile in sketch for road/ladder
                this.spot = currentTile.next;
            }

            //check for what color tile
            let tileColor = currentTile.getColor();
            if (tileColor == "red") {
                redCard.disabled = false;
                blueCard.disabled = true;
                greenCard.disabled = true;
                yellowCard.disabled = true;
            } else if (tileColor == "blue") {
                redCard.disabled = true;
                blueCard.disabled = false;
                greenCard.disabled = true;
                yellowCard.disabled = true;
            } else if (tileColor == "green") {
                redCard.disabled = true;
                blueCard.disabled = true;
                greenCard.disabled = false;
                yellowCard.disabled = true;
            } else if (tileColor == "yellow") {
                redCard.disabled = true;
                blueCard.disabled = true;
                greenCard.disabled = true;
                yellowCard.disabled = false
            } else {
                redCard.disabled = true;
                blueCard.disabled = true;
                greenCard.disabled = true;
                yellowCard.disabled = true;                
            }
        }

//remove this if on hard mode
        this.spot = min(this.spot, tiles.length - 1); //should make it not go off board
    }

    show(tiles) {
        let current = tiles[this.spot];
        fill(255);
        let center = current.getCenter();
        ellipse(center[0], center[1], 15);
    }
}