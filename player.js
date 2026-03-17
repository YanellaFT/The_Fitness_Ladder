class Player {
    constructor(playerIndex) {
        this.spot = 0;
        this.steps = 0;
        this.direction = 1; // 1 = forward, -1 = backward
        this.playerIndex = playerIndex;
        this.color = playerIndex === 0 ? "white" : "black"; //if playerIndex === 0 then color is white, else color is black --> New syntax learned :P
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
        fill(this.color);
        let center = current.getCenter();
        //goal for future, try to get offset only if both on same spot
        let offset = this.playerIndex * 5; //offset so if multiple players then they dont overlap
        ellipse(center[0] + offset, center[1], 15);
    }
}