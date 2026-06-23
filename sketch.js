let tiles = [];
let players = [];
let currentPlayerIndex = 0;
let movingPlayerIndex = 0;
let numPlayers = 0;
let totalSteps = 0;
let boardImg;

let playerButtons, startBtn, introScreen, gameScreen, board, winScreen;
let diceContainer, rollDiceBtn, closeCardBtn; //moveBtn;
let restartBtn, homeBtn, helpBtn, continuePlayingBtn;
let redCard, blueCard, greenCard, yellowCard;
let armCard, abCard, legCard, cardioCard;

let isDraggingInstuc = false;
let isDraggingMusic = false;

function preload() {
  boardImg = loadImage("./assets/board.png");
}

function setup() {
  const canvasDiv = document.createElement("div");
  const canvasCont = document.createTextNode(createCanvas(450, 450));
  canvasDiv.appendChild(canvasCont);
  canvasDiv.id = "p5Canvas";
  // canvasDiv.style.zIndex = 100;
  // const canvasCurrDiv = document.getElementById("p5Canvas");
  // document.body.insertBefore(canvasDiv, canvasCurrDiv);

  // canvasCont.style.display = "none"; //hide canvas until start game

  setupBoard();
  setupUI();
  setupEventListeners();
}

function draw() {
  background(220);

  imageMode(CENTER);
  image(boardImg, width/2, height/2, width, height);

  imageMode(CORNER);

  for (let tile of tiles) {
    tile.show(tiles);
  }
 
  if (players.length > 0) {
    for (let player of players) {
      player.update();
      player.show(tiles);
    }
  }

  // let currentPlayer = players[currentPlayerIndex];
  // //player.roll();
  // currentPlayer.update();
  // currentPlayer.show(tiles);

} 

function setupBoard() {
  let sideLength = 46;
  let offset = 18;
  let col = 9;
  let ro = 9;

  //startign spot for tiles --> bottom left
  let x = offset;
  let y = height - offset - sideLength;

  //direction of adding new tiles
  let dir = 1; //going right first

  //create tiles
  for (let i = 0; i < col * ro; i++) {
    let tile = new Tile(x, y, sideLength, i + 1, i); //makes new tile itself
    tiles.push(tile); //adds new tile

    x = x + (sideLength * dir); //make sure to move in right direction

    //edges of board
    if (x > width - offset - sideLength && dir == 1) {
      x = width - offset - sideLength;
      y = y - sideLength;
      dir = -1; //now moving left
    } else if (x < offset && dir == -1) {
      x = offset;
      y = y - sideLength;
      dir = 1 //moving right again
    }
  }

  //roads down
  tiles[9].next = 7; //road going from 10 to 8 WORKS
  tiles[19].next = 1; //20 to 2 WORKS
  tiles[47].next = 31; //48 to 32 WORKS
  tiles[54].next = 37; //55 to 38 WORKS
  tiles[64].next = 46; //65 to 47 WORKS
  tiles[74].next = 58; //75 to 59 WORKS

  //ladders up
  tiles[5].next = 29; //ladder going from 6 to 30 WORKS
  tiles[15].next = 21; //16 to 22 WORKS
  tiles[32].next = 38; //33 to 39 WORKS
  tiles[49].next = 77; //50 to 78 WORKS
  tiles[51].next = 73; //52 to 74 WORKS

}

function setupUI() {
  playerButtons = document.querySelectorAll(".player-choice button");

  startBtn = document.querySelector(".start-game-btn");
  introScreen = document.querySelector(".intro-screen");
  
  gameScreen = document.querySelector(".game-screen");
  board = document.querySelector("canvas");

  winScreen = document.querySelector(".win-screen");
  continuePlayingBtn = document.querySelector(".cont-play-btn")

  turnDisplay = document.querySelector(".turn-display");
  diceContainer = document.querySelector(".dice-cont");
  rollDiceBtn = document.querySelector(".roll-dice-button");
  closeCardBtn = document.querySelector(".close-card");

  // moveBtn = document.querySelector(".move-player-button");
  // moveBtn.disabled = true; //player cannot move until roll die


  //start off with two blank dice
  diceContainer.appendChild(createDice(0));
  diceContainer.appendChild(createDice(0));


  //cards
  redCard = document.querySelector(".red-card");
  blueCard = document.querySelector(".blue-card");
  greenCard = document.querySelector(".green-card");
  yellowCard = document.querySelector(".yellow-card");
  
  armCard = document.querySelector(".big-red-card");
  armCard.style.display = "none";
  abCard = document.querySelector(".big-blue-card");
  abCard.style.display = "none";
  legCard = document.querySelector(".big-green-card");
  legCard.style.display = "none";
  cardioCard = document.querySelector(".big-yellow-card");
  cardioCard.style.display = "none";

  //this works so once done with all cards then put them here
  fronts = ["one.png", "two.png", "three.png", "four.png", "five.png", "six.png", "seven.png", "eight.png", "nine.png", "ten.png", "eleven.png", "twelve.png", "thirteen.png", "fourteen.png", "fifteen.png", "sixteen.png", "seventeen.png", "eighteen.png", "nineteen.png", "twenty.png", "twentyone.png", "twentytwo.png", "twentythree.png"];
  // frontCard = fronts[Math.floor(Math.random() * fronts.length)] --> needs to be inside click function bc if not then always same index then same card
  // console.log(frontCard);
  // fronts.splice(fronts.indexOf(frontCard), 1);


  restartBtn = document.querySelector(".restart-button");

  homeBtn = document.querySelector(".back-to-home");
  
  helpBtn = document.querySelector(".help-btn");
  instructions = document.querySelector(".instructions");

  musicBtn = document.querySelector(".music-btn");
  musicPlayer = document.querySelector(".music-player");

}

function setupEventListeners() {
  //set up num of playerrrrs
  playerButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const value = parseInt(btn.getAttribute("data-val"));

      //uhh reset to og color plss
      // if (numPlayers === value && btn.style.backgroundColor !== "" && btn.style.backgroundColor !== "#898989") {
      //   btn.style.backgroundColor = "#898989";
      //   btn.style.color = "#ebdec7";
      //   btn.style.borderColor = "";
      //   numPlayers = 1; 
      //   return;
      // }

      //make sure non other btn still with color
      playerButtons.forEach(b => {
        b.style.backgroundColor = "#898989";
        b.style.color = "#ebdec7";
        b.style.borderColor = "";
      });

      const colors = { 
        1: "#d57475", 
        2: "#00ccffff", 
        3: "#28c900ff", 
        4: "#ffde59" 
      };

      btn.style.backgroundColor = colors[value];
      btn.style.color = "#000000";
      btn.style.borderColor = "#898989";

      numPlayers = value;
      startBtn.disabled = false;
    });
  });


  startBtn.disabled = true;
  //start game
  startBtn.addEventListener("click", () => {
    players = []

    introScreen.classList.remove("fade-in", "fade-out", "slide-in-up", "slide-out-down", "slide-out-up", "slide-in-down");
    gameScreen.classList.remove("fade-in", "fade-out", "slide-in-up", "slide-out-down", "slide-out-up", "slide-in-down");
    board.classList.remove("fade-in", "fade-out", "slide-in-up", "slide-out-down", "slide-out-up", "slide-in-down");

    introScreen.classList.add("slide-out-up");

    setTimeout(() => {
      introScreen.style.display = "none";
      introScreen.classList.remove("fade-in", "fade-out", "slide-in-up", "slide-out-down", "slide-out-up", "slide-in-down");

      gameScreen.style.display = "block";
      board.style.display = "block";
      board.style.justifyContent = "center";
      board.style.margin = "100px auto";

      board.classList.add("slide-in-up");
      gameScreen.classList.add("slide-in-up");
      
    }, 500);

    //initialize players
    for (let i = 0; i < numPlayers; i++) {
      players.push(new Player(i));
    }
    showTurn();
  });


  //if click then roll die
  rollDiceBtn.addEventListener("click", () => {
    rollDiceBtn.disabled = true; //does not allow double rolls
    const animation = setInterval(() => {
      randomDiceRoll(diceContainer, 2);
    }, 50);

    setTimeout(() => {
      clearInterval(animation);
      totalSteps = randomDiceRoll(diceContainer, 2);
      
      // moveBtn.disabled = false;
      rollDiceBtn.disabled = true;
    }, 500);

    setTimeout(() => {
      frameRate(10); //slows player down so see movement
      movingPlayerIndex = currentPlayerIndex;
      players[currentPlayerIndex].move(totalSteps);

      do {
      currentPlayerIndex = (currentPlayerIndex + 1)  % players.length; //change player
      } while (players[currentPlayerIndex].hasWon && players.some(p => !p.hasWon));

      rollDiceBtn.disabled = true;
    }, 1000);

  });
  

  //if click then move player
  // moveBtn.addEventListener("click", () => {
  //   frameRate(10); //slows player down so see movement
  //   movingPlayerIndex = currentPlayerIndex;
  //   players[currentPlayerIndex].move(totalSteps);

  //   currentPlayerIndex = (currentPlayerIndex + 1)  % players.length; //change player
    
  //   moveBtn.disabled = true; //allow 
  //   rollDiceBtn.disabled = true;

  // });


  //clicking cards 
  redCard.addEventListener("click", () => {
    armCard.style.display = "block";
    closeCardBtn.style.display = "block";

    frontCard = fronts[Math.floor(Math.random() * fronts.length)]
    armCard.style.backgroundImage = `url(./assets/front-of-card/red/${frontCard})`;
    armCard.style.backgroundSize = "cover"; 
    armCard.style.backgroundPosition = "center"; 
    armCard.style.backgroundRepeat = "no-repeat";
    // armCard.style.backgroundColor = "#d57475";
  

    closeCardBtn.addEventListener("click", () => {
      armCard.style.display = "none";
      closeCardBtn.style.display = "none";
      rollDiceBtn.disabled = false;
      showTurn();
    }, 
    {
      once: true
    })

  })

  blueCard.addEventListener("click", () => {
    abCard.style.display = "block";
    closeCardBtn.style.display = "block";

    frontCard = fronts[Math.floor(Math.random() * fronts.length)]
    abCard.style.backgroundImage = `url(./assets/front-of-card/blue/${frontCard})`;
    abCard.style.backgroundSize = "cover"; 
    abCard.style.backgroundPosition = "center"; 
    abCard.style.backgroundRepeat = "no-repeat";

    closeCardBtn.addEventListener("click", () => {
      abCard.style.display = "none";
      closeCardBtn.style.display = "none";
      rollDiceBtn.disabled = false;
      showTurn();
    }, 
    {
      once: true
    })
    
  })

  greenCard.addEventListener("click", () => {
    legCard.style.display = "block";
    closeCardBtn.style.display = "block";

    frontCard = fronts[Math.floor(Math.random() * fronts.length)]
    legCard.style.backgroundImage = `url(./assets/front-of-card/green/${frontCard})`;
    legCard.style.backgroundSize = "cover"; 
    legCard.style.backgroundPosition = "center"; 
    legCard.style.backgroundRepeat = "no-repeat";

    closeCardBtn.addEventListener("click", () => {
      legCard.style.display = "none";
      closeCardBtn.style.display = "none";
      rollDiceBtn.disabled = false;
      showTurn();
    }, 
    {
      once: true
    })
    
  })

  yellowCard.addEventListener("click", () => {
    cardioCard.style.display = "block";
    closeCardBtn.style.display = "block";

    frontCard = fronts[Math.floor(Math.random() * fronts.length)]
    cardioCard.style.backgroundImage = `url(./assets/front-of-card/yellow/${frontCard})`;
    cardioCard.style.backgroundSize = "cover"; 
    cardioCard.style.backgroundPosition = "center"; 
    cardioCard.style.backgroundRepeat = "no-repeat";

    closeCardBtn.addEventListener("click", () => {
      cardioCard.style.display = "none";
      closeCardBtn.style.display = "none";
      rollDiceBtn.disabled = false;
      showTurn();
    }, 
    {
      once: true
    })
    
  })


  //restart game
  restartBtn.addEventListener("click", () => {
    players.forEach(player => {
      player.spot = 0;
      player.hasWon = false;
      currentPlayerIndex = 0;
      showTurn();
    });

    diceContainer.innerHTML = "";
    diceContainer.appendChild(createDice(0));
    diceContainer.appendChild(createDice(0));

    rollDiceBtn.disabled = false;
  });

  //btn for continue same game on win screen   
  continuePlayingBtn.addEventListener("click", () => {
    //only win screen moces so it looks liek curtain
    winScreen.classList.remove("fade-in", "fade-out", "slide-in-up", "slide-out-down", "slide-out-up", "slide-in-down");
    winScreen.classList.add("slide-out-down");

    setTimeout(() => {
        winScreen.style.display = "none";
        winScreen.classList.remove("fade-in", "fade-out", "slide-in-up", "slide-out-down", "slide-out-up", "slide-in-down");

        gameScreen.style.display = "block";
        board.style.display = "block";

        gameScreen.classList.remove("fade-in", "fade-out", "slide-in-up", "slide-out-down", "slide-out-up", "slide-in-down");
        gameScreen.classList.add("fade-in");
        board.classList.remove("fade-in", "fade-out", "slide-in-up", "slide-out-down", "slide-out-up", "slide-in-down");
        board.classList.add("fade-in");

        rollDiceBtn.disabled = false;
        showTurn();
    }, 500);
  });


  //back home button
  homeBtn.addEventListener("click", () => {
    gameScreen.classList.remove("fade-in", "fade-out", "slide-in-up", "slide-out-down", "slide-out-up", "slide-in-down");
    board.classList.remove("fade-in", "fade-out", "slide-in-up", "slide-out-down", "slide-out-up", "slide-in-down");
    winScreen.classList.remove("fade-in", "fade-out", "slide-in-up", "slide-out-down", "slide-out-up", "slide-in-down");
    
    gameScreen.classList.add("slide-out-down")
    board.classList.add("slide-out-down");
    winScreen.classList.add("slide-out-down");

    setTimeout(() => {
      gameScreen.style.display = "none";
      board.style.display = "none";
      winScreen.style.display = "none";
      // gameScreen.classList.add("slide-out-down")
      // board.classList.add("slide-out-down");

      introScreen.style.display = "flex";
      introScreen.classList.add("slide-in-down");
    }, 500);

    players.forEach(player => {
      player.spot = 0;
    });
    players = [];

    diceContainer.innerHTML = "";
    diceContainer.appendChild(createDice(0));
    diceContainer.appendChild(createDice(0));

    // moveBtn.disabled = true;
    rollDiceBtn.disabled = false;

    currentPlayerIndex = 0;
    totalSteps = 0;

    startBtn.disabled = true;
    numPlayers = 0;

    playerButtons.forEach(b => {
      b.style.backgroundColor = "#898989";
      b.style.color = "#ebdec7";
      b.style.borderColor = "";
    });

  })


  //help button that shows instructions
  helpBtn.innerText = "Instructions";
  helpBtn.addEventListener("click", () => {
    if (instructions.style.display === "none") {
      instructions.style.display = "block";
      helpBtn.innerText = 'Close Instructions';
    } else {
      instructions.style.display = "none";
      helpBtn.innerText = "Instructions";
    }
  });

  instructions.addEventListener("mousedown", (e) => {
    isDraggingInstuc = true;
    instructions.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (isDraggingInstuc) {
      let x = e.clientX;
      let y = e.clientY;
      instructions.style.left = x + "px";
      instructions.style.top = y + "px";
      instructions.style.margin = "0"
    }
  });

  document.addEventListener("mouseup", () => {
    isDraggingInstuc = false;
    instructions.style.cursor = "grab";
  });


  //music player spotify thingy
  musicBtn.addEventListener("click", () => {
    if (musicPlayer.style.display === "none") {
      musicPlayer.style.display = "block";
      musicBtn.innerText = "Close Music";
    } else {
      musicPlayer.style.display = "none";
      musicBtn.innerText = "Music";
    }
  });

  /* NOT WORKING
  musicPlayer.addEventListener("mousdown", (e) => {
    isDragginMusic = true;
    musicPlayer.style.cursor = "grabbing";
  });

  musicPlayer.addEventListener("mousemove", (e) => {
    if (isDraggingMusic) {
      let x = e.clientX;
      let y = e.clientY;
      instructions.style.left = x + "px";
      instructions.style.top = y + "px";
      instructions.style.margin = "0"
    }
  });

  musicPlayer.addEventListener("mouseup", () => {
    isDraggingMusic = false;
    instructions.style.cursor = "grab";
  });
  */

}

function showTurn() {
  let playerColors = {1: "white", 2: "black", 3: "brown", 4: "grey"}
  let playerColor = playerColors[currentPlayerIndex + 1];
  turnDisplay.innerHTML = `Player ${currentPlayerIndex + 1}'s (${playerColor}) turn.`
}

function showWinScreen(playerIndex) {
  gameScreen.classList.remove("fade-in", "fade-out", "slide-in-up", "slide-out-down", "slide-out-up", "slide-in-down");
  board.classList.remove("fade-in", "fade-out", "slide-in-up", "slide-out-down", "slide-out-up", "slide-in-down");
  gameScreen.classList.add("fade-out");
  board.classList.add("fade-out");

  // winScreen.classList.remove("fade-in", "fade-out", "slide-in-up", "slide-out-down", "slide-out-up", "slide-in-down");

  // winScreen.classList.add("slide-in-up");

  setTimeout(() => {
    gameScreen.classList.remove("fade-in", "fade-out", "slide-in-up", "slide-out-down", "slide-out-up", "slide-in-down");
    board.classList.remove("fade-in", "fade-out", "slide-in-up", "slide-out-down", "slide-out-up", "slide-in-down");
    winScreen.classList.remove("fade-in", "fade-out", "slide-in-up", "slide-out-down", "slide-out-up", "slide-in-down");

    winScreen.classList.add("slide-in-up");

    gameScreen.style.display = "none";
    board.style.display = "none";
    winScreen.style.display = "flex";

  }, 500);

  let playerColors = {1: "white", 2: "black", 3: "brown", 4: "grey"}
  let playerColor = playerColors[playerIndex + 1];

  const text = winScreen.querySelector(".text");
  text.innerText = `Player ${playerIndex + 1} (${playerColor}) has reached the end!`;
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

