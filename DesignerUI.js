class DesignerUI {
    constructor() {
        this.baseElement = document.getElementById('base');
    }

    showStatus(html) {
        let statusElement = document.getElementById('status');
        statusElement.innerHTML = '<span id="statusValue">' + html + '</span>';
    }

    showTranslation(html) {
        let statusElement = document.getElementById('translation');
        statusElement.innerHTML = html + '<br /><br />'
    }

    updateStatus(html) {
        let statusElement = document.getElementById('statusValue');
        statusElement.innerHTML = html;
    }

    showCategoryList(words) {
        let categoriesElement = document.getElementById('categories');
        let str = '<div id="allCheckboxes">';
        for (let key in words) {
            str += `<input type="checkbox" id="${key}" name="${key}" value="${key}" onclick="dataAnalysis.isCountCheck('${key}')">
                    <label for="${key}">${key}</label><br />`;
        }
        str += '</div>';
        categoriesElement.innerHTML = str;
        this.showStatus("Категории: " + Object.keys(words).length );
    }

    drawLayout() {
        this.baseElement.innerHTML = `
        <div id="status"></div>
        <div id="word"></div>
        <div class="input-area">
            <textarea id="text" placeholder="Перевод..."></textarea>
            <div id="categories"></div>
        </div>
        <div class="button-area">
            <button id="showWords" class="glow-on-hover" onclick="dataAnalysis.getSelectedWords()">Показать слова</button>
        </div>
        <div id="translation">
        </div>
        <div class="button-area">
            <button id="showWords" class="glow-on-hover">START</button>
        </div>
        <div id="check"></div>
    `;
    }
}