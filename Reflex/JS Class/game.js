class Game {
    constructor() {
        this.buttons = [...document.querySelectorAll('.buttons button')];
        this.start = document.querySelector('.start');
        this.reset = document.querySelector('.reset');
        this.timeDisplay = document.querySelector('.timer');
        this.scoring = document.querySelector('.points');
        this.hpCounter = document.querySelector('.hp');
        this.timeGame = 60;
        this.points = 0;
        this.lives = 3;
        this.timeDisplay.textContent = `Czas: ${this.timeGame} sek`;
        this.scoring.textContent = `Punkty: ${this.points}`;
        this.hpCounter.textContent = `Życia: ${this.lives}`;
        this.start.addEventListener('click', this.startGame);
        this.reset.addEventListener('click', this.resetGame);
    };

    clickStart = (stop = false) => {
        if (stop === false) {
            this.buttons.some(button => button.addEventListener('click', () => {
                if (button.className === "greenButton") {
                    this.points = this.points + 1;
                    this.scoring.textContent = `Punkty: ${this.points}`;
                }
                else {
                    this.lives = this.lives - 1;
                    this.hpCounter.textContent = `Życia: ${this.lives}`;
                }
            }));
        }
        else {
            return
        }
    };
    rollStart = () => {
        const index = Math.floor(Math.random() * this.buttons.length);
        this.buttons[index].classList.add('greenButton');
        if (this.buttons[index].className === `${this.buttons[index].className}`) {
            setTimeout(() => {
                this.buttons[index].classList.remove('greenButton');
            }, 800);
        }
    };
    countDown = () => {
        this.counter = setInterval(() => {
            --this.timeGame;
            this.timeDisplay.textContent = `Czas: ${this.timeGame} sek`;
        }, 1000);
    };
    
    startGame = () => {
        this.rollInterval = setInterval(this.rollStart, 2000);
        this.start.disabled = true;
        this.clickStart();
        this.countDown();
        this.endGame();
    };
    endGame = () => {
        this.endInterval = setInterval(() => {
            if (this.timeGame === 0) {
                clearInterval(this.counter);
                clearInterval(this.rollInterval);
                clearInterval(this.endInterval);
                alert(`Koniec czasu! Zdobyłeś ${this.points} punktów!`)
                
            }
            else if (this.lives === 0) {
                alert(`Straciłeś wszystkie punkty życia! Koniec gry! Zdobyłeś ${this.points} punktów!`)
                clearInterval(this.counter);
                clearInterval(this.rollInterval);
                clearInterval(this.endInterval);
                
            }
            
        },10)
    };
    resetStats = () => {
        this.timeGame = 60;
        this.points = 0;
        this.lives = 3;
        this.timeDisplay.textContent = `Czas: ${this.timeGame} sek`;
        this.scoring.textContent = `Punkty: ${this.points}`;
        this.hpCounter.textContent = `Życia: ${this.lives}`;
    }
    resetGame = () => {
        this.resetStats();
        this.start.disabled = false;
        this.clickStart(true)
        clearInterval(this.counter);
        clearInterval(this.rollInterval);
        clearInterval(this.endInterval);
        //location.reload();
    };
        
};

const game = new Game;