export function render(data, planetsData, speciesData) {
    function renderDataList(detailData, element) {
        for (let item of detailData) {
            const listItem = document.createElement('li')
            listItem.classList.add('list_item')
            listItem.innerText = `${item.result.properties.name}`;
            element.append(listItem);
        }
    }
    let date = new Date(data.result.properties["release_date"]);
    let options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const container = document.createElement('div')
    const wrapper = document.createElement('div')
    const h1 = document.createElement('h1')
    const btnBack = document.createElement('button')
    const dateRel = document.createElement('h3')
    const director = document.createElement('h3')
    const crawl = document.createElement('p')
    const planList = document.createElement('ul')
    const speciesList = document.createElement('ul')


    container.classList.add('container')
    wrapper.classList.add('wrapper')
    h1.classList.add('detail-head')
    btnBack.classList.add('btn-back')
    dateRel.classList.add('date-rel')
    director.classList.add('director')
    crawl.classList.add('crawl')
    planList.classList.add('planets_list')
    speciesList.classList.add('species_list')


    h1.textContent = `Star Wars Episode ${data.result.properties["episode_id"]}: ${data.result.properties.title}`
    dateRel.textContent = ` Release date: ${date.toLocaleString("en-US", options)}`
    btnBack.textContent = 'Back'
    director.textContent = ` Directors: ${data.result.properties.director}`
    crawl.textContent = `${data.result.properties["opening_crawl"]}`
    planList.textContent = 'Planets'
    speciesList.textContent = 'Species'
    renderDataList(planetsData, planList)
    renderDataList(speciesData, speciesList)


    btnBack.addEventListener("click", () => {
        window.history.back()
    });

    wrapper.append(
        h1,
        btnBack,
        dateRel,
        director,
        crawl,
        planList,
        speciesList
    )
    container.append(wrapper)
    console.log(data.result.properties.planets)

    return container
}
