let timer;
let minutes;
let seconds = 0;
let isRunning = false;

const displayMinutes = document.getElementById('minutes');
const displaySeconds = document.getElementById('seconds');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const workButton = document.getElementById('work');
const shortBreakButton = document.getElementById('shortBreak');
const longBreakButton = document.getElementById('longBreak');

const workDuration = 25;
const shortBreakDuration = 5;
const longBreakDuration = 15;

let currentPhase = 'work';

function updateDisplay() {
    displayMinutes.textContent = String(minutes).padStart(2, '0');
    displaySeconds.textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timer);
                    alert(`${capitalizeFirstLetter(currentPhase)} time is up!`);
                    isRunning = false;
                    return;
                }
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            updateDisplay();
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    if (currentPhase === 'work') {
        minutes = workDuration;
    } else if (currentPhase === 'shortBreak') {
        minutes = shortBreakDuration;
    } else if (currentPhase === 'longBreak') {
        minutes = longBreakDuration;
    }
    seconds = 0;
    updateDisplay();
}

function setPhase(phase) {
    currentPhase = phase;
    resetTimer();
}

// function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
// }

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
workButton.addEventListener('click', () => setPhase('work'));
shortBreakButton.addEventListener('click', () => setPhase('shortBreak'));
longBreakButton.addEventListener('click', () => setPhase('longBreak'));

setPhase('work');
document.getElementById('addTask').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const notesRow = document.getElementById('notesRow');
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.textContent = taskText;

        notesRow.appendChild(noteDiv);
        taskInput.value = '';  // Clear the input field
    }
});

// Your existing timer script code here


// document.getElementById('work').onclick = function() {
//     style.backgroundColor = 'lightgreen';
// };
// document.getElementById('longBreak').onclick = function() {
//     style.backgroundColor = 'lightblue';
// };
// document.getElementById('shortBreak').onclick = function() {
//     style.backgroundColor = 'lightpink';
// };