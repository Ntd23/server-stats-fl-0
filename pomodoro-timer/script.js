const timerDisplay = document.getElementById("timer");
const sessionTypeDisplay = document.getElementById("session-type");
const sessionCountDisplay = document.getElementById("session-count");

const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");

let workTime = 25 * 60;
let shortBreakTime = 5 * 60;
let longBreakTime = 15 * 60;

const workInput = document.getElementById("work-input");
const shortBreakInput = document.getElementById("short-break-input");
const longBreakInput = document.getElementById("long-break-input");
const applySettingsBtn = document.getElementById("apply-settings-btn");

let timeLeft = workTime;
let timerId = null;

let currentSession = "work";
let completedWorkSessions = 0;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
    if (timerId !== null) {
        return;
    }

    timerId = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
       } else {
    clearInterval(timerId);
    timerId = null;

    playSound();
    switchSession();
}
    }, 1000);
}

function stopTimer() {
    clearInterval(timerId);
    timerId = null;
}
function playSound() {
    const audioContext = new AudioContext();

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;

    oscillator.start();

    setTimeout(() => {
        oscillator.stop();
        audioContext.close();
    }, 500);
}
function switchSession() {
    if (currentSession === "work") {
        completedWorkSessions++;

        sessionCountDisplay.textContent = completedWorkSessions;

        if (completedWorkSessions % 4 === 0) {
            currentSession = "long-break";
            timeLeft = longBreakTime;
            sessionTypeDisplay.textContent = "Long Break";
        } else {
            currentSession = "short-break";
            timeLeft = shortBreakTime;
            sessionTypeDisplay.textContent = "Short Break";
        }
    } else {
        currentSession = "work";
        timeLeft = workTime;
        sessionTypeDisplay.textContent = "Work";
    }

    updateDisplay();
}

function applySettings() {
    workTime = Number(workInput.value) * 60;
    shortBreakTime = Number(shortBreakInput.value) * 60;
    longBreakTime = Number(longBreakInput.value) * 60;

    stopTimer();

    if (currentSession === "work") {
        timeLeft = workTime;
    } else if (currentSession === "short-break") {
        timeLeft = shortBreakTime;
    } else {
        timeLeft = longBreakTime;
    }

    updateDisplay();
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
applySettingsBtn.addEventListener("click", applySettings);
updateDisplay();