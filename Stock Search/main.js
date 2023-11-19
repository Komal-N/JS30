let data = null;
const inputEl = document.querySelector('input');
const resultEl = document.querySelector('.result');

let results = [];

async function fetchData() {
    const res = await fetch('./data.json');
    data = await res.json();
}

function searchStock(event) {
    event.preventDefault();
    const searchQuery = inputEl.value.toLowerCase();

    if (searchQuery === "") {
        results = [];
        refreshResult();
        return;
    }

    const result = data.filter(stock => {
        let name = stock.name || "";
        let symbol = stock.symbol.toLowerCase();
        name = name.toLowerCase();

        if (symbol.includes(searchQuery)) return true;
        if (name.includes(searchQuery)) return true;
    });

    results = result;
    refreshResult();
}

function refreshResult() {
    const html = results.map(stock => {
        return `
            <div class="stock-item">
                <div>
                    <p class="stock-name">${stock.name}</p>
                    <p>${stock.symbol}</p>
                </div>
                <div>
                    <p>$ ${stock.price}</p>
                </div>
            </div>
        `;
    });

    resultEl.innerHTML = html.join('');
}