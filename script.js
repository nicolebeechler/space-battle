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

  const startBtn = document.getElementById('start-button')
  const attackBtn = document.getElementById('attack-button')
  const fleeBtn = document.getElementById('flee-button')
  const continueBtn = document.getElementById('continue-button')
  const resetBtn = document.getElementById('reset-button')
  const battleEl = document.getElementById('space-battle')

  let battlesWon = 0
  const scoreBoard = document.getElementById('scoreboard')
  const gameStatus = document.getElementById('game-status')
  let messageArr = []

  const alienShipsImg = ["https://i.imgur.com/eD4HlrL.png", "https://i.imgur.com/7WpzZBJ.png","https://i.imgur.com/9dy4wKo.png","https://i.imgur.com/TFfFnqa.png","https://i.imgur.com/04PFqQd.png","https://i.imgur.com/N3YvDJE.png"]
  const alienImg = document.getElementById('alien')
  
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
            messageArr.push(`${target.name} just took ${this.firepower} worth of damage. Yikes!`)
        } else {messageArr.push(`Hey ${this.name}, you gotta be quicker than that! Shot missed.`)}
    }
  }
  
  class PlayerShip extends Ship {
    constructor() {
      super('USS Assembly', 20, 5, 0.7);
    }
  }

  class AlienShip extends Ship {
    constructor(name, hull, firepower, accuracy) {
       super(name, hull, firepower, accuracy)
    }
  }

  function randomization(max, min) {
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min
    return randomNum
  }
  
  const USSAssembly = new PlayerShip()

  const distortedET = new AlienShip('Distorted ET', 15, 4, 0.7)

  let alienShips = [
    distortedET
  ]

  function generateShips(num) {
    for (let i = 1; i <= num; i++) {
        const alienShip = new AlienShip(`Alien Ship ${i}`, randomization(6, 3), randomization(4, 2), (randomization(8, 6)) / 10)
        alienShips.push(alienShip)
    }
    return alienShips
  }

  gameStatus.render = () => {
    gameStatus.innerHTML = `<ul> ${
      messageArr.map((item => {
        return `<li>
         ${item} 
         </li>`
      })).join('')
    }</ul>`
  }
  
  startBtn.addEventListener('click', () => {
    alienShips = [];
    generateShips(6);
    startBtn.style.display = 'none';
    attackBtn.style.display = 'block';
    USSAssembly.hull = 20;
    battleEl.textContent = '';
    battleEl.textContent = `I've got a GREAT feeling about this... USS Assembly hull integrity is at ${USSAssembly.hull}`;
    gameStatus.innerHTML = '';
    messageArr = [];
    battlesWon = 0;
    scoreBoard.textContent = `Alien ships defeated: ${battlesWon}`
  })

  attackBtn.addEventListener('click', () => {
    messageArr = [];
    USSAssembly.attack(alienShips[0])
    if (alienShips[0].hull > 0) {
      alienShips[0].attack(USSAssembly)
    } 
  
    if (alienShips[0].hull <= 0) {
      battlesWon = battlesWon + 1
      scoreBoard.textContent = `Alien ships defeated: ${battlesWon}`
      attackBtn.style.display = 'none';
      continueBtn.style.display = 'block';
      fleeBtn.style.display = 'block';
      battleEl.textContent = '';
      battleEl.textContent = `USS Assembly hull integrity is at ${USSAssembly.hull}`;
      alienImg.src = alienShipsImg[randomization(alienShipsImg.length - 1, 0)]
    }

    if (USSAssembly.hull <= 0) {
      resetBtn.style.display = 'block';
      attackBtn.style.display = 'none';
      battleEl.textContent = `YOU HAD ONE JOB!!!`
    }

    gameStatus.render() 

  
  })

  continueBtn.addEventListener('click', () => {
    alienShips.shift()
    attackBtn.style.display = 'block';
    continueBtn.style.display = 'none';
    fleeBtn.style.display = 'none';
    if (alienShips.length === 0) {
      battleEl.textContent = `Go home soldier you've won the battle. Will you seek further Glory or will you rest on your Laurels?`
      startBtn.style.display = 'block';
      attackBtn.style.display = 'none';
    }
  })

  fleeBtn.addEventListener('click',() => {
    battleEl.textContent = `Whats the difference between you and a COWARD?`
    continueBtn.style.display = 'none';
    fleeBtn.style.display = 'none';
    startBtn.style.display = 'block';
  })

  resetBtn.addEventListener('click',() => {
    resetBtn.style.display = 'none';
    startBtn.style.display = 'block';
    gameStatus.innerHTML = '';
    battleEl.innerHTML = `Player 1 Ready?`
    messageArr = [];
    scoreBoard.innerHTML = '';
  })

