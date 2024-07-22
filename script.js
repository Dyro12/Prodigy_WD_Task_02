let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const timeDisplay = document.getElementById('time-display');
const startPauseButton = document.getElementById('start-pause-button');
const resetButton = document.getElementById('reset-button');
const lapButton = document.getElementById('lap-button');
const lapsList = document.getElementById('laps-list');

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    startPauseButton.textContent = 'Pause';
    isRunning = true;
}

function pauseTimer() {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    startPauseButton.textContent = 'Start';
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    timeDisplay.textContent = '00:00:00.000';
    startPauseButton.textContent = 'Start';
    isRunning = false;
    lapsList.innerHTML = '';
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
}

startPauseButton.addEventListener('click', () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
