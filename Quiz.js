// Quiz.js
class Quiz {
    constructor(words) {
        this.words = words;
        this.currentIndex = 0;
        this.totalWords = words.length;
        this.errors = 0;
        this.skipped = 0;
        this.startTime = new Date();
    }

    currentWord() {
        return this.words[this.currentIndex];
    }

    nextWord() {
        if (this.currentIndex <= this.totalWords - 1) {
            this.currentIndex++;
        }
    }

    skipWord() {
        this.skipped++;
        this.nextWord();
    }

    markError() {
        this.errors++;
    }

    checkAnswer(userAnswer) {
        const currentWord = this.currentWord();
        return userAnswer.trim().toLowerCase() === currentWord.translation.trim().toLowerCase();
    }

    progress() {
        return `${this.currentIndex + 1}/${this.totalWords}`;
    }

    end() {
        const endTime = new Date();
        const duration = Math.round((endTime - this.startTime) / 1000); // duration in seconds
        return {
            errors: this.errors,
            skipped: this.skipped,
            duration: `${duration} seconds`
        };
    }

    status() {
        return `Progress: ${this.progress()}, Errors: ${this.errors}, Skipped: ${this.skipped}`;
    }
}