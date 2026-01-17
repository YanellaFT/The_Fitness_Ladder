class Player {
    constructor() {
        this.spot = 0;
        this.steps = 0;
    }

    /*roll() {
        let r = floor(random(1,7));
        this.spot = this.spot + r;
    }*/

    move(totalSteps) {
        this.steps = totalSteps;
    }

    update() {
        if (this.steps > 0) {
            this.spot ++;
            this.steps --;
        }

        this.spot = min(this.spot, tiles.length - 1); //should make it not go off board
    }

    show(tiles) {
        let current = tiles[this.spot];
        fill(255);
        let center = current.getCenter();
        ellipse(center[0], center[1], 15);
    }
}