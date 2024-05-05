class DataAnalysis {
    constructor() {
        this.data = {};
        this.selectedCategories = [];
    }

    loadWords() {
        var client = new XMLHttpRequest();
        client.open('GET', '/words.json');
        const that = this;
        client.onreadystatechange = function () {
            that.data = JSON.parse(client.responseText);
            designerUI.showCategoryList(that.data);
        }
        client.send();
    }

    getSelectedWords() {
        let str = '';
        for (let key in this.selectedCategories) {
            const category = this.selectedCategories[key];
            str += '<b>' + category + '</b><br />\n';
            for (let keyInKey in this.data[category]) {
                str += keyInKey + ': ' + this.data[category][keyInKey] + '<br/>\n';
            }
        }
        designerUI.showTranslation(str);
    }

    isCountCheck(key) {
        document.getElementById('translation').innerHTML = '';
        if (document.getElementById(key).checked) {
            this.selectedCategories.push(key);
        } else {
            const index = this.selectedCategories.indexOf(key);
            if (index > -1) { // only splice array when item is found
                this.selectedCategories.splice(index, 1); // 2nd parameter means remove one item only
            }
        }
        designerUI.updateStatus("Selected categories (<b>" + this.selectedCategories.length + "</b>) " +
            this.selectedCategories.toString());
    }
}