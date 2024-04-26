const words = {
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

let values = Object.values(words);
let resultVal = "";
let arrCount = [];
let allNewWorlds = [];

const categorizedWords = Object.entries(words).map(([category, wordsList]) => ({
    category,
    words: Object.keys(wordsList).map(word => ({
        english: word,
        russian: wordsList[word],
    })),
}));

function checkWords() {
    let textValue = document.getElementById('word').textContent;
    let resultValue = document.getElementById('text').value;
    let correctTranslation = '';

    categorizedWords.forEach((index) => {
        let indexWords = index.words;
        console.log(indexWords)
        indexWords.forEach((index) => {
            console.log(index.english);
            console.log(index.russian);
            if (index.english === textValue) {
                correctTranslation = index.russian;
            }
        });
    });


    if (!resultValue) {
        document.getElementById('dis').disabled = true;
    }
    if (resultValue === correctTranslation) {
        document.getElementById('text').value = "";
        document.getElementById('check').textContent = "верно";
    }
    if (resultValue !== correctTranslation) {
        document.getElementById('check').textContent = "не верно";
    }
    if (document.getElementById('check').textContent === "верно") {
        showWord();
    }

}

function showWord() {
    let reducedAllNewWorlds = allNewWorlds.reduce((result, item) => {
        return result.includes(item) ? result : [...result, item];
    }, []);
    let random = Math.round(0 - 0.5 + Math.random() * (reducedAllNewWorlds.length - 0))
    console.log(random);
    console.log(reducedAllNewWorlds);
    document.getElementById("word").innerText = reducedAllNewWorlds[random]
}

for (let i = 0; i < categorizedWords.length; i++) {
    document.getElementById("count_" + i).innerText += " (" + categorizedWords[i].words.length + " words)"
}

function isCountCheck() {
    let i, len;
    let inputs = document.getElementsByClassName("item");
    let count = 0;
    let numberPattern = /\d+/g;
    let checkboxId;
    
    let categoryMap = [];
    let wordsToAdd = {};

    for (let key in words) {
        categoryMap.push(key);
        let tmpArr = [];
        for (let keyInKey in words[key]) {
            tmpArr.push(keyInKey);
        }
        wordsToAdd[key] = tmpArr;
    }

    console.log("categoryMap", categoryMap);
    console.log("wordsToAdd", wordsToAdd);

    /*  We already have this data
    
    const categoryMap = [
        "animals",
        "emotions",
        "actions",
        "objects",
        "people",
        "qualities",
        "selectAll"
    ];
    const wordsToAdd = {
        animals: ['bird', 'tremble', 'leap', 'flutter', 'frolic'],
        emotions: ['longing', 'glad', 'behavior'],
        actions: ['seize', 'swiftly', 'approaching', 'coercion'],
        objects: ['sill', 'mug', 'stationery', 'chandelier', 'mosque'],
        people: ['naughty', 'obedient', 'observer', 'nephew', 'niece', 'mankind'],
        qualities: ['existing', 'fluent', 'vulnerable', 'obvious', 'loud'],
    };*/
    
    let wordsID;

    for (i = 0, len = inputs.length; i < len; i++) {
        checkboxId = categoryMap[i];
        wordsID = wordsToAdd[checkboxId];
        if (inputs[i].type === "checkbox" && inputs[i].checked) {
            count += 1;
            let selectedId = document.getElementById("count_" + i).childNodes[0].textContent.match(numberPattern).join('');
            arrCount.push(Number(selectedId));
            for (const key in values[i]) {
                console.log(key);
                allNewWorlds.push(key)
            }

            if (inputs[i].id === categoryMap[i] && inputs[i].checked) {
                showWord(categoryMap[i]);
            }
        } else {
            console.log(allNewWorlds)
            allNewWorlds = allNewWorlds.filter(word => !wordsID.includes(word));
        }
    }


    document.getElementById("select").innerText = `Выбрано категорий: ${count}, всего слов: ${arrCount.reduce((acc, number) => acc + number, 0)}`;
    arrCount.length = 0;
}

$(document).ready(function () {
    $(document).on('change', 'input[type="checkbox"]', function (e) {
        isCountCheck()
    });
});
