const cssPromises = {}

function loadResource(src) {
    if (src.endsWith('.js')) {
        return import (src)
    }
    if (src.endsWith(".css")) {
        if (!cssPromises[src]) {
            const link = document.createElement("link")
            link.rel = "stylesheet"
            link.href = src
            cssPromises[src] = new Promise(resolve => {
                link.addEventListener('load', () => resolve())
            })
            document.head.append(link)
        }
        return cssPromises[src]
    }
    return fetch(src).then(res => res.json())
}
const appContainer = document.getElementById('app')
const filmId = new URLSearchParams(window.location.search).get("id");


function load() {
    appContainer.innerHTML = "";
    appContainer.insertAdjacentHTML('beforeend', `
  <div id="preloader">
  <div id="loader"></div>
`)
}

function getDetailData(URLArray) {
    return Promise.all(URLArray.map((src) => loadResource(src)));
}

function renderPage(moduleName, apiUrl, css) {
    Promise.all([moduleName, apiUrl, css].map(src => loadResource(src)))
        .then(([pageModule, data]) => {
            if (filmId) {
                Promise.all([
                    getDetailData(data.result.properties.planets),
                    getDetailData(data.result.properties.species),
                ]).then(([planetsData, speciesData]) => {
                    appContainer.innerHTML = ''
                    appContainer.append(pageModule.render(data, planetsData, speciesData))
                });
            } else {
                appContainer.innerHTML = ''
                appContainer.append(pageModule.render(data))
            }

        })
}

if (filmId) {
    renderPage(
        './film-details.js',
        `https://www.swapi.tech/api/films/${filmId}`,
        './style.css'
    )
} else {
    renderPage(
        './film-list.js',
        'https://www.swapi.tech/api/films',
        './style.css'
    )
}


// if (filmId) {
//     Promise.all([
//                 './film-details.js',
//                 `https://www.swapi.tech/api/films/${filmId}`,
//                 './style.css'
//             ]
//             .map(src => loadResource(src)))
//         .then(([pageModule, data]) => {
//             appContainer.innerHTML = ''
//             appContainer.append(pageModule.render(data))
//         })
// } else {
//     Promise.all([
//                 './film-details.js',
//                 `https://www.swapi.tech/api/films`,
//                 './style.css'
//             ]
//             .map(src => loadResource(src)))
//         .then(([pageModule, data]) => {
//             appContainer.innerHTML = ''
//             appContainer.append(pageModule.render(data))
//         })
// }


window.addEventListener("popstate", (e) => {
    load();
});

load()
