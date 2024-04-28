class Translator {
    constructor() {
        this.words = {
            "animals": {
                "bird": "птица",
                "tremble": "дрожать",
                "leap": "скакать",
                "flutter": "порхать",
                "frolic": "веселье"
            },
            "emotions": {
                "longing": "стремление",
                "glad": "радостный",
                "behavior": "поведение"
            },
            "actions": {
                "seize": "хватать",
                "swiftly": "быстро",
                "approaching": "приближается",
                "coercion": "принуждение"
            },
            "objects": {
                "sill": "подоконник",
                "mug": "кружка",
                "stationery": "канцтовары",
                "chandelier": "люстра",
                "mosque": "мечеть"
            },
            "people": {
                "naughty": "непослушный",
                "obedient": "послушный",
                "observer": "наблюдатель",
                "nephew": "племянник",
                "niece": "племянница",
                "mankind": "человечество"
            },
            "qualities": {
                "existing": "существующий",
                "fluent": "беглый",
                "vulnerable": "уязвимый",
                "obvious": "очевидный",
                "loud": "громкий"
            }
        };
        this.values = Object.values(this.words);
        this.arrCount = [];
        this.allNewWorlds = [];
        this.showOneWord = '';
        this.categorizedWords = Object.entries(this.words).map(([category, wordsList]) => ({
            category,
            words: Object.keys(wordsList).map(word => ({
                english: word,
                russian: wordsList[word],
            })),
        }))
        this.init();
    }

    checkWords() {
        console.log(document.getElementById('dis'))
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
            this.showWord();
            this.select();
        }
    }

    showWord() {
        let reducedAllNewWorlds = this.allNewWorlds.reduce((result, item) => {
            return result.includes(item) ? result : [...result, item];
        }, []);
        let random = Math.round(0 - 0.5 + Math.random() * (reducedAllNewWorlds.length - 0))
        for (let i = 0; i < document.getElementsByClassName("item").length; i++) {
            if (document.getElementsByClassName("item")[i].checked) {
                this.showOneWord = reducedAllNewWorlds[random];
            }
        }
    }

    select() {
        document.getElementById('dis').disabled = false;
        for (let i = 0; i < document.getElementsByClassName("item").length; i++) {
            if (document.getElementsByClassName("item")[i].checked) {
                document.getElementsByClassName("item")[i].disabled = true;
                document.getElementById("selectAll").disabled = true;
                document.getElementById("word").innerText = this.showOneWord;
            }
        }
    }

    isCountCheck() {
        let i, len;
        let inputs = document.getElementsByClassName("item");
        let count = 0;
        let numberPattern = /\d+/g;
        let checkboxId;
        let categoryMap = [];
        let wordsToAdd = {};

        for (let key in this.words) {
            categoryMap.push(key);
            let tmpArr = [];
            for (let keyInKey in this.words[key]) {
                tmpArr.push(keyInKey);
            }
            wordsToAdd[key] = tmpArr;
        }

        let wordsID;

        for (i = 0, len = inputs.length; i < len; i++) {
            checkboxId = categoryMap[i];
            wordsID = wordsToAdd[checkboxId];
            if (inputs[i].type === "checkbox" && inputs[i].checked) {
                count += 1;
                let selectedId = document.getElementById("count_" + i).childNodes[0].textContent.match(numberPattern).join('');
                this.arrCount.push(Number(selectedId));
                for (const key in this.values[i]) {
                    this.allNewWorlds.push(key)
                }

                if (inputs[i].id === categoryMap[i] && inputs[i].checked) {
                    this.showWord(categoryMap[i]);
                }
            } else {
                this.allNewWorlds = this.allNewWorlds.filter(word => !wordsID.includes(word));
            }
        }

        document.getElementById("select").innerText = `Выбрано категорий: ${count}, всего слов: ${this.arrCount.reduce((acc, number) => acc + number, 0)}`;
        this.arrCount.length = 0;
    }

    init() {
        let that = this;
        for (let i = 0; i < this.categorizedWords.length; i++) {
            document.getElementById("count_" + i).innerText += " (" + this.categorizedWords[i].words.length + " words)"
        }

        $(document).ready(function () {
            $(document).on('change', 'input[type="checkbox"]', function (e) {
                that.isCountCheck()
            });
        });
    }
}