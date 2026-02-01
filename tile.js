class Tile {
    constructor(x, y, size, index, next) {
        this.x = x
        this.y = y
        this.size = size
        this.index = index
        this.next = next
        
        //coloring the tiles
        if (this.index % 4 == 0) {
            this.color = "#d5d274ff";
        } else if (this.index % 4 == 1) {
            this.color = "#d57475";
        } else if (this.index % 4 == 2) {
            this.color = "#00ccffff";
        } else if (this.index % 4 == 3) {
            this.color = "#28c900ff";
        }

        //image of board
    }

    getCenter() {
        let centX = this.x + this.size / 2;
        let centY = this.y + this.size / 2;
        return [centX, centY];
    }

    show(tiles) {
        //fill(this.color);
        //rect(this.x, this.y, this.size, this.size);
        
        if (this.next !== this.next + 1) {
            let startCenter = this.getCenter();
            let endCenter = tiles[this.next].getCenter();
        }

        
        fill(255);
        textSize(16);
        text(this.index, this.x, this.y + this.size);
    }
}

