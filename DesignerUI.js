class DesignerUI {
    constructor() {
        this.quizTimer = null;
    }

    startTimer(duration) {
        this.quizTimer = new QuizTimer(() => dataAnalysis.endQuiz(), duration);
        this.quizTimer.start();
        const statusElement = document.getElementById('timer');
        if (statusElement) {
            statusElement.innerHTML = this.quizTimer.formatTime();
        }
    }

    stopTimer() {
        if (this.quizTimer) {
            this.quizTimer.stop();
        }
    }

    showStatus(html) {
        const timerDiv = document.getElementById('timer');
        if (timerDiv) {
            timerDiv.innerHTML = html;
        }
    }

    showCategoryList(words) {
        const categoriesElement = document.getElementById('category-list');
        if (categoriesElement) {
            let str = '';
            for (const key in words) {
                if (words.hasOwnProperty(key)) {
                    const wordCount = Object.keys(words[key]).length;
                    str += `
                        <li>
                            <input type="checkbox" id="${key.replace(' ', '-')}" name="${key.replace(' ', '-')}" value="${key}" onclick="dataAnalysis.isCountCheck('${key}')">
                            <label for="${key.replace(' ', '-')}"> ${key} (${wordCount})</label>
                        </li>`;
                }
            }
            categoriesElement.innerHTML = str;
            this.showStatus(`Categories: ${Object.keys(words).length}`);
        }
    }

    drawQuiz() {
        const quizDiv = document.getElementById(('quiz'));
        quizDiv.innerHTML = `<form class="quiz-form" id="quizForm">
                <div id="questionsAndCharts" class="form-row align-items-center justify-content-center">
                    <div class="col-auto">
                        <label for="currentWord" class="col-form-label">
                            <p id="currentWord" class="h2"></p>
                        </label>
                    </div>
                    <div class="col-auto">
                        <input type="text" id="userTranslation" class="form-control mb-2 mb-md-0" placeholder="Enter translation" />
                    </div>
                    <div class="col-auto">
                        <button type="button" id="checkAnswer" class="btn btn-primary mb-2 mt-2" onclick="dataAnalysis.checkAnswer()">Check</button>
                    </div>
                    <div class="col-auto">
                        <button type="button" id="skipWord" class="btn btn-secondary mb-2 mt-2" onclick="dataAnalysis.skipCurrentWord()">Skip</button>
                    </div>
                </div>
                <div id="quiz-progress-container" class="mt-3">
                    <!-- Place for progress bar icons -->
                </div>
                <div id="quiz-status-container" class="mt-3">
                    <!-- Place for progress info -->
                </div>
                       <div id="repeatMistakes" class="mt-3 d-flex">
    <!-- Place for repeat info -->
    <div class="col-md-6" id="mistakeArea"><span id="mistakeAreaLabel"></span>

    </div>
    <div class="col-md-6" id="skippedArea"><span id="skippedAreaLabel"></span>

    </div>

            </form>`;
    }

    drawLayout() {
        const contentDiv = document.querySelector('.content');
        this.showCategoryList({});
        this.drawQuiz();
    }

    showQuizElements() {
        const quizElement = document.getElementById('quiz');
        if (quizElement) {
            quizElement.classList.remove('d-none');
        }
    }

    displayCurrentWord(word) {
        const currentWordElement = document.getElementById('currentWord');
        if (currentWordElement) {
            currentWordElement.textContent = word;
        }
    }

    showCorrect() {
        const userTranslationElement = document.getElementById('userTranslation');
        if (userTranslationElement) {
            /*  userTranslationElement.classList.remove('is-invalid');
              userTranslationElement.classList.add('is-valid');*/
            userTranslationElement.value = '';  // Clear input field
        }
    }

    showIncorrect() {
        const userTranslationElement = document.getElementById('userTranslation');
        if (userTranslationElement) {
            userTranslationElement.value = '';  // Clear input field
            // Add animation to the progress icons
            const progressIcons = document.querySelectorAll('.progress-icon');
            progressIcons.forEach(icon => {
                icon.classList.add('animate-progress-bar');
            });
            setTimeout(() => {
                progressIcons.forEach(icon => {
                    icon.classList.remove('animate-progress-bar');
                });
            }, 1000)
        }
    }

    updateStatus(status) {
        const statusElement = document.getElementById('quiz-status-container');
        if (statusElement) {
            statusElement.innerHTML = status;
        }
    }

    resultScreen(html) {
        const quizElement = document.getElementById('questionsAndCharts');
        if (quizElement) {
            quizElement.innerHTML = `
            <div class="card text-center mt-5" style="background-color: #f8f9fa; border: 2px solid #757575;">
                <div class="card-header bg-secondary text-white">
                    <h4 class="card-title"><h4>Categories(${dataAnalysis.selectedCategories.length}) : ${dataAnalysis.selectedCategories.toString()}</h4>
                </div>
                <div class="card-body">
                    <p class="card-text">${html}</p>
                    <div id="results" class="d-flex justify-content-center">
                        <div id="resultNotGood" class="p-5  text-white m-3" style="border-radius: 50%; width: 8rem; height: 8rem; display: flex; align-items: center; justify-content: center; font-size: 3rem;">🐐</div>
                        <div id="resultNormal" class="p-5   text-white m-3" style="border-radius: 50%; width: 8rem; height: 8rem; display: flex; align-items: center; justify-content: center; font-size: 6rem;">😊</div>
                        <div id="resultSuccess" class="p-5  text-white m-3" style="border-radius: 50%; width: 8rem; height: 8rem; display: flex; align-items: center; justify-content: center; font-size: 3rem;">🍓</div>
                    </div>
                </div>
                <div id="resultsPics" class="align-items-center justify-content-center" style="margin: 20px; max-width: 600px"></div>
                <div class="card-footer text-muted">

                    <button id="reloadTrainer" class="btn btn-primary" onclick="window.location.reload()">Try Again?</button>
                </div>
            </div>
        `;
        }
        const funnyAnimation = () => {
            const rate = dataAnalysis.rateQuiz();
            console.log("rate", rate);
            let rateDivId;
            let rateBgd;
            if (rate === 0) {
                rateDivId = 'resultNotGood';
                rateBgd = 'red';
            }
            if (rate === 1) {
                rateDivId = 'resultNormal';
                rateBgd = 'yellow';
            }
            if (rate === 2) {
                rateDivId = 'resultSuccess';
                rateBgd = 'yellow';
            }

            const results = document.getElementById('results');
            if (results) {
                results.style.transition = "transform 0.5s";
                results.style.transform = "scale(1)";
                setTimeout(() => {
                    results.style.transform = "scale(0.6)";
                }, 500);
            }
            // get central part of the screen
            const resultSuccessElement = document.getElementById("resultNormal");
            if (resultSuccessElement) {
                resultSuccessElement.innerHTML = document.getElementById(rateDivId).innerHTML;

                // remove other elements
                document.getElementById('resultNotGood').innerHTML = '';
                document.getElementById('resultSuccess').innerHTML = '';
                resultSuccessElement.style.transition = "transform 1.5s";
                resultSuccessElement.style.transform = "scale(1)";
                setTimeout(() => {
                    resultSuccessElement.style.transform = "scale(1.5)";
                }, 1500);
                setTimeout(() => {
                    $("#resultNormal").css("border", "1rem dotted orange");
                }, 2000);
                setTimeout(() => {
                    $("#resultNormal").css("border", "0.5rem dotted red");
                }, 3000);
                setTimeout(() => {
                    $("#resultNormal").css("border", "0.2rem dotted orange");
                    $("#resultNormal").css("background-color", rateBgd);

                    $("#resultNormal").css("text-shadow", "20px 20px 40px #757575");
                    const resultsPics = document.getElementById('resultsPics');
                    resultsPics.innerHTML = document.getElementById('quiz-progress-container').innerHTML;
                    document.getElementById('quiz-progress-container').innerHTML = '';

                    resultSuccessElement.style.transition = "transform 0.5s";
                    resultSuccessElement.style.transform = "scale(1)";
                    setTimeout(() => {
                        resultSuccessElement.style.transform = "scale(2)";
                    }, 500);


                }, 4000);
            }
        }
        funnyAnimation();
    }

    showQuizResults(results) {
        this.resultScreen(`  <p class="alert alert-success card-text font-weight-bold">Training completed!</p>
                    <p class="alert alert-info card-text">Time: ${results.duration}</p>
                    <p class="alert alert-danger card-text">Errors: ${results.errors}</p>
                    <p class="alert alert-warning card-text">Skipped: ${results.skipped}</p>
                    <hr>`);
        this.removeQuizButtons();
    }

    hideStartButton() {
        document.getElementById("translationDirectionContainer").style.visibility = "hidden";
        document.getElementById("category-list").style.visibility = "hidden";
        const startButton = document.getElementById('start');
        if (startButton) {
            startButton.classList.add('d-none');
        }
    }

    showStartButton() {
        const startButton = document.getElementById('start');
        if (startButton) {
            startButton.classList.remove('d-none');
        }
    }

    hideShowWordsButton() {
        const showWordsButton = document.getElementById('showWords');
        if (showWordsButton) {
            showWordsButton.classList.add('d-none');
        }
    }

    hideTranslationDirection() {
        const translationDirection = document.getElementById('translationDirectionContainer');
        if (translationDirection) {
            translationDirection.classList.add('d-none');
        }
    }

    removeQuizButtons() {
        const checkButton = document.getElementById('checkAnswer');
        const skipButton = document.getElementById('skipWord');
        if (checkButton) {
            checkButton.style.display = 'none';
        }
        if (skipButton) {
            skipButton.style.display = 'none';
        }
    }

    addTryAgainButton() {
        const quizButtonsContainer = document.getElementById('quiz-buttons-container');
        if (quizButtonsContainer) {
            const tryAgainButton = document.createElement('button');
            tryAgainButton.classList.add('btn', 'btn-secondary', 'mt-3');
            tryAgainButton.textContent = 'Try Again';
            tryAgainButton.onclick = () => {
                location.reload();
            };
            quizButtonsContainer.appendChild(tryAgainButton);
        }
    }

    updateProgressIcons(totalWords) {
        const progressContainer = document.getElementById('quiz-progress-container');
        if (progressContainer) {
            progressContainer.innerHTML = '';
            for (let i = 0; i < totalWords; i++) {
                const icon = document.createElement('i');
                icon.classList.add('fas', 'fa-square-pen', 'mr-2', 'text-muted', 'progress-icon');
                
                icon.id = `progress-icon-${i}`;
                progressContainer.appendChild(icon);
            }
        }
    }

    markCurrentWordAsCorrect() {
        const icon = document.getElementById(`progress-icon-${dataAnalysis.quiz.currentIndex}`);
        if (icon) {
            icon.className = 'fa-solid fa-heart progress-icon'; // Red strawberry icon
            
        }
    }

    markCurrentWordAsIncorrect() {
        const icon = document.getElementById(`progress-icon-${dataAnalysis.quiz.currentIndex}`);
        const mistakeArea = document.getElementById("mistakeArea");
        const currentWord = dataAnalysis.quiz.currentWord();
        if (icon) {
            icon.className = 'fa-solid fa-skull text-muted progress-icon'; // Grey skull icon
            
            const iDiv = document.getElementById("mistakeAreaLabel");
            iDiv.className = 'fa-solid fa-skull'; // Grey skull icon

        }
        mistakeArea.innerHTML += `<div>${currentWord.word}: ${currentWord.translation}</div>`;
        const translationDirection = document.querySelector('input[name="translationDirection"]:checked').value;
        if (translationDirection === "eng-rus") {
            if (mistakeArea && currentWord && dataAnalysis.sentensesForQuiz[currentWord.word]) {

                mistakeArea.innerHTML += `
<div class="alert alert-warning alert-dismissible fade show" role="alert">
  ${this.sentencesList("eng-rus", 0)}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`;
            }

        } else {
            if (mistakeArea && currentWord && dataAnalysis.sentensesForQuiz[currentWord.translation]) {
                mistakeArea.innerHTML += `
<div class="alert alert-warning alert-dismissible fade show" role="alert">
  ${this.sentencesList("rus-eng", 0)}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`;
            }
        }
    }

    markCurrentWordAsSkipped() {
        const icon = document.getElementById(`progress-icon-${dataAnalysis.quiz.currentIndex - 1}`);
        const skippedArea = document.getElementById("skippedArea");
        dataAnalysis.quiz.currentIndex = dataAnalysis.quiz.currentIndex - 1;
        const currentWord = dataAnalysis.quiz.currentWord();
        dataAnalysis.quiz.currentIndex = dataAnalysis.quiz.currentIndex + 1;
        if (icon) {
            icon.className = 'fa-solid fa-rectangle-xmark text-muted progress-icon'; // Grey alien icon
            
            const iDiv = document.getElementById("skippedAreaLabel");
            iDiv.className = 'fa-solid fa-rectangle-xmark';

        }
        skippedArea.innerHTML += `<div>${currentWord.word}: ${currentWord.translation}</div>`;
        const translationDirection = document.querySelector('input[name="translationDirection"]:checked').value;


        if (translationDirection === "eng-rus") {

            if (skippedArea && currentWord && dataAnalysis.sentensesForQuiz[currentWord.word]) {

                skippedArea.innerHTML += `
<div class="alert alert-info alert-dismissible fade show" role="alert">
  ${this.sentencesList("eng-rus", 1)}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`;
            }
        } else {
            /*           console.log('rus-en currentWord.word',currentWord.word);
                       console.log('rus-en currentWord.translation',currentWord.translation);*/
            if (skippedArea && currentWord && dataAnalysis.sentensesForQuiz[currentWord.translation]) {
                skippedArea.innerHTML += `
<div class="alert alert-info alert-dismissible fade show" role="alert">
  ${this.sentencesList("rus-eng", 1)}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`;
            }
        }
    }

    sentencesList(direction, skipOrNot) {
        if (skipOrNot) {
            dataAnalysis.quiz.currentIndex--;
        }
        let currentWord = dataAnalysis.quiz.currentWord();
        if (skipOrNot) {
            dataAnalysis.quiz.currentIndex++;
        }

        if (currentWord && (currentWord.word || currentWord.translation)
            && (currentWord.word !== '' || currentWord.translation !== '')
            && dataAnalysis.sentensesForQuiz) {

            let sentence;
            let sentenceStr;
            if (direction === "eng-rus") {
                sentence = dataAnalysis.sentensesForQuiz[currentWord.word];
                sentenceStr = dataAnalysis.sentensesForQuiz[currentWord.word];
            } else {
                sentence = dataAnalysis.sentensesForQuiz[currentWord.translation];
                sentenceStr = dataAnalysis.sentensesForQuiz[currentWord.translation];
            }
            if (typeof sentence !== 'string') {
                sentenceStr = '';
                for (let key in sentence) {
                    sentenceStr += sentence[key] + '</br>';
                }
            }
            console.log("sentenceStr", sentenceStr);
            return sentenceStr;
        } else {
            return 'Sentence not found. Seems the word have other categories';
        }
    }
}