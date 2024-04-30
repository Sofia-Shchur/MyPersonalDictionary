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
            <button id="showBtn" class="glow-on-hover">Показать слово</button>
            <button id="dis" class="glow-on-hover">Проверить</button>
        </div>
        <div id="check"></div>
    `;

    }
}