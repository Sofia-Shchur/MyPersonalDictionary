class DataAnalysis {
    constructor() {
        this.categorizedWords = []; // Initialize with your data
    }

    loadWords() {
        var client = new XMLHttpRequest();
        client.open('GET', '/words.json');
        client.onreadystatechange = function () {
            const words = JSON.parse(client.responseText);
            designerUI.showCategoryList(words);
        }
        client.send();
    }


    isCountCheck(key) {
        alert('isCountCheck ' + key);
    }

    checkWords() {
        alert('checkWords');
        return;

        let textValue = document.getElementById('word').textContent;
        let resultValue = document.getElementById('text').value;
        let correctTranslation = '';

        this.categorizedWords.forEach((index) => {
            let indexWords = index.words;
            indexWords.forEach((index) => {
                if (index.english === textValue) {
                    correctTranslation = index.russian;
                }
            });
        });

        if (resultValue === correctTranslation) {
            document.getElementById('text').value = "";
            document.getElementById('check').textContent = "верно";
        }
        if (resultValue !== correctTranslation) {
            document.getElementById('check').textContent = "не верно";
        }
        if (document.getElementById('check').textContent === "верно") {
            // todo: DesignerUI.showWord();
            // todo: DesignerUI.select();
        }
    }
}