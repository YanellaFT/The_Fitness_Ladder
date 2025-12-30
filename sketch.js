let tiles = [];

let player;

function setup() {
  createCanvas(450, 450);

  let s = 50;
  let col = width / s;
  let ro = height / s;

  //startign spot for tiles (bottom left)
  let x = 0;
  let y = (ro - 1) * s;

  //direction of adding new tiles
  let dir = 1;

  //create tiles
  for ( let i = 0; i < col * ro; i++) {
    let tile = new Tile(x, y, s, i + 1, i + 2);
    tiles.push(tile);

    x = x + (s * dir);

    //check for edges
    if (x >= width) {
      x = x - s;
      y = y - s;
      dir = -1; //now moving left
    }
    if (x<= -s) {
      x = x + s;
      y = y - s;
      dir = 1; //now moving right
    }
  }

  player = new Player();
}

function draw() {
  background(220);

  for ( let tile of tiles ) {
    tile.show();
  }

  player.roll();

  //check to see if player is on last spot to not go beyond
  if (player.spot >= tiles.length - 1) {
    player.spot = tiles.length - 1;
    noLoop();
  }
  player.show(tiles);
} 