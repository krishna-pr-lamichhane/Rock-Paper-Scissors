let playerScore = 0;
let computerScore = 0;
let playerScorePrev = 0;
let computerScorePrev = 0;
let computerChoices = ['rock', 'paper', 'scissors'];
let computerChoice = null;
let winner = null;

const startGame = document.querySelector('.new-game button');
const gameDiv = document.querySelector('.actual-game');
const playerChoiceDiv = document.querySelector('.player-choice');
const playerChoseDiv = document.querySelector('.player-chose');
const computerChoiceDiv = document.querySelector('.computer-choice');
const computerChoseDiv = document.querySelector('.computer-chose');
const resultDiv = document.querySelector('.result');
const nextMatchBtn = document.querySelector('.nxt-match button');

// Show images for player and computer
const showImgPlayer = {
    rock: document.querySelector('.pshow-img-rock'),
    paper: document.querySelector('.pshow-img-paper'),
    scissors: document.querySelector('.pshow-img-scissors')
};

const showImgComputer = {
    rock: document.querySelector('.cshow-img-rock'),
    paper: document.querySelector('.cshow-img-paper'),
    scissors: document.querySelector('.cshow-img-scissors')
};

startGame.addEventListener('click', () => {
    if (startGame.textContent === 'Start Game') {
        startGame.textContent = 'End Game';
        gameDiv.style.display = 'block';
    } else {
        startGame.textContent = 'Start Game';
        gameDiv.style.display = 'none';
        playerScorePrev = playerScore;
        computerScorePrev = computerScore;
        playerScore = 0;
        computerScore = 0;
        updateScores();
        document.querySelector('.prev-score-player').value = playerScorePrev;
        document.querySelector('.prev-score-computer').value = computerScorePrev;
        document.querySelector('.nxt-match').style.display = 'none';
        resetRound();
    }
});

// Select only playable images
document.querySelectorAll('.player-choice img').forEach(img => {
    img.addEventListener('click', () => {
        const playerChoice = img.dataset.value;
        playMatch(playerChoice);
    });
});

function playMatch(playerChoice) {
    hideAllChoices();
    playerChoiceDiv.style.display = 'none';
    playerChoseDiv.style.display = 'block';
    showImgPlayer[playerChoice].style.display = 'block';

    // Random computer choice after delay of 1 second
    setTimeout(() => {
        computerChoice = computerChoices[Math.floor(Math.random() * 3)];
        computerChoiceDiv.style.display = 'none';
        computerChoseDiv.style.display = 'block';
        showImgComputer[computerChoice].style.display = 'block';
    }, 1000);

    // Show result after total 2 seconds delay
    setTimeout(() => {
        resultDiv.style.display = 'block';
        determineWinner(playerChoice, computerChoice);
        updateScores();
        document.querySelector('.nxt-match').style.display = 'block';
    }, 2000);
}

function hideAllChoices() {
    Object.values(showImgPlayer).forEach(img => img.style.display = 'none');
    Object.values(showImgComputer).forEach(img => img.style.display = 'none');
}

function determineWinner(playerChoice, computerChoice) {
    const forPlayer = document.querySelector('.for-player');
    const forComputer = document.querySelector('.for-computer');
    const forTie = document.querySelector('.for-tie');

    if (playerChoice === computerChoice) {
        forTie.style.display = 'block';
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        forPlayer.style.display = 'block';
        playerScore++;
    } else {
        forComputer.style.display = 'block';
        computerScore++;
    }
}

function updateScores() {
    document.querySelector('.player-score').value = playerScore;
    document.querySelector('.computer-score').value = computerScore;
}

nextMatchBtn.addEventListener('click', () => {
    document.querySelector('.nxt-match').style.display = 'none';
    resultDiv.style.display = 'none';
    resetRound();
});

function resetRound() {
    hideAllChoices();
    document.querySelector('.for-player').style.display = 'none';
    document.querySelector('.for-computer').style.display = 'none';
    document.querySelector('.for-tie').style.display = 'none';
    playerChoiceDiv.style.display = 'block';
    playerChoseDiv.style.display = 'none';
    computerChoiceDiv.style.display = 'block';
    computerChoseDiv.style.display = 'none';
}
