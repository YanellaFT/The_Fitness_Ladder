let tiles = [];

let player;
let boardImg;

function preload() {
  boardImg = loadImage("assets/board.png");
}

function setup() {
  createCanvas(450, 450);

  let sideLength = 46;
  let offset = 18;
  let col = 9;
  let ro = 9;

  //startign spot for tiles (bottom left)
  let x = offset;
  let y = height - offset - sideLength;

  //direction of adding new tiles
  let dir = 1; //going right first

  //create tiles
  for (let i = 0; i < col * ro; i++) {
    let tile = new Tile(x, y, sideLength, i + 1, i + 2);
    tiles.push(tile); //adds new tile

    x = x + (sideLength * dir); //make sure to move in right direction

    //check for edges
    if (x > width - offset - sideLength && dir == 1) {
      x = width - offset - sideLength;
      y = y - sideLength;
      dir = -1; //now moving left
    } else if (x < offset && dir == -1) {
      x = offset;
      y = y - sideLength;
      dir = 1
    }
  }

/*  tiles[6].next = 30;
  tiles[10].next = 8;
  tiles[16].next = 22;
  tiles[20].next = 2;
  tiles[33].next = 39;*/

  //playerrrr
  player = new Player();

  //diceee
  const diceContainer = document.querySelector(".dice-cont");
  const btnRollDice = document.querySelector(".roll-dice-button");
  let moveButton = document.querySelector(".move-player-button");
  moveButton.disabled = true;

  //start off with two blank dice
  diceContainer.appendChild(createDice(0));
  diceContainer.appendChild(createDice(0));

  //if click then roll die + move player
  btnRollDice.addEventListener("click", () => {
    btnRollDice.disabled = true; //does not allow double rolls
    const animation = setInterval(() => {
      randomDiceRoll(diceContainer, 2);
    }, 50);

    setTimeout(() => {
      clearInterval(animation);
      moveButton.disabled = false;
      btnRollDice.disabled = false;

      const totalSteps = randomDiceRoll(diceContainer, 2);
      
      moveButton.addEventListener("click", () => {
        frameRate(10); //slows player down
        player.move(totalSteps);
        moveButton.disabled = true; //allow 
      });


    }, 500);

  });


}

function draw() {
  background(220);

  imageMode(CENTER);
  image(boardImg, width/2, height/2, width, height);

  imageMode(CORNER);

  for (let tile of tiles) {
    tile.show(tiles);
  }

  //player.roll();
  player.update();
  player.show(tiles);

  //check to see if player is on last spot to not go beyond => DOESNT WORK
  if (player.spot >= tiles.length - 1) {
    player.spot = tiles.length - 1;
    noLoop();
  }
  //player.show(tiles);


} 

function createDice(number) {
  const dotPositions = {
    0: [ //no dots
    ],
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

  //create dice div in html
  const dice = document.createElement("div");
  dice.classList.add("dice")

  //add dots
  for (const dotPos of dotPositions[number]) {
    const dot = document.createElement("div");
    
    dot.classList.add("dice-dot");

    // position the dots by changing the var in css
    dot.style.setProperty("--top", dotPos[0] + "%");
    dot.style.setProperty("--left", dotPos[1] + "%");
    
    dice.appendChild(dot);
  }
  return dice; //show 
}

function randomDiceRoll(diceContainer, numOfDice) {
  diceContainer.innerHTML = ""; //clears previous dices

  let totalSteps = 0;

  for (let i = 0; i < numOfDice; i++) {
    const randomNum = Math.floor((Math.random() * 6) + 1); //chose random numbre for dice
    totalSteps = totalSteps + randomNum;

    const dice = createDice(randomNum);

    diceContainer.appendChild(dice);
  }

  return totalSteps; //how many tiles player needs to move
}

