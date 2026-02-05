# The Fitness Ladder
else { //when player stops moving chekc for road/ladder
            let currentTile = tiles[this.spot];
            if (currentTile.next != null) { //when specified certain tile in sketch for road/ladder
                this.spot = currentTile.next;
            }
        }
