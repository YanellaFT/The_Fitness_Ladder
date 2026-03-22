class Player {
    constructor(playerIndex) {
        this.spot = 0;
        this.steps = 0;
        this.playerIndex = playerIndex;
        //this.color = playerIndex === 0 ? "white" : "black"; //if playerIndex === 0 then color is white, else color is black --> New syntax learned :P
        
        if (playerIndex === 0) {
            this.color = "white";
        } else if (playerIndex === 1) {
            this.color = "black";
        } else if (playerIndex === 2) {
            this.color = "rgba(129, 89, 4, 1)";
        } else if (playerIndex === 3) {
            this.color = "grey";
        }
        //this.element.style.outline = this.color;
    }

    move(totalSteps) {
        this.steps = totalSteps;
    }

    update() {
        if (this.steps > 0) { //when player is moving
            this.spot ++; //move one in direction 
            this.steps --; //steps = steps - 1
            this.spot = Math.min(this.spot, tiles.length - 1);

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

    }

    show(tiles) {
        let current = tiles[this.spot];
        fill(this.color);
        let center = current.getCenter();
        //goal for future, try to get offset only if both on same spot
        let offset = this.playerIndex * 5; //offset so if multiple players then they dont overlap
        ellipse(center[0] - 5 + offset, center[1], 15);
    }
}