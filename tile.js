class Tile {
    constructor(x, y, size, index, next) {
        this.x = x
        this.y = y
        this.size = size
        this.index = index
        this.next = next
    }

    getColor() { //for card grabbing logic
        let name = "none";
        if (this.index % 4 == 0) {
            name = "yellow";
        } else if (this.index % 4 == 1) {
            name = "red";
        } else if (this.index % 4 == 2) {
            name = "blue";
        } else if (this.index % 4 == 3) {
            name = "green";
        }
        return name;
    }

    getCenter() {
        let centX = this.x + this.size / 2;
        let centY = this.y + this.size / 2;
        return [centX, centY];
    }

    show(tiles) { //shows numbered tiles
        fill(255);
        textSize(16);
        text(this.index, this.x, this.y + this.size);
    }
}

