class Player {
    constructor() {
        this.spot = 0;
    }

    roll() {
        let r = floor(random(1,7));
        this.spot = this.spot + r;
    }

    show(tiles) {
        let current = tiles[this.spot + 1];
        fill(255);
        let center = tile.Center();
        ellipse(center[0], center[1], 10);
    }
}