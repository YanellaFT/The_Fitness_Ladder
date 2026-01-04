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

function createDice(number) {
  const dotPositions = {
    1: [
      [50, 50] //center
    ],
    2: [
      [20, 20], //top left
      [80, 80] //bottom right
    ],
    3: [
      [20, 20], //t l
      [50, 50], //b r
      [80, 80] //c
    ],
    4: [
      [20, 20], //t l
      [20, 80], //t r
      [80, 20], // b l
      [80, 80] //b r
    ],
    5: [
      [20, 20], //t l
      [20, 80], //t r
      [50, 50], //c
      [80, 20], //b l
      [80, 80] //b r
    ],
    6: [
      [20, 20], // t l
      [50, 20], // middle l
      [80, 20], //b l
      [20, 80], //t r
      [50, 80], //middle r
      [80, 80] //b r
    ]
  };

  const dice = document.createElement("div");
  dice.classList.add("dice")

  for (const dotPos of dotPositions[number]) {
    const dot = document.createElement("div");
    
    dot.classList.add("dice-dot");

    // position the dots by changing the var in css
    dot.style.setProperty("--top", dotPos[0] + "%");
    dot.style.setProperty("--left", dotPos[1] + "%");
    
    dice.appendChild(dot);
  }
  return dice;
}