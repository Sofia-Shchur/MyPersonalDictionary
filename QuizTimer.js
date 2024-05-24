class QuizTimer {
    constructor(onTimeUp, duration = 300, mode = 0) {
        this.duration = duration;
        this.onTimeUp = onTimeUp;
        this.remainingTime = mode === 1 ? duration : 0;
        this.timerInterval = null;
        this.mode = mode; // 0 increase from 0, 1 decrease from duration
    }

    start() {
        this.updateTimerDisplay();

        // Stop any existing timer before starting a new one
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        this.timerInterval = setInterval(() => {
            if (this.mode === 1) {
                this.remainingTime--;
            } else {
                this.remainingTime++;
            }

            this.updateTimerDisplay();

            if (this.remainingTime <= 0 && this.mode === 1) {
                this.stop();
                if (this.onTimeUp) {
                    this.onTimeUp();
                }
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.timerInterval);
    }

    updateTimerDisplay() {
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.textContent = this.formatTime(this.remainingTime);
        }
    }

    formatTime(seconds) {
        if (isNaN(seconds)) {
            return '0:00'; // Fallback in case of an invalid number
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
}