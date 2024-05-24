

/*** class DataAnalysis
 * Explanation:
 * Constructor: Initializes the class properties.
 * loadWords: Loads words data from words.json.
 *  and calls appropriate functions to handle the data.
 * loadSentences: Loads sentences data from sentences.json.
 * .
 * findSentencesForWords: Finds and maps sentences to words.
 * getSelectedWords: Displays the selected words in a modal.
 * startQuiz: Starts the quiz based on selected categories.
 * updateProgress: Updates quiz progress.
 * showNextWord: Displays the next word in the quiz.
 * skipCurrentWord: Skips the current word and moves to the next.
 * updateQuizStatus: Updates the quiz status display.
 * showResults: Displays quiz results.
 * checkAnswer: Checks the user's answer and updates the quiz state.
 * isCountCheck: Handles category checkbox changes and updates the selected categories.
 */

class DataAnalysis {
    constructor() {
        this.data = {};
        this.sentensesForQuiz = [];
        this.fileName = "/words.json";
        this.sentences = {}; // New attribute to store sentences data
        this.sentencesFileName = "/sentences.json";
        this.selectedCategories = [];
        /*** QUIZ types and settings
         * todo: create class settings for changing rules and mapping different quiz types like dragAndDrop quizes
         * */
        this.dragDropQuiz = ["Buildings", "Animals", "Actions", "Fruits", "Vegetables", "Colors", "Numbers", "Family"];
        //this.quizType = "dragAndDrop";
        this.iconedBookmarks = {
            "fa-gear": ["Numbers"],
            "red-fa-circle-exclamation": [],
            "darkseagreen-fa-circle-exclamation": ["Present Simple", "Seasons"]
        };
        //"Actions Present Continuous", "Actions Past Continuous", "Actions Future Simple", "Actions Future Continuous", "Actions Future Perfect", "Actions Future Perfect Continuous"
        this.quiz = null; // Correctly initialize quiz
    }

    findDublicateWords() {
        const data = this.data;
        // Function to find all duplicated strings
        function findDuplicates(data) {
            const wordMap = {};
            const duplicateWords = {};
            for (const category in data) {
                if (data.hasOwnProperty(category)) {
                    for (const word in data[category]) {
                        if (data[category].hasOwnProperty(word)) {
                            const translation = data[category][word];
                            if (wordMap[translation]) {
                                wordMap[translation].push({ word, category });
                                duplicateWords[translation] = wordMap[translation]; // Track duplicate
                            } else {
                                wordMap[translation] = [{ word, category }];
                            }
                        }
                    }
                }
            }
            return duplicateWords;
        }
        const duplicates = findDuplicates(data);
        console.log('Duplicated Strings:', duplicates);
    }

    loadWords() {
        const client = new XMLHttpRequest();
        client.open("GET", this.fileName);
        const that = this;
        client.onreadystatechange = function() {
            if (client.readyState === 4) {
                if (client.status === 200) {
                    try {
                        that.data = JSON.parse(client.responseText);
                        designerUI.showCategoryList(that.data); // Update UI with loaded data
                        that.findDublicateWords()
                        that.loadSentences();
                        // that.findSentencesForWords();
                    } catch (e) {
                        console.error("Failed to parse words data", e);
                    }
                } else {
                    console.error("Failed to load words", client.status);
                }
            }
        };
        client.send();
    }

    loadSentences() {
        const client = new XMLHttpRequest();
        client.open("GET", this.sentencesFileName);
        const that = this;
        client.onreadystatechange = function() {
            if (client.readyState === 4) {
                if (client.status === 200) {
                    try {
                        const response = JSON.parse(client.responseText);
                        if (response && typeof response === 'object') {
                            that.sentences = response; // Correctly assign sentences
                            that.findSentencesForWords(); // Proceed with processing sentences
                        } else {
                            console.error("Invalid sentences data", response);
                        }
                    } catch (e) {
                        console.error("Failed to parse sentences data", e);
                    }
                } else {
                    console.error("Failed to load sentences", client.status);
                }
            }
        };
        client.send();
    }

    bookmarkCategories(category) {
        const categoryId = category.replace(' ', '-');
        try {

            if (this.iconedBookmarks["darkseagreen-fa-circle-exclamation"].indexOf(category) + 1) {
                //$("#" + categoryId).parent().closest('li').append('<i class="fa-solid fa-gear text-secondary"></i>');
                $("#" + categoryId).parent().closest('li').append('<i style="color:darkseagreen" class="fa-solid fa-circle-exclamation"></i>');
            }

            if (this.iconedBookmarks["red-fa-circle-exclamation"].indexOf(category) !== -1) {
                $("#" + categoryId).parent().closest('li').append('<i style="color:red" class="fa-solid fa-circle-exclamation"></i>');
            }

            if (this.iconedBookmarks["fa-gear"].indexOf(category) !== -1) {
                $("#" + categoryId).parent().closest('li').append('<i class="fa-solid fa-gear text-secondary"></i>');
            }

            /***
             * DON'T REMOVE MARKER BELOW
             * fa-message text-secondary indicates that the category has sentences;
             */
            if (this.sentences.hasOwnProperty(category)) {
                for (let key in this.sentences[category]) {
                    //todo: add sentences to quiz
                    //if keys not unique sentences will be overwritten

                    this.sentensesForQuiz[key] = this.sentences[category][key];
                }
                $("#" + categoryId).parent().closest('li').append('<i class="fa-solid fa-message text-secondary"></i>');
            }
            // console.log("sentensesForQuiz",this.sentensesForQuiz);
        } catch (e) {
            //console.error("Bookmarks parsing error", e);
        }
    }

    findSentencesForWords() {
        if (!this.data || !this.sentences) { // Check sentences object correctly
            console.error("Data or sentences not loaded");
            return;
        }
        for (const category in this.data) {
            if (this.data.hasOwnProperty(category)) {

                /***  QUIZ types and settings
                 *  todo: DragAndDrop Quiz
                 if (this.dragDropQuiz.indexOf(category) + 1) {
                                    $("#" + categoryId).parent().closest('li').append('<i class="fa-solid fa-bars text-secondary"></i>');
                                }
                 **/

                // Bookmarking categories with icons
                this.bookmarkCategories(category);
            }
        }
    }

    getSelectedWords() {
        let str = ''; // String to store selected words display
        const translationDirection = document.querySelector('input[name="translationDirection"]:checked').value; // Get selected translation direction

        if (this.selectedCategories.length === 0) {
            str = '<div class="col-12">Category not selected</div>'; // Display message if no category selected
        } else {
            this.selectedCategories.forEach((category, index) => {
                str += `<div class="col-md-4" style="margin-bottom: 20px;"><b>${category}</b><br />\n`; // Display selected category
                for (const word in this.data[category]) {
                    if (this.data[category].hasOwnProperty(word)) {
                        // Display word and its translation based on selected direction
                        if (translationDirection === "eng-rus") {
                            str += `${word}: ${this.data[category][word]}<br/>\n`;
                        } else {
                            str += `${this.data[category][word]}: ${word}<br/>\n`;
                        }
                    }
                }
                str += '</div>'; // Close the column div
            });
            str += '</div>'; // Close the last row
        }
        const translationModalBody = document.getElementById('translationModalBody');
        if (translationModalBody) {
            translationModalBody.innerHTML = str; // Update modal body with selected words
            $('#translationModal').modal('show'); // Show modal
        }
    }

    startQuiz() {
        // Check if any category is selected
        if (this.selectedCategories.length === 0) {
            alert("Please select at least one category to start the quiz.");
            return;
        }
        designerUI.startTimer(300); // Start the timer
        const timerDiv = document.getElementById('timer');
        // Update timer style
        timerDiv.style.cssText += 'color:#a2a3be;background-color:#343a40;font-weight:bold;font-size:30px;font-family:monospace;';
        timerDiv.classList.remove('text-warning');
        timerDiv.classList.remove('font-weight-bold');
        const selectedWords = [];
        const translationDirection = document.querySelector('input[name="translationDirection"]:checked').value; // Get selected translation direction
        this.selectedCategories.forEach(category => {
            for (const word in this.data[category]) {
                if (this.data[category].hasOwnProperty(word)) {
                    // Populate selectedWords array based on translation direction
                    if (translationDirection === "eng-rus") {
                        selectedWords.push({ word: word, translation: this.data[category][word] });
                    } else {
                        selectedWords.push({ word: this.data[category][word], translation: word });
                    }
                }
            }
        });

        this.quiz = new Quiz(selectedWords); // Initialize quiz with selected words
        designerUI.showQuizElements(); // Show quiz elements
        designerUI.hideStartButton(); // Hide start button
        designerUI.hideShowWordsButton(); // Hide show words button
        designerUI.hideTranslationDirection(); // Hide translation direction options
        designerUI.updateProgressIcons(this.quiz.totalWords); // Initialize progress icons
        this.showNextWord();
    }

    updateProgress(isCorrect) {
        if (isCorrect) {
            designerUI.updateProgressIcons(1); // Mark as correct
        } else {
            designerUI.updateProgressIcons(2); // Mark as incorrect
        }
    }

    showNextWord() {
        if (this.quiz.currentWord()) {
            const currentWord = this.quiz.currentWord();
            designerUI.displayCurrentWord(currentWord.word); // Display current word
        } else {
            designerUI.showQuizResults(this.quiz.end()); // Show quiz results
            designerUI.stopTimer(); // Stop timer
        }
    }

    skipCurrentWord() {
        this.quiz.skipWord(); // Skip current word
        designerUI.markCurrentWordAsSkipped(); // Mark word as skipped
        designerUI.updateStatus(this.quiz.status()); // Update status
        this.showNextWord();
    }

    updateQuizStatus() {
        designerUI.updateStatus(`Correct: ${this.quiz.correct || 0}, Incorrect: ${this.quiz.incorrect || 0}, Skipped: ${this.quiz.skipped || 0}`); // Display current quiz status
    }

    showResults() {
        designerUI.showQuizResults({
            duration: this.quiz.totalTime || 0,
            errors: this.quiz.incorrect || 0,
            skipped: this.quiz.skipped || 0
        }); // Display quiz results
    }

    checkAnswer() {
        const userAnswer = document.getElementById('userTranslation').value;
        if (!this.quiz.currentWord()) {
            const results = this.quiz.end();
            designerUI.showQuizResults(results); // Show quiz results
            designerUI.removeQuizButtons(); // Remove quiz buttons
            designerUI.addTryAgainButton(); // Add try again button
            return;
        }

        if (this.quiz.checkAnswer(userAnswer)) {
            designerUI.showCorrect(); // Show correct feedback
            designerUI.markCurrentWordAsCorrect(); // Mark word as correct
        } else {
            this.quiz.markError(); // Mark error
            designerUI.showIncorrect(); // Show incorrect feedback
            designerUI.markCurrentWordAsIncorrect(); // Mark word as incorrect

            // this.quiz.currentWord()
        }
        this.quiz.nextWord();

        if (this.quiz.currentIndex <= this.quiz.totalWords) {
            this.showNextWord(); // Show next word
        } else {
            const results = this.quiz.end();
            designerUI.showQuizResults(results); // Show quiz results
            designerUI.removeQuizButtons(); // Remove quiz buttons
            designerUI.addTryAgainButton(); // Add try again button
        }
        designerUI.updateStatus(this.quiz.status()); // Update status
    }

    isCountCheck(key) {
        const checkbox = document.getElementById(key.replace(' ', '-'));
        if (checkbox && checkbox.checked) {
            this.selectedCategories.push(key); // Add category to selected list
        } else {
            const index = this.selectedCategories.indexOf(key);
            if (index > -1) {
                this.selectedCategories.splice(index, 1); // Remove category from selected list
            }
        }

        let totalWords = 0;
        this.selectedCategories.forEach(category => {
            totalWords += Object.keys(this.data[category]).length; // Calculate total words
        });

        const startButton = document.getElementById('start');
        startButton.disabled = this.selectedCategories.length === 0; // Enable/disable start button

        designerUI.showStatus(`<span class="text-warning">Selected categories (<b>${this.selectedCategories.length}</b>):</span> 
            ${this.selectedCategories.join(", ")}<br>
            <span class="text-warning">Total words:</span>    <span class="text-white h5">+ <b>${totalWords}</b> +</span>`); // Display selected categories and total words
    }

    rateQuiz() {
        const totalWords = this.quiz.totalWords;
        const errorsAndSkipped = this.quiz.errors + this.quiz.skipped;
        console.log("totalWords", totalWords);
        console.log("errorsAndSkipped", errorsAndSkipped);
        if (errorsAndSkipped >= totalWords / 2) {
            return 0;
        } else if (this.quiz.errors === 0 && this.quiz.skipped === 0) {
            return 2;
        } else {
            return 1;
        }
    }
}