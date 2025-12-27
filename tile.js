class Tile {
    constructor(x, y, size, next) {
        this.x = x
        this.y = y
        this.size = size
        this.next = next
        this.color = random(255);
    }

    show() {
        fill(this.color);
        rect(this.x, this.y, this.size, this.size);
    }
}