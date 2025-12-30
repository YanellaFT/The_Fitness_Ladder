class Tile {
    constructor(x, y, size, index, next) {
        this.x = x
        this.y = y
        this.size = size
        this.index = index
        this.next = next

        //coloring the tiles
        if (this.index % 4 == 0) {
            this.color = "#ff2f00ff";
        } else if (this.index % 4 == 1) {
            this.color = "#0011ffff";
        } else if (this.index % 4 == 2) {
            this.color = "#fffb00ff";
        } else if (this.index % 4 == 3) {
            this.color = "#28c900ff";
        }
    }

    getCenter() {
        let centX = this.x + this.size / 2;
        let centY = this.y + this.size / 2;
        return [centX, centY];
    }

    show() {
        fill(this.color);
        rect(this.x, this.y, this.size, this.size);
        fill(255);
        textSize(16);
        text(this.index, this.x, this.y + this.size);
    }
}

