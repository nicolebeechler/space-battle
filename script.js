const textStyle = [
    'font-size: 45px',
    'color: #fff',
    'background: rgb(37, 39, 45)',
    'text-shadow: 0px -1px 4px white, 0px -2px 10px yellow, 0px -10px 20px #ff8000, 0px -18px 40px red',
    'font-family: "Orbitron", sans-serif',
  ].join(';');
  
  console.log("%cSpace Battle", textStyle);
  
  setTimeout(function() {
    console.log("Player 1 Ready?");
  }, 3000);
  setTimeout(function() {
    console.clear();
  }, 9000);
  
  // Base Class would be like ship or something
  // constructor parameters: hull, firepower, accuracy, ....
  // base class methods: attack that inflicts damage
  // add sound effect?
  
  // Omar's task
  // Note from Paul: there's more to defining a class here.  We need to set the values of the constructor parameters, like this.hull = hull.  We also need to fill in the attack method.

  const startBtn = document.getElementById('start-button')
  const attackBtn = document.getElementById('attack-button')
  const fleeBtn = document.getElementById('flee-button')
  const continueBtn = document.getElementById('continue-button')
  const resetBtn = document.getElementById('reset-button')
  const battleEl = document.getElementById('space-battle')

  let battlesWon = 0
  const scoreBoard = document.getElementById('scoreboard')
  const gameStatus = document.getElementById('game-status')
  const messageArr = []
  
  class Ship {
    constructor
      (name, hull, firepower, accuracy) {
        this.name = name
        this.hull = hull
        this.firepower = firepower
        this.accuracy = accuracy
    }
    attack(target) {
        if (Math.random() <= this.accuracy) {
            target.hull -= this.firepower
            messageArr.push(`${target} just took ${this.firepower} worth of damage. Yikes!`)
        } else {messageArr.push(`Hey ${this.name}, you gotta be quicker than that! Shot missed.`)}
    }
  }
  
  //Lilianne task 
  //create class USS Assembly
  class PlayerShip extends Ship {
    constructor() {
      //default properties
      super('USS Assembly', 20, 5, 0.7);
    }
  }

//   attack(target) {

//   }
//   super.attack(target); // Call the attack method of the parent class
//   // This would be specific to PlayerShip's attack
//   if (target.hull <= 0) {
//     let victoryStatus = `Congratulations! ${this.name} defeated ${target.name}!`;
//     attackStatus.push(victoryStatus);
//   }
  
  //Diana's task
  // subclass for alien ships
  // Note from Paul: I think we'll need to have stats be randomly generated using Math.floor(Math.random)... for instance, hull needs to be randomly selected between 3-6
  //Note from Diana: Right, and I took a peak at the answer, I'm not there yet.
  class AlienShip extends Ship {
    constructor(name, hull, firepower, accuracy) {
       super(name, hull, firepower, accuracy)
    }
  }

  function randomization(max, min) {
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min
    return randomNum
  }
  
  // create instances of classes
  // Note from Paul: we'll need to fill in the parameters for the player ship.  We'll also need to instantiate a number of alien ships so that they can be put into the array below.
  const USSAssembly = new PlayerShip()

  const distortedET = new AlienShip('Distorted ET', 15, 4, 0.7)

  const alienShips = [
    distortedET
  ]

  function generateShips(num) {
    for (let i = 1; i <= num; i++) {
        const alienShip = new AlienShip(`Alien Ship ${i}`, randomization(6, 3), randomization(4, 2), (randomization(8, 6)) / 10)
        alienShips.push(alienShip)
    }
    return alienShips
  }

  

  startBtn.addEventListener('click', () => {
    generateShips(6);
    startBtn.style.display = 'none';
    attackBtn.style.display = 'block';
    battleEl.textContent = `I've got a GREAT feeling about this... USS Assembly hull integrity is at ${USSAssembly.hull}`;
    
  })

  attackBtn.addEventListener('click', () => {
    
  

    while ((alienShips[0].hull > 0) && (USSAssembly.hull > 0)) {
        USSAssembly.attack(alienShips[0])
        if (alienShips[0].hull > 0) {
        alienShips[0].attack(USSAssembly)
        } 
    }

    if (alienShips[0].hull <= 0) {
        battlesWon = battlesWon + 1
        scoreBoard.textContent = `Alien ships defeated: ${battlesWon}`
        // We'll come back to this
        gameStatus.textcontent = messageArr.map(obj => obj.message).join('\n')
    }

    if (USSAssembly.hul <= 0) {
        // hold on!
    }
  
  })

  // Note from Paul: below is an event listener that should trigger a function to generate alien ships.  I think we can wait to do this part! Something like below:
  
  // Rachail's task 
  // array for alien ships
  // Note from Paul: we need to store the full objects in the array.  We'll need to instantiate eight ships with semi-random stats and push them into the array with a loop
 
  
  // Junfeng's task 
  // alien ships need to automatically react to USS Assembly actions
  // some function that sets this in motion ^^^
  // event listener for action button
  
  
 
  
  
  // Paul task 
  // Reset button
//   document.getElementById('reset-button').addEventListener('click', () => {
//     // We'll empty the alienShips array so that the start button can trigger the instantiation of eight ships with semi-random stats
//     alienShips = []
  
//     document.getElementById('space-battle').innerHTML = 'Player 1 Ready?'
  
//     document.getElementById('scoreboard').innerHTML = ''
  
//     document.getElementById('game-status').innerHTML = ''
  
//     USSAssembly.hull = 20
  
    // I'll update this as we go... we'll need to reset the images if they change, the scoreboard, etc.
  
//   })
  
  