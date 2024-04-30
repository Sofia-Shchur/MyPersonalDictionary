class DesignerUI {
    constructor() {
        this.baseElement = document.getElementById('base');
    }

    showStatus(text) {
        let statusElement = document.getElementById('status');
        statusElement.innerHTML = '<span id="statusValue">' + text + '</span>';
    }

    showCategoryList(words) {
        let categoriesElement = document.getElementById('categories');
        let str = '<div id="allCheckboxes">';
        for (let key in words) {
            str += `<input type="checkbox" id="${key}" name="${key}" value="${key}" onclick="dataAnalysis.isCountCheck('${key}')">
                    <label for="${key}">${key}</label>`;
        }
        str += '</div>';
        this.showStatus("Категории: " + Object.keys(words).length );
        categoriesElement.insertAdjacentHTML( 'beforeend', str );
    }

    drawLayout() {
        this.baseElement.innerHTML = `
            <div id="categories"></div>
            <button id="showBtn" class="glow-on-hover" onclick="showWord()">Показать слово</button>
            <div id="word"></div>
            <div>
                <textarea id="text" placeholder="Перевод..."></textarea>
                <div id="check"></div>
            </div>
            <div>
                <button id="dis" class="glow-on-hover" onclick="dataAnalysis.checkWords()">Проверить</button>
            </div>
            <div id="status"></div>
        `;
    }
}