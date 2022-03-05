export function render(data) {
    const container = document.createElement('div')
    const filmCard = document.createElement('ul')
    const logo = document.createElement('img')
    logo.src = './logo.png'

    container.classList.add('container')
    filmCard.classList.add('film-list')
    logo.classList.add('logo')

    container.append(logo)


    console.log(data)




    for (const film of data.result) {
        console.log(film.properties.title)

        const filmCardItem = document.createElement('li')
        const cardBodyLink = document.createElement('a')
        const filmTitle = document.createElement('h3')
        const filmDateRelease = document.createElement('p')



        filmCardItem.classList.add('film-list-item')
        cardBodyLink.classList.add('film-link')


        filmCard.append(filmCardItem)
        filmCardItem.append(cardBodyLink)
        cardBodyLink.append(filmTitle, filmDateRelease)


        let date = new Date(film.properties['release_date'])
        let options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };


        filmDateRelease.innerText = `Release date: ${date.toLocaleString('en-US', options)}`;
        filmTitle.textContent = film.properties.title;
        cardBodyLink.href = `?id=${film.properties.url.replace(/\D+/g, '')}`;


        container.append(filmCard)

    }
    return container
}
